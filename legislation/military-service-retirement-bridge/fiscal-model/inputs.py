"""
Military Service Retirement Bridge — sourced inputs and labelled assumptions.

Every value in this module is tagged:
  SRC-xx  = Published fact. Taken directly from an authoritative published document.
  ASM-xx  = Analytical assumption. Chosen by the modeler; not published.
  SCN-xx  = Scenario value. A hypothetical used to test policy consequences.

Nothing in this file is a VRS actuarial certification. See README.md.
"""

# ---------------------------------------------------------------------------
# SECTION 1 — PUBLISHED FACTS (SRC)
# ---------------------------------------------------------------------------

SOURCES = {
    "VAL2025": (
        "Gabriel, Roeder, Smith & Co., 'Virginia Retirement System Annual Actuarial "
        "Valuation, June 30, 2025' (State Pension Plans), transmitted December 23, 2025. "
        "https://employers.varetire.org/media/employers/pdf/financial-reporting/valuations/"
        "valuation-report-vrs.pdf"
    ),
    "APPX2025": (
        "GRS, 'Appendix to the June 30, 2025 Annual Actuarial Valuation Reports' "
        "(bound with the 2020-2024 Experience Study PDF), Appendix A. "
        "https://employers.varetire.org/media/shared/pdf/publications/vrs-experience-study.pdf"
    ),
    "EXP2024": (
        "GRS, 'Virginia Retirement System Four-Year Experience Study, July 1, 2020 - "
        "June 30, 2024'. Assumptions adopted by the VRS Board April 16, 2025. "
        "https://employers.varetire.org/media/shared/pdf/publications/vrs-experience-study.pdf"
    ),
    "ACFR2025": (
        "VRS, 'Annual Comprehensive Financial Report for the Fiscal Year Ended June 30, "
        "2025'. https://www.varetire.org/media/shared/pdf/publications/2025-annual-report.pdf"
    ),
    "PPS2025": (
        "VRS, 'Purchase of Prior Service Cost Rates', effective July 1, 2025 "
        "(Plan 1 / Plan 2 charts updated July 1, 2025; Hybrid chart updated July 1, 2026). "
        "https://www.varetire.org/am/media/shared/pdf/publications/pps-rate-charts.pdf"
    ),
    "ERMSR2026": (
        "VRS Employer Manual, 'Service Retirement' chapter, July 2026. "
        "https://employers.varetire.org/media/shared/pdf/er-manual-service-retirement.pdf"
    ),
    "DHRM2025": (
        "Virginia Department of Human Resource Management, 'State Employee Workforce, "
        "Compensation, Health Benefits', presentation to the Senate Finance and "
        "Appropriations Committee, January 21, 2025 (data as of June 30, 2024), slide 8. "
        "https://sfac.virginia.gov/pdf/General%20Gov/2025/01212025_No1_DHRM.pdf"
    ),
    "CODE": "Code of Virginia, Title 51.1, as published at law.lis.virginia.gov.",
}

# --- 1.1 Economic assumptions adopted by the VRS Board -----------------------
# SRC-01  Experience Study, Economic Assumptions, p. C-1.
SRC_01_INVESTMENT_RETURN = 0.0675      # discount rate
SRC_02_PRICE_INFLATION = 0.0250
SRC_03_WAGE_INFLATION = 0.0350
SRC_04_PAYROLL_GROWTH = 0.0300         # 2.50% for VaLORS only

# SRC-05  Experience Study, Miscellaneous Assumptions, p. B-29; ACFR2025 Fig. 4.2.
#         "Cost-of-Living Increases: ... compounded annually at 2.50% per year for
#         Plan 1 members receiving benefits or vested as of January 1, 2013 and
#         2.25% per year for all other members."
SRC_05_COLA = {"P1": 0.0250, "P2": 0.0225, "HY": 0.0225}

# SRC-06  Experience Study, Miscellaneous Assumptions: interest on member
#         contributions 4% per annum.
SRC_06_MEMBER_CONTRIB_INTEREST = 0.04

# SRC-07  Experience Study, Miscellaneous Assumptions: "Deferred Benefit
#         Commencement: the valuation assumes benefits will commence at Normal
#         Retirement."
SRC_07_DEFERRED_COMMENCES_AT_NRA = True

