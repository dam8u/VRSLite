/* =====================================================================
   Military Service Retirement Bridge — Legislative Scenario Explorer
   GUIDED WALK-THROUGH CONTENT

   One source of content for two surfaces:

     walkthrough.html  the standalone document, for the link sent to
                       stakeholders alongside the dashboard and the
                       methodology page;
     index.html        the same ten steps in a panel beside the dashboard,
                       where each step's settings can be applied with one
                       click — so a stakeholder never needs two windows open.

   Keeping the content here rather than in either page is the same discipline
   as js/registry.js: the walk-through a reader is sent and the walk-through
   inside the tool cannot drift apart, because there is only one of them.

   Each step carries `params`, the engine parameters that produce the screen
   the step describes. The dashboard applies them literally; the standalone
   page prints them as the settings to choose by hand. A step's prose and its
   settings therefore cannot disagree either.

   `preset` is DECLARATIVE, not a runtime input. wtApply() deliberately reads
   only `params`, so a step applies the same absolute settings whether or not
   it names a preset. The field exists to be CHECKED: test/standalone.js
   group 19 asserts that a step naming a preset carries exactly that preset's
   parameters, so a step whose prose says "click Central" while its params say
   something else fails the harness. Changing `preset` alone therefore does
   not silently change behaviour — it fails a test.

   NOTHING HERE COMPUTES A FIGURE. Every number quoted in the prose is
   reproduced by the step's own settings and is asserted against the engine by
   test/standalone.js group 19, so a changed model fails the harness instead of
   silently contradicting the narration.

   Illustrative policy-analysis model. Not an actuarial certification, not the
   VRS Board impact statement required under Va. Code § 30-19.1:7, and not a
   General Assembly fiscal impact statement.

   Prepared by Policy Development Team using legal, policy, and financial
   analysis tools, pending review by veterans' legal counsel.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.VRS_WALKTHROUGH = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* The central-case participant split, used to express "400 participants"
     without silently flattening the Plan 1 / Plan 2 mix. 74% of modeled
     purchasers are Plan 1. Asserted in test/standalone.js group 19. */
  var Q_P1 = 296, Q_P2 = 104;

  /* The package rule is that EVERY public use of a basis-point figure states
     what it excludes. A qualifier that lives in prose two paragraphs away does
     not travel with a screenshotted table, so it is defined once here and
     attached to every table that quotes basis points.

     test/standalone.js group 20 enforces the rule structurally: any section of
     this document containing a basis-point figure must also contain the
     exclusion of the separately funded HIC and COLA effects. That is the check
     group 19 cannot make — group 19 proves a quoted figure is real, not that it
     is quoted with its qualifier. MOO-271 finding S-07. */
  var BP_FOOTNOTE =
    '<p class="fn"><strong>Basis points</strong> are the modeled ' +
    'retirement-plan employer contribution impact only; the separately funded ' +
    'health insurance credit and COLA effects, including unquantified COLA ' +
    'exposure, are excluded (step 7). The fiscal model is complete for bill ' +
    'version 1.1 and requires a refresh against the bill as introduced.</p>';

  return {
    BP_FOOTNOTE: BP_FOOTNOTE,

    meta: {
      title: 'Guided walk-through',
      subtitle: 'What to choose in the Scenario Explorer, in order — and what ' +
        'each screen means',
      audience: 'Written for Virginia legislators and money-committee staff, ' +
        'JLCVSO members, VRS reviewers and policy staff. No actuarial or ' +
        'statutory background is assumed.',
      minutes: 20
    },

    /* ----------------------------------------------------------- opening */
    intro: [
      'This walk-through takes about twenty minutes and ends with you able to ' +
        'answer a question of your own and to say honestly how much the answer ' +
        'is worth. It does not argue for the bill or against it. Several steps ' +
        'point at the weakest parts of the analysis on purpose, because a ' +
        'reader who finds those unaided will discount everything else.',

      'The <strong>proposal</strong> in one sentence: a long-serving Virginia ' +
        'public employee who is a veteran could buy up to four years of ' +
        'qualifying prior active duty service, at approximate normal cost, ' +
        '<strong>solely to reach eligibility for an unreduced retirement ' +
        'allowance sooner</strong> — and for nothing else. The purchased credit ' +
        'would not raise the pension formula, would not count as creditable ' +
        'service, and would not increase the allowance by a dollar.',

      'The <strong>gap it fills</strong>: under current law that same veteran ' +
        'can buy military service <strong>at approximate normal cost</strong> ' +
        'only in her <em>first 24 months</em> of VRS-covered employment ' +
        '(Va. Code § 51.1-142.2 B, concluding paragraph) — a window that closes ' +
        'decades before retirement is on her mind, and long before she can ' +
        'afford it. <strong>Her right to purchase does not expire; what expires ' +
        'is the price.</strong> After the window closes the service remains ' +
        'purchasable, but only at full <em>actuarial equivalent cost</em>, which ' +
        'is far more expensive. So the low-cost window falls early in a career, ' +
        'when disposable income is typically lower and retirement eligibility is ' +
        'remote. The bridge would reopen a narrow, eligibility-only purchase at ' +
        'approximate normal cost after that window has closed.',

      'What the <strong>tool</strong> adds is the price of that, under ' +
        'assumptions you set yourself. It is an <strong>illustrative ' +
        'policy-analysis model</strong>. It is <strong>not</strong> an actuarial ' +
        'certification, not the VRS Board impact statement required under ' +
        'Va. Code § 30-19.1:7 — which is mandatory for this bill and has not ' +
        'been requested — and not a General Assembly fiscal impact statement. ' +
        'Where this model and an official VRS statement disagree, the official ' +
        'statement governs and this model is wrong.'
    ],

    orientation: {
      title: 'Three things to know before you read a single number',
      items: [
        ['Every count is a ten-year total, not an annual rate.',
         'The model runs the FY2029–FY2038 cohort. “222 participants” means 222 ' +
         'members across ten years — roughly 22 a year. Reading any count here ' +
         'as an annual figure overstates the bill by a factor of ten. ' +
         '<strong>Disclosed, because an actuary will find it:</strong> ' +
         'DECISION 14 moved the act’s effective date to July 1, 2029, so the ' +
         'correct window is <strong>FY2030–FY2039</strong>. FY2029 ends three ' +
         'weeks before the act would take effect. The shift is part of the ' +
         'fiscal refresh step 10 requires and is <strong>not yet in these ' +
         'figures</strong>.'],
        ['Three kinds of number, and the tool labels every one.',
         'A <em>Published Fact</em> comes from a VRS valuation, a Board action, ' +
         'DHRM testimony or the Code of Virginia. A <em>Derived Estimate</em> is ' +
         'computed from published data by a stated method. A <em>Scenario ' +
         'Assumption</em> was chosen because no data exists. Most of the ' +
         'population inputs are the third kind. The credibility of an output is ' +
         'the credibility of its weakest input, not its average input.'],
        ['Nothing is called “savings”.',
         'The only output labels are <em>Modeled pension impact</em>, ' +
         '<em>Modeled payroll effect</em>, <em>Modeled workforce effect</em> and ' +
         '<em>Combined scenario effect</em>. That is not delicacy. A pension ' +
         'liability and a payroll decision are different kinds of claim with ' +
         'different evidence behind them, and step 6 is the thirty seconds that ' +
         'proves the tool keeps them apart.']
      ],
      shortPath:
        '<strong>If you have ten minutes rather than twenty,</strong> read this ' +
        'orientation, then <strong>step 1</strong> (the fiscal case), ' +
        '<strong>step 3</strong> (the assumption that decides the sign of the ' +
        'answer), <strong>step 7</strong> (the unquantified COLA exposure) and ' +
        'the <strong>five pre-patron conditions in step 10</strong>. Those four ' +
        'carry every disclosure that matters; the rest is how to reproduce them ' +
        'yourself.'
    },

    /* ------------------------------------------------------------- steps */
    steps: [
      {
        id: 'wt-1',
        title: 'Start where a money committee starts',
        panel: 'panel-d',
        preset: 'noWorkforce',
        params: { replacementPct: 1.00, notReplacedPct: 0.00, vacancyMonths: 0 },
        choose: [
          ['Preset', '<strong>No Workforce Savings</strong>'],
          ['Everything else', 'left at the committed model’s central case']
        ],
        look: 'Panel D &middot; Combined fiscal view, then Panel B.',
        seeing:
          '<p>Three totals, kept separate. <strong>Modeled pension impact ' +
          '$7.15M</strong> over the ten-year cohort, which is <strong>0.19 basis ' +
          'points</strong> on employer contribution rates. <strong>Modeled ' +
          'payroll effect: exactly zero.</strong> And therefore a combined ' +
          'scenario effect of <strong>&minus;$7.15M</strong>.</p>',
        why:
          '<p>This preset refills every accelerated retirement at ' +
          '<strong>100%</strong> of the departing employee’s compensation, ' +
          'eliminates no position, and assumes no vacancy. Every workforce offset ' +
          'is switched off by construction, so the payroll effect is zero — not ' +
          'rounded to zero, but zero as an identity.</p>' +
          '<p>Start here because the payroll effect depends entirely on a hiring ' +
          'assumption <em>the Commonwealth controls and this model cannot ' +
          'observe</em>. The pension impact does not. One of those two numbers is ' +
          'a property of the bill; the other is a property of a decision nobody ' +
          'has made yet.</p>',
        significance:
          '<p>0.19 basis points is 0.0019% of covered payroll. The state plan’s ' +
          'own figure is <strong>0.22 bp</strong>, which takes its published ' +
          '11.07% employer rate to about <strong>11.0722%</strong> — so ' +
          '<strong>on this central case, to the nearest basis point, no ' +
          'employer’s contribution rate changes.</strong> (The per-plan figures ' +
          'differ; 0.19 bp is the combined result and on the state rate alone it ' +
          'would read 11.0719%.) That is the fiscal case at the central ' +
          'assumptions, stated without any workforce offset helping it.</p>' +
          '<p><strong>State the restriction with the claim.</strong> That ' +
          'conclusion holds on the central case and on every single-driver ' +
          'excursion. It does <em>not</em> hold on the fiscal model’s published ' +
          'compound-adverse case, where <strong>1.16 bp does move a plan’s rate ' +
          'by one basis point</strong>. Step 9 gives that figure. Anyone who ' +
          'repeats the no-rate-change sentence without the exception is ' +
          'overstating this analysis, and the package’s own fiscal model says ' +
          'so.</p>' +
          '<p><strong>Required qualifier, and it travels with the figure ' +
          'everywhere:</strong> 0.19 bp is the modeled <em>retirement-plan</em> ' +
          'employer contribution impact. It <strong>excludes</strong> the ' +
          'separately funded health insurance credit and COLA effects, including ' +
          'unquantified COLA exposure (step 7). The fiscal model is complete for ' +
          'bill version 1.1 and requires a refresh against the bill as ' +
          'introduced. A basis-point figure quoted without that sentence is being ' +
          'quoted wrongly.</p>' +
          '<p><strong>And one thing more, which step 3 is entirely about.</strong> ' +
          'This central figure rests on a behavioural assumption with no ' +
          'published evidence behind it, which decides the <em>sign</em> of the ' +
          'per-member result and on which self-selection runs the unfavourable ' +
          'way. <strong>Read 0.19 bp as the optimistic end of a range, not its ' +
          'middle.</strong> If you read no further than this step, that sentence ' +
          'is the one to carry.</p>'
      },

      {
        id: 'wt-2',
        title: 'What the bill actually sells — and why one Plan 2 point is worth half a Plan 1 year',
        panel: 'panel-e',
        preset: 'noWorkforce',
        params: { replacementPct: 1.00, notReplacedPct: 0.00, vacancyMonths: 0 },
        choose: [
          ['Keep', 'the same settings as step 1'],
          ['Scroll to', 'Panel E &middot; Member examples']
        ],
        look: 'Panel E &middot; the Plan 1 example (profile A) and the Plan 2 example (profile D).',
        seeing:
          '<p>Two illustrative members, with every line of the calculation shown. ' +
          'The <strong>Plan 1</strong> member buys four years and retires ' +
          '<strong>4.00 years</strong> earlier. The <strong>Plan 2</strong> ' +
          'member buys four Rule-of-90 points and retires <strong>2.00 ' +
          'years</strong> earlier.</p>' +
          '<p>Read the two allowance rows. The allowance <em>under the bridge</em> ' +
          'and the allowance <em>under current law at the same date</em> differ ' +
          'only by a reduction <strong>factor</strong>. The years of service in ' +
          'the formula are identical.</p>',
        why:
          '<p>That identity is the whole design. The credit counts toward ' +
          'eligibility under <strong>§ 51.1-153 B 2</strong> (age 50 with 30 ' +
          'years) and <strong>B 3</strong> (the Rule of 90) and nowhere else. The ' +
          'bill carves it out of the definition of “creditable service” in ' +
          '§ 51.1-124.3, so it cannot enter the benefit formula, average final ' +
          'compensation, the health insurance credit threshold, the group life ' +
          '<em>service threshold</em> — though not the § 51.1-505 B step-down, ' +
          'which follows the separation date; see step 7 — or the five-year ' +
          'vesting analogue.</p>' +
          '<p><strong>The carve-out is necessary and not sufficient.</strong> ' +
          'Version 1.4 adds two enabling amendments — subdivision B 4 of ' +
          '§ 51.1-153 and the parallel paragraph of subdivision A 3 of ' +
          '§ 51.1-155 — because without them the credit leaks into <strong>PLOP, ' +
          'the death-in-service benefit and deferred retirement</strong>, and ' +
          'produces an employer-funded increase in the allowance itself, even ' +
          'though it is not creditable service. Containment took three ' +
          'amendments, not one. That is the first question a VRS reviewer ' +
          'asks.</p>' +
          '<p>The 4-versus-2 asymmetry is arithmetic, not drafting. Under the ' +
          'Rule of 90 age and service <em>each</em> accrue a year per year ' +
          'worked, so the sum grows <strong>two points a year</strong>. Closing a ' +
          'four-point gap therefore saves two years, not four. Plan 1 and Plan 2 ' +
          'are computed separately throughout the tool and combined only at the ' +
          'final step, for exactly this reason.</p>',
        significance:
          '<p>Two consequences a reader should carry forward.</p>' +
          '<p>First, <strong>the bridge is an eligibility benefit, not a pension ' +
          'increase.</strong> No veteran’s monthly allowance goes up by a dollar ' +
          'because of it. What changes is <em>when</em> she may draw it without ' +
          'an actuarial reduction.</p>' +
          '<p>Second, <strong>Plan 2 purchasers in aggregate pay more than the ' +
          'value they receive</strong> — about $574,000 more across the modeled ' +
          'cohort. At the central assumptions the entire modeled pension impact ' +
          'is a Plan 1 result. A reader who assumes the bill is uniformly ' +
          'generous has the mechanism backwards for a quarter of its ' +
          'beneficiaries.</p>'
      },

      {
        id: 'wt-3',
        title: 'The one assumption that decides the sign of the answer',
        panel: 'panel-b',
        params: { phi: 0.00, replacementPct: 1.00, notReplacedPct: 0.00, vacancyMonths: 0 },
        choose: [
          ['Behavioural assumption &phi;', '<strong>0%</strong>'],
          ['Then drag it', 'to 50%, then to 100%, and watch Panel B'],
          ['Workforce controls', 'still off, as in step 1']
        ],
        look: 'Panel B &middot; Modeled pension impact. Then Panel E again.',
        seeing:
          '<p>Drag one slider and the answer changes sign.</p>' +
          '<table class="dt"><thead><tr><th>&phi;</th>' +
          '<th>Modeled pension impact</th><th>Basis points</th></tr></thead><tbody>' +
          '<tr><td>0% — nobody would have worked on</td><td>$17.74M</td><td>0.47 bp</td></tr>' +
          '<tr><td>25% — ASM-22 low</td><td>$12.44M</td><td>0.33 bp</td></tr>' +
          '<tr class="total"><td>50% — ASM-22 central</td><td>$7.15M</td><td>0.19 bp</td></tr>' +
          '<tr><td>75% — ASM-22 high</td><td>$1.86M</td><td>0.05 bp</td></tr>' +
          '<tr><td>100% — everyone would have worked on</td><td>&minus;$3.43M</td><td>&minus;0.09 bp</td></tr>' +
          '</tbody></table>' +
          BP_FOOTNOTE +
          '<p>The aggregate crosses zero at about <strong>&phi; = 0.84</strong>. ' +
          'Above that the bill is modeled as a <em>gain</em> to the plan, because ' +
          'purchasers pay in more than the value they receive.</p>',
        why:
          '<p>&phi; is the share of purchasers who <strong>would otherwise have ' +
          'worked on to unreduced eligibility anyway</strong>. It decides which ' +
          'counterfactual each purchaser is measured against, and the two ' +
          'counterfactuals are not close:</p>' +
          '<ul><li>A <strong>“leaving anyway”</strong> purchaser (weight ' +
          '1&nbsp;&minus;&nbsp;&phi;) was going regardless. She is measured ' +
          'against <em>retiring on the same date with the same service under the ' +
          'current-law reduced allowance</em>. The bridge removes the actuarial ' +
          'reduction from an allowance she would have taken anyway, and she ' +
          'receives a <strong>substantial subsidy</strong>.</li>' +
          '<li>A <strong>work-to-eligibility</strong> purchaser (weight &phi;) ' +
          'is measured against <em>working on to unreduced eligibility</em>. She ' +
          'gives up years of accrual, AFC growth and contributions by leaving ' +
          'early, and frequently <strong>pays more than the additional actuarial ' +
          'value she receives.</strong></li></ul>' +
          '<p>Panel E shows the same split for one member. Illustrative ' +
          'profile A — <strong>the most favourable of the seven published ' +
          'profiles, not a cost per veteran, and never to be multiplied by a ' +
          'participant count</strong> — nets <strong>+$341,065</strong> measured ' +
          'against retiring on the same date with the same service under the ' +
          'current-law reduced allowance, and <strong>&minus;$21,500</strong> ' +
          'measured against working on to unreduced eligibility. Same member, ' +
          'same purchase, opposite conclusion.</p>' +
          '<p>The qualifier on that figure is not decoration. The next most ' +
          'favourable published profile nets <strong>$101,480</strong>, the mean ' +
          'across the six non-hybrid profiles on this baseline is about ' +
          '<strong>$93,000</strong>, and the model’s own cell grid reaches about ' +
          '<strong>$419,000</strong> in its single most favourable cell — so the ' +
          'figure is not a maximum either. Multiplying $341,065 by a participant ' +
          'count produces a figure roughly <strong>ten times</strong> the ' +
          'model’s own aggregate, and it is the most likely way this analysis ' +
          'gets misquoted.</p>',
        significance:
          '<p><strong>No published data bears on &phi;.</strong> Not VRS, not ' +
          'DHRM, not the valuation. The central 50% is a modelling choice, not a ' +
          'finding.</p>' +
          '<p>And it is worse than unmeasured — it is not even ' +
          '<em>exogenous</em>. A member decides whether to buy <em>after</em> she ' +
          'knows which type she is, and the member who was leaving anyway is the ' +
          'one with the most to gain. <strong>Self-selection runs toward the ' +
          'subsidised end and is not modeled at all.</strong> The central case ' +
          'should be read as the optimistic end of the range rather than its ' +
          'middle.</p>' +
          '<p>Practical rule for anyone presenting this: <strong>quote the range ' +
          'across &phi;, not a point.</strong> If you take one number away from ' +
          'this tool, take “between roughly zero and half a basis point, ' +
          'depending on an assumption nobody can evidence.”</p>',
        caution:
          'The &phi; control spans 0–100% so the sign change is visible, but ' +
          'ASM-22 documents only <strong>0.25–0.75</strong>. Outside that band ' +
          'the tool says so on the panel. Purchaser counts are <strong>not</strong> ' +
          're-estimated as &phi; moves, which is itself a simplification: in ' +
          'reality the two groups would not take the offer at the same rate.'
      },

      {
        id: 'wt-4',
        title: 'How many people, over what period, on what evidence',
        panel: 'panel-g',
        params: { takeUp: 0.20 },
        choose: [
          ['Reset', 'click <strong>Reset to Baseline</strong>'],
          ['Take-up rate', 'try <strong>5%</strong>, then <strong>20%</strong>, then <strong>50%</strong>'],
          ['Then read', 'Panel A, then Panel G top to bottom']
        ],
        look: 'Panel A &middot; Participants, then Panel G &middot; Population funnel.',
        seeing:
          '<p>Take-up is the share of eligible veterans who actually buy. It ' +
          'scales the answer almost exactly linearly:</p>' +
          '<table class="dt"><thead><tr><th>Take-up</th><th>Participants, ' +
          'FY2029&ndash;FY2038</th><th>Basis points</th></tr></thead><tbody>' +
          '<tr><td>5% — the tool’s floor</td><td>55</td><td>0.05 bp</td></tr>' +
          '<tr><td>10% — model low</td><td>111</td><td>0.09 bp</td></tr>' +
          '<tr class="total"><td>20% — model moderate</td><td>222</td><td>0.19 bp</td></tr>' +
          '<tr><td>30% — model high</td><td>333</td><td>0.28 bp</td></tr>' +
          '<tr><td>50% — the tool’s ceiling</td><td>555</td><td>0.47 bp</td></tr>' +
          '</tbody></table>' +
          BP_FOOTNOTE +
          '<p>Then Panel G shows where those people come from: ' +
          '<strong>366,289</strong> active members in the three VRS employer ' +
          'plans, narrowing through six screens to about <strong>222</strong> ' +
          'expected participants.</p>',
        why:
          '<p>Exposure is not participation. A member reaches the last step of ' +
          'the funnel only if she is within four years or four Rule-of-90 points ' +
          'of a threshold and <em>not already eligible</em> (§ 51.1-142.4 B 5 ' +
          'bars a member who already qualifies from buying at all); is a veteran; ' +
          'has qualifying active duty service; is not barred by the military ' +
          'retired pay rule; did not already buy in the 24-month window; and then ' +
          'chooses to buy.</p>' +
          '<p>Read the <strong>provenance badge on every step</strong>, not the ' +
          'bar lengths. Step 1 is a Published Fact. Step 2 is a Derived Estimate. ' +
          '<strong>Steps 3 through 8 are Scenario Assumptions</strong>, and the ' +
          'only published anchor anywhere in them is that veterans are 6.0% of ' +
          'the Virginia classified <em>state</em> workforce <strong>as of ' +
          'June 30, 2024</strong>, presented to Senate Finance and Appropriations ' +
          'on January 21, 2025, slide 8. The teacher ' +
          'share of 2.5% and the political-subdivision share of 7.0% are ' +
          '<strong>assumed. No published figure exists for either.</strong></p>',
        significance:
          '<p>Two numbers to carry away from this step.</p>' +
          '<p>First, <strong>222 participants over ten years is about 22 a ' +
          'year.</strong> This is a small bill by headcount. Anyone who hears a ' +
          'participant count from this tool as an annual rate is out by a factor ' +
          'of ten.</p>' +
          '<p>Second, <strong>the population screens alone move the aggregate ' +
          'from 0.07 to 0.44 basis points</strong> — a span of more than six to ' +
          'one, on a central estimate of 0.19. That spread is the honest measure ' +
          'of what the model does not know, and it is the reason the ' +
          'pre-introduction ask of VRS is for <em>member-level data</em> rather ' +
          'than for a different actuarial method.</p>' +
          '<p>Worth naming specifically, because a committee will ask: the ' +
          '<strong>18% military-retired-pay exclusion share is unsourced.</strong> ' +
          'It is a scenario assumption with federal aggregates behind it at best. ' +
          'On the related legal question, 10 U.S.C. § 12736 was examined and ' +
          '<strong>does not preempt the bill</strong> — it reaches only service a ' +
          'plan otherwise properly credits, and Virginia credits this service only ' +
          'on purchase.</p>'
      },

      {
        id: 'wt-5',
        title: 'Now ask your own question — and meet the trap in the combined total',
        panel: 'panel-d',
        params: {
          participantMode: 'direct', p1Participants: Q_P1, p2Participants: Q_P2,
          replacementPct: 0.85, notReplacedPct: 0.05, vacancyMonths: 0
        },
        choose: [
          ['How participants are set', '<strong>Enter counts</strong>'],
          ['Plan 1 participants', '<strong>' + Q_P1 + '</strong>'],
          ['Plan 2 participants', '<strong>' + Q_P2 + '</strong>'],
          ['Replacement salary', '<strong>85%</strong>'],
          ['Positions not replaced', '<strong>5%</strong>']
        ],
        look: 'Panels A, C and D.',
        seeing:
          '<p>This is the question the tool was built to answer: <em>what happens ' +
          'if 400 veterans participate, vacancies are refilled at 85% of the ' +
          'departing salary, and 5% of positions are not replaced?</em> The 400 ' +
          'is split 296 / 104 because 74% of modeled purchasers are Plan 1 — ' +
          'entering counts <strong>rescales the modeled age, service and salary ' +
          'mix</strong> rather than inventing an average member.</p>' +
          '<table class="dt"><thead><tr><th>Panel D total</th><th>Amount</th></tr></thead><tbody>' +
          '<tr><td>1. Modeled pension impact<br><span class="cap">a cost to the ' +
          'retirement plan — the only one of the three that follows from the ' +
          'bill</span></td><td>$12.88M &nbsp;(0.34 bp)</td></tr>' +
          '<tr><td>2. Modeled payroll / workforce effect<br><span class="cap">an ' +
          'employer compensation effect — <strong>not a pension ' +
          'saving</strong></span></td><td>$15.80M</td></tr>' +
          '<tr class="total"><td>3. Combined scenario effect<br><span class="cap">' +
          '<strong>the least reliable of the three</strong>; follows from two ' +
          'hiring assumptions you typed in, not from the bill</span></td>' +
          '<td>+$2.92M</td></tr>' +
          '</tbody></table>' +
          '<p class="fn">“Combined fiscal effect is a scenario result, not an ' +
          'actuarial certification or VRS fiscal impact statement.” Basis points ' +
          'exclude the separately funded health insurance credit and COLA ' +
          'effects, including unquantified COLA exposure (step 7).</p>',
        why:
          '<p><strong>Stop at that third row.</strong> It is positive. Read ' +
          'carelessly, this screen says the bill pays for itself and leaves $2.9M ' +
          'over.</p>' +
          '<p>It does not say that, and the tool is built so you can see why in ' +
          'one move. The $15.80M payroll effect is <strong>not a pension ' +
          'saving</strong>. It is the arithmetic consequence of two assumptions ' +
          'you just typed in — that replacements are paid 15% less, and that one ' +
          'position in twenty is never refilled. Both are <em>employer hiring ' +
          'decisions</em>. Neither follows from the bill. The Commonwealth could ' +
          'adopt the bridge and refill every post at full salary, in which case ' +
          'that $15.80M is zero and the combined effect is a $12.88M cost.</p>' +
          '<p>That is why Panel D shows three totals and refuses to print one ' +
          'headline, why the combined figure is shown last and smallest, and why ' +
          'it carries the warning verbatim: <strong>“Combined fiscal effect is a ' +
          'scenario result, not an actuarial certification or VRS fiscal impact ' +
          'statement.”</strong></p>',
        significance:
          '<p>If you present one screen from this tool to a committee, do not ' +
          'present this one on its own. Present it beside <em>No Workforce ' +
          'Savings</em> from step 1. The pair is the honest statement: a modeled ' +
          'pension cost that is real but very small, and a payroll effect that is ' +
          'directionally favourable to the employer and ' +
          '<strong>quantitatively indeterminate</strong>.</p>' +
          '<p>Note also what the payroll effect deliberately omits. Recruiting ' +
          'cost, onboarding, productivity ramp-up, institutional-knowledge loss ' +
          'and service-delivery effects are <strong>not valued at zero — they are ' +
          'not valued at all</strong>, because no data supports a figure. Every ' +
          'one of them runs <em>against</em> the payroll effect. A number invented ' +
          'for them would be the easiest thing in this package to attack.</p>',
        caution:
          'A refilled position <strong>never</strong> produces a full-salary ' +
          'saving in this model. At 85% replacement only the 15% compensation ' +
          'differential and the related employer-contribution differential count. ' +
          'Counting a retiring employee’s whole salary as a saving is the single ' +
          'most common error in this kind of analysis, and the tool cannot be ' +
          'made to do it.'
      },

      {
        id: 'wt-6',
        title: 'The thirty-second test that keeps the two categories apart',
        panel: 'panel-b',
        params: {
          participantMode: 'direct', p1Participants: Q_P1, p2Participants: Q_P2,
          replacementPct: 1.00, notReplacedPct: 0.05, vacancyMonths: 0
        },
        choose: [
          ['Keep', 'the 296 / 104 counts from step 5'],
          ['Now drag', '<strong>Replacement salary</strong> from 75% up to 100% and back'],
          ['Watch', 'Panel B — not Panel C']
        ],
        look: 'Panel B &middot; Modeled pension impact, while a Panel C control moves.',
        seeing:
          '<p>Panel C changes continuously as you drag. <strong>Panel B does not ' +
          'move at all</strong> — not by a rounding step, not in the last decimal ' +
          'place. Do the same with <em>Positions not replaced</em> and with the ' +
          'vacancy slider. Panel B still does not move.</p>',
        why:
          '<p>This is a <strong>guardrail enforced by test, not by ' +
          'convention.</strong> No workforce or payroll control is permitted to ' +
          'enter the contribution-rate arithmetic, and the regression harness ' +
          'asserts the net pension liability is bit-identical at 100% ' +
          'replacement, at 75% replacement, and at 10% of positions eliminated. ' +
          'A future edit that leaked a payroll assumption into a pension figure ' +
          'would fail the harness rather than ship.</p>' +
          '<p>Five more guardrails are asserted the same way: at 100% replacement ' +
          'the lower-paid differential is <em>exactly</em> zero; a non-replaced ' +
          'position is always reported separately from a lower-paid replacement; ' +
          'a vacancy of <em>n</em> months never costs more than <em>n</em> months ' +
          'of pay; hybrid participants stay out of the primary model unless you ' +
          'deliberately switch the variant on; and no output is ever labelled ' +
          '“savings”.</p>',
        significance:
          '<p>You have just verified, yourself, in one gesture, the claim the ' +
          'rest of the tool rests on. <strong>A payroll effect and a pension ' +
          'effect are different kinds of claim, and this model never lets one ' +
          'stand in for the other.</strong></p>' +
          '<p>That matters because the category error is the usual way a pension ' +
          'bill is oversold. If someone shows you an analysis of this proposal in ' +
          'which a workforce assumption moves the contribution rate, the analysis ' +
          'is wrong — and you now know how to check in thirty seconds.</p>'
      },

      {
        id: 'wt-7',
        title: 'What the tool deliberately does not count',
        panel: 'panel-ancillary',
        preset: 'central',
        params: {},
        choose: [
          ['Reset', 'click <strong>Reset to Baseline</strong>'],
          ['Scroll to', 'the <strong>Health insurance credit &amp; COLA</strong> panel']
        ],
        look: 'Health insurance credit &amp; COLA.',
        seeing:
          '<p>Two figures and a flat statement. The health insurance credit ' +
          'effect of commencing earlier is estimated at about ' +
          '<strong>$404,000</strong> — illustrative only, and an <strong>upper ' +
          'bound</strong> for the political-subdivision cohort, because ' +
          'participation there is employer-elective. The COLA effect reads ' +
          '<strong>“Not quantified.”</strong> And both are reported as ' +
          '<strong>outside</strong> every basis-point figure in the tool.</p>',
        why:
          '<p>The bill’s protective architecture controls what the credit ' +
          '<em>is</em>. It does not control what an <strong>earlier retirement ' +
          'date</strong> does. The health insurance credit and the ' +
          'post-retirement supplement both follow the <em>retirement date</em> — ' +
          'not creditable service, and not the eligibility date the bill ' +
          'freezes — so both would commence up to four years earlier, and the ' +
          'carve-out cannot reach them.</p>' +
          '<p>The accurate formulation, which the package uses everywhere: ' +
          '<strong>HIC and COLA follow the retirement date, so preventing ' +
          'earlier commencement would require separate statutory changes outside ' +
          'the bridge</strong> — to Chapter 14 and to § 51.1-166. The proposal ' +
          '<strong>deliberately accepts and discloses</strong> that earlier ' +
          'commencement rather than adding separate delay provisions. That was a ' +
          'policy choice, resolved on October 20, 2026, and the bill states the ' +
          'acceptance on its face so no reader mistakes the § 51.1-166 D 4 ' +
          'amendment for a cure.</p>' +
          '<p>Both run on <strong>separately funded trusts</strong>, which is why ' +
          'they sit outside the retirement-plan contribution rate rather than ' +
          'inside it. Enactment clause 3(vi) directs the VRS Board to report both ' +
          'costs, stated separately by trust.</p>' +
          '<p><strong>The same mechanism runs against the member, in three ways, ' +
          'and the bill requires her to be told so in writing.</strong> Clause ' +
          'I 2(viii) requires each purchaser to be disclosed, before she signs, ' +
          'that retiring earlier <strong>(a)</strong> begins the § 51.1-505 B ' +
          'group life step-down — 25% a year, measured from the date of ' +
          'separation — up to four years earlier; <strong>(b)</strong> ends ' +
          'eligibility for the § 51.1-162 B death-before-retirement allowance; ' +
          'and <strong>(c)</strong> produces fewer years of creditable service ' +
          'and a lower average final compensation than working on would have. ' +
          'None of these is caused by the credit; all three follow the ' +
          '<em>separation date</em>, exactly as the health insurance credit and ' +
          'COLA follow the retirement date. So the honest answer to “does this ' +
          'cost the veteran anything?” is <strong>yes, three things</strong> — ' +
          'which is why the bill makes the disclosure mandatory rather than ' +
          'leaving it to a counselling conversation.</p>',
        significance:
          '<p><strong>The COLA commencement exposure is the single largest ' +
          'disclosed gap in the fiscal case, and no figure anywhere in this ' +
          'package quantifies it.</strong> Not this tool, not the fiscal ' +
          'model.</p>' +
          '<p>This is stated prominently because the alternative is worse. A ' +
          'committee that discovers an unquantified cost on its own discounts ' +
          'everything else the proponents say; a committee told up front can ' +
          'price it and ask the Board for the number. The proper route to that ' +
          'number is the § 30-19.1:7 impact statement, which is mandatory for ' +
          'this bill and has not yet been requested.</p>'
      },

      {
        id: 'wt-8',
        title: 'Which assumption is worth arguing about',
        panel: 'panel-f',
        preset: 'central',
        params: {},
        choose: [
          ['Keep', 'the baseline settings'],
          ['Scroll to', 'Panel F &middot; Assumption sensitivity']
        ],
        look: 'Panel F &middot; the tornado diagram and its table.',
        seeing:
          '<p>Eight drivers, each swung one at a time around the scenario on ' +
          'screen, ordered by how much it moves the modeled pension impact. The ' +
          'top of the chart is <strong>the behavioural assumption and the ' +
          'population funnel</strong>. The bottom two bars — replacement salary ' +
          'and positions not replaced — are faded and labelled <em>no pension ' +
          'effect</em>, with their payroll swing reported instead.</p>' +
          '<p><strong>Read the ordering with its bases, which are not ' +
          'commensurable.</strong> Each bar is swung over its own control range, ' +
          'not over a documented band: &phi; over 0–1 and take-up over 5–50%, ' +
          'while the funnel uses its documented low and high cases. Restricted to ' +
          'ASM-22’s documented <strong>0.25–0.75</strong>, &phi; swings ' +
          '<strong>0.28 bp</strong> and ranks <strong>third</strong>, behind ' +
          'take-up and the funnel. <strong>The ordering tells you where to look; ' +
          'it is not a measure of relative likelihood.</strong></p>',
        why:
          '<p><strong>Only assumptions about people matter here.</strong> The ' +
          'classical actuarial levers this panel tests — the discount rate and ' +
          'salary growth — move the answer far less than &phi; or the veteran ' +
          'funnel does. (Mortality improvement is <em>not</em> one of this ' +
          'panel’s eight bars; the fiscal model tests it separately at 0.00% and ' +
          '1.25% and it moves the result by about 0.01 bp.) The two workforce ' +
          'drivers move the payroll effect ' +
          'substantially and the pension impact exactly not at all, and they are ' +
          'shown faded rather than hidden so that nobody infers they were tested ' +
          'and found immaterial to the pension result. They were not tested ' +
          'against it; they cannot touch it.</p>' +
          '<p>The discount rate deserves one note. Moving it changes how the ' +
          'liability is <em>measured</em>; it is not a change in the Board’s ' +
          'funding policy. So by default the liability layer is still amortised ' +
          'at the Board’s published 6.75%, which is what the committed model does ' +
          'in its own sensitivity. You can make both move together in Advanced ' +
          'Assumptions, at which point the tool stops reproducing the published ' +
          'table — which is why that box is off by default and labelled.</p>',
        significance:
          '<p>This panel tells a reviewer where to spend scarce attention. ' +
          'Arguing about the discount rate on this bill is close to a waste of ' +
          'time; arguing about who buys, and whether they were leaving anyway, is ' +
          'the entire question. It is also why the pre-introduction ask of VRS is ' +
          'for <em>member-level aggregate data</em> rather than a different ' +
          'method — and the dashboard’s <em>Official VRS data mode</em> sets out ' +
          'the ten specific requests, each a drop-in replacement for an ' +
          'estimate.</p>' +
          '<p><strong>One honest limitation of this panel:</strong> the swings ' +
          'are one-at-a-time and <strong>cannot be added.</strong> The drivers are ' +
          'not independent. Moving take-up and the population funnel together ' +
          'spans roughly <strong>0.02 to 1.11 basis points</strong> — wider than ' +
          'any single bar on the chart, and wider than the range a reader would ' +
          'infer from reading the bars. The fiscal model now publishes its own ' +
          'compound case for the same reason: the high population funnel with ' +
          'φ = 0.25 and 30% take-up, together, reaches <strong>1.16 basis ' +
          'points</strong> and about <strong>$43.79M</strong>. You can reproduce ' +
          'it in this tool, and step 9 does.</p>' +
          BP_FOOTNOTE
      },

      {
        id: 'wt-9',
        title: 'The honest range — four presets in a row',
        panel: 'panel-d',
        preset: 'conservative',
        params: {
          takeUp: 0.10, replacementPct: 1.00, notReplacedPct: 0.00,
          vacancyMonths: 0, phi: 0.75
        },
        choose: [
          ['Click, in order', '<strong>Low Participation</strong>, <strong>Central</strong>, ' +
            '<strong>High Participation</strong>, <strong>No Workforce Savings</strong>'],
          ['Read each time', 'Panel D row 1 — the modeled pension impact']
        ],
        look: 'Panel D, four times.',
        seeing:
          '<table class="dt"><thead><tr><th>Preset</th><th>Participants</th>' +
          '<th>Modeled pension impact</th><th>Basis points</th></tr></thead><tbody>' +
          '<tr><td>Low Participation (low-cost case)</td><td>111</td><td>$929,000</td><td>0.02 bp</td></tr>' +
          '<tr class="total"><td>Central</td><td>222</td><td>$7.15M</td><td>0.19 bp</td></tr>' +
          '<tr><td>High Participation</td><td>781</td><td>$25.16M</td><td>0.66 bp</td></tr>' +
          '<tr><td>No Workforce Savings</td><td>222</td><td>$7.15M</td><td>0.19 bp</td></tr>' +
          '</tbody></table>' +
          '<p>Two of those four produce an identical pension impact. ' +
          '<em>No Workforce Savings</em> changes only workforce settings, so the ' +
          'pension figure is the Central figure — which is step 6’s guardrail ' +
          'showing up as a table row.</p>',
        why:
          '<p>Each preset is a corner, not a forecast, and the tool names them ' +
          'carefully for that reason. <em>Low Participation</em> is labelled “the ' +
          'low-cost corner, not a prudence case,” because it stacks low take-up ' +
          '<em>and</em> a favourable &phi; <em>and</em> no workforce reduction at ' +
          'once. Presenting it as the expected case would be exactly the kind of ' +
          'selective reading this tool exists to make visible.</p>' +
          '<p>There is also a <strong>Hybrid Variant</strong> preset, marked ' +
          '<em>not the bill</em>. The bill <strong>excludes</strong> hybrid plan ' +
          'participants, which is <strong>substantially</strong> everyone first ' +
          'hired on or after January 1, 2014 — <strong>with named exceptions ' +
          'still under review</strong>: four optional-retirement-plan routes ' +
          '(§§ 51.1-126.1, 51.1-126.3, 51.1-126.4 and 51.1-126.7) leave a path ' +
          'into the defined benefit plan open in <em>every</em> hire year, which ' +
          'new clause B 1(v) closes by drafting pending VRS confirmation of ' +
          'headcount and practice. Package version 1.4 withdrew the stronger ' +
          'claim that the beneficiary class is simply closed; the accurate ' +
          'statement is that it is <em>substantially closing</em>. The variant ' +
          'prices ' +
          'the rejected alternative and the consequence is immaterial before ' +
          'FY2038 — and modestly <em>favourable</em> to the plan, because a ' +
          'hybrid purchaser pays approximate normal cost against a 1.00% ' +
          'multiplier and so pays several times the value conferred. One ' +
          'disclosure on that variant: the calibration output carries no hybrid ' +
          'contribution-rate fields, so <strong>contributions forgone are ' +
          'computed at Plan 1 rates</strong> in it.</p>',
        significance:
          '<p><strong>Present a range, not a point.</strong> Across the four ' +
          'presets the modeled pension impact runs from about $929,000 to about ' +
          '$25.16M, and from 0.02 to 0.66 basis points. Compounding drivers — ' +
          'which the presets do not do — widens it further: the fiscal model’s own ' +
          'published compound-adverse case (high population funnel, φ = 0.25, 30% ' +
          'take-up) reaches <strong>1.16 basis points</strong> and about ' +
          '<strong>$43.79M</strong>. Treat that as the top of the range, not the ' +
          '0.66 bp of the High Participation preset.</p>' +
          '<p><strong>On every single-driver excursion, and on the central ' +
          'case, no employer’s published contribution rate changes when rounded ' +
          'to the nearest basis point</strong> — and that claim holds ' +
          '<em>without</em> relying on any workforce offset, on the low-cost ' +
          'corner, or on a favourable &phi;. <strong>The compound-adverse case ' +
          'is the exception, and the package discloses it: at 1.16 bp a plan’s ' +
          'rate does change by one basis point.</strong> That is the number to ' +
          'give a committee as the adverse tail. Anyone who states the ' +
          'no-rate-change conclusion without that exception is overstating the ' +
          'analysis, and the fiscal model says so in terms.</p>' +
          BP_FOOTNOTE
      },

      {
        id: 'wt-10',
        title: 'Before any of this is used externally',
        panel: 'panel-registry',
        preset: 'central',
        params: {},
        choose: [
          ['Reset', 'click <strong>Reset to Baseline</strong>'],
          ['Read', 'the <strong>Source &amp; assumption registry</strong>, then open ' +
            '<strong>Official VRS data mode</strong>'],
          ['Export', 'use <strong>Download scenario summary</strong> for a handout, ' +
            'or <strong>CSV</strong> to check the arithmetic in a spreadsheet']
        ],
        look: 'Source &amp; assumption registry; Official VRS data mode.',
        seeing:
          '<p>Every published source and every analytical assumption the model ' +
          'uses, exported from the fiscal model’s own <code>inputs.py</code> so ' +
          'the registry cannot drift from the code that produced the numbers. ' +
          '<em>Official VRS data mode</em> shows the ten-row data contract: for ' +
          'each estimate, precisely what VRS aggregate would replace it, with no ' +
          'change to any formula.</p>',
        why:
          '<p>The downloads carry their qualifiers with them. The scenario ' +
          'summary and the CSV both reproduce the required basis-point qualifier, ' +
          'the behavioural and population basis, the § 30-19.1:7 disclaimer and ' +
          'the attribution line — because an exported file travels without the ' +
          'page around it, and a figure that loses its qualifier in transit is ' +
          'the most likely way this analysis gets misquoted.</p>',
        significance:
          '<p>This tool is one input to a legislative decision and should not be ' +
          'the last one. <strong>Five things must happen before external or ' +
          'patron use</strong>, and none of them is a drafting question:</p>' +
          '<ol>' +
          '<li><strong>Re-run the fiscal model against the bill as ' +
          'introduced.</strong> It is complete for bill version 1.1; the ' +
          'operative text is now <strong>version 1.4</strong>, which removes ' +
          'populations the model counted (clauses B 1(iv) and B 1(v)) and adds ' +
          'the subdivision E 3 continuity requirement. The refresh must also ' +
          'shift the modelled window from <strong>FY2029–FY2038 to ' +
          'FY2030–FY2039</strong>, because DECISION 14 moved the effective date ' +
          'to July 1, 2029.</li>' +
          '<li><strong>Complete the outstanding source verifications</strong> — ' +
          'including the enactment clauses of 2026 c. 563 and a Legislative ' +
          'Information System check that no comparable bill is already ' +
          'filed.</li>' +
          '<li><strong>Federal tax review by veterans’ legal counsel.</strong> ' +
          'IRC § 415(n)(3)(A) may not reach a credit that buys no accrual, which ' +
          'raises § 415(c) exposure and removes 403(b)/457(b) ' +
          'trustee-to-trustee funding — and that decides who can afford the ' +
          'purchase at all. <strong>Four questions are drafted and none has been ' +
          'sent.</strong></li>' +
          '<li><strong>Resolve or expressly defer the approved-leave ' +
          'question</strong> — whether a member on an approved leave of absence ' +
          'without pay counts as remaining in service under subdivision E 3. The ' +
          'bill currently says yes, <strong>deliberately</strong>: version 1.3’s ' +
          'continuity requirement would otherwise have created a new trap for a ' +
          'member who took unpaid leave years before retiring, and E 3 also ' +
          'protects receipt of benefits under §§ 51.1-1112 and 51.1-1123. This is ' +
          'a considered member-protective choice, not a placeholder. It should be ' +
          'ratified or expressly deferred; reversing it is a one-clause ' +
          'change.</li>' +
          '<li><strong>Obtain the VRS Board impact statement under ' +
          '§ 30-19.1:7</strong> at the appropriate stage. It is mandatory for ' +
          'every VRS bill and has not been requested. <strong>This model is not a ' +
          'substitute for it.</strong></li>' +
          '</ol>' +
          '<p><strong>Three items await VRS confirmation</strong>, and none of ' +
          'them is for this tool: the applicable approximate normal cost rate for ' +
          'eligible pre-2014 § 51.1-153 B 4 public-safety members, <strong>which ' +
          'this tool currently prices at the ordinary non-hazardous rate</strong>; ' +
          'whether subdivision B 4 operates as the bill reads it for that class; ' +
          'and the characterisation of the federal Blended Retirement System and ' +
          'its Thrift Savings Plan component for purposes of the military retired ' +
          'pay bar. A fourth item is for the Division of Legislative Services: the ' +
          '§ 51.1-155 effective-date question that moved the act to ' +
          '<strong>July 1, 2029</strong>. An <strong>introducible-form</strong> ' +
          'text setting out all nine sections at length, as Va. Const. art. IV, ' +
          '§ 12 requires, now exists alongside the working draft.</p>'
      }
    ],

    /* ------------------------------------------------------------ checks
       Every figure the prose above quotes, paired with the settings that put
       it on the screen. test/standalone.js group 19 applies each `params` to
       the SHIPPED document and asserts each `tokens` string is actually
       rendered somewhere in the panels. So a model change that moved a number
       fails the harness instead of leaving the narration quietly wrong — the
       walk-through cannot drift away from the tool it narrates.

       Tokens are compared against the rendered text with real minus signs and
       decoded entities, which is how the dashboard's own formatters emit them.
       ------------------------------------------------------------------ */
    checks: [
      { step: 'wt-1', note: 'pension impact and bp stand alone with no workforce offset',
        params: { replacementPct: 1.00, notReplacedPct: 0.00, vacancyMonths: 0 },
        tokens: ['$7.15M', '0.19 bp', '−$7.15M'] },

      { step: 'wt-2', note: 'Plan 2 purchasers overpay in aggregate',
        params: { replacementPct: 1.00, notReplacedPct: 0.00, vacancyMonths: 0 },
        tokens: ['$574,000'] },

      { step: 'wt-3', note: 'φ = 0 — nobody would have worked on',
        params: { phi: 0.00 }, tokens: ['$17.74M', '0.47 bp'] },
      { step: 'wt-3', note: 'φ = 0.25 — ASM-22 low',
        params: { phi: 0.25 }, tokens: ['$12.44M', '0.33 bp'] },
      { step: 'wt-3', note: 'φ = 0.50 — ASM-22 central',
        params: { phi: 0.50 }, tokens: ['$7.15M', '0.19 bp'] },
      { step: 'wt-3', note: 'φ = 0.75 — ASM-22 high',
        params: { phi: 0.75 }, tokens: ['$1.86M', '0.05 bp'] },
      { step: 'wt-3', note: 'φ = 1 — the sign has changed',
        params: { phi: 1.00 }, tokens: ['−$3.43M', '−0.09 bp'] },
      { step: 'wt-3', note: 'profile A on both baselines, same member',
        params: {}, tokens: ['$341,065', '−$21,500'] },

      { step: 'wt-4', note: 'take-up floor', params: { takeUp: 0.05 }, tokens: ['0.05 bp'] },
      { step: 'wt-4', note: 'take-up model low', params: { takeUp: 0.10 }, tokens: ['0.09 bp'] },
      { step: 'wt-4', note: 'take-up model moderate', params: { takeUp: 0.20 }, tokens: ['0.19 bp'] },
      { step: 'wt-4', note: 'take-up model high', params: { takeUp: 0.30 }, tokens: ['0.28 bp'] },
      { step: 'wt-4', note: 'take-up ceiling', params: { takeUp: 0.50 }, tokens: ['0.47 bp'] },
      { step: 'wt-4', note: 'funnel head count, and the funnel span quoted in the prose',
        params: {}, tokens: ['366,289', '0.07 bp', '0.44 bp'] },

      { step: 'wt-5', note: 'the board’s own worked question — 400 purchasers, ρ 85%, ν 5%',
        params: { participantMode: 'direct', p1Participants: Q_P1,
                  p2Participants: Q_P2, replacementPct: 0.85,
                  notReplacedPct: 0.05, vacancyMonths: 0 },
        tokens: ['$12.88M', '0.34 bp', '$15.80M', '$2.92M'] },

      { step: 'wt-6', note: 'the pension figure is identical at ρ = 100%',
        params: { participantMode: 'direct', p1Participants: Q_P1,
                  p2Participants: Q_P2, replacementPct: 1.00,
                  notReplacedPct: 0.05, vacancyMonths: 0 },
        tokens: ['$12.88M', '0.34 bp'] },

      { step: 'wt-7', note: 'HIC illustrative estimate; COLA never quantified',
        params: {}, tokens: ['$404,000', 'Not quantified'] },

      { step: 'wt-8', note: 'the φ tornado arms reach the control endpoints',
        params: {}, tokens: ['0.47 bp', '−0.09 bp'] },

      { step: 'wt-9', note: 'Low Participation — the low-cost corner',
        params: { takeUp: 0.10, replacementPct: 1.00, notReplacedPct: 0.00,
                  vacancyMonths: 0, phi: 0.75 },
        tokens: ['$929,000', '0.02 bp'] },
      { step: 'wt-9', note: 'Central', params: {}, tokens: ['$7.15M', '0.19 bp'] },
      { step: 'wt-9', note: 'High Participation',
        params: { takeUp: 0.30,
                  veteranShare: { ST: 0.060 * 1.6, TC: 0.025 * 1.6, PS: 0.070 * 1.6 },
                  qualifyingShare: 0.90, retiredPayBar: 0.12,
                  notAlreadyBought: 0.85, replacementPct: 0.90, notReplacedPct: 0.00 },
        tokens: ['$25.16M', '0.66 bp'] },
      { step: 'wt-9', note: 'No Workforce Savings leaves the pension figure untouched',
        params: { replacementPct: 1.00, notReplacedPct: 0.00, vacancyMonths: 0 },
        tokens: ['$7.15M', '0.19 bp'] },
      { step: 'wt-9', note: 'the fiscal model’s published compound-adverse case, reproduced here',
        params: { takeUp: 0.30, phi: 0.25,
                  veteranShare: { ST: 0.060 * 1.6, TC: 0.025 * 1.6, PS: 0.070 * 1.6 },
                  qualifyingShare: 0.90, retiredPayBar: 0.12, notAlreadyBought: 0.85 },
        tokens: ['$43.79M', '1.16 bp'] }
    ],

    /* ----------------------------------------------------------- closing */
    closing: {
      title: 'If you remember five things',
      items: [
        'The bridge is an <strong>eligibility</strong> benefit, not a pension ' +
          'increase. No allowance goes up by a dollar; what changes is when a ' +
          'veteran may draw it unreduced.',
        'The modeled pension cost is <strong>real but very small</strong> — ' +
          'about 0.19 basis points centrally, and <strong>0.02 to 1.16</strong> ' +
          'across the disclosed range including the published compound-adverse ' +
          'case. On every single-driver excursion and on the central case, no ' +
          'employer’s published contribution rate moves when rounded to the ' +
          'nearest basis point; <strong>at the compound-adverse top of 1.16 bp a ' +
          'plan’s rate does change by one basis point</strong>, and that is the ' +
          'figure to give a committee as the adverse tail. Every basis-point ' +
          'figure here is the modeled <em>retirement-plan</em> employer ' +
          'contribution impact and <strong>excludes</strong> the separately funded ' +
          'health insurance credit and COLA effects, including unquantified COLA ' +
          'exposure; the fiscal model is complete for bill version 1.1 and needs a ' +
          'refresh against the bill as introduced.',
        '<strong>A payroll effect is not a pension saving.</strong> The tool ' +
          'will not let the two mix, and you can verify that yourself in thirty ' +
          'seconds with the replacement slider.',
        'The answer <strong>turns on &phi;</strong>, an assumption with no ' +
          'published evidence behind it, which decides the sign of the per-member ' +
          'result and on which self-selection runs toward the subsidised end. ' +
          'Quote the range, not the point.',
        'The <strong>COLA commencement exposure is unquantified</strong> and the ' +
          '<strong>§ 30-19.1:7 VRS Board impact statement has not been ' +
          'requested.</strong> Both belong in front of a committee before this ' +
          'proposal does.'
      ],
      /* The version stamp is repeated here on purpose. The masthead carries it
         too, but the masthead is hidden in print — so this footer is the one
         place a printed or PDF-exported walk-through can be matched to the bill
         it narrates. MOO-271 finding S-01. */
      footer:
        'Narrates bill version 1.4, package version 1.6. Illustrative ' +
        'policy-analysis model. Not an actuarial certification, not ' +
        'the VRS Board impact statement required under Va. Code § 30-19.1:7, and ' +
        'not a General Assembly fiscal impact statement. Prepared by Policy ' +
        'Development Team using legal, policy, and financial analysis tools, ' +
        'pending review by veterans’ legal counsel.'
    }
  };
}));
