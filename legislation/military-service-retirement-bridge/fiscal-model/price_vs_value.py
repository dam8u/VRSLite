"""
Deliverable 1 — price-versus-value model for the Military Service Retirement
Bridge (draft Va. Code § 51.1-142.4).

For each case the model computes:
  (a) the amount the member pays at approximate normal cost (SRC-08);
  (b) the actuarial present value of the acceleration, on two baselines:
        SUB  frozen-service   -- same retirement date, same service, same AFC;
                                 isolates the value of removing the early-
                                 retirement reduction / creating eligibility;
        WTE  work-to-eligibility -- nets off forgone accrual, forgone AFC growth
                                 and forgone contributions;
  (c) the net per-member subsidy (value received less price paid).

Partial purchases are handled: where the credit bought is smaller than the
eligibility deficit, the member becomes eligible later than the purchase date
but earlier than under current law, and every quantity is evaluated at that
intermediate date.

Illustrative. Not an actuarial certification.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from functools import lru_cache

import actuarial as A
import inputs as I

VALUATION_YEAR = 2029.0   # first fiscal year the bill can operate (effective 7/1/2028)

# ASM-25 — distribution of purchasable qualifying active duty service among
# veterans who have any (at least 180 consecutive days of full-time service,
# not dishonorably discharged, not counted in military retired pay). The
# statutory cap is four years. No Virginia or VRS data is published on this
# distribution; the shape below reflects that most non-career separations follow
# a single enlistment term.
QUALIFYING_SERVICE_DIST = [
    (1.0, 0.10),
    (2.0, 0.15),
    (3.0, 0.20),
    (4.0, 0.55),
]


# ---------------------------------------------------------------------------
# Benefit mechanics
# ---------------------------------------------------------------------------
def afc(salary_now: float, years_forward: float, afc_months: int,
        growth: float) -> float:
    """ASM-08. AFC at `years_forward` from now, given salary growing at `growth`:
    the average of the highest `afc_months` consecutive months of creditable
    compensation ending at that date."""
    sal_at = salary_now * (1.0 + growth) ** years_forward
    if growth == 0:
        return sal_at
    total = 0.0
    for mo in range(afc_months):
        total += sal_at * (1.0 + growth) ** (-(mo + 0.5) / 12.0)
    return total / afc_months


def multiplier_blend(plan: str, service: float, svc_pre2013: float) -> float:
    """SRC-09 / SRC-10. Weighted-average multiplier over the member's service."""
    if plan == "HY":
        return I.SRC_10_MULT_HYBRID
    if plan == "P1":
        return I.SRC_09_MULT_17
    pre = min(svc_pre2013, service)
    post = max(0.0, service - pre)
    return (pre * I.SRC_09_MULT_17 + post * I.SRC_09_MULT_165) / service


def allowance(plan: str, service: float, svc_pre2013: float, afc_value: float
              ) -> float:
    """§ 51.1-155 A 1 unreduced Basic Benefit. Eligibility credit is excluded
    from creditable service by § 51.1-124.3 as amended and § 51.1-142.4 E and
    F 3, so `service` is actual creditable service only."""
    return multiplier_blend(plan, service, svc_pre2013) * service * afc_value


# ---------------------------------------------------------------------------
# Eligibility arithmetic
# ---------------------------------------------------------------------------
def eligibility_deficit(path: str, age: float, service: float) -> float:
    """§ 51.1-142.4 C 1."""
    if path == "B2":
        return max(0.0, 30.0 - service)
    return max(0.0, 90.0 - (age + service))


def first_unreduced_age(path: str, age: float, service: float,
                        birth_year: int | None, credit: float = 0.0) -> float:
    """Age at which the member first qualifies for an unreduced allowance, given
    `credit` years of eligibility credit. Under § 51.1-142.4 C 4 eligibility
    credit never increases attained age, and under § 51.1-153 B 2 the age-50
    condition therefore still has to be met by waiting."""
    if path == "B2":
        years_to_30 = max(0.0, 30.0 - service - credit)
        via_b2 = max(age + years_to_30, 50.0)
        return min(via_b2, float(I.SRC_13_P1_NRA))
    years_to_90 = max(0.0, (90.0 - (age + service + credit)) / 2.0)
    return min(age + years_to_90, A.ssa_nra(birth_year))


def purchase_amount(path: str, age: float, service: float, rule: str,
                    qualifying_available: float,
                    prior_142_2_purchase: float = 0.0) -> float:
    """§ 51.1-142.4 C 2 under DECISION 4 rule D4a (as drafted: the lesser of the
    deficit, the remaining four-year military allowance, and available qualifying
    service) or D4b (stricter: nothing unless the deficit is fully coverable)."""
    deficit = eligibility_deficit(path, age, service)
    if deficit <= 0.0:
        return 0.0
    amt = min(deficit, max(0.0, 4.0 - prior_142_2_purchase), qualifying_available)
    if rule == "D4b" and amt < deficit - 1e-9:
        return 0.0
    return max(0.0, amt)


