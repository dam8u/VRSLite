/* =====================================================================
   Plain-language glossary, output-naming rules and the Official VRS Data
   contract.

   The source-and-assumption registry itself is NOT here — it is exported
   from the model's own inputs.py into data/baseline.js (window
   .VRS_BASELINE.registry) so that what the explorer displays cannot drift
   from what produced the numbers. This file holds only the editorial layer:
   how each term is explained to a legislator, and what an output may be
   called.
   ===================================================================== */
window.VRS_REGISTRY = {

  /* ------------------------------------------------------------ glossary */
  /* Every one of these appears as a tooltip on first use in the dashboard. */
  glossary: {
    'approximate normal cost': {
      short: 'The statutory purchase price.',
      long: 'The rate VRS charges a member to buy a year of service, set by ' +
        'the Board and published in the Purchase of Prior Service rate charts. ' +
        'It is 12.50% of pay for Plan 1 and 10.74% for Plan 2 — for ORDINARY ' +
        'NON-HAZARDOUS members, effective July 1, 2025. The rate applicable to ' +
        'eligible pre-2014 § 51.1-153 B 4 public-safety members requires VRS ' +
        'confirmation. Important: this is the price of a year of benefit ' +
        'ACCRUAL. The bridge sells something different — an earlier ' +
        'eligibility date — so there is no reason to expect the price to ' +
        'cover the value.'
    },
    'actuarial equivalent cost': {
      short: 'A price that fully covers what the member receives.',
      long: 'The price at which the plan is left no worse off: the full ' +
        'present value of the extra benefit. Current law already charges this ' +
        'for military service bought outside the 24-month window where the ' +
        'member wants it to count toward the benefit formula. For the ' +
        'acceleration the bridge sells, an actuarially equivalent price would ' +
        'be roughly 112.8% of salary per year purchased in the maximum ' +
        'Plan 1 case — against the 12.50% the bill charges.'
    },
    'unreduced retirement': {
      short: 'Retiring with no early-retirement cut to the pension.',
      long: 'A member who retires before reaching an unreduced threshold has ' +
        'the allowance permanently reduced. Plan 1 reaches unreduced ' +
        'retirement at age 65 with 5 years, or age 50 with 30 years ' +
        '(§ 51.1-153 B 2). Plan 2 reaches it at Social Security normal ' +
        'retirement age with 5 years, or when age plus creditable service ' +
        'equals 90 (§ 51.1-153 B 3). The bridge moves that DATE earlier. It ' +
        'does not increase the pension at any given date.'
    },
    'rule of 90': {
      short: 'Age + creditable service = 90.',
      long: 'The Plan 2 and hybrid unreduced-retirement test in ' +
        '§ 51.1-153 B 3. Because age and service each advance a year for each ' +
        'year worked, the sum grows TWO points a year — so one purchased ' +
        'point buys only half a year of acceleration. This is why four bridge ' +
        'years accelerate a Plan 1 member by up to four years but a Plan 2 ' +
        'member by only two.'
    },
    'employer contribution-rate basis points': {
      short: 'One basis point = 0.01% of covered payroll.',
      long: 'Employer pension contributions are set as a percentage of ' +
        'payroll. The modeled impact is expressed as the change in that ' +
        'percentage, in hundredths of a percentage point. The combined impact ' +
        'is 0.19 basis points across all three employer plans. The state plan’s ' +
        'own modeled impact is about 0.22 basis points, taking its 11.07% ' +
        'published rate to approximately 11.0722%. To the nearest basis point, ' +
        'it does not move. The 0.19 combined figure is the modeled ' +
        'retirement-plan employer contribution impact ' +
        'and excludes the separately funded health insurance credit and COLA ' +
        'effects, including unquantified COLA exposure; the fiscal model is ' +
        'complete for bill version 1.1 and a refresh against the bill as ' +
        'introduced (operative text now at version 1.4) is required before ' +
        'external use.'
    },
    'pension liability': {
      short: 'What the plan owes, measured today.',
      long: 'The present value of benefits the plan has promised. An increase ' +
        'in liability that is not matched by money coming in has to be ' +
        'funded, which is what turns into an employer contribution rate. ' +
        'The figure shown here is the increase net of the member payments ' +
        'received.'
    },
    'payroll effect': {
      short: 'A change in what the employer spends on salaries.',
      long: 'NOT a pension saving, and shown separately for that reason. If ' +
        'an accelerated retirement is refilled at the same compensation the ' +
        'payroll effect is zero. If refilled at lower compensation, only the ' +
        'differential counts. If the position is not refilled at all, the ' +
        'avoided payroll is real but is a workforce-reduction decision, not ' +
        'a consequence of the pension change.'
    },
    'present value': {
      short: 'A stream of future payments expressed as one amount today.',
      long: 'Future payments are discounted — at the VRS Board\'s published ' +
        '6.75% investment return assumption — and weighted by the ' +
        'probability the retiree is alive to receive them, using the Board\'s ' +
        'published mortality tables. A pension of $35,700 a year for life ' +
        'from age 50 has a present value of roughly $639,000.'
    },
    'creditable service': {
      short: 'The service that drives the pension formula.',
      long: 'Defined in § 51.1-124.3 as prior service under § 51.1-142.2 plus ' +
        'membership service. It sets the benefit amount, vesting, the health ' +
        'insurance credit and more. The bridge credit is EXPRESSLY EXCLUDED ' +
        'from this definition by the bill\'s § 51.1-124.3 amendment — which ' +
        'is the single provision that keeps the bridge from becoming a ' +
        'benefit increase.'
    },
    'frozen-service baseline': {
      short: 'Same retirement date, same service — only the reduction removed.',
      long: 'Compares the member against retiring on the SAME date with the ' +
        'SAME service but taking the current-law early-retirement reduction. ' +
        'It isolates the value of exactly what the bridge sells. Members in ' +
        'this group — who were leaving anyway — receive a substantial ' +
        'subsidy. Labelled SUB in the fiscal model.'
    },
    'work-to-eligibility baseline': {
      short: 'The member works on under current law, then retires.',
      long: 'Compares the member against working until first unreduced ' +
        'eligibility under current law. This nets off the extra benefit ' +
        'accrual, salary growth and contributions the member gives up by ' +
        'leaving early. Members in this group OVERPAY — they pay the ' +
        'purchase price for less than its actuarial value. Labelled WTE.'
    },
    'behavioural assumption': {
      short: 'φ — the share who would have worked on anyway.',
      long: 'The single most consequential assumption in the model, and no ' +
        'published data bears on it. It decides whether a purchaser is ' +
        'subsidised or overpays, so it decides the sign of the per-member ' +
        'result. Central 0.50; the model tests 0.25 and 0.75. Self-selection ' +
        'is not modeled, and it runs toward the subsidised end: the members ' +
        'who buy will disproportionately be those who intend to leave.'
    },
    'plop': {
      short: 'Partial Lump-Sum Option Payment.',
      long: 'A lump sum at retirement in exchange for a reduced allowance, ' +
        'under § 51.1-165.01. Eligibility depends on creditable service ' +
        'performed AFTER the date the member first became eligible for an ' +
        'unreduced allowance. The bill freezes that date without regard to ' +
        'bridge credit, so a member who retires at the accelerated date will ' +
        'usually have no PLOP. That is a deliberate, disclosed trade-off.'
    },
    'health insurance credit': {
      short: 'A monthly payment toward retiree health premiums.',
      long: '$4.25 per month per year of creditable service for a state ' +
        'retiree (§ 51.1-1400). The bridge does not increase the amount or ' +
        'create eligibility, but an earlier retirement starts it earlier — ' +
        'roughly $5,300 more for a state retiree with 26 years over a ' +
        'four-year acceleration. It runs on a separately funded trust and is ' +
        'OUTSIDE every contribution-rate figure in this tool.'
    },
    'cola': {
      short: 'The annual post-retirement supplement.',
      long: 'Granted under § 51.1-166 and compounding for life. Like the ' +
        'health insurance credit it follows the RETIREMENT DATE, so an ' +
        'accelerated retirement starts it earlier. The exposure is NOT ' +
        'quantified by this model or by the fiscal model it is built on, and ' +
        'that gap is disclosed rather than papered over.'
    },
    'eligibility deficit': {
      short: 'How far the member is from an unreduced threshold.',
      long: 'For Plan 1, 30 minus creditable service. For Plan 2, 90 minus ' +
        '(age + creditable service). Under § 51.1-142.4 C the member may ' +
        'purchase no more than this, capped at four years combined with any ' +
        'earlier § 51.1-142.2 purchase. The modeled mean is about 2.2 years ' +
        'across the whole near-threshold population and about 3.1 (Plan 1) / ' +
        '3.6 (Plan 2) among modeled purchasers.'
    }
  },

  /* ------------------------------------------------- output naming rules */
  /* "Never label an output simply 'Savings' unless the underlying mechanism
     justifies that description." These are the only permitted labels. */
  outputLabels: {
    pension: 'Modeled pension impact',
    payroll: 'Modeled payroll effect',
    workforce: 'Modeled workforce effect',
    combined: 'Combined scenario effect'
  },

  /* ------------------------------------------------ Official VRS Data mode */
  /* The estimated inputs are the whole uncertainty in this tool. This is the
     contract VRS member-level aggregate data would be dropped into, so the
     model does not have to be rewritten when it arrives. Supplying any field
     replaces the corresponding estimate and re-tags it a Published Fact. */
  officialDataSpec: [
    { field: 'nearThresholdByPlanFy',
      replaces: 'ASM-10, ASM-12, ASM-23 — the derived near-threshold population',
      ask: 'Active members within four years/points of an unreduced threshold ' +
           'under § 51.1-153 B 2 or B 3 and not already eligible, by benefit ' +
           'structure, by employer plan and by fiscal year FY2029–FY2038.' },
    { field: 'veteranShareByPlan',
      replaces: 'ASM-15 — assumed veteran share for teachers and political subdivisions',
      ask: 'Count of active members with recorded military service, by ' +
           'employer plan. Only the 6% classified state figure is published today.' },
    { field: 'qualifyingServiceShare',
      replaces: 'ASM-16 — assumed 80% qualifying share',
      ask: 'Share of those members whose service meets § 51.1-142.2 B — at ' +
           'least 180 consecutive days of full-time active duty, discharge not ' +
           'dishonorable.' },
    { field: 'retiredPayBarShare',
      replaces: 'ASM-17 — assumed 18% barred',
      ask: 'Share whose qualifying service is counted in military retired pay ' +
           'and so is barred, distinguishing 10 U.S.C. ch. 1223 non-regular ' +
           'reserve-component retired pay, which is protected.' },
    { field: 'priorPurchaseShare',
      replaces: 'ASM-18 — assumed 70% did not already purchase',
      ask: 'Take-up of the existing § 51.1-142.2 B 3 24-month ' +
           'approximate-normal-cost military purchase window.' },
    { field: 'qualifyingServiceDistribution',
      replaces: 'ASM-25 — assumed distribution of purchasable years',
      ask: 'Distribution of purchasable qualifying active duty service, in ' +
           'years, among members who have any.' },
    { field: 'behaviouralPhi',
      replaces: 'ASM-22 — the behavioural mix, φ',
      ask: 'Observed share of prior-service purchasers who retired at the ' +
           'earliest date the purchase allowed, versus those who worked on. ' +
           'This decides the SIGN of the per-member result.' },
    { field: 'reductionFactorTables',
      replaces: 'SRC-12 additive 50/10 construction and the ASM-09 Plan 2 proxy',
      ask: 'The Board\'s numeric early-retirement reduction factor tables for ' +
           'Plan 1 50/10 and for the Plan 2 and hybrid 60/5 rule. VRS does not ' +
           'publish the 60/5 table in machine-readable form.' },
    { field: 'ancRateB4PublicSafety',
      replaces: 'the ordinary non-hazardous rates used for every member',
      ask: 'The approximate normal cost rate applicable to eligible pre-2014 ' +
           '§ 51.1-153 B 4 public-safety members.' },
    { field: 'hicAndColaCommencementCost',
      replaces: 'the illustrative health insurance credit figure, and the ' +
                'entirely unquantified COLA exposure',
      ask: 'Cost of commencing the health insurance credit and the ' +
           'post-retirement supplement up to four years earlier, stated ' +
           'separately by trust, as enactment clause 3(vi) requires.' }
  ]
};