# --- 1.2 Approximate normal cost rates (the statutory purchase price) --------
# SRC-08  PPS2025 rate charts. Applied to creditable compensation or average final
#         compensation at the time of purchase, whichever is higher.
SRC_08_APPROX_NORMAL_COST = {
    "P1_NONHAZ": 0.1250,
    "P2_NONHAZ": 0.1074,
    "HY_NONJUD": 0.0668,
    "P1_HAZ": 0.2378,
    "P2_HAZ": 0.1915,
    "ALT_HAZ": 0.1001,
    "P1_JUD": 0.3197,
    "P2_JUD": 0.2967,
}

# --- 1.3 Benefit multipliers (statute) --------------------------------------
# SRC-09  Va. Code § 51.1-155 A 1.
SRC_09_MULT_17 = 0.0170   # service generally
SRC_09_MULT_165 = 0.0165  # service performed/purchased on or after 1/1/2013 by a
                          # person who became a member on or after 7/1/2010 or who
                          # lacked 60 months of creditable service as of 1/1/2013
# SRC-10  ACFR2025, Plan comparison: Hybrid defined benefit multiplier 1.00%.
SRC_10_MULT_HYBRID = 0.0100

# --- 1.4 AFC averaging period (statute) -------------------------------------
# SRC-11  Va. Code § 51.1-124.3 definition of "average final compensation";
#         ACFR2025 plan comparison. Plan 1 = 36 highest consecutive months;
#         Plan 2 and Hybrid = 60 highest consecutive months.
SRC_11_AFC_MONTHS = {"P1": 36, "P2": 60, "HY": 60}

# --- 1.5 Early-retirement reduction (published administrative rule) ---------
# SRC-12  ERMSR2026 p. 4, "Reduction by Type".
#   55/5 (Plan 1): 0.5% for the first 60 months, 4/10 of 1% for any additional
#         months the member needs to meet age or service requirements.
#   50/10 (Plan 1): the 55/5 reduction PLUS an additional 6/10 of 1% for each
#         month the member is younger than 55.
#   60/5 (Plan 2 and Hybrid): factor table based on plan, age and service,
#         measured to the closer of Social Security NRA or the first date
#         30 years of service and age+service=90 would both be met.
#         >>> The numeric 60/5 factor table is not published in machine-readable
#         >>> form. See ASM-09.
SRC_12_RED_FIRST60 = 0.005
SRC_12_RED_ADDL = 0.004
SRC_12_RED_UNDER55 = 0.006

# --- 1.6 Unreduced / reduced retirement eligibility (statute) ---------------
# SRC-13  Va. Code § 51.1-153 A, B 1, B 2, B 3, D; ERMSR2026 pp. 3-4.
#   Plan 1 unreduced: age 65 + 5 yrs, or age 50 + 30 yrs (§ 51.1-153 B 2)
#   Plan 1 reduced:   age 55 + 5 yrs, or age 50 + 10 yrs
#   Plan 2 / Hybrid unreduced: Social Security NRA + 5 yrs, or age+service = 90
#                              (§ 51.1-153 B 3)
#   Plan 2 / Hybrid reduced:   age 60 + 5 yrs
SRC_13_P1_NRA = 65
# SRC-14  ERMSR2026 p. 3, Social Security normal retirement age table.
SRC_14_SSA_NRA = {1954: 66.0, 1955: 66 + 2 / 12, 1956: 66 + 4 / 12,
                  1957: 66 + 6 / 12, 1958: 66 + 8 / 12, 1959: 66 + 10 / 12}
SRC_14_SSA_NRA_1960_PLUS = 67.0