def reduction_factor(path: str, age: float, service: float,
                     birth_year: int | None) -> tuple[float, str]:
    if path == "B2":
        return A.p1_reduction_factor(age, service)
    return A.p2_reduction_factor(age, service, birth_year)


# ---------------------------------------------------------------------------
# Cached annuity factors
# ---------------------------------------------------------------------------
@lru_cache(maxsize=None)
def _ann(employer: str, sex: str, age: float, year: float, cola: float,
         disc: float, impr: float, delay: float) -> float:
    return A.blended(lambda s: A.annuity_factor(employer, s, age, year, cola,
                                                disc, impr,
                                                cola_delay_years=delay), sex)


@lru_cache(maxsize=None)
def _dann(employer: str, sex: str, age: float, year: float, commence: float,
          cola: float, disc: float, impr: float, active: bool,
          delay: float = 0.0) -> float:
    return A.blended(lambda s: A.deferred_annuity_factor(
        employer, s, age, year, commence, cola, disc, impr,
        cola_delay_years=delay, active_until_commence=active), sex)


# ---------------------------------------------------------------------------
# Core case evaluation
# ---------------------------------------------------------------------------
@dataclass
class Case:
    scenario: str = ""
    plan: str = ""
    path: str = ""
    employer: str = ""
    sex: str = "B"
    age_now: float = 0.0
    service_now: float = 0.0
    salary: float = 0.0
    deficit: float = 0.0
    years_purchased: float = 0.0
    qualifying_available: float = 0.0
    anc_rate: float = 0.0
    price_base: float = 0.0
    price_paid: float = 0.0
    # proposed case (retirement at the accelerated date)
    prop_age: float = 0.0
    prop_service: float = 0.0
    prop_afc: float = 0.0
    prop_annual: float = 0.0
    prop_pv: float = 0.0
    # baselines
    sub_factor: float = 0.0
    sub_rule: str = ""
    sub_annual: float = 0.0
    sub_pv: float = 0.0
    sub_label: str = ""
    wte_age: float = 0.0
    wte_service: float = 0.0
    wte_afc: float = 0.0
    wte_annual: float = 0.0
    wte_pv: float = 0.0
    # results
    acceleration_years: float = 0.0
    value_sub: float = 0.0
    value_wte: float = 0.0
    net_sub: float = 0.0
    net_wte: float = 0.0
    recovery_sub: float = float("nan")
    breakeven_rate_sub: float = float("nan")
    # contribution/payroll effects over the acceleration window
    pv_payroll_forgone: float = 0.0
    pv_total_normal_cost_forgone: float = 0.0
    pv_member_contrib_forgone: float = 0.0
    pv_employer_db_contrib_forgone: float = 0.0
    net_wte_if_not_refilled: float = 0.0
    notes: str = ""
    extras: dict = field(default_factory=dict)


