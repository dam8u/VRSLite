"""
Actuarial engine: mortality tables, survival functions and COLA-indexed
life-annuity factors built from the published VRS assumptions in inputs.py.

Illustrative. Not an actuarial certification. See README.md.
"""
from __future__ import annotations

import math
from functools import lru_cache

import inputs as I

TERMINAL_AGE = 115
Q_CAP = 0.60
IMPROVEMENT_BASE_YEAR = 2010


# ---------------------------------------------------------------------------
# Mortality
# ---------------------------------------------------------------------------
def _interp_log_linear(table: dict[int, float], age: float) -> float:
    """Log-linear interpolation in q_x between published quinquennial ages
    (ASM-01), with log-linear extrapolation above the top age (ASM-02)."""
    ages = sorted(table)
    lo, hi = ages[0], ages[-1]
    if age <= lo:
        # extrapolate down on the first published slope
        a0, a1 = ages[0], ages[1]
        slope = math.log(table[a1] / table[a0]) / (a1 - a0)
        return table[a0] * math.exp(slope * (age - a0))
    if age >= hi:
        a0, a1 = ages[-2], ages[-1]
        slope = math.log(table[a1] / table[a0]) / (a1 - a0)
        return min(Q_CAP, table[a1] * math.exp(slope * (age - a1)))
    for a0, a1 in zip(ages, ages[1:]):
        if a0 <= age <= a1:
            w = (age - a0) / (a1 - a0)
            return table[a0] * (table[a1] / table[a0]) ** w
    raise AssertionError


@lru_cache(maxsize=None)
def _q_table(employer: str, sex: str, pre_retirement: bool) -> dict[int, float]:
    src = I.SRC_21_Q_PRERET if pre_retirement else I.SRC_20_Q_HEALTHY_POSTRET
    idx = 0 if sex == "M" else 1
    return {age: pair[idx] for age, pair in src[employer].items()}


def q(employer: str, sex: str, age: float, calendar_year: float,
      improvement: float, pre_retirement: bool = False) -> float:
    """Mortality rate at attained `age` in `calendar_year`.

    `improvement` implements ASM-05: a flat annual reduction in q_x applied from
    the 2010 base year of the Pub-2010 tables to the year the age is attained.
    """
    base = _interp_log_linear(_q_table(employer, sex, pre_retirement), age)
    years = max(0.0, calendar_year - IMPROVEMENT_BASE_YEAR)
    return min(Q_CAP, base * (1.0 - improvement) ** years)


def survival_curve(employer: str, sex: str, start_age: float, start_year: float,
                   improvement: float, pre_retirement_until: float | None = None
                   ) -> list[float]:
    """t_p_x for t = 0, 1, 2, ... to the terminal age.

    If `pre_retirement_until` is given, pre-retirement (active) mortality is used
    up to that attained age and healthy post-retirement mortality thereafter.
    """
    out = [1.0]
    age, yr, p = start_age, start_year, 1.0
    while age < TERMINAL_AGE:
        pre = pre_retirement_until is not None and age < pre_retirement_until
        p *= 1.0 - q(employer, sex, age, yr, improvement, pre_retirement=pre)
        out.append(p)
        age += 1.0
        yr += 1.0
    return out


# ---------------------------------------------------------------------------
# Annuity factors
# ---------------------------------------------------------------------------
def annuity_factor(employer: str, sex: str, commence_age: float,
                   commence_year: float, cola: float,
                   discount: float = I.SRC_01_INVESTMENT_RETURN,
                   improvement: float = 0.0075,
                   cola_first_year: int = 3,
                   cola_delay_years: float = 0.0) -> float:
    """Present value at commencement of 1 per annum payable for life, indexed.

    Monthly payment is approximated as an annuity-due with a half-year timing
    adjustment (ASM-04). The COLA begins at the start of annuity year
    `cola_first_year` (ASM-06: July 1 of the second calendar year after
    retirement) and compounds annually at `cola`. `cola_delay_years` adds the
    further delay imposed by Va. Code § 51.1-166 D 4 on a retiree with fewer than
    20 years of creditable service.
    """
    surv = survival_curve(employer, sex, commence_age, commence_year, improvement)
    v = 1.0 / (1.0 + discount)
    total = 0.0
    for t, p in enumerate(surv):
        if commence_age + t >= TERMINAL_AGE:
            break
        # COLA escalation applied to year t (0-indexed)
        n_colas = max(0, (t + 1) - (cola_first_year - 1) - int(round(cola_delay_years)))
        esc = (1.0 + cola) ** n_colas
        total += p * esc * v ** t
    # half-year timing adjustment for monthly-in-advance payments
    return total * (1.0 + discount) ** -0.5


def deferred_annuity_factor(employer: str, sex: str, current_age: float,
                            current_year: float, commence_age: float,
                            cola: float,
                            discount: float = I.SRC_01_INVESTMENT_RETURN,
                            improvement: float = 0.0075,
                            cola_delay_years: float = 0.0,
                            active_until_commence: bool = True) -> float:
    """PV at `current_age` of 1 per annum commencing at `commence_age` for life."""
    if commence_age <= current_age:
        return annuity_factor(employer, sex, current_age, current_year, cola,
                              discount, improvement,
                              cola_delay_years=cola_delay_years)
    n = commence_age - current_age
    pre_until = commence_age if active_until_commence else None
    surv = survival_curve(employer, sex, current_age, current_year, improvement,
                          pre_retirement_until=pre_until)
    # interpolate survival to the (possibly fractional) deferral period
    i0 = int(math.floor(n))
    frac = n - i0
    p_defer = surv[i0] * (surv[min(i0 + 1, len(surv) - 1)] / surv[i0]) ** frac
    a_comm = annuity_factor(employer, sex, commence_age, current_year + n, cola,
                            discount, improvement,
                            cola_delay_years=cola_delay_years)
    return p_defer * a_comm / (1.0 + discount) ** n


