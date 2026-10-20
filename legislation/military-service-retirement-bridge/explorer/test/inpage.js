/* =====================================================================
   In-page test probe for the Legislative Scenario Explorer.

   Injected into the live standalone document by test/standalone.js. It does
   three things and deliberately nothing else:

     1. drives the real controls the way a user does — set the value, fire
        the real event, let the real debounce run;
     2. reconstructs the engine parameters INDEPENDENTLY from what the
        controls visibly show, rather than reading the interface's own
        `state` object (which is closed over inside js/ui.js and is exactly
        the thing under test). If a control is wired to the wrong state key,
        or its displayed value disagrees with the value it sends to the
        model, this is what catches it;
     3. formats expected values with its OWN formatters, written here from
        the output-naming rules rather than borrowed from js/ui.js, and
        checks they appear in the panel that is supposed to show them.

   Prepared by Policy Development Team using legal, policy, and financial
   analysis tools, pending review by veterans' legal counsel.
   ===================================================================== */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };

  /* ------------------------------------------------------- formatters */
  /* Independent implementations of the display rules. Written against the
     rules, not copied from the interface, so that a formatting change in
     one and not the other is a visible failure rather than a silent one. */
  function usd(x, dp) {
    var n = Math.abs(x) < 0.5 ? 0 : x;
    var d = dp || 0;
    return (n < 0 ? '−$' : '$') + Math.abs(n).toLocaleString('en-US',
      { minimumFractionDigits: d, maximumFractionDigits: d });
  }
  function usdM(x) {
    if (Math.abs(x) < 1e6) return usd(Math.round(x / 1000) * 1000);
    if (Math.abs(x) >= 1e9) {
      return (x < 0 ? '−$' : '$') + (Math.abs(x) / 1e9).toFixed(2) + 'bn';
    }
    return (x < 0 ? '−$' : '$') + (Math.abs(x) / 1e6).toFixed(2) + 'M';
  }
  function num(x, dp) {
    var d = dp === undefined ? 0 : dp;
    return x.toLocaleString('en-US',
      { minimumFractionDigits: d, maximumFractionDigits: d });
  }
  function pct(x, dp) { return (x * 100).toFixed(dp === undefined ? 1 : dp) + '%'; }
  function bp(x, dp) {
    var digits = dp === undefined ? 2 : dp;
    var n = Math.abs(x) < Math.pow(10, -digits) / 2 ? 0 : x;
    return (n < 0 ? '−' : '') + Math.abs(n).toFixed(digits) + ' bp';
  }

  /* --------------------------------------------------------- driving */
  function fire(el, type) { el.dispatchEvent(new Event(type, { bubbles: true })); }

  var probe = {
    fmt: { usd: usd, usdM: usdM, num: num, pct: pct, bp: bp },

    setRange: function (id, v) { var e = $(id); e.value = String(v); fire(e, 'input'); },
    setNum: function (id, v) {
      var e = $(id); e.value = (v === null || v === '') ? '' : String(v); fire(e, 'input');
    },
    setCheck: function (id, v) { var e = $(id); e.checked = !!v; fire(e, 'change'); },
    setSelect: function (id, v) { var e = $(id); e.value = v; fire(e, 'change'); },
    clickSeg: function (seg, v) {
      $(seg).querySelector('button[data-v="' + v + '"]').click();
    },
    click: function (id) { $(id).click(); },

    /* every control's raw DOM value, for round-trip checking */
    raw: function () {
      var out = { ranges: {}, nums: {}, checks: {}, selects: {}, segs: {}, labels: {} };
      ['i-takeup', 'i-p1y', 'i-p2y', 'i-phi', 'i-repl', 'i-notrepl', 'i-vac',
       'i-growth', 'i-disc', 'i-impr', 'i-vst', 'i-vtc', 'i-vps', 'i-qual',
       'i-bar', 'i-notbought'].forEach(function (id) {
        var e = $(id);
        out.ranges[id] = { value: e.value, min: e.min, max: e.max, step: e.step };
      });
      ['i-p1n', 'i-p2n', 'i-p1sal', 'i-p2sal'].forEach(function (id) {
        out.nums[id] = $(id).value;
      });
      ['i-hybrid', 'i-amort', 'i-official'].forEach(function (id) {
        out.checks[id] = $(id).checked;
      });
      out.selects['i-rule'] = $('i-rule').value;
      ['seg-participant-mode', 'seg-bridge-mode', 'seg-salary-mode'].forEach(function (s) {
        var on = Array.prototype.filter.call($(s).querySelectorAll('button'),
          function (b) { return b.getAttribute('aria-pressed') === 'true'; });
        out.segs[s] = on.length === 1 ? on[0].getAttribute('data-v') : '(' + on.length + ' pressed)';
      });
      ['v-takeup', 'v-p1y', 'v-p2y', 'v-phi', 'v-repl', 'v-notrepl', 'v-vac',
       'v-growth', 'v-disc', 'v-impr', 'v-vst', 'v-vtc', 'v-vps', 'v-qual',
       'v-bar', 'v-notbought', 'phi-sub', 'phi-wte'].forEach(function (id) {
        out.labels[id] = $(id).textContent.trim();
      });
      out.chip = $('scenario-chip').textContent.trim();
      return out;
    },

    /* The engine parameters the VISIBLE controls describe. Independent of
       js/ui.js readControls — that mapping is under test. */
    params: function () {
      var n = function (id) { return parseFloat($(id).value); };
      var seg = function (s) {
        var b = $(s).querySelector('button[aria-pressed="true"]');
        return b ? b.getAttribute('data-v') : null;
      };
      var opt = function (id) { var v = parseFloat($(id).value); return isNaN(v) ? null : v; };
      return {
        participantMode: seg('seg-participant-mode'),
        bridgeYearsMode: seg('seg-bridge-mode'),
        salaryMode: seg('seg-salary-mode'),
        takeUp: n('i-takeup') / 100,
        p1BridgeYears: n('i-p1y'),
        p2BridgeYears: n('i-p2y'),
        phi: n('i-phi') / 100,
        replacementPct: n('i-repl') / 100,
        notReplacedPct: n('i-notrepl') / 100,
        vacancyMonths: n('i-vac'),
        salaryGrowth: n('i-growth') / 100,
        discount: n('i-disc') / 100,
        improvement: n('i-impr') / 100,
        qualifyingShare: n('i-qual') / 100,
        retiredPayBar: n('i-bar') / 100,
        notAlreadyBought: n('i-notbought') / 100,
        veteranShare: { ST: n('i-vst') / 100, TC: n('i-vtc') / 100, PS: n('i-vps') / 100 },
        rule: $('i-rule').value,
        includeHybrid: $('i-hybrid').checked,
        amortizeAtScenarioDiscount: $('i-amort').checked,
        officialData: $('i-official').checked,
        p1Participants: opt('i-p1n'),
        p2Participants: opt('i-p2n'),
        p1Salary: opt('i-p1sal'),
        p2Salary: opt('i-p2sal')
      };
    },

    panelText: function () {
      var t = {};
      [['a', ['a-tiles', 'a-table']], ['b', ['b-hero', 'b-plan-table', 'b-emp-table']],
       ['c', ['c-tiles', 'c-ladder-table', 'c-table']], ['d', ['d-hero']],
       ['e', ['e-body']], ['f', ['f-table']], ['g', ['g-funnel']],
       ['hc', ['hc-tiles']]].forEach(function (pair) {
        t[pair[0]] = pair[1].map(function (id) { return $(id).textContent; }).join(' · ');
      });
      return t;
    },

    /* Hard numbers the model produces for the visible inputs, so Node can
       assert on values as well as on rendered strings. */
    model: function () {
      var p = probe.params();
      var R = window.VRSEngine.run(p);
      var A = window.VRSEngine.memberExample('A', p);
      var D = window.VRSEngine.memberExample('D', p);
      var byPlan = {};
      Object.keys(R.panelB.byPlan).forEach(function (k) {
        var s = R.panelB.byPlan[k];
        byPlan[k] = { participants: s.participants, purchasablePool: s.purchasablePool,
          modeledParticipants: s.modeledParticipants, years: s.years,
          meanYears: s.meanYears, meanDeficit: s.meanDeficit,
          meanAcceleration: s.meanAcceleration, price: s.price,
          valueSub: s.valueSub, valueWte: s.valueWte, valueBlended: s.valueBlended,
          netLiability: s.netLiability, bpContribution: s.bpContribution,
          modelMeanSalary: s.modelMeanSalary, meanSalary: s.meanSalary };
      });
      var byEmp = {};
      ['ST', 'TC', 'PS'].forEach(function (e) {
        var a = R.panelB.byEmployer[e];
        byEmp[e] = { participants: a.participants, price: a.price,
          netLiability: a.netLiability, bp: a.bp, payroll: a.payroll,
          erDbRate: a.erDbRate, erDbRateWithImpact: a.erDbRateWithImpact };
      });
      return {
        params: p,
        combined: R.panelB.combined,
        byPlan: byPlan, byEmployer: byEmp,
        panelA: { totalParticipants: R.panelA.totalParticipants,
          totalYears: R.panelA.totalYears, meanYears: R.panelA.meanYears,
          memberAncPayments: R.panelA.memberAncPayments,
          planKeys: Object.keys(R.panelA.byPlan) },
        workforce: R.panelC.combined,
        ladder: R.panelC.replacementLadder,
        panelD: R.panelD,
        ancillary: { hicPvEstimate: R.ancillary.hicPvEstimate,
          colaQuantified: R.ancillary.colaQuantified },
        funnel: R.panelG.steps.map(function (s) {
          return { label: s.label, value: s.value, provenance: s.provenance };
        }),
        funnelDirect: R.panelG.directEntry,
        memberA: { pricePaid: A.pricePaid, yearsPurchased: A.yearsPurchased,
          propAge: A.propAge, wteAge: A.wteAge, accelerationYears: A.accelerationYears,
          propAnnual: A.propAnnual, subAnnual: A.subAnnual, valueSub: A.valueSub,
          valueWte: A.valueWte, netSub: A.netSub, netWte: A.netWte,
          netBlended: A.netBlended, gainsOnBlend: A.gainsOnBlend, phi: A.phi,
          priceBase: A.priceBase, ancRate: A.ancRate, propService: A.propService,
          subFactor: A.subFactor, deficit: A.deficit },
        memberD: { pricePaid: D.pricePaid, yearsPurchased: D.yearsPurchased,
          propAge: D.propAge, accelerationYears: D.accelerationYears,
          propAnnual: D.propAnnual, valueSub: D.valueSub, valueWte: D.valueWte,
          netBlended: D.netBlended, gainsOnBlend: D.gainsOnBlend }
      };
    },

    /* Does each panel actually SHOW the number the model produced for the
       inputs the controls visibly hold? One entry per assertion. */
    rendered: function () {
      var m = probe.model(), t = probe.panelText(), out = [];
      var C = m.combined, w = m.workforce;
      function want(panel, label, str) {
        out.push({ panel: panel, label: label, want: str,
          ok: t[panel].indexOf(str) >= 0 });
      }
      var plans = m.panelA.planKeys;

      /* Panel A */
      want('a', 'Plan 1 participants', num(m.byPlan.P1.participants, 0));
      want('a', 'Plan 2 participants', num(m.byPlan.P2.participants, 0));
      want('a', 'total participants', num(m.panelA.totalParticipants, 0));
      want('a', 'average bridge credit', m.panelA.meanYears.toFixed(2));
      want('a', 'total years/points', num(m.panelA.totalYears, 0));
      want('a', 'member ANC payments', usdM(m.panelA.memberAncPayments));
      want('a', 'P1 purchasable pool', num(m.byPlan.P1.purchasablePool, 0));
      want('a', 'P2 purchasable pool', num(m.byPlan.P2.purchasablePool, 0));
      if (plans.indexOf('HY') >= 0) {
        want('a', 'hybrid participants', num(m.byPlan.HY.participants, 0));
      }

      /* Panel B */
      want('b', 'value of acceleration (blended)', usdM(C.valueBlended));
      want('b', 'value (frozen-service)', usdM(C.valueSub));
      want('b', 'value (work-to-eligibility)', usdM(C.valueWte));
      want('b', 'member ANC payments received', usdM(C.price));
      want('b', 'modeled pension impact', usdM(C.netLiability));
      want('b', 'combined rate impact', bp(C.bp));
      want('b', 'phi shown on the hero tile', 'φ = ' + m.params.phi.toFixed(2));
      plans.forEach(function (k) {
        want('b', k + ' price', usdM(m.byPlan[k].price));
        want('b', k + ' net liability', usdM(m.byPlan[k].netLiability));
        want('b', k + ' rate contribution', bp(m.byPlan[k].bpContribution, 3));
      });
      ['ST', 'TC', 'PS'].forEach(function (e) {
        want('b', e + ' rate impact', bp(m.byEmployer[e].bp));
        want('b', e + ' published rate', pct(m.byEmployer[e].erDbRate, 2));
        want('b', e + ' rate incl. impact', pct(m.byEmployer[e].erDbRateWithImpact, 2));
      });

      /* Panel C */
      want('c', 'departing payroll', usdM(w.departingPayroll));
      want('c', 'replacement payroll', usdM(w.replacementPayroll));
      want('c', 'lower-paid differential', usdM(w.lowerPaidDiff));
      want('c', 'positions not replaced', usdM(w.notReplacedPayroll));
      want('c', 'vacancy effect', usdM(w.vacancyPayroll));
      want('c', 'employer contribution difference', usdM(w.erContribDiff));
      want('c', 'payroll effect total', usdM(w.total));
      want('c', 'replacement pct on the tile', pct(m.params.replacementPct, 0));
      m.ladder.forEach(function (r) {
        want('c', 'ladder ' + (r.pct * 100).toFixed(0) + '% total', usdM(r.total));
      });

      /* Panel D — the three totals, never merged */
      want('d', 'pension impact', usdM(m.panelD.pensionImpact));
      want('d', 'payroll/workforce effect', usdM(m.panelD.payrollWorkforceEffect));
      want('d', 'combined scenario effect', usdM(m.panelD.combinedScenarioEffect));
      want('d', 'pension bp', bp(m.panelD.pensionBp));

      /* Panel E — both worked members */
      [['A', m.memberA], ['D', m.memberD]].forEach(function (pair) {
        var c = pair[1], id = pair[0];
        want('e', id + ': ANC paid', usd(c.pricePaid));
        want('e', id + ': bridge amount purchased', c.yearsPurchased.toFixed(2));
        want('e', id + ': bridge retirement age', c.propAge.toFixed(2));
        want('e', id + ': years of acceleration', c.accelerationYears.toFixed(2));
        want('e', id + ': allowance under the bridge', usd(c.propAnnual));
        want('e', id + ': value frozen-service', usd(c.valueSub));
        want('e', id + ': value work-to-eligibility', usd(c.valueWte));
        want('e', id + ': net on the blend', usd(c.netBlended));
        want('e', id + ': verdict', c.gainsOnBlend ? 'Gains' : 'Overpays');
      });
      want('e', 'A: current-law retirement age', m.memberA.wteAge.toFixed(2));

      /* Panel G — funnel values and provenance badges */
      m.funnel.forEach(function (s, i) {
        want('g', 'funnel step ' + (i + 1), num(s.value, s.value < 100 ? 1 : 0));
        want('g', 'funnel step ' + (i + 1) + ' provenance', s.provenance);
      });

      /* HIC / COLA */
      want('hc', 'HIC present value', usdM(m.ancillary.hicPvEstimate));
      want('hc', 'COLA never quantified', 'Not quantified');

      return { model: m, raw: probe.raw(), checks: out, text: t };
    },

    /* The downloadable handout and CSV are deliverables in their own right;
       capture what they would contain without writing to disk. */
    capture: function (which) {
      var captured = null;
      var realCreate = URL.createObjectURL;
      var realClick = HTMLAnchorElement.prototype.click;
      var pending = [];
      URL.createObjectURL = function (blob) { pending.push(blob); return 'blob:captured'; };
      HTMLAnchorElement.prototype.click = function () { captured = this.download; };
      try { $(which === 'csv' ? 'btn-csv' : 'btn-handout').click(); } finally {
        URL.createObjectURL = realCreate;
        HTMLAnchorElement.prototype.click = realClick;
      }
      if (!pending.length) return Promise.resolve({ name: captured, text: null });
      return pending[0].text().then(function (txt) {
        return { name: captured, text: txt, type: pending[0].type };
      });
    }
  };

  window.__T = probe;
  return 'ok';
})();