def evaluate_case(*, employer: str, plan: str, path: str, age: float,
                  service: float, svc_pre2013: float, salary: float,
                  birth_year: int | None = None, sex: str = "B",
                  rule: str = "D4a", qualifying_available: float = 4.0,
                  prior_142_2_purchase: float = 0.0,
                  valuation_year: float = VALUATION_YEAR,
                  discount: float = I.SRC_01_INVESTMENT_RETURN,
                  salary_growth: float = 0.0350,
                  improvement: float = 0.0075,
                  scenario: str = "") -> Case:
    afc_m = I.SRC_11_AFC_MONTHS[plan]
    cola = I.SRC_05_COLA[plan]
    c = Case(scenario=scenario, plan=plan, path=path, employer=employer,
             age_now=age, service_now=service, salary=salary, sex=sex)
    c.deficit = eligibility_deficit(path, age, service)
    c.qualifying_available = qualifying_available
    c.years_purchased = purchase_amount(path, age, service, rule,
                                        qualifying_available,
                                        prior_142_2_purchase)

    # --- price (§ 51.1-142.4 D): approximate normal cost applied to creditable
    #     compensation or AFC at the time of purchase, whichever is higher
    c.anc_rate = {"P1": I.SRC_08_APPROX_NORMAL_COST["P1_NONHAZ"],
                  "P2": I.SRC_08_APPROX_NORMAL_COST["P2_NONHAZ"],
                  "HY": I.SRC_08_APPROX_NORMAL_COST["HY_NONJUD"]}[plan]
    afc_now = afc(salary, 0.0, afc_m, salary_growth)
    c.price_base = max(salary, afc_now)
    c.price_paid = c.anc_rate * c.years_purchased * c.price_base

    a0 = first_unreduced_age(path, age, service, birth_year, 0.0)
    c.wte_age = a0
    if c.years_purchased <= 0.0:
        return c

    # --- proposed: retire as soon as the purchased credit makes the member
    #     eligible for an unreduced allowance
    a1 = first_unreduced_age(path, age, service, birth_year, c.years_purchased)
    c.prop_age = a1
    fwd = a1 - age
    c.prop_service = service + fwd
    c.prop_afc = afc(salary, fwd, afc_m, salary_growth)
    c.prop_annual = allowance(plan, c.prop_service, svc_pre2013, c.prop_afc)
    c.acceleration_years = max(0.0, a0 - a1)

    # § 51.1-166 D 4 COLA delay, frozen without regard to eligibility credit
    delay = max(0.0, a0 - a1) if c.prop_service < 20.0 else 0.0
    def pv_at(a_commence: float, dly: float) -> float:
        """PV at the purchase date of 1 per annum commencing at `a_commence`."""
        if a_commence - age > 1e-9:
            return _dann(employer, sex, age, valuation_year, a_commence, cola,
                         discount, improvement, True, round(dly))
        return _ann(employer, sex, age, valuation_year, cola, discount,
                    improvement, round(dly))

    c.prop_pv = c.prop_annual * pv_at(a1, delay)

    # --- SUB baseline: same date, same service, same AFC, current-law reduction
    c.sub_factor, c.sub_rule = reduction_factor(path, a1, c.prop_service, birth_year)
    if c.sub_factor > 0.0:
        c.sub_annual = c.prop_annual * c.sub_factor
        c.sub_pv = c.sub_annual * pv_at(a1, delay)
        c.sub_label = (f"same date (age {a1:.2f}), same {c.prop_service:.2f} years, "
                       f"reduced allowance ({c.sub_rule})")
    else:
        commence = float(I.SRC_13_P1_NRA) if path == "B2" else A.ssa_nra(birth_year)
        c.sub_annual = c.prop_annual
        c.sub_pv = c.sub_annual * _dann(employer, sex, age, valuation_year,
                                        commence, cola, discount, improvement,
                                        False, 0.0)
        c.sub_label = (f"same date (age {a1:.2f}), same {c.prop_service:.2f} years, "
                       f"but cannot retire at all under current law; deferred "
                       f"unreduced allowance from age {commence:.2f} (SRC-07)")
        c.sub_rule = "ineligible to retire"

    # --- WTE baseline: works to first unreduced eligibility under current law
    fwd0 = a0 - age
    c.wte_service = service + fwd0
    c.wte_afc = afc(salary, fwd0, afc_m, salary_growth)
    c.wte_annual = allowance(plan, c.wte_service, svc_pre2013, c.wte_afc)
    c.wte_pv = c.wte_annual * pv_at(a0, 0.0)

    c.value_sub = c.prop_pv - c.sub_pv
    c.value_wte = c.prop_pv - c.wte_pv
    c.net_sub = c.value_sub - c.price_paid
    c.net_wte = c.value_wte - c.price_paid
    if c.value_sub > 0:
        c.recovery_sub = c.price_paid / c.value_sub * 100.0
        c.breakeven_rate_sub = c.value_sub / (c.years_purchased * c.price_base)

    # --- payroll and contributions forgone over the acceleration window
    pd = I.SRC_15_PLANS[employer]
    tnc = pd["total_normal_cost"] or (pd["er_normal_cost"] + pd["member_contrib"])
    pv_pay, w = 0.0, c.acceleration_years
    whole = int(w)
    for t in range(whole):
        pv_pay += (salary * (1 + salary_growth) ** (fwd + t)
                   / (1 + discount) ** (fwd + t))
    if w - whole > 1e-9:
        pv_pay += ((w - whole) * salary * (1 + salary_growth) ** (fwd + whole)
                   / (1 + discount) ** (fwd + whole))
    c.pv_payroll_forgone = pv_pay
    c.pv_total_normal_cost_forgone = tnc * pv_pay
    c.pv_member_contrib_forgone = pd["member_contrib"] * pv_pay
    c.pv_employer_db_contrib_forgone = pd["er_db_rate"] * pv_pay
    c.net_wte_if_not_refilled = c.net_wte + tnc * pv_pay
    return c


# ---------------------------------------------------------------------------
# Profile wrapper
# ---------------------------------------------------------------------------
def evaluate(p: dict, baseline: str = "SUB", rule: str = "D4a",
             qualifying_available: float = 4.0, **kw) -> Case:
    scen = f"{p['plan']}-{p['path']}-{p['id']}-{p['employer']}-{baseline}"
    if rule != "D4a":
        scen += f"-{rule}"
    c = evaluate_case(employer=p["employer"], plan=p["plan"], path=p["path"],
                      age=p["age"], service=p["service"],
                      svc_pre2013=p["svc_pre2013"], salary=p["salary"],
                      birth_year=p.get("birth_year"), sex=p["sex"], rule=rule,
                      qualifying_available=qualifying_available,
                      scenario=scen, **kw)
    c.notes = p["note"]
    return c


def expected_over_qualifying_service(fn, *, rule: str = "D4a"):
    """Probability-weighted result over the ASM-25 qualifying-service
    distribution. `fn(qualifying_available) -> dict of numeric components`."""
    acc: dict[str, float] = {}
    for yrs, w in QUALIFYING_SERVICE_DIST:
        r = fn(yrs)
        for k, v in r.items():
            if isinstance(v, (int, float)):
                acc[k] = acc.get(k, 0.0) + w * v
    return acc