def blended(fn, sex: str, *args, **kwargs) -> float:
    """ASM-03: 50/50 unisex blend when sex == 'B'."""
    if sex in ("M", "F"):
        return fn(sex, *args, **kwargs)
    return 0.5 * fn("M", *args, **kwargs) + 0.5 * fn("F", *args, **kwargs)


# ---------------------------------------------------------------------------
# Amortization of a liability change into a contribution rate (ASM-20)
# ---------------------------------------------------------------------------
def level_percent_amortization_factor(years: int,
                                      discount: float = I.SRC_01_INVESTMENT_RETURN,
                                      payroll_growth: float = I.SRC_04_PAYROLL_GROWTH
                                      ) -> float:
    """Annuity-due factor for a payment stream growing at `payroll_growth`,
    discounted at `discount`. Liability / factor = first-year payment."""
    net = (1.0 + discount) / (1.0 + payroll_growth) - 1.0
    v = 1.0 / (1.0 + net)
    return (1.0 - v ** years) / net * (1.0 + net)


def liability_to_basis_points(delta_liability: float, payroll: float,
                              years: int = 20,
                              payroll_growth: float = I.SRC_04_PAYROLL_GROWTH
                              ) -> float:
    f = level_percent_amortization_factor(years, payroll_growth=payroll_growth)
    return 10_000.0 * (delta_liability / f) / payroll


# ---------------------------------------------------------------------------
# Statutory eligibility helpers
# ---------------------------------------------------------------------------
def ssa_nra(birth_year: int | None) -> float:
    """SRC-14. Social Security normal retirement age."""
    if birth_year is None or birth_year >= 1960:
        return I.SRC_14_SSA_NRA_1960_PLUS
    return I.SRC_14_SSA_NRA.get(birth_year, I.SRC_14_SSA_NRA_1960_PLUS)


def p1_first_unreduced_age(age: float, service: float) -> float:
    """§ 51.1-153 A and B 2: age 65 with 5 years, or age 50 with 30 years.
    Service accrues one year per year worked."""
    years_to_30 = max(0.0, 30.0 - service)
    via_b2 = max(age + years_to_30, 50.0)
    via_nra = max(float(I.SRC_13_P1_NRA), age) if service + (I.SRC_13_P1_NRA - age) >= 5 \
        else float(I.SRC_13_P1_NRA)
    return min(via_b2, via_nra)


def p2_first_unreduced_age(age: float, service: float,
                           birth_year: int | None) -> float:
    """§ 51.1-153 A and B 3: Social Security NRA with 5 years, or age plus
    creditable service equal to 90. Age and service each accrue one year per
    year worked, so the Rule-of-90 sum grows two points per year."""
    points = age + service
    years_to_90 = max(0.0, (90.0 - points) / 2.0)
    via_b3 = age + years_to_90
    via_nra = ssa_nra(birth_year)
    return min(via_b3, via_nra)


def p1_reduction_factor(age: float, service: float) -> tuple[float, str]:
    """SRC-12. Plan 1 early-retirement reduction at the stated age and service.
    Returns (factor, rule applied). Returns (1.0, 'unreduced') if already
    eligible for an unreduced allowance."""
    first_unred = p1_first_unreduced_age(age, service)
    if age >= first_unred - 1e-9:
        return 1.0, "unreduced"
    if service < 5.0:
        return 0.0, "not eligible to retire"
    if age < 50.0 or (age < 55.0 and service < 10.0):
        return 0.0, "not eligible to retire"
    months = (first_unred - age) * 12.0
    red = I.SRC_12_RED_FIRST60 * min(months, 60.0)
    red += I.SRC_12_RED_ADDL * max(0.0, months - 60.0)
    rule = "55/5"
    if age < 55.0:
        red += I.SRC_12_RED_UNDER55 * (55.0 - age) * 12.0
        rule = "50/10"
    return max(0.0, 1.0 - red), rule


def p2_reduction_factor(age: float, service: float,
                        birth_year: int | None) -> tuple[float, str]:
    """ASM-09 proxy for the Plan 2 / Hybrid 60-5 reduction. Below age 60 a Plan 2
    or Hybrid member cannot retire at all under current law."""
    first_unred = p2_first_unreduced_age(age, service, birth_year)
    if age >= first_unred - 1e-9:
        return 1.0, "unreduced"
    if age < 60.0 or service < 5.0:
        return 0.0, "not eligible to retire"
    months = (first_unred - age) * 12.0
    red = I.SRC_12_RED_FIRST60 * min(months, 60.0)
    red += I.SRC_12_RED_ADDL * max(0.0, months - 60.0)
    return max(0.0, 1.0 - red), "60/5 (ASM-09 proxy)"
