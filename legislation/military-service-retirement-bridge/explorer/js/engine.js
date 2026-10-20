/* =====================================================================
   Military Service Retirement Bridge — Legislative Scenario Explorer
   CALCULATION ENGINE

   A faithful port of the committed Python fiscal model:
     fiscal-model/actuarial.py       mortality, annuity factors, amortization
     fiscal-model/price_vs_value.py  per-member price and value, both baselines
     fiscal-model/aggregate.py       cell-by-cell aggregation
     fiscal-model/population.py      statutory screens and the veteran funnel

   This file contains NO reference to the DOM, to window events or to any
   presentation concern. It is the model; js/ui.js is the interface. It can be
   required under Node for regression testing against the Python tables, which
   is how it is verified (see explorer/test/reconcile.js).

   Illustrative policy-analysis model. NOT an actuarial certification, NOT the
   VRS Board impact statement required under Va. Code § 30-19.1:7, and NOT a
   General Assembly fiscal impact statement.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.VRSEngine = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ---------------------------------------------------------------- state */
  var B = null;      // baseline (window.VRS_BASELINE)
  var CELLS = null;  // exposure mix rows
  var QPOST = null, QPRE = null;
  var EMPLOYERS = ['ST', 'TC', 'PS'];
  var TERMINAL_AGE = 115, Q_CAP = 0.60, IMPROVEMENT_BASE_YEAR = 2010;

  function init(baseline, cellsDoc) {
    B = baseline;
    CELLS = cellsDoc.rows.map(function (r) {
      return { emp: r[0], plan: r[1], age: r[2], service: r[3], fy: r[4], exposed: r[5] };
    });
    TERMINAL_AGE = B.actuarial.terminal_age;
    Q_CAP = B.actuarial.q_cap;
    IMPROVEMENT_BASE_YEAR = B.actuarial.improvement_base_year;
    QPOST = numericKeys(B.actuarial.q_healthy_postret);
    QPRE = numericKeys(B.actuarial.q_preret);
    clearCaches();
    return API;
  }

  function numericKeys(src) {
    var out = {};
    EMPLOYERS.forEach(function (e) {
      out[e] = { M: {}, F: {} };
      Object.keys(src[e]).forEach(function (k) {
        out[e].M[+k] = src[e][k][0];
        out[e].F[+k] = src[e][k][1];
      });
    });
    return out;
  }

  /* ------------------------------------------------------------- helpers */
  /* Python's round() is banker's rounding; Math.round is not. The COLA delay
     under § 51.1-166 D 4 is passed through round(), so reproduce it exactly. */
  function bankersRound(x) {
    var f = Math.floor(x), d = x - f;
    if (Math.abs(d - 0.5) < 1e-12) return (f % 2 === 0) ? f : f + 1;
    return Math.round(x);
  }
  function sortedNumKeys(tbl) {
    return Object.keys(tbl).map(Number).sort(function (a, b) { return a - b; });
  }

  /* ----------------------------------------------------------- mortality */
  /* ASM-01 log-linear interpolation between published quinquennial ages,
     ASM-02 log-linear extrapolation above the top published age. */
  function interpLogLinear(tbl, age) {
    var ages = sortedNumKeys(tbl), lo = ages[0], hi = ages[ages.length - 1], slope, w, i;
    if (age <= lo) {
      slope = Math.log(tbl[ages[1]] / tbl[ages[0]]) / (ages[1] - ages[0]);
      return tbl[ages[0]] * Math.exp(slope * (age - ages[0]));
    }
    if (age >= hi) {
      var a0 = ages[ages.length - 2], a1 = ages[ages.length - 1];
      slope = Math.log(tbl[a1] / tbl[a0]) / (a1 - a0);
      return Math.min(Q_CAP, tbl[a1] * Math.exp(slope * (age - a1)));
    }
    for (i = 0; i < ages.length - 1; i++) {
      if (ages[i] <= age && age <= ages[i + 1]) {
        w = (age - ages[i]) / (ages[i + 1] - ages[i]);
        return tbl[ages[i]] * Math.pow(tbl[ages[i + 1]] / tbl[ages[i]], w);
      }
    }
    throw new Error('interpolation failed at age ' + age);
  }

  /* ASM-05 flat annual mortality improvement from the Pub-2010 base year. */
  function q(emp, sex, age, calYear, improvement, preRet) {
    var tbl = (preRet ? QPRE : QPOST)[emp][sex];
    var base = interpLogLinear(tbl, age);
    var years = Math.max(0, calYear - IMPROVEMENT_BASE_YEAR);
    return Math.min(Q_CAP, base * Math.pow(1 - improvement, years));
  }

  var survCache = {};
  function survivalCurve(emp, sex, startAge, startYear, improvement, preRetUntil) {
    var key = emp + '|' + sex + '|' + startAge + '|' + startYear + '|' +
      improvement + '|' + (preRetUntil === null ? 'n' : preRetUntil);
    var hit = survCache[key];
    if (hit) return hit;
    var out = [1.0], age = startAge, yr = startYear, p = 1.0, pre;
    while (age < TERMINAL_AGE) {
      pre = (preRetUntil !== null && preRetUntil !== undefined && age < preRetUntil);
      p *= 1.0 - q(emp, sex, age, yr, improvement, pre);
      out.push(p);
      age += 1; yr += 1;
    }
    survCache[key] = out;
    return out;
  }

  /* ------------------------------------------------------ annuity factors */
  var annCache = {};
  /* PV at commencement of 1 per annum payable for life, COLA-indexed.
     Monthly-in-advance approximated as an annuity-due with a half-year timing
     adjustment (ASM-04). COLA begins at the start of annuity year
     `colaFirstYear` (ASM-06) and compounds; `colaDelayYears` adds the further
     delay imposed by Va. Code § 51.1-166 D 4 on a retiree with fewer than 20
     years of creditable service. */
  function annuityFactor(emp, sex, commenceAge, commenceYear, cola, discount,
                         improvement, colaFirstYear, colaDelayYears) {
    colaFirstYear = colaFirstYear === undefined ? 3 : colaFirstYear;
    colaDelayYears = colaDelayYears || 0;
    var key = emp + '|' + sex + '|' + commenceAge + '|' + commenceYear + '|' +
      cola + '|' + discount + '|' + improvement + '|' + colaFirstYear + '|' + colaDelayYears;
    var hit = annCache[key];
    if (hit !== undefined) return hit;
    var surv = survivalCurve(emp, sex, commenceAge, commenceYear, improvement, null);
    var v = 1.0 / (1.0 + discount), total = 0.0, t, nColas, esc;
    var delay = Math.trunc(bankersRound(colaDelayYears));
    for (t = 0; t < surv.length; t++) {
      if (commenceAge + t >= TERMINAL_AGE) break;
      nColas = Math.max(0, (t + 1) - (colaFirstYear - 1) - delay);
      esc = Math.pow(1.0 + cola, nColas);
      total += surv[t] * esc * Math.pow(v, t);
    }
    total *= Math.pow(1.0 + discount, -0.5);
    annCache[key] = total;
    return total;
  }

  function deferredAnnuityFactor(emp, sex, currentAge, currentYear, commenceAge,
                                 cola, discount, improvement, colaDelayYears,
                                 activeUntilCommence) {
    if (commenceAge <= currentAge) {
      return annuityFactor(emp, sex, currentAge, currentYear, cola, discount,
                           improvement, 3, colaDelayYears);
    }
    var n = commenceAge - currentAge;
    var preUntil = activeUntilCommence ? commenceAge : null;
    var surv = survivalCurve(emp, sex, currentAge, currentYear, improvement, preUntil);
    var i0 = Math.floor(n), frac = n - i0;
    var s0 = surv[i0], s1 = surv[Math.min(i0 + 1, surv.length - 1)];
    var pDefer = s0 * Math.pow(s1 / s0, frac);
    var aComm = annuityFactor(emp, sex, commenceAge, currentYear + n, cola,
                              discount, improvement, 3, colaDelayYears);
    return pDefer * aComm / Math.pow(1.0 + discount, n);
  }

  /* ASM-03 unisex blend. */
  function blended(fn, sex) {
    if (sex === 'M' || sex === 'F') return fn(sex);
    return 0.5 * fn('M') + 0.5 * fn('F');
  }

  /* ----------------------------------- amortization into a employer rate */
  /* ASM-20. Mirrors VRS's layered level-percent-of-payroll method; it is not
     VRS's calculation. */
  function levelPercentAmortizationFactor(years, discount, payrollGrowth) {
    var net = (1.0 + discount) / (1.0 + payrollGrowth) - 1.0;
    var v = 1.0 / (1.0 + net);
    return (1.0 - Math.pow(v, years)) / net * (1.0 + net);
  }
  function liabilityToBasisPoints(dLiability, payroll, years, payrollGrowth, discount) {
    var f = levelPercentAmortizationFactor(years, discount, payrollGrowth);
    return 10000.0 * (dLiability / f) / payroll;
  }

  /* -------------------------------------- statutory eligibility helpers */
  function ssaNra(birthYear) {
    if (birthYear === null || birthYear === undefined || birthYear >= 1960) {
      return B.actuarial.ssa_nra_1960_plus;
    }
    var t = { 1954: 66.0, 1955: 66 + 2 / 12, 1956: 66 + 4 / 12,
              1957: 66 + 6 / 12, 1958: 66 + 8 / 12, 1959: 66 + 10 / 12 };
    return t[birthYear] !== undefined ? t[birthYear] : B.actuarial.ssa_nra_1960_plus;
  }

  /* § 51.1-153 A and B 2. */
  function p1FirstUnreducedAge(age, service) {
    var nra = B.actuarial.p1_nra;
    var yearsTo30 = Math.max(0.0, 30.0 - service);
    var viaB2 = Math.max(age + yearsTo30, 50.0);
    var viaNra = (service + (nra - age) >= 5) ? Math.max(nra, age) : nra;
    return Math.min(viaB2, viaNra);
  }
  /* § 51.1-153 A and B 3. Age and service each accrue a year per year worked,
     so the Rule-of-90 sum grows two points a year. */
  function p2FirstUnreducedAge(age, service, birthYear) {
    var yearsTo90 = Math.max(0.0, (90.0 - (age + service)) / 2.0);
    return Math.min(age + yearsTo90, ssaNra(birthYear));
  }

  /* SRC-12 published reduction construction. */
  function p1ReductionFactor(age, service) {
    var A_ = B.actuarial;
    var firstUnred = p1FirstUnreducedAge(age, service);
    if (age >= firstUnred - 1e-9) return [1.0, 'unreduced'];
    if (service < 5.0) return [0.0, 'not eligible to retire'];
    if (age < 50.0 || (age < 55.0 && service < 10.0)) return [0.0, 'not eligible to retire'];
    var months = (firstUnred - age) * 12.0;
    var red = A_.red_first60 * Math.min(months, 60.0) + A_.red_addl * Math.max(0.0, months - 60.0);
    var rule = '55/5';
    if (age < 55.0) { red += A_.red_under55 * (55.0 - age) * 12.0; rule = '50/10'; }
    return [Math.max(0.0, 1.0 - red), rule];
  }
  /* ASM-09 proxy: VRS does not publish the numeric Plan 2 / hybrid 60-5
     factor table. Below age 60 a Plan 2 or hybrid member cannot retire at all,
     so no factor is needed and none is used. */
  function p2ReductionFactor(age, service, birthYear) {
    var A_ = B.actuarial;
    var firstUnred = p2FirstUnreducedAge(age, service, birthYear);
    if (age >= firstUnred - 1e-9) return [1.0, 'unreduced'];
    if (age < 60.0 || service < 5.0) return [0.0, 'not eligible to retire'];
    var months = (firstUnred - age) * 12.0;
    var red = A_.red_first60 * Math.min(months, 60.0) + A_.red_addl * Math.max(0.0, months - 60.0);
    return [Math.max(0.0, 1.0 - red), '60/5 (ASM-09 proxy)'];
  }

  /* ------------------------------------------------- benefit mechanics */
  /* ASM-08. */
  function afc(salaryNow, yearsForward, afcMonths, growth) {
    var salAt = salaryNow * Math.pow(1.0 + growth, yearsForward);
    if (growth === 0) return salAt;
    var total = 0.0;
    for (var mo = 0; mo < afcMonths; mo++) {
      total += salAt * Math.pow(1.0 + growth, -(mo + 0.5) / 12.0);
    }
    return total / afcMonths;
  }
  /* SRC-09 / SRC-10. */
  function multiplierBlend(plan, service, svcPre2013) {
    var p = B.published;
    if (plan === 'HY') return p.mult_hybrid;
    if (plan === 'P1') return p.mult_17;
    var pre = Math.min(svcPre2013, service), post = Math.max(0.0, service - pre);
    return (pre * p.mult_17 + post * p.mult_165) / service;
  }
  /* § 51.1-155 A 1 unreduced Basic Benefit. Eligibility credit is excluded
     from creditable service by the § 51.1-124.3 amendment and by
     § 51.1-142.4 E and F 3, so `service` is ACTUAL creditable service only.
     This is the line that makes the bridge an eligibility benefit rather than
     an accrual benefit. */
  function allowance(plan, service, svcPre2013, afcValue) {
    return multiplierBlend(plan, service, svcPre2013) * service * afcValue;
  }

  /* § 51.1-142.4 C 1. */
  function eligibilityDeficit(path, age, service) {
    if (path === 'B2') return Math.max(0.0, 30.0 - service);
    return Math.max(0.0, 90.0 - (age + service));
  }
  /* § 51.1-142.4 C 4: eligibility credit never increases attained age, so the
     age-50 condition in § 51.1-153 B 2 still has to be met by waiting. */
  function firstUnreducedAge(path, age, service, birthYear, credit) {
    credit = credit || 0;
    if (path === 'B2') {
      var yearsTo30 = Math.max(0.0, 30.0 - service - credit);
      return Math.min(Math.max(age + yearsTo30, 50.0), B.actuarial.p1_nra);
    }
    var yearsTo90 = Math.max(0.0, (90.0 - (age + service + credit)) / 2.0);
    return Math.min(age + yearsTo90, ssaNra(birthYear));
  }
  /* § 51.1-142.4 C 2. Rule D4a is the bill as drafted (purchase up to the
     lesser of the deficit, the remaining four-year military allowance and
     available qualifying service). D4b is the stricter rejected alternative
     (nothing unless the deficit is fully coverable). */
  function purchaseAmount(path, age, service, rule, qualAvail, prior142_2) {
    prior142_2 = prior142_2 || 0;
    var deficit = eligibilityDeficit(path, age, service);
    if (deficit <= 0.0) return 0.0;
    var amt = Math.min(deficit, Math.max(0.0, 4.0 - prior142_2), qualAvail);
    if (rule === 'D4b' && amt < deficit - 1e-9) return 0.0;
    return Math.max(0.0, amt);
  }
  function reductionFactor(path, age, service, birthYear) {
    return path === 'B2' ? p1ReductionFactor(age, service)
                         : p2ReductionFactor(age, service, birthYear);
  }

  /* ------------------------------------------------ core case evaluation */
  /* Port of price_vs_value.evaluate_case. Every quantity returned is
     homogeneous of degree one in `salary` — the purchase amount, the ages and
     every reduction factor are independent of pay — which is what lets the
     aggregation apply a salary override as an exact post-hoc multiplier
     instead of re-running the actuarial arithmetic. */
  function evaluateCase(o) {
    var plan = o.plan, path = o.path, emp = o.employer, sex = o.sex || 'B';
    var age = o.age, service = o.service, salary = o.salary;
    var birthYear = o.birthYear === undefined ? null : o.birthYear;
    var rule = o.rule || 'D4a';
    var qualAvail = o.qualifyingAvailable === undefined ? 4.0 : o.qualifyingAvailable;
    var valuationYear = o.valuationYear === undefined ? B.actuarial.valuation_year : o.valuationYear;
    var discount = o.discount === undefined ? B.published.discount : o.discount;
    var growth = o.salaryGrowth === undefined ? 0.0350 : o.salaryGrowth;
    var improvement = o.improvement === undefined ? B.actuarial.improvement_central : o.improvement;
    var afcM = B.published.afc_months[plan];
    var cola = B.published.cola[plan];

    var c = {
      plan: plan, path: path, employer: emp, sex: sex, ageNow: age,
      serviceNow: service, salary: salary,
      deficit: eligibilityDeficit(path, age, service),
      qualifyingAvailable: qualAvail,
      yearsPurchased: purchaseAmount(path, age, service, rule, qualAvail, o.prior142_2 || 0),
      accelerationYears: 0, pricePaid: 0, propPv: 0, subPv: 0, wtePv: 0,
      valueSub: 0, valueWte: 0, netSub: 0, netWte: 0,
      pvPayrollForgone: 0, pvTotalNormalCostForgone: 0,
      pvMemberContribForgone: 0, pvEmployerDbContribForgone: 0
    };

    /* price — § 51.1-142.4 D: approximate normal cost applied to creditable
       compensation or AFC at the time of purchase, whichever is higher. */
    c.ancRate = B.published.anc[plan];
    var afcNow = afc(salary, 0.0, afcM, growth);
    c.priceBase = Math.max(salary, afcNow);
    c.pricePaid = c.ancRate * c.yearsPurchased * c.priceBase;

    var a0 = firstUnreducedAge(path, age, service, birthYear, 0.0);
    c.wteAge = a0;
    if (c.yearsPurchased <= 0.0) return c;

    /* proposed: retire as soon as the purchased credit confers eligibility */
    var a1 = firstUnreducedAge(path, age, service, birthYear, c.yearsPurchased);
    c.propAge = a1;
    var fwd = a1 - age;
    c.propService = service + fwd;
    c.propAfc = afc(salary, fwd, afcM, growth);
    c.propAnnual = allowance(plan, c.propService, o.svcPre2013, c.propAfc);
    c.accelerationYears = Math.max(0.0, a0 - a1);

    /* § 51.1-166 D 4 COLA delay, frozen without regard to eligibility credit */
    var delay = c.propService < 20.0 ? Math.max(0.0, a0 - a1) : 0.0;
    function pvAt(aCommence, dly) {
      if (aCommence - age > 1e-9) {
        return blended(function (s) {
          return deferredAnnuityFactor(emp, s, age, valuationYear, aCommence, cola,
                                       discount, improvement, bankersRound(dly), true);
        }, sex);
      }
      return blended(function (s) {
        return annuityFactor(emp, s, age, valuationYear, cola, discount,
                             improvement, 3, bankersRound(dly));
      }, sex);
    }
    c.propPv = c.propAnnual * pvAt(a1, delay);

    /* SUB baseline — frozen service: same date, same service, same AFC, with
       the current-law early-retirement reduction. Isolates the value of the
       thing the bridge actually sells. */
    var rf = reductionFactor(path, a1, c.propService, birthYear);
    c.subFactor = rf[0]; c.subRule = rf[1];
    if (c.subFactor > 0.0) {
      c.subAnnual = c.propAnnual * c.subFactor;
      c.subPv = c.subAnnual * pvAt(a1, delay);
      c.subLabel = 'same date (age ' + a1.toFixed(2) + '), same ' +
        c.propService.toFixed(2) + ' years, reduced allowance (' + c.subRule + ')';
    } else {
      var commence = path === 'B2' ? B.actuarial.p1_nra : ssaNra(birthYear);
      c.subAnnual = c.propAnnual;
      c.subPv = c.subAnnual * blended(function (s) {
        return deferredAnnuityFactor(emp, s, age, valuationYear, commence, cola,
                                     discount, improvement, 0, false);
      }, sex);
      c.subLabel = 'same date (age ' + a1.toFixed(2) + '), same ' +
        c.propService.toFixed(2) + ' years, but cannot retire at all under ' +
        'current law; deferred unreduced allowance from age ' +
        commence.toFixed(2) + ' (SRC-07)';
      c.subRule = 'ineligible to retire';
    }

    /* WTE baseline — work to eligibility: the member works under current law
       to first unreduced eligibility and then retires. Nets off forgone
       accrual, forgone AFC growth and forgone contributions. */
    var fwd0 = a0 - age;
    c.wteService = service + fwd0;
    c.wteAfc = afc(salary, fwd0, afcM, growth);
    c.wteAnnual = allowance(plan, c.wteService, o.svcPre2013, c.wteAfc);
    c.wtePv = c.wteAnnual * pvAt(a0, 0.0);

    c.valueSub = c.propPv - c.subPv;
    c.valueWte = c.propPv - c.wtePv;
    c.netSub = c.valueSub - c.pricePaid;
    c.netWte = c.valueWte - c.pricePaid;
    if (c.valueSub > 0) {
      c.recoverySub = c.pricePaid / c.valueSub * 100.0;
      c.breakevenRateSub = c.valueSub / (c.yearsPurchased * c.priceBase);
    }

    /* payroll and contributions forgone over the acceleration window */
    var pd = B.plans[plan === 'HY' ? 'P1' : plan].by_employer[emp] ||
             B.plans.P1.by_employer[emp];
    var tnc = pd.total_normal_cost;
    var pvPay = 0.0, w = c.accelerationYears, whole = Math.trunc(w), t;
    for (t = 0; t < whole; t++) {
      pvPay += salary * Math.pow(1 + growth, fwd + t) / Math.pow(1 + discount, fwd + t);
    }
    if (w - whole > 1e-9) {
      pvPay += (w - whole) * salary * Math.pow(1 + growth, fwd + whole) /
               Math.pow(1 + discount, fwd + whole);
    }
    c.pvPayrollForgone = pvPay;
    c.pvTotalNormalCostForgone = tnc * pvPay;
    c.pvMemberContribForgone = pd.member_contrib * pvPay;
    c.pvEmployerDbContribForgone = pd.er_db_rate * pvPay;
    c.salaryAtDeparture = salary * Math.pow(1 + growth, fwd);
    return c;
  }

  /* ---------------------------------------------------- salary curve */
  /* Average creditable compensation for a member of this age in this plan,
     from the published age-banded payroll (SRC-19), rolled forward.
     Political subdivision pay is the state curve scaled by the ratio of
     published average compensation (ASM-12). */
  function salaryAt(emp, age, yearsForward, growth) {
    var src = emp === 'TC' ? B.salary_curve.TC : B.salary_curve.ST;
    var baseAge = age - yearsForward, pay = null, i, row;
    for (i = 0; i < src.length; i++) {
      row = src[i];
      if (row[0] <= baseAge && baseAge < row[1]) { pay = row[2]; break; }
    }
    if (pay === null) {
      pay = baseAge >= 70 ? src[src.length - 1][2] : null;
      if (pay === null) {
        for (i = 0; i < src.length; i++) if (src[i][0] === 20) { pay = src[i][2]; break; }
      }
    }
    if (emp === 'PS') pay *= B.salary_curve.PS_RATIO;
    return pay * Math.pow(1.0 + growth, yearsForward);
  }

  /* ------------------------------------------------ the veteran funnel */
  /* § 51.1-142.4 population factors — ASM-15 to ASM-18. Every one of these is
     an estimate, not a published fact, except the 6% state veteran share. */
  function purchasableShare(emp, f) {
    return f.veteranShare[emp] * f.qualifyingShare *
           (1.0 - f.retiredPayBar) * f.notAlreadyBought;
  }

  /* ---------------------------------------- cell-level probability weight */
  var cellCache = {};
  function actuarialSignature(p) {
    return [p.discount, p.salaryGrowth, p.improvement, p.rule,
            p.bridgeYearsMode, p.p1BridgeYears, p.p2BridgeYears].join('|');
  }
  /* Probability-weighted per-member price, SUB value, WTE value and
     contribution effects for one cell, averaged over the distribution of
     purchasable qualifying service (ASM-25) or over a stated fixed average. */
  function cellResult(cell, p, sig) {
    var key = sig + '#' + cell.emp + cell.plan + cell.age + ',' + cell.service + ',' + cell.fy;
    var hit = cellCache[key];
    if (hit !== undefined) return hit;

    var path = cell.plan === 'P1' ? 'B2' : 'B3';
    var svcPre = cell.plan === 'P1' ? cell.service
               : (cell.plan === 'P2' ? B.actuarial.p2_svc_pre2013 : 0.0);
    var salary = salaryAt(cell.emp, cell.age, cell.fy - B.actuarial.base_date_fy, p.salaryGrowth);

    var dist;
    if (p.bridgeYearsMode === 'fixed') {
      dist = [[cell.plan === 'P1' ? p.p1BridgeYears : p.p2BridgeYears, 1.0]];
    } else {
      dist = B.funnel_assumptions.qualifying_service_dist;
    }

    var acc = { yearsBought: 0, price: 0, valueSub: 0, valueWte: 0, ncOffset: 0,
                pvPayrollForgone: 0, acceleration: 0, memberContribForgone: 0,
                erDbForgone: 0, salaryAtDeparture: 0, serviceAtRet: 0 };
    var pBuy = 0, i, qual, w, c;
    for (i = 0; i < dist.length; i++) {
      qual = dist[i][0]; w = dist[i][1];
      c = evaluateCase({
        employer: cell.emp, plan: cell.plan, path: path, age: cell.age,
        service: cell.service, svcPre2013: svcPre, salary: salary,
        birthYear: null, sex: 'B', rule: p.rule, qualifyingAvailable: qual,
        valuationYear: cell.fy, discount: p.discount,
        salaryGrowth: p.salaryGrowth, improvement: p.improvement
      });
      if (c.yearsPurchased <= 0.0) continue;
      pBuy += w;
      acc.yearsBought += w * c.yearsPurchased;
      acc.price += w * c.pricePaid;
      acc.valueSub += w * c.valueSub;
      acc.valueWte += w * c.valueWte;
      acc.ncOffset += w * c.pvTotalNormalCostForgone;
      acc.pvPayrollForgone += w * c.pvPayrollForgone;
      acc.acceleration += w * c.accelerationYears;
      acc.memberContribForgone += w * c.pvMemberContribForgone;
      acc.erDbForgone += w * c.pvEmployerDbContribForgone;
      acc.salaryAtDeparture += w * c.salaryAtDeparture;
      acc.serviceAtRet += w * c.propService;
    }
    acc.salary = salary;
    acc.pBuy = pBuy;
    cellCache[key] = acc;
    return acc;
  }

  function clearCaches() { survCache = {}; annCache = {}; cellCache = {}; }

  /* ------------------------------------------------------------ defaults */
  function defaults() {
    var fa = B.funnel_assumptions;
    return {
      /* participants */
      participantMode: 'model',          // 'model' | 'direct'
      p1Participants: null,              // used when participantMode === 'direct'
      p2Participants: null,
      takeUp: fa.take_up.M,              // ASM-19 moderate
      /* bridge amount */
      bridgeYearsMode: 'dist',           // 'dist' (ASM-25) | 'fixed'
      p1BridgeYears: 3.1,
      p2BridgeYears: 3.6,
      /* behaviour */
      phi: fa.phi.central,               // ASM-22
      /* salary */
      salaryMode: 'model',               // 'model' | 'scaled'
      p1Salary: null,
      p2Salary: null,
      /* advanced actuarial */
      salaryGrowth: 0.0350,              // ASM-07 (= SRC-03 wage inflation)
      discount: B.published.discount,    // SRC-01
      improvement: B.actuarial.improvement_central,   // ASM-05
      /* purchase rule and scope */
      rule: 'D4a',                       // the bill as drafted
      includeHybrid: false,              // DECISION 2 — excluded
      /* population funnel (ASM-15 to ASM-18) */
      veteranShare: { ST: 0.060, TC: 0.025, PS: 0.070 },
      qualifyingShare: fa.qualifying_share.central,
      retiredPayBar: fa.retired_pay_bar.central,
      notAlreadyBought: fa.not_already_bought.central,
      /* workforce / payroll */
      replacementPct: 0.90,
      notReplacedPct: 0.00,
      vacancyMonths: 0,
      amortizeAtScenarioDiscount: false,   // ASM-20 — see the methodology page
      officialData: false
    };
  }

  /* ----------------------------------------------------------- the run */
  function run(params) {
    var p = Object.assign({}, defaults(), params || {});
    var sig = actuarialSignature(p);
    var plansWanted = p.includeHybrid ? ['P1', 'P2', 'HY'] : ['P1', 'P2'];

    function blankAcc() {
      return { purchasable: 0, exposed: 0, years: 0, price: 0, valueSub: 0,
               valueWte: 0, ncOffset: 0, pvPayrollForgone: 0, accelYears: 0,
               memberContribForgone: 0, erDbForgone: 0, wSalaryDeparture: 0,
               wServiceAtRet: 0, wSalary: 0, wDeficit: 0, wAge: 0, wService: 0 };
    }
    /* per benefit structure, and per benefit structure x employer plan */
    var byPlan = {}, byPlanEmp = {}, byEmp = {}, inBand = { total: 0 };
    plansWanted.forEach(function (pl) {
      byPlan[pl] = blankAcc();
      byPlanEmp[pl] = {};
      EMPLOYERS.forEach(function (e) { byPlanEmp[pl][e] = blankAcc(); });
    });
    EMPLOYERS.forEach(function (e) { byEmp[e] = blankAcc(); });

    var i, cell, share, pool, r, tgt, tgt2, tgt3, path, d;
    for (i = 0; i < CELLS.length; i++) {
      cell = CELLS[i];
      if (plansWanted.indexOf(cell.plan) < 0) continue;
      path = cell.plan === 'P1' ? 'B2' : 'B3';
      d = eligibilityDeficit(path, cell.age, cell.service);
      inBand.total += cell.exposed;

      share = purchasableShare(cell.emp, p);
      pool = cell.exposed * share;
      r = cellResult(cell, p, sig);
      if (r.pBuy <= 0.0) continue;

      tgt = byPlan[cell.plan]; tgt2 = byPlanEmp[cell.plan][cell.emp]; tgt3 = byEmp[cell.emp];
      [tgt, tgt2, tgt3].forEach(function (t) {
        t.exposed += cell.exposed;
        t.purchasable += pool * r.pBuy;
        t.years += pool * r.yearsBought;
        t.price += pool * r.price;
        t.valueSub += pool * r.valueSub;
        t.valueWte += pool * r.valueWte;
        t.ncOffset += pool * r.ncOffset;
        t.pvPayrollForgone += pool * r.pvPayrollForgone;
        t.accelYears += pool * r.acceleration;
        t.memberContribForgone += pool * r.memberContribForgone;
        t.erDbForgone += pool * r.erDbForgone;
        t.wSalaryDeparture += pool * r.salaryAtDeparture;
        t.wServiceAtRet += pool * r.serviceAtRet;
        t.wSalary += pool * r.pBuy * r.salary;
        t.wDeficit += pool * r.pBuy * d;
        t.wAge += pool * r.pBuy * cell.age;
        t.wService += pool * r.pBuy * cell.service;
      });
    }

    /* ---- participant scaling -------------------------------------------
       Every per-member quantity above is accumulated on the PURCHASABLE pool.
       Multiplying by take-up gives the modeled participant count; a directly
       entered participant count rescales the same mix instead, so the
       age/service/deficit composition of the modeled population is preserved
       rather than replaced by a flat average member. */
    var scale = {}, modeled = {}, participants = {};
    plansWanted.forEach(function (pl) {
      modeled[pl] = byPlan[pl].purchasable * p.takeUp;
      var want = pl === 'P1' ? p.p1Participants : (pl === 'P2' ? p.p2Participants : null);
      if (p.participantMode === 'direct' && want !== null && want !== undefined) {
        participants[pl] = want;
        scale[pl] = modeled[pl] > 1e-9 ? want / byPlan[pl].purchasable : 0;
      } else {
        participants[pl] = modeled[pl];
        scale[pl] = p.takeUp;
      }
    });

    /* ---- salary override is an exact multiplier (degree-one homogeneity) */
    var salMult = {};
    plansWanted.forEach(function (pl) {
      var meanSal = byPlan[pl].purchasable > 1e-9
        ? byPlan[pl].wSalary / byPlan[pl].purchasable : 0;
      var want = pl === 'P1' ? p.p1Salary : (pl === 'P2' ? p.p2Salary : null);
      salMult[pl] = (p.salaryMode === 'scaled' && want && meanSal > 0) ? want / meanSal : 1.0;
      byPlan[pl].modelMeanSalary = meanSal;
      byPlan[pl].appliedMeanSalary = meanSal * salMult[pl];
    });

    function scaled(acc, pl) {
      var k = scale[pl] * salMult[pl], kNoSal = scale[pl];
      return {
        purchasable: acc.purchasable, exposed: acc.exposed,
        participants: acc.purchasable * kNoSal,
        years: acc.years * kNoSal,
        price: acc.price * k,
        valueSub: acc.valueSub * k,
        valueWte: acc.valueWte * k,
        ncOffset: acc.ncOffset * k,
        pvPayrollForgone: acc.pvPayrollForgone * k,
        accelYears: acc.accelYears * kNoSal,
        memberContribForgone: acc.memberContribForgone * k,
        erDbForgone: acc.erDbForgone * k,
        salaryAtDeparture: acc.purchasable > 1e-9
          ? acc.wSalaryDeparture / acc.purchasable * salMult[pl] : 0,
        serviceAtRet: acc.purchasable > 1e-9 ? acc.wServiceAtRet / acc.purchasable : 0,
        meanAge: acc.purchasable > 1e-9 ? acc.wAge / acc.purchasable : 0,
        meanService: acc.purchasable > 1e-9 ? acc.wService / acc.purchasable : 0,
        meanDeficit: acc.purchasable > 1e-9 ? acc.wDeficit / acc.purchasable : 0,
        meanSalary: acc.purchasable > 1e-9 ? acc.wSalary / acc.purchasable * salMult[pl] : 0,
        modelMeanSalary: acc.purchasable > 1e-9 ? acc.wSalary / acc.purchasable : 0,
        appliedSalaryMultiplier: salMult[pl]
      };
    }

    /* The amortization basis. ASM-20 amortizes the liability layer at the
       Board's PUBLISHED assumption, which is what the committed model does
       even in its own discount-rate sensitivity: moving the discount rate is a
       sensitivity on how the liability is MEASURED, not a change in the
       Board's funding policy. A user who wants both to move can say so, and
       the tool then stops reproducing the published sensitivity table — which
       is why it is off by default and labelled. */
    var amortDiscount = p.amortizeAtScenarioDiscount ? p.discount : B.published.discount;

    /* ---- Panel A / B: pension-system impact, kept separate by plan ----- */
    var pension = { byPlan: {}, byEmployer: {}, combined: null };
    var aggPayroll = B.published.aggregate_payroll;
    var totals = { participants: 0, years: 0, price: 0, valueSub: 0, valueWte: 0,
                   valueBlended: 0, netLiability: 0, bp: 0, accelYears: 0,
                   pvPayrollForgone: 0, ncOffset: 0, memberContribForgone: 0,
                   erDbForgone: 0 };

    plansWanted.forEach(function (pl) {
      var s = scaled(byPlan[pl], pl);
      s.valueBlended = p.phi * s.valueWte + (1 - p.phi) * s.valueSub;
      s.netLiability = s.valueBlended - s.price;
      /* The benefit-structure basis-point figure is that structure's ADDITIVE
         contribution to the combined aggregate rate: its liability amortized
         over the combined covered payroll of the three employer plans. The
         structure-level figures therefore sum to the combined figure. A
         contribution rate is certified per EMPLOYER plan, not per benefit
         structure, so the per-employer figures below are the ones that
         correspond to a rate a payroll office would actually see. */
      s.bpContribution = liabilityToBasisPoints(s.netLiability, aggPayroll, 20,
                                                B.published.payroll_growth, amortDiscount);
      s.meanAcceleration = s.participants > 1e-9 ? s.accelYears / s.participants : 0;
      s.meanYears = s.participants > 1e-9 ? s.years / s.participants : 0;
      s.pricePerParticipant = s.participants > 1e-9 ? s.price / s.participants : 0;
      s.valueSubPer = s.participants > 1e-9 ? s.valueSub / s.participants : 0;
      s.valueWtePer = s.participants > 1e-9 ? s.valueWte / s.participants : 0;
      s.modeledParticipants = modeled[pl];
      s.purchasablePool = byPlan[pl].purchasable;
      s.salaryOverrideApplied = salMult[pl] !== 1.0;
      pension.byPlan[pl] = s;
      ['participants', 'years', 'price', 'valueSub', 'valueWte', 'valueBlended',
       'netLiability', 'accelYears', 'pvPayrollForgone', 'ncOffset',
       'memberContribForgone', 'erDbForgone'].forEach(function (k) {
        totals[k] += s[k];
      });
    });

    EMPLOYERS.forEach(function (e) {
      var pd = B.plans.P1.by_employer[e] || B.plans.P2.by_employer[e];
      var acc = { price: 0, valueSub: 0, valueWte: 0, participants: 0,
                  pvPayrollForgone: 0, ncOffset: 0, erDbForgone: 0,
                  memberContribForgone: 0, years: 0, accelYears: 0 };
      plansWanted.forEach(function (pl) {
        var s = scaled(byPlanEmp[pl][e], pl);
        ['price', 'valueSub', 'valueWte', 'participants', 'pvPayrollForgone',
         'ncOffset', 'erDbForgone', 'memberContribForgone', 'years',
         'accelYears'].forEach(function (k) { acc[k] += s[k]; });
      });
      acc.valueBlended = p.phi * acc.valueWte + (1 - p.phi) * acc.valueSub;
      acc.netLiability = acc.valueBlended - acc.price;
      acc.payroll = pd.payroll;
      acc.erDbRate = pd.er_db_rate;
      acc.bp = liabilityToBasisPoints(acc.netLiability, pd.payroll, pd.amort_years,
                                      pd.payroll_growth, amortDiscount);
      acc.erDbRateWithImpact = pd.er_db_rate + acc.bp / 10000.0;
      acc.label = { ST: 'VRS State Employees', TC: 'VRS Teachers',
                    PS: 'Participating Political Subdivisions (aggregate)' }[e];
      pension.byEmployer[e] = acc;
    });

    totals.bp = liabilityToBasisPoints(totals.netLiability, aggPayroll, 20,
                                       B.published.payroll_growth, amortDiscount);
    totals.aggregatePayroll = aggPayroll;
    totals.meanAcceleration = totals.participants > 1e-9
      ? totals.accelYears / totals.participants : 0;
    totals.meanYears = totals.participants > 1e-9 ? totals.years / totals.participants : 0;
    totals.costRecovery = totals.valueBlended > 1e-9
      ? totals.price / totals.valueBlended * 100 : null;
    pension.combined = totals;

    /* ---- Panel C: workforce / payroll effect --------------------------- */
    /* GUARDRAIL. The departing member's full salary is NEVER a saving where
       the position is refilled. Only the compensation differential counts,
       and the three mechanisms are reported separately because they are
       different claims with different evidence behind them. */
    var wf = { byEmployer: {}, combined: null };
    var wfTot = { departingPayroll: 0, replacementPayroll: 0, lowerPaidDiff: 0,
                  notReplacedPayroll: 0, vacancyPayroll: 0, erContribDeparting: 0,
                  erContribReplacement: 0, erContribDiff: 0, total: 0 };
    EMPLOYERS.forEach(function (e) {
      var acc = pension.byEmployer[e];
      var departing = acc.pvPayrollForgone;
      var nu = p.notReplacedPct;
      var refilledBase = departing * (1 - nu);
      var notReplaced = departing * nu;
      var replacement = refilledBase * p.replacementPct;
      var lowerPaid = refilledBase - replacement;
      /* A temporary vacancy on a position that IS refilled: the post is
         unfilled for `vacancyMonths` before the replacement starts. Valued on
         the replacement's own compensation, and reported separately from the
         permanent effects because it is a one-off, not a recurring saving. */
      var vacancy = refilledBase * p.replacementPct * (p.vacancyMonths / 12.0);
      vacancy = Math.min(vacancy, replacement);
      var erDep = departing * acc.erDbRate;
      var erRep = (replacement - vacancy) * acc.erDbRate;
      var row = {
        label: acc.label, departingPayroll: departing,
        replacementPayroll: replacement - vacancy, lowerPaidDiff: lowerPaid,
        notReplacedPayroll: notReplaced, vacancyPayroll: vacancy,
        erContribDeparting: erDep, erContribReplacement: erRep,
        erContribDiff: erDep - erRep, erDbRate: acc.erDbRate
      };
      row.total = lowerPaid + notReplaced + vacancy + row.erContribDiff;
      wf.byEmployer[e] = row;
      Object.keys(wfTot).forEach(function (k) { wfTot[k] += row[k] || 0; });
    });
    wf.combined = wfTot;

    /* payroll effect at each of the required replacement percentages */
    wf.replacementLadder = [0.75, 0.80, 0.85, 0.90, 0.95, 1.00].map(function (pct) {
      var lower = 0, er = 0;
      EMPLOYERS.forEach(function (e) {
        var acc = pension.byEmployer[e];
        var refilled = acc.pvPayrollForgone * (1 - p.notReplacedPct);
        var rep = refilled * pct;
        var vac = Math.min(rep * (p.vacancyMonths / 12.0), rep);
        lower += refilled - rep;
        er += acc.pvPayrollForgone * acc.erDbRate - (rep - vac) * acc.erDbRate;
      });
      return { pct: pct, lowerPaidDiff: lower, erContribDiff: er,
               total: lower + er + wfTot.notReplacedPayroll + wfTot.vacancyPayroll,
               selected: Math.abs(pct - p.replacementPct) < 1e-9 };
    });

    /* ---- HIC and COLA — separately funded trusts, OUTSIDE the bp figure */
    /* § 51.1-1400: the state health insurance credit is $4.25 per month per
       year of creditable service. An earlier retirement starts it earlier; the
       bill does not reach that, and DECISION 9 accepts and discloses it. */
    var hicRate = 4.25;
    var hicPv = 0;
    plansWanted.forEach(function (pl) {
      var s = pension.byPlan[pl];
      /* simple PV over the acceleration window at the scenario discount rate */
      var annual = s.serviceAtRet * hicRate * 12;
      var yrs = s.meanAcceleration;
      var v = 1 / (1 + p.discount), pvFactor = 0, t;
      for (t = 0; t < Math.trunc(yrs); t++) pvFactor += Math.pow(v, t);
      pvFactor += (yrs - Math.trunc(yrs)) * Math.pow(v, Math.trunc(yrs));
      hicPv += annual * pvFactor * s.participants;
    });
    var ancillary = {
      hicPvEstimate: hicPv,
      hicPerRetireeNote: 'Illustrative at $4.25 per month per year of creditable ' +
        'service (§ 51.1-1400); about $5,300 for a state retiree with 26 years ' +
        'over a four-year acceleration.',
      colaQuantified: false,
      note: 'Both run on separately funded trusts and are OUTSIDE every ' +
        'contribution-rate figure in this tool. HIC and COLA follow the ' +
        'retirement date, so preventing earlier commencement would require ' +
        'separate statutory changes outside the bridge. The COLA exposure is ' +
        'not quantified by this model or by the fiscal model it is built on.'
    };

    /* ---- Panel D: three separate totals, never merged ------------------ */
    var combinedView = {
      pensionImpact: totals.netLiability,
      pensionBp: totals.bp,
      payrollWorkforceEffect: wfTot.total,
      combinedScenarioEffect: wfTot.total - totals.netLiability,
      warning: 'Combined fiscal effect is a scenario result, not an actuarial ' +
        'certification or VRS fiscal impact statement.'
    };

    /* ---- Panel G: the population funnel, with provenance -------------- */
    var funnel = buildFunnel(p, inBand, byPlan, plansWanted, participants, scale);

    return {
      params: p,
      panelA: {
        byPlan: pension.byPlan,
        totalParticipants: totals.participants,
        totalYears: totals.years,
        meanYears: totals.meanYears,
        memberAncPayments: totals.price
      },
      panelB: pension,
      panelC: wf,
      panelD: combinedView,
      ancillary: ancillary,
      panelG: funnel,
      reconciliation: B.reconciliation.python_model
    };
  }

  /* ------------------------------------------------------- Panel G funnel */
  function buildFunnel(p, inBand, byPlan, plansWanted, participants, scale) {
    var pub = B.published;
    var activeThree = pub.active_total_three_plans;
    var exposedTotal = 0, purchasableTotal = 0, participantsTotal = 0;
    plansWanted.forEach(function (pl) {
      exposedTotal += byPlan[pl].exposed > 0 ? 0 : 0;   // recomputed below
    });
    /* exposed headcount is a property of the cell mix, not of the funnel */
    var exposedByPlan = B.exposed_headcount_by_plan;
    plansWanted.forEach(function (pl) {
      exposedTotal += exposedByPlan[pl] || 0;
      purchasableTotal += byPlan[pl].purchasable;
      participantsTotal += participants[pl];
    });

    var vetWeighted = 0, wsum = 0;
    EMPLOYERS.forEach(function (e) {
      var w = pub.active_by_employer[e];
      vetWeighted += p.veteranShare[e] * w; wsum += w;
    });
    var vetAvg = vetWeighted / wsum;

    var afterVet = exposedTotal * vetAvg;
    var afterQual = afterVet * p.qualifyingShare;
    var afterBar = afterQual * (1 - p.retiredPayBar);
    var afterBought = afterBar * p.notAlreadyBought;

    return {
      steps: [
        { label: 'Active members, three VRS plans (June 30, 2025)',
          value: activeThree, provenance: 'Published Fact',
          source: 'VAL2025 Results Summary (SRC-15)' },
        { label: 'Exposed to a purchase opportunity, FY2029–FY2038 — within ' +
                 'four years/points of an unreduced threshold and not already ' +
                 'eligible (§ 51.1-142.4 B 5, C)',
          value: exposedTotal, provenance: 'Derived Estimate',
          source: 'Published age × service grid (SRC-18) rolled forward; plan ' +
                  'structure inferred from service (ASM-10, ASM-23); political ' +
                  'subdivision grid constructed (ASM-12)' },
        { label: 'Estimated veterans', value: afterVet,
          provenance: 'Derived Estimate',
          source: '6.0% published for the classified state workforce ' +
                  '(DHRM2025 slide 8, SRC-24); teacher and political ' +
                  'subdivision shares are ASSUMED (ASM-15) — no published ' +
                  'figure exists' },
        { label: 'With qualifying active duty service (≥ 180 consecutive days, ' +
                 'not dishonorably discharged)',
          value: afterQual, provenance: 'Scenario Assumption',
          source: 'ASM-16 — no VRS or Virginia data published' },
        { label: 'Not barred by the military retired pay rule ' +
                 '(§ 51.1-142.2 B, inherited by § 51.1-142.4 B 4, H 5)',
          value: afterBar, provenance: 'Scenario Assumption',
          source: 'ASM-17 — federal aggregates only; 10 U.S.C. ch. 1223 ' +
                  'non-regular reserve-component retired pay is protected, ' +
                  'with § 12736 application to the bridge subject to counsel ' +
                  'confirmation' },
        { label: 'Did not already purchase in the § 51.1-142.2 B 3 24-month window',
          value: afterBought, provenance: 'Scenario Assumption',
          source: 'ASM-18 — VRS does not publish purchase-of-prior-service take-up' },
        { label: 'Able and willing to purchase (probability-weighted over ' +
                 'available qualifying service, ASM-25)',
          value: purchasableTotal, provenance: 'Scenario Assumption',
          source: 'ASM-25 distribution of purchasable qualifying service' },
        { label: 'Expected participants at the selected take-up rate',
          value: participantsTotal, provenance: 'Scenario Assumption',
          source: 'ASM-19 — low 10% / moderate 20% / high 30%; no evidence base' }
      ],
      directEntry: p.participantMode === 'direct'
    };
  }

  /* ------------------------------------------------- Panel E member example */
  function memberExample(profileId, p) {
    p = Object.assign({}, defaults(), p || {});
    var pr = B.profiles[profileId];
    var c = evaluateCase({
      employer: pr.employer, plan: pr.plan, path: pr.path, age: pr.age,
      service: pr.service, svcPre2013: pr.svc_pre2013, salary: pr.salary,
      birthYear: pr.birth_year === undefined ? null : pr.birth_year,
      sex: pr.sex, rule: p.rule, qualifyingAvailable: 4.0,
      valuationYear: B.actuarial.valuation_year, discount: p.discount,
      salaryGrowth: p.salaryGrowth, improvement: p.improvement
    });
    c.profileId = profileId;
    c.note = pr.note;
    /* Which way does this member come out, on the selected behavioural
       baseline? Reported as the blend actually in force, and as each pure
       baseline, because the sign flips between them. */
    c.valueBlended = p.phi * c.valueWte + (1 - p.phi) * c.valueSub;
    c.netBlended = c.valueBlended - c.pricePaid;
    c.gainsOnSub = c.netSub > 0;
    c.gainsOnWte = c.netWte > 0;
    c.gainsOnBlend = c.netBlended > 0;
    c.phi = p.phi;
    c.currentLawRetirementAge = c.wteAge;
    return c;
  }

  /* ----------------------------------------------- Panel F sensitivity */
  /* One-at-a-time swing of each driver around the current scenario. The
     drivers that change actuarial values force a recompute; the rest are
     post-hoc scalings and are effectively free. */
  function tornado(params) {
    var base = run(params);
    var baseVal = base.panelB.combined.bp;
    var p = base.params;
    var fa = B.funnel_assumptions;

    var drivers = [
      { key: 'participants', label: 'Participant count (take-up)',
         low: { takeUp: 0.05 }, high: { takeUp: 0.50 },
         lowLabel: '5% take-up', highLabel: '50% take-up' },
      { key: 'phi', label: 'Behavioural assumption (φ, ASM-22)',
         low: { phi: fa.phi.high }, high: { phi: fa.phi.low },
         lowLabel: 'φ = 0.75 (more work on)', highLabel: 'φ = 0.25 (more leaving anyway)' },
      { key: 'bridge', label: 'Average bridge amount',
         low: { bridgeYearsMode: 'fixed', p1BridgeYears: 1.0, p2BridgeYears: 1.0 },
         high: { bridgeYearsMode: 'fixed', p1BridgeYears: 4.0, p2BridgeYears: 4.0 },
         lowLabel: '1.0 year/point', highLabel: '4.0 years/points' },
      { key: 'replacement', label: 'Replacement salary percentage',
         low: { replacementPct: 1.00 }, high: { replacementPct: 0.75 },
         lowLabel: '100% replacement', highLabel: '75% replacement',
         pensionNeutral: true },
      { key: 'notReplaced', label: 'Positions not replaced',
         low: { notReplacedPct: 0.00 }, high: { notReplacedPct: 0.10 },
         lowLabel: '0% eliminated', highLabel: '10% eliminated',
         pensionNeutral: true },
      { key: 'salaryGrowth', label: 'Salary growth (ASM-07)',
         low: { salaryGrowth: 0.045 }, high: { salaryGrowth: 0.025 },
         lowLabel: '4.50%', highLabel: '2.50%' },
      { key: 'discount', label: 'Actuarial discount rate (SRC-01)',
         low: { discount: 0.0775 }, high: { discount: 0.0575 },
         lowLabel: '7.75%', highLabel: '5.75%' },
      { key: 'funnel', label: 'Veteran / purchasability funnel (ASM-15–18)',
         low: { veteranShare: { ST: 0.060 * 0.6, TC: 0.025 * 0.6, PS: 0.070 * 0.6 },
                qualifyingShare: fa.qualifying_share.low,
                retiredPayBar: fa.retired_pay_bar.low,
                notAlreadyBought: fa.not_already_bought.low },
         high: { veteranShare: { ST: 0.060 * 1.6, TC: 0.025 * 1.6, PS: 0.070 * 1.6 },
                 qualifyingShare: fa.qualifying_share.high,
                 retiredPayBar: fa.retired_pay_bar.high,
                 notAlreadyBought: fa.not_already_bought.high },
         lowLabel: 'low case', highLabel: 'high case' }
    ];

    var rows = drivers.map(function (d) {
      var lo = run(Object.assign({}, p, d.low));
      var hi = run(Object.assign({}, p, d.high));
      return {
        key: d.key, label: d.label,
        lowLabel: d.lowLabel, highLabel: d.highLabel,
        lowBp: lo.panelB.combined.bp, highBp: hi.panelB.combined.bp,
        lowPayroll: lo.panelC.combined.total, highPayroll: hi.panelC.combined.total,
        swing: Math.abs(hi.panelB.combined.bp - lo.panelB.combined.bp),
        payrollSwing: Math.abs(hi.panelC.combined.total - lo.panelC.combined.total),
        pensionNeutral: !!d.pensionNeutral
      };
    });
    rows.sort(function (a, b) {
      if (a.pensionNeutral !== b.pensionNeutral) return a.pensionNeutral ? 1 : -1;
      return b.swing - a.swing;
    });
    return { baseBp: baseVal, basePayroll: base.panelC.combined.total, rows: rows };
  }

  /* -------------------------------------------------------- preset scenarios */
  function presets() {
    var fa = B.funnel_assumptions;
    return {
      central: {
        name: 'Central',
        description: 'The committed fiscal model’s own central case. ' +
          'Reproduces the published tables exactly.',
        params: {}
      },
      conservative: {
        name: 'Conservative / Low Participation',
        description: 'Low take-up, positions refilled at full salary, no ' +
          'workforce reduction, and a high share of purchasers who would have ' +
          'worked on to eligibility anyway.',
        params: { takeUp: fa.take_up.L, replacementPct: 1.00,
                  notReplacedPct: 0.00, vacancyMonths: 0, phi: fa.phi.high }
      },
      high: {
        name: 'High Participation',
        description: 'High take-up on the high population funnel, with central ' +
          'workforce assumptions.',
        params: { takeUp: fa.take_up.H,
                  veteranShare: { ST: 0.060 * 1.6, TC: 0.025 * 1.6, PS: 0.070 * 1.6 },
                  qualifyingShare: fa.qualifying_share.high,
                  retiredPayBar: fa.retired_pay_bar.high,
                  notAlreadyBought: fa.not_already_bought.high,
                  replacementPct: 0.90, notReplacedPct: 0.00 }
      },
      turnover: {
        name: 'Workforce Turnover Scenario',
        description: 'Central participation with replacement compensation in ' +
          'the 80–90% range and a modest non-replacement rate.',
        params: { takeUp: fa.take_up.M, replacementPct: 0.85,
                  notReplacedPct: 0.05, vacancyMonths: 3 }
      },
      noWorkforce: {
        name: 'No Workforce Savings',
        description: 'Positions refilled at 100% of departing compensation, ' +
          'nothing eliminated, no vacancy effect. Shows the pension impact ' +
          'standing alone, with no workforce offset at all. This is the ' +
          'scenario to read first.',
        params: { replacementPct: 1.00, notReplacedPct: 0.00, vacancyMonths: 0 }
      },
      hybrid: {
        name: 'Hybrid Variant (not the bill)',
        description: 'DECISION 2 is to EXCLUDE hybrid participants. This ' +
          'scenario includes them, to show the fiscal consequence of the ' +
          'alternative — which is close to nothing before FY2038.',
        params: { includeHybrid: true }
      }
    };
  }

  var API = {
    init: init, run: run, defaults: defaults, presets: presets,
    tornado: tornado, memberExample: memberExample,
    clearCaches: clearCaches,
    /* exposed for the methodology page and for regression testing */
    internals: {
      q: function () { return q.apply(null, arguments); },
      survivalCurve: function () { return survivalCurve.apply(null, arguments); },
      annuityFactor: function () { return annuityFactor.apply(null, arguments); },
      deferredAnnuityFactor: function () { return deferredAnnuityFactor.apply(null, arguments); },
      evaluateCase: evaluateCase, salaryAt: salaryAt, afc: afc,
      allowance: allowance, multiplierBlend: multiplierBlend,
      eligibilityDeficit: eligibilityDeficit, firstUnreducedAge: firstUnreducedAge,
      purchaseAmount: purchaseAmount, p1ReductionFactor: p1ReductionFactor,
      p2ReductionFactor: p2ReductionFactor, ssaNra: ssaNra,
      liabilityToBasisPoints: liabilityToBasisPoints,
      levelPercentAmortizationFactor: levelPercentAmortizationFactor,
      purchasableShare: purchasableShare,
      get baseline() { return B; },
      get cells() { return CELLS; }
    }
  };
  return API;
}));