# --- 1.7 Plan membership, payroll and employer rates ------------------------
# SRC-15  VAL2025 Results Summary pp. 12, 13, 17 (June 30, 2025 measurement;
#         employer rates certified for FY2027 and FY2028).
SRC_15_PLANS = {
    "ST": {  # VRS State Employees
        "label": "VRS State Employees",
        "active": 81_274,
        "payroll": 6_275_603_000,
        "aal": 31_157_951_000,
        "uaal": 5_356_033_000,
        "er_normal_cost": 0.0434,
        "admin": 0.0024,
        "amort_uaal": 0.0649,
        "er_db_rate": 0.1107,
        "total_normal_cost": 0.0873,
        "member_contrib": 0.0439,
        "amort_years": 20,
        "payroll_growth": 0.0300,
        "avg_comp": 77_215,
        "avg_age": 46.9,
        "avg_service": 10.1,
    },
    "TC": {  # VRS Teachers
        "label": "VRS Teachers",
        "active": 160_949,
        "payroll": 11_732_114_000,
        "aal": 65_018_537_000,
        "uaal": 11_179_129_000,
        "er_normal_cost": 0.0474,
        "admin": 0.0026,
        "amort_uaal": 0.0720,
        "er_db_rate": 0.1220,
        "total_normal_cost": 0.0922,
        "member_contrib": 0.0448,
        "amort_years": 20,
        "payroll_growth": 0.0300,
        "avg_comp": 69_283,
        "avg_age": 45.3,
        "avg_service": 11.4,
    },
    "PS": {  # Participating Political Subdivisions (aggregate)
        "label": "Participating Political Subdivisions (aggregate)",
        "active": 124_066,
        "payroll": 8_041_026_000,
        "aal": 34_010_201_000,
        "uaal": 2_802_585_000,
        "er_normal_cost": 0.0765,
        "admin": 0.0022,
        "amort_uaal": 0.0268,
        "er_db_rate": 0.1059,
        "total_normal_cost": None,   # not published in aggregate
        "member_contrib": 0.0500,    # statutory 5%; see ASM-14
        "amort_years": 20,
        "payroll_growth": 0.0300,
        "avg_comp": 64_812,
        "avg_age": 45.4,
        "avg_service": 8.3,
    },
}

# SRC-16  ACFR2025, active members by benefit structure at June 30, 2025.
#         Reconciliation target for the derived plan split (see MODEL note R-1).
SRC_16_ACTIVE_BY_PLAN = {"P1": 110_474, "P2": 67_333, "HY": 200_253}
SRC_16_ACTIVE_TOTAL = 378_060

# SRC-17  ACFR2025 Fig. 2.3, active members by system at June 30, 2025.
SRC_17_ACTIVE_BY_SYSTEM = {
    "ST": 83_148, "TC": 160_800, "PS": 124_264,
    "SPORS": 1_894, "VaLORS": 7_484, "JRS": 470,
}

# SRC-18  VAL2025 pp. 50-51, 54: active participants tabulated by attained age
#         and completed years of total service, June 30, 2025.
#         Rows are attained-age bands; columns are service bands
#         0-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30+.
SRC_18_SERVICE_BANDS = [(0, 5), (5, 10), (10, 15), (15, 20), (20, 25), (25, 30), (30, 45)]

SRC_18_GRID_STATE = {
    (0, 20):   [107, 0, 0, 0, 0, 0, 0],
    (20, 25):  [2505, 11, 0, 0, 0, 0, 0],
    (25, 30):  [5985, 627, 4, 0, 0, 0, 0],
    (30, 35):  [5547, 2244, 299, 0, 0, 0, 0],
    (35, 40):  [4772, 2651, 1520, 289, 5, 0, 0],
    (40, 45):  [3916, 2414, 1789, 1186, 368, 10, 0],
    (45, 50):  [3371, 2110, 1596, 1362, 968, 342, 10],
    (50, 55):  [3017, 1975, 1560, 1333, 1165, 892, 238],
    (55, 60):  [2590, 1816, 1450, 1374, 1230, 1061, 1008],
    (60, 61):  [468, 302, 313, 231, 226, 231, 329],
    (61, 62):  [416, 339, 266, 286, 248, 214, 327],
    (62, 63):  [326, 285, 270, 241, 224, 225, 349],
    (63, 64):  [300, 269, 202, 224, 211, 211, 315],
    (64, 65):  [224, 248, 206, 210, 206, 161, 325],
    (65, 66):  [154, 165, 144, 166, 157, 108, 229],
    (66, 67):  [140, 141, 126, 117, 105, 77, 228],
    (67, 68):  [100, 102, 101, 87, 82, 61, 127],
    (68, 69):  [64, 88, 75, 87, 53, 66, 132],
    (69, 70):  [54, 66, 60, 57, 51, 32, 89],
    (70, 76):  [191, 149, 172, 183, 167, 132, 444],
}

SRC_18_GRID_TEACHER = {
    (0, 20):   [110, 0, 0, 0, 0, 0, 0],
    (20, 25):  [5307, 10, 0, 0, 0, 0, 0],
    (25, 30):  [11385, 3077, 4, 0, 0, 0, 0],
    (30, 35):  [6963, 7393, 2160, 1, 0, 0, 0],
    (35, 40):  [6669, 4766, 6250, 1640, 1, 0, 0],
    (40, 45):  [6413, 3955, 3614, 5706, 2299, 11, 0],
    (45, 50):  [5363, 3878, 2873, 3358, 5474, 1624, 5],
    (50, 55):  [4376, 3600, 2924, 2857, 3677, 4507, 960],
    (55, 60):  [3390, 2794, 2607, 2820, 3107, 2693, 2117],
    (60, 61):  [467, 424, 430, 503, 548, 381, 334],
    (61, 62):  [491, 407, 366, 457, 491, 349, 312],
    (62, 63):  [447, 360, 352, 409, 442, 331, 258],
    (63, 64):  [345, 288, 225, 374, 403, 307, 257],
    (64, 65):  [298, 245, 228, 294, 345, 255, 242],
    (65, 66):  [235, 159, 184, 204, 232, 172, 171],
    (66, 67):  [181, 154, 137, 151, 154, 115, 139],
    (67, 68):  [119, 105, 79, 118, 120, 88, 120],
    (68, 69):  [124, 77, 76, 68, 87, 62, 80],
    (69, 70):  [85, 58, 48, 41, 53, 37, 75],
    (70, 76):  [324, 191, 138, 171, 193, 150, 271],
}

# SRC-19  VAL2025 pp. 50-51 payroll column, used to derive age-banded average pay.
SRC_19_PAYROLL_BY_AGE_STATE = {
    (0, 20): 4_357_105, (20, 25): 122_954_249, (25, 30): 384_424_727,
    (30, 35): 537_371_988, (35, 40): 683_642_180, (40, 45): 775_140_818,
    (45, 50): 813_314_096, (50, 55): 862_780_498, (55, 60): 874_767_645,
    (60, 61): 170_788_873, (61, 62): 173_035_222, (62, 63): 156_481_463,
    (63, 64): 143_187_368, (64, 65): 130_192_505, (65, 66): 94_393_368,
    (66, 67): 80_275_667, (67, 68): 57_045_695, (68, 69): 48_317_294,
    (69, 70): 34_661_885, (70, 76): 128_470_467,
}
SRC_19_PAYROLL_BY_AGE_TEACHER = {
    (0, 20): 2_708_562, (20, 25): 241_091_671, (25, 30): 786_202_935,
    (30, 35): 993_432_529, (35, 40): 1_263_233_295, (40, 45): 1_571_397_807,
    (45, 50): 1_715_940_040, (50, 55): 1_798_505_234, (55, 60): 1_501_626_832,
    (60, 61): 227_398_733, (61, 62): 207_357_385, (62, 63): 181_845_089,
    (63, 64): 155_686_577, (64, 65): 133_682_697, (65, 66): 93_489_488,
    (66, 67): 71_113_534, (67, 68): 51_609_713, (68, 69): 37_705_663,
    (69, 70): 26_462_342, (70, 76): 90_487_091,
}

# --- 1.8 Mortality -----------------------------------------------------------
# SRC-20  APPX2025 pp. 49-50 (valuation appendix pages -49- and -50-).
#         "Healthy Post-Retirement Base Mortality Rates". Pub-2010 Amount-Weighted
#         tables with the per-plan percentage and set-forward/set-back adjustments
#         ALREADY APPLIED (verified: State male q50 = 0.002980 = raw Pub-2010
#         General Healthy Retiree male q50 at 100%; State female 0.002442 =
#         raw female q50 x 110%; Teachers male 0.001220 = Teachers male q51
#         (1-year set forward); Political Subdivisions non-hazardous male
#         0.003287 = 95% x General male q52 (2-year set forward)).
#         Mortality improvement is projected generationally with 75% of the
#         MP-2021 scale; that projection is NOT reproduced here (see ASM-05).
SRC_20_Q_HEALTHY_POSTRET = {
    #  age: (male, female)
    "ST": {50: (0.002980, 0.002442), 55: (0.004310, 0.003146), 60: (0.006150, 0.004224),
           65: (0.009130, 0.006743), 70: (0.015260, 0.011693), 75: (0.026710, 0.020713),
           80: (0.047740, 0.036960), 85: (0.085910, 0.068255), 90: (0.146720, 0.126357)},
    "TC": {50: (0.001220, 0.000767), 55: (0.002450, 0.002027), 60: (0.003930, 0.003014),
           65: (0.006620, 0.004683), 70: (0.012140, 0.008085), 75: (0.023120, 0.015341),
           80: (0.043630, 0.029589), 85: (0.081980, 0.056553), 90: (0.148590, 0.105935)},
    "PS": {50: (0.003287, 0.002214), 55: (0.004722, 0.002860), 60: (0.006774, 0.003952),
           65: (0.010526, 0.006479), 70: (0.018088, 0.011315), 75: (0.031930, 0.020055),
           80: (0.057494, 0.035977), 85: (0.101964, 0.066890), 90: (0.168578, 0.121914)},
}

# SRC-21  APPX2025 pp. 49-50, Pre-Retirement Base Mortality Rates (used to value
#         survivorship from the purchase date to a deferred commencement date).
SRC_21_Q_PRERET = {
    "ST": {40: (0.000660, 0.000430), 45: (0.000980, 0.000660), 50: (0.001490, 0.000970),
           55: (0.002190, 0.001440), 60: (0.003190, 0.002220), 65: (0.004680, 0.003620),
           70: (0.007030, 0.005980)},
    "TC": {40: (0.000462, 0.000310), 45: (0.000737, 0.000480), 50: (0.001221, 0.000730),
           55: (0.001892, 0.001070), 60: (0.002904, 0.001610), 65: (0.004785, 0.002700),
           70: (0.007799, 0.004850)},
    "PS": {40: (0.000770, 0.000494), 45: (0.001160, 0.000746), 50: (0.001750, 0.001103),
           55: (0.002550, 0.001638), 60: (0.003710, 0.002562), 65: (0.005480, 0.004200),
           70: (0.008370, 0.006941)},
}

# SRC-22  Experience Study, Miscellaneous Assumptions: "Marriage Assumption:
#         100% of active employees are married, males two years older than females."
#         Used only to weight the unisex blend; the Basic Benefit itself is a
#         single-life annuity.

# --- 1.9 Published retirement rates (behavioural anchor) --------------------
# SRC-23  ACFR2025 Fig. 4.3, "Retirement Rates - Pension Plans", State Employees.
#         Plan 1 at age 50 with 30 years: 12.50% male / 7.50% female.
#         Plan 1 at age 50 with 11-29 years: 3.25% male / 4.00% female.
#         Plan 2 and Hybrid: "Rate is 11.50% when age plus service equals 90."
SRC_23_P1_RET_RATE_AGE50_30YRS = {"M": 0.1250, "F": 0.0750}
SRC_23_P1_RET_RATE_AGE50_UNDER30 = {"M": 0.0325, "F": 0.0400}
SRC_23_P2_RET_RATE_AT_RULE90 = 0.1150

# --- 1.10 Veteran share of the covered workforce ----------------------------
# SRC-24  DHRM2025 slide 8, "Classified State Workforce Demographics" (data as of
#         June 30, 2024): Veterans 6%, Non-Veterans 94%. Average age 46.7 years,
#         average service 10.3 years, average age of new hires 37.7 years.
#         Note the close agreement with VAL2025 state-employee averages
#         (age 46.9, service 10.1), which supports using this as the state anchor.
SRC_24_VETERAN_SHARE_STATE_CLASSIFIED = 0.06
SRC_24_DHRM_CLASSIFIED_FTE = 101_949.12


# ---------------------------------------------------------------------------
# SECTION 2 — ANALYTICAL ASSUMPTIONS (ASM)
# ---------------------------------------------------------------------------

ASSUMPTIONS = {
"ASM-01": """Mortality interpolation. SRC-20/SRC-21 publish rates at quinquennial
    ages only. Rates at intervening ages are interpolated log-linearly in q_x.
    Direction of error: negligible (<0.1% on annuity factors).""",

"ASM-02": """Mortality extrapolation above age 90. The log-linear slope of q_x
    between ages 85 and 90 is continued, with q_x capped at 0.60 and a terminal
    age of 115. Pub-2010 actually decelerates at the oldest ages, so this
    slightly UNDERSTATES annuity values and therefore UNDERSTATES the measured
    subsidy. Effect on an annuity commencing at age 50-66: under 0.5%.""",

"ASM-03": """Unisex blend. SRC-20 publishes sex-distinct rates. Representative
    profiles are valued on a 50/50 male/female blend of annuity factors unless a
    sex is specified. Sex-distinct results are reported alongside.""",

"ASM-04": """Annuity form. The service retirement allowance is valued as a
    single-life annuity payable monthly, approximated as an annuity-due with a
    half-year timing adjustment. VRS's valuation assumes a modified cash refund
    annuity (return of any unrecovered member contributions). The modified cash
    refund floor is worth slightly more under the ACCELERATED case (a younger
    retiree with a smaller allowance recovers contributions more slowly), so
    ignoring it slightly UNDERSTATES the measured subsidy.""",

"ASM-05": """Generational mortality improvement. VRS projects generationally with
    75% of the MP-2021 scale (SRC-20). The MP-2021 rates are not reproduced in the
    published appendix. The central case applies a flat 0.75% per annum
    improvement to q_x from a 2010 base year to the year in which each age is
    attained, as a proxy. Sensitivity: 0.00% (no improvement) and 1.25%.
    Omitting improvement entirely understates annuity values by roughly 4-6%.""",

"ASM-06": """COLA timing. The statutory COLA is granted on July 1 of the second
    calendar year after retirement (ACFR2025, Note 2). The model applies the
    first COLA at the start of annuity year 3 and compounds annually thereafter,
    at SRC-05 rates. Va. Code § 51.1-166 D 4 delays commencement for a retiree
    with fewer than 20 years of creditable service until one full calendar year
    after the date the member would otherwise have been eligible for an unreduced
    allowance, and the bill freezes that date without regard to bridge credit; the
    model applies that delay where a profile has fewer than 20 years.""",

"ASM-07": """Salary growth for AFC projection. 3.50% per annum, equal to VRS's
    published wage inflation assumption (SRC-03). This is the across-the-board
    component only; VRS adds a service-based merit and longevity component which
    is not reproduced in the published appendix in machine-readable form. For
    members with 20+ years of service the merit component is small. Direction of
    error: understates AFC growth, which understates the forgone accrual in the
    work-to-eligibility baseline and therefore OVERSTATES the measured subsidy on
    that baseline. Sensitivity: 2.50% and 4.50%.""",

"ASM-08": """AFC construction. AFC at a given age equals the average of the
    SRC-11 number of months of highest consecutive creditable compensation ending
    at that age, computed from the stated current salary growing at ASM-07.""",

"ASM-09": """Plan 2 / Hybrid 60-5 early-retirement reduction factor. VRS's numeric
    60/5 factor table is not published in machine-readable form (SRC-12). Where
    the model needs a Plan 2 reduced-benefit comparator at age 60 or above, it
    applies the published Plan 1 55/5 construction (0.5% per month for the first
    60 months to unreduced eligibility, 0.4% per month thereafter), measured to
    the earlier of Social Security NRA and the Rule-of-90 date. Labelled a proxy
    wherever used. Below age 60 a Plan 2 or Hybrid member cannot retire at all
    under current law, so no factor is needed and no proxy is used -- which is
    where the frozen-service baseline for Plan 2 is actually computed.""",

"ASM-10": """Plan assignment from published service bands. The published age x
    service grid (SRC-18) does not identify benefit structure. Benefit structure
    is inferred from completed total service at June 30, 2025 as a proxy for
    membership date: Hybrid if service < 11.5 years (membership date on or after
    January 1, 2014); Plan 2 if 11.5 <= service < 17.5 years (membership date
    July 1, 2010 - December 31, 2013, plus the January 2008 - June 2010 cohort
    that lacked 60 months of creditable service at January 1, 2013); Plan 1 if
    service >= 17.5 years. Members are assumed uniformly distributed within each
    published band. This proxy FAILS for members with purchased prior service,
    prior non-contiguous VRS service, part-time service, or a hybrid opt-in; those
    members carry total service that does not match tenure. The derived split is
    therefore calibrated to SRC-16 (see ASM-11). This is the largest single source
    of uncertainty in the population estimate.""",

"ASM-11": """Plan split calibration. The derived system-wide Plan 1 / Plan 2 /
    Hybrid split from ASM-10 is scaled by a single multiplicative factor per
    benefit structure so that the system total reconciles to SRC-16, with the
    residual absorbed by Hybrid. Reported in the reconciliation note.""",

"ASM-12": """Political subdivision age x service distribution. VRS does not publish
    an age x service grid for the aggregate political subdivision plan
    (VAL2025 tabulates state, teacher, SPORS, VaLORS and judicial only). The
    political subdivision grid is constructed from the state-employee grid shape
    scaled to the published political subdivision active count (SRC-15), then
    adjusted by the ratio of published average service (8.3 years for political
    subdivisions, 10.1 for state) so that the mean of the constructed
    distribution matches the published political subdivision mean. Direction of
    error: unquantified. This number should be replaced with VRS data.""",

"ASM-13": """Decrements in the population projection. The published grid is rolled
    forward deterministically (age + 1, service + 1 per year). Members who reach
    an unreduced threshold are removed at the published retirement rates
    (SRC-23). All other exits (termination, death, disability) are applied at a
    flat 3.00% per annum for the 25-to-30-year-service population.
    Sensitivity: 2.00% and 5.00%. No new entrants are added to Plan 1 or
    Plan 2 because both benefit structures are closed to new members
    (Plan 1 closed July 1, 2010; Plan 2 closed January 1, 2014).""",

"ASM-14": """Political subdivision member contribution rate taken as the statutory
    5% of creditable compensation. VAL2025 does not publish an aggregate political
    subdivision total normal cost rate, so the political subdivision normal-cost
    offset is approximated from the published employer normal cost rate plus 5%.""",

"ASM-15": """Veteran share of covered membership. SRC-24 gives 6% for the Virginia
    classified state workforce as of June 30, 2024 (self-identified). No
    published figure exists for VRS teachers or political subdivision employees.
    The model uses 6.0% for state employees (published anchor), 2.5% for teachers,
    and 7.0% for political subdivision non-hazardous employees, with a low/high
    band of 0.6x / 1.6x on each. Self-identification undercounts, which pushes the
    central estimate down.""",

"ASM-16": """Share of veterans with qualifying active duty service. Va. Code
    § 51.1-142.2 B requires at least 180 consecutive days of full-time active duty
    and a discharge that was not dishonorable. Assumed 80% of self-identified
    veterans satisfy both (low 70%, high 90%).""",

"ASM-17": """Share excluded by the military retired pay bar. Va. Code
    § 51.1-142.2 B bars purchase of service counted in any retirement allowance
    received or to be received, except as required by 10 U.S.C. ch. 1223
    (reserve-component non-regular retired pay). The bill inherits that bar
    (§ 51.1-142.4 B 4, H 5). Assumed 18% of qualifying veterans are excluded
    because their service is counted in regular military retired pay
    (low 12%, high 25%). Federal data: approximately 2.4 million of roughly
    18 million U.S. veterans receive military retired pay, but the share is
    higher among veterans in career government employment.""",

"ASM-18": """Share that did not already purchase in the 24-month window. Members who
    purchased prior active duty service at approximate normal cost within the
    § 51.1-142.2 B 3 window already hold it as creditable service and gain nothing
    from the bridge. VRS does not publish purchase-of-prior-service take-up.
    Assumed 70% did not purchase (low 55%, high 85%).""",

"ASM-19": """Behavioural take-up of the bridge among eligible members.
    Low 10%, Moderate 20%, High 30% (default scenarios where no better data
    exists). Cross-checked against SRC-23: VRS assumes 12.5% / 7.5% of Plan 1
    state employees retire at age 50 once they hold 30 years, and 11.5% of
    Plan 2 members retire in the year age plus service reaches 90, so a 20%
    take-up of a purchase that costs several months of salary is not implausible
    but is not evidence-based.""",

"ASM-20": """Amortization of the liability increase into an employer contribution
    rate. The increase in unfunded accrued liability is amortized as a level
    percent of payroll over the published amortization period (SRC-15; 20 years
    for state, teacher and the political subdivision aggregate) at SRC-01 interest
    and SRC-04 payroll growth. This mirrors VRS's own layered amortization method
    but is not VRS's calculation.""",

"ASM-21": """Replacement-employee cost. Where a workforce effect is shown, the
    departing member's position is assumed refilled at 100%, 90% and 80% of the
    departing member's creditable compensation, with employer retirement
    contributions at the published employer DB rate for the plan. No dollar value
    is assigned to recruiting, onboarding, vacancy duration, productivity ramp or
    loss of institutional knowledge.""",
}


# ---------------------------------------------------------------------------
# SECTION 3 — SCENARIO VALUES (SCN) AND NAMING CONVENTION
# ---------------------------------------------------------------------------

NAMING_CONVENTION = """
Scenario identifiers used in every table in this model:

    {PLAN}-{PATH}-{PROFILE}-{EMPLOYER}-{BASELINE}[-{TAKEUP}][-{RULE}]

  PLAN      P1   VRS Plan 1 (non-hazardous)
            P2   VRS Plan 2 (non-hazardous)
            HY   Hybrid Retirement Plan, non-judicial (variant only)
  PATH      B2   unreduced via § 51.1-153 B 2  (age 50 + 30 years of service)
            B3   unreduced via § 51.1-153 B 3  (Rule of 90)
  PROFILE   A-G  representative member profile (see PROFILES)
  EMPLOYER  ST   VRS State Employees plan
            TC   VRS Teacher plan
            PS   participating political subdivision plans (aggregate)
  BASELINE  SUB  frozen-service baseline. Service, AFC and retirement date held
                 constant; measures ONLY the value of removing the early-
                 retirement reduction / creating eligibility. This is the
                 price-versus-value test of the thing the bridge actually sells.
            WTE  work-to-eligibility baseline. Member works under current law
                 until first unreduced eligibility, then retires. Captures
                 forgone benefit accrual, forgone AFC growth and forgone
                 contributions. Closest to a valuation liability change.
  TAKEUP    L    low take-up (10% of eligible members)
            M    moderate take-up (20%)
            H    high take-up (30%)
  RULE      D4a  purchase permitted up to the LESSER of the eligibility deficit,
                 the remaining four-year military allowance, and available
                 qualifying service  (the rule as drafted)
            D4b  purchase permitted ONLY where the deficit is fully coverable,
                 so the purchase itself completes eligibility  (stricter rule)

Example: P1-B2-A-ST-SUB            per-member subsidy, profile A, frozen-service
         P2-B3-D-ST-WTE-M-D4a      moderate take-up, drafted purchase rule
"""

# SCN — representative member profiles.
# Salaries are set at or modestly above the published plan average compensation
# (SRC-15), reflecting that members with 20+ years of service earn above the
# plan mean. They are scenario values, not published facts.
PROFILES = {
    "A": dict(id="A", plan="P1", path="B2", employer="ST", sex="B",
              age=50.0, service=26.0, salary=85_000,
              svc_pre2013=26.0,
              note="Plan 1 state employee, four years short of 30, at the minimum "
                   "B 2 age. Maximum four-year acceleration. The memo's example."),
    "B": dict(id="B", plan="P1", path="B2", employer="TC", sex="B",
              age=54.0, service=28.0, salary=80_000,
              svc_pre2013=28.0,
              note="Plan 1 teacher, two years short of 30, past the B 2 age minimum."),
    "C": dict(id="C", plan="P1", path="B2", employer="PS", sex="B",
              age=56.0, service=27.0, salary=72_000,
              svc_pre2013=27.0,
              note="Plan 1 political subdivision employee, three years short of 30."),
    "D": dict(id="D", plan="P2", path="B3", employer="ST", sex="B",
              age=61.0, service=25.0, salary=90_000,
              svc_pre2013=2.5, birth_year=1968,
              note="Plan 2 state employee at 86 points. Four bridge points buy two "
                   "years of acceleration (two points accrue per year worked)."),
    "E": dict(id="E", plan="P2", path="B3", employer="TC", sex="B",
              age=60.0, service=27.0, salary=78_000,
              svc_pre2013=4.5, birth_year=1969,
              note="Plan 2 teacher at 87 points. Three bridge points buy 1.5 years."),
    "F": dict(id="F", plan="P2", path="B3", employer="PS", sex="B",
              age=64.0, service=22.0, salary=76_000,
              svc_pre2013=2.0, birth_year=1965,
              note="Plan 2 political subdivision employee at 86 points, close to "
                   "Social Security NRA, where § 51.1-153 A caps the acceleration."),
    "G": dict(id="G", plan="HY", path="B3", employer="ST", sex="B",
              age=66.0, service=20.0, salary=85_000,
              svc_pre2013=0.0, birth_year=1963,
              note="Hybrid-inclusion variant (DECISION 2). The earliest profile that "
                   "can satisfy § 51.1-142.4 B 5 and C at all: a late-career hire "
                   "at 86 points whose acceleration is capped at one year by "
                   "Social Security NRA."),
}

SCN_TAKEUP = {"L": 0.10, "M": 0.20, "H": 0.30}
SCN_REPLACEMENT_RATIOS = [1.00, 0.90, 0.80]
SCN_PROJECTION_FY = list(range(2029, 2039))   # bill effective July 1, 2028
