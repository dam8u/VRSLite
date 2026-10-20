/* =====================================================================
   Military Service Retirement Bridge — Legislative Scenario Explorer
   PRESENTATION LAYER

   Reads from VRSEngine and writes to the DOM. Contains no actuarial or
   fiscal arithmetic of its own — every number on screen comes back from the
   engine, so the interface cannot quietly disagree with the model.

   Output-naming discipline (js/registry.js → outputLabels): nothing is ever
   labelled "savings". Pension, payroll, workforce and combined effects are
   named as modeled effects and are never merged.
   ===================================================================== */
(function () {
  'use strict';

  var E = window.VRSEngine.init(window.VRS_BASELINE, window.VRS_CELLS);
  var REG = window.VRS_REGISTRY;
  var B = window.VRS_BASELINE;
  var L = REG.outputLabels;

  var state = Object.assign({}, E.defaults());
  var lastResult = null, lastTornado = null, activePreset = 'central';

  /* Theme choice is shared with methodology.html, which is a separate document. */
  var THEME_KEY = 'vrs-explorer-theme';
  try {
    var savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
  } catch (e) { /* storage unavailable; the system preference applies */ }

  /* ------------------------------------------------------------ formatting */
  function usd(x, dp) {
    var n = Math.abs(x) < 0.5 ? 0 : x;
    return (n < 0 ? '−$' : '$') + Math.abs(n).toLocaleString('en-US',
      { minimumFractionDigits: dp || 0, maximumFractionDigits: dp || 0 });
  }
  function usdM(x) {
    if (Math.abs(x) < 1e6) return usd(Math.round(x / 1000) * 1000);
    if (Math.abs(x) >= 1e9) {
      return (x < 0 ? '−$' : '$') + (Math.abs(x) / 1e9).toFixed(2) + 'bn';
    }
    return (x < 0 ? '−$' : '$') + (Math.abs(x) / 1e6).toFixed(2) + 'M';
  }
  function num(x, dp) {
    return x.toLocaleString('en-US',
      { minimumFractionDigits: dp === undefined ? 0 : dp,
        maximumFractionDigits: dp === undefined ? 0 : dp });
  }
  function pct(x, dp) { return (x * 100).toFixed(dp === undefined ? 1 : dp) + '%'; }
  function bp(x) {
    var n = Math.abs(x) < 0.0005 ? 0 : x;
    return (n < 0 ? '−' : '') + Math.abs(n).toFixed(2) + ' bp';
  }
  function bp3(x) {
    var n = Math.abs(x) < 0.00005 ? 0 : x;
    return (n < 0 ? '−' : '') + Math.abs(n).toFixed(3) + ' bp';
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function $(id) { return document.getElementById(id); }

  /* Glossary term → tooltip-bearing span. */
  function g(term, display) {
    var e = REG.glossary[term.toLowerCase()];
    if (!e) return esc(display || term);
    return '<abbr class="tipped" title="' + esc(e.short + ' ' + e.long) + '">' +
      esc(display || term) + '</abbr>';
  }
  var PROV = {
    'Published Fact': ['prov-fact', '●'],
    'Derived Estimate': ['prov-derived', '◑'],
    'Scenario Assumption': ['prov-assumption', '○']
  };
  function provBadge(kind) {
    var p = PROV[kind] || PROV['Scenario Assumption'];
    return '<span class="prov ' + p[0] + '"><span class="ic">' + p[1] + '</span>' +
      esc(kind) + '</span>';
  }

  /* ------------------------------------------------------------- tooltip */
  var tipEl = $('tooltip');
  function showTip(html, ev) {
    tipEl.innerHTML = html;
    tipEl.classList.add('on');
    var r = tipEl.getBoundingClientRect();
    var x = ev.clientX + 14, y = ev.clientY + 14;
    if (x + r.width > window.innerWidth - 8) x = ev.clientX - r.width - 14;
    if (y + r.height > window.innerHeight - 8) y = ev.clientY - r.height - 14;
    tipEl.style.left = Math.max(8, x) + 'px';
    tipEl.style.top = Math.max(8, y) + 'px';
  }
  function hideTip() { tipEl.classList.remove('on'); }
  function tipRows(title, rows) {
    return '<span class="tt-t">' + esc(title) + '</span>' + rows.map(function (r) {
      return '<span class="tt-r"><span>' + esc(r[0]) + '</span><span>' + r[1] + '</span></span>';
    }).join('');
  }

  /* --------------------------------------------------------- chart helpers */
  /* 4px rounded data-end anchored to the baseline; the other end stays square
     against the axis, per the mark spec. */
  function hBarPath(x0, y, w, h) {
    var dir = w < 0 ? -1 : 1, aw = Math.abs(w);
    var r = Math.min(4, aw, h / 2);
    if (aw < 0.4) return '';
    var xe = x0 + dir * aw;
    if (dir > 0) {
      return 'M' + x0 + ' ' + y + 'H' + (xe - r) + 'Q' + xe + ' ' + y + ' ' + xe + ' ' +
        (y + r) + 'V' + (y + h - r) + 'Q' + xe + ' ' + (y + h) + ' ' + (xe - r) + ' ' +
        (y + h) + 'H' + x0 + 'Z';
    }
    return 'M' + x0 + ' ' + y + 'H' + (xe + r) + 'Q' + xe + ' ' + y + ' ' + xe + ' ' +
      (y + r) + 'V' + (y + h - r) + 'Q' + xe + ' ' + (y + h) + ' ' + (xe + r) + ' ' +
      (y + h) + 'H' + x0 + 'Z';
  }
  function vBarPath(x, yBase, hh, w) {
    var ah = Math.abs(hh), r = Math.min(4, w / 2, ah);
    if (ah < 0.4) return '';
    var yt = hh < 0 ? yBase : yBase - ah;
    if (hh >= 0) {
      return 'M' + x + ' ' + yBase + 'V' + (yt + r) + 'Q' + x + ' ' + yt + ' ' +
        (x + r) + ' ' + yt + 'H' + (x + w - r) + 'Q' + (x + w) + ' ' + yt + ' ' +
        (x + w) + ' ' + (yt + r) + 'V' + yBase + 'Z';
    }
    var yb = yBase + ah;
    return 'M' + x + ' ' + yBase + 'V' + (yb - r) + 'Q' + x + ' ' + yb + ' ' +
      (x + r) + ' ' + yb + 'H' + (x + w - r) + 'Q' + (x + w) + ' ' + yb + ' ' +
      (x + w) + ' ' + (yb - r) + 'V' + yBase + 'Z';
  }
  function svgOpen(w, h, label) {
    return '<svg class="chart" viewBox="0 0 ' + w + ' ' + h + '" width="100%" ' +
      'height="' + h + '" role="img" aria-label="' + esc(label) + '" ' +
      'preserveAspectRatio="xMinYMin meet">';
  }
  function legend(items) {
    return '<div class="legend">' + items.map(function (it) {
      return '<span class="item"><span class="box" style="background:' + it[1] +
        '"></span>' + esc(it[0]) + '</span>';
    }).join('') + '</div>';
  }
  function niceMax(v) {
    if (v <= 0) return 1;
    var mag = Math.pow(10, Math.floor(Math.log10(v))), n = v / mag;
    return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * mag;
  }
  /* charts re-bind their own hover handlers after each render */
  function bindHover(root) {
    root.querySelectorAll('[data-tip]').forEach(function (el) {
      el.addEventListener('mousemove', function (ev) { showTip(el.getAttribute('data-tip'), ev); });
      el.addEventListener('mouseleave', hideTip);
    });
  }

  /* --------------------------------------------------------- table builder */
  function table(caption, head, rows, opts) {
    opts = opts || {};
    var h = '<table class="dt"><caption>' + caption + '</caption><thead><tr>' +
      head.map(function (c) { return '<th>' + c + '</th>'; }).join('') +
      '</tr></thead><tbody>';
    rows.forEach(function (r) {
      var cls = r.total ? ' class="total"' : '';
      h += '<tr' + cls + '>' + r.cells.map(function (c, i) {
        var td = (i > 0 && typeof c === 'string' && c.indexOf('−') === 0) ? ' class="neg"' : '';
        return '<td' + td + '>' + c + '</td>';
      }).join('') + '</tr>';
    });
    return h + '</tbody></table>';
  }

  /* ==================================================================== */
  /*  PANEL A — participants                                              */
  /* ==================================================================== */
  function renderA(R) {
    var a = R.panelA, P1 = a.byPlan.P1, P2 = a.byPlan.P2, HY = a.byPlan.HY;
    var tiles = [
      ['accent-1', 'Plan 1 participants', num(P1.participants, 0),
       'from a purchasable pool of ' + num(P1.purchasablePool, 0)],
      ['accent-2', 'Plan 2 participants', num(P2.participants, 0),
       'from a purchasable pool of ' + num(P2.purchasablePool, 0)],
      ['accent-3', 'Total participants', num(a.totalParticipants, 0),
       'cumulative FY2029–FY2038'],
      ['accent-mute', 'Average bridge credit purchased', a.meanYears.toFixed(2),
       'years (Plan 1) / points (Plan 2)'],
      ['accent-mute', 'Total years / points purchased', num(a.totalYears, 0), ''],
      ['accent-mute', 'Estimated member ' + g('approximate normal cost', 'ANC') + ' payments',
       usdM(a.memberAncPayments), 'paid in by members']
    ];
    if (HY) {
      tiles.splice(2, 0, ['accent-mute', 'Hybrid participants (not the bill)',
        num(HY.participants, 0), 'separate scenario only']);
    }
    $('a-tiles').innerHTML = tiles.map(function (t) {
      return '<div class="tile ' + t[0] + '"><span class="k">' + t[1] +
        '</span><span class="v' + (String(t[2]).length > 9 ? ' sm' : '') + '">' +
        t[2] + '</span>' + (t[3] ? '<span class="u">' + t[3] + '</span>' : '') + '</div>';
    }).join('');

    var plans = HY ? ['P1', 'P2', 'HY'] : ['P1', 'P2'];
    var rows = plans.map(function (k) {
      var s = a.byPlan[k];
      return { cells: [
        '<span class="swatch" style="background:' + planColor(k) + '"></span>' + planNameHtml(k),
        num(s.purchasablePool, 0), num(s.participants, 1), s.meanYears.toFixed(2),
        num(s.years, 0), s.meanAcceleration.toFixed(2), usd(s.pricePerParticipant),
        usdM(s.price)] };
    });
    rows.push({ total: true, cells: ['Combined', num(plans.reduce(function (t, k) {
      return t + a.byPlan[k].purchasablePool; }, 0), 0),
      num(a.totalParticipants, 1), a.meanYears.toFixed(2), num(a.totalYears, 0),
      R.panelB.combined.meanAcceleration.toFixed(2),
      usd(R.panelB.combined.participants > 0
        ? R.panelB.combined.price / R.panelB.combined.participants : 0),
      usdM(a.memberAncPayments)] });
    $('a-table').innerHTML = table(
      'Plan 1 and Plan 2 are computed separately and combined only in the final row. ' +
      'One bridge year does not create the same acceleration in both plans.',
      ['Benefit structure', 'Purchasable pool', 'Participants', 'Mean credit bought',
       'Total years/points', 'Mean acceleration (yrs)', 'ANC paid per member',
       'Member ANC payments'], rows);
  }
  function planColor(k) {
    return k === 'P1' ? 'var(--series-1)' : k === 'P2' ? 'var(--series-2)' : 'var(--series-3)';
  }
  function planName(k) {
    return k === 'P1' ? 'Plan 1 (§ 51.1-153 B 2)'
      : k === 'P2' ? 'Plan 2 (Rule of 90)' : 'Hybrid (not the bill)';
  }
  /* planName() is also used inside esc() for chart tooltips, where markup
     would be shown literally, so the glossary link lives in a separate
     HTML-only variant used in the table cells. */
  function planNameHtml(k) {
    return k === 'P2' ? 'Plan 2 (' + g('rule of 90', 'Rule of 90') + ')' : planName(k);
  }

  /* ==================================================================== */
  /*  PANEL B — pension-system impact                                     */
  /* ==================================================================== */
  function renderB(R) {
    var C = R.panelB.combined, p = R.params;
    $('b-hero').innerHTML = [
      ['accent-1', 'Value of accelerated unreduced retirement',
       usdM(C.valueBlended), 'blended at ' + g('behavioural assumption', 'φ') +
       ' = ' + p.phi.toFixed(2) +
       ' &mdash; ' + usdM(C.valueSub) + ' frozen-service / ' + usdM(C.valueWte) +
       ' work-to-eligibility'],
      ['accent-2', 'Member ANC payments received', usdM(C.price),
       C.costRecovery !== null ? 'recovers ' + C.costRecovery.toFixed(0) +
       '% of the value conferred' : ''],
      ['accent-3', L.pension + ' (' + g('pension liability', 'net liability change') +
       ') ' + provBadge('Scenario Assumption'), usdM(C.netLiability),
       'value conferred less member payments'],
      ['accent-mute', 'Employer contribution-rate impact ' +
       provBadge('Scenario Assumption'), bp(C.bp),
       g('employer contribution-rate basis points', 'basis points') +
       ' on ' + usdM(C.aggregatePayroll) + ' of covered payroll']
    ].map(function (t) {
      return '<div class="tile ' + t[0] + '"><span class="k">' + t[1] +
        '</span><span class="v">' + t[2] + '</span>' +
        (t[3] ? '<span class="u">' + t[3] + '</span>' : '') + '</div>';
    }).join('');

    /* grouped bar: price in, value out, net impact — by benefit structure */
    var plans = R.panelA.byPlan.HY ? ['P1', 'P2', 'HY'] : ['P1', 'P2'];
    var cats = plans.concat(['ALL']);
    var series = [
      ['Member ANC payments in', 'var(--series-1)', function (k) {
        return k === 'ALL' ? C.price : R.panelB.byPlan[k].price; }],
      ['Value of acceleration conferred', 'var(--series-2)', function (k) {
        return k === 'ALL' ? C.valueBlended : R.panelB.byPlan[k].valueBlended; }],
      [L.pension, 'var(--series-3)', function (k) {
        return k === 'ALL' ? C.netLiability : R.panelB.byPlan[k].netLiability; }]
    ];
    var maxV = 0;
    cats.forEach(function (k) { series.forEach(function (s) { maxV = Math.max(maxV, s[2](k)); }); });
    var top = niceMax(maxV), W = 840, padL = 176, padR = 96, padT = 8;
    var rowH = 20, gap = 2, grpGap = 14;
    var H = padT + cats.length * (series.length * (rowH + gap) + grpGap) + 24;
    var sx = function (v) { return padL + (v / top) * (W - padL - padR); };

    var h = svgOpen(W, H, 'Price, value and net pension impact by benefit structure');
    [0, 0.25, 0.5, 0.75, 1].forEach(function (f) {
      var x = sx(top * f);
      h += '<line class="gridline" x1="' + x + '" y1="' + padT + '" x2="' + x +
        '" y2="' + (H - 24) + '"/>';
      h += '<text x="' + x + '" y="' + (H - 9) + '" text-anchor="middle">' +
        usdM(top * f) + '</text>';
    });
    var y = padT;
    cats.forEach(function (k) {
      var gy = y;
      series.forEach(function (s) {
        var v = s[2](k), bw = sx(v) - padL;
        h += '<path class="bar" data-tip="' + esc(tipRows(
          (k === 'ALL' ? 'Combined' : planName(k)), [[s[0], usdM(v)]])) +
          '" d="' + hBarPath(padL, y, bw, rowH) + '" fill="' + s[1] + '"/>';
        h += '<text class="lbl-val" x="' + (sx(v) + 6) + '" y="' + (y + rowH - 6) +
          '">' + usdM(v) + '</text>';
        y += rowH + gap;
      });
      h += '<text class="lbl-cat" x="' + (padL - 10) + '" y="' +
        (gy + (series.length * (rowH + gap)) / 2 + 3) + '" text-anchor="end">' +
        esc(k === 'ALL' ? 'Combined' : planName(k).replace(/ \(.*/, '')) + '</text>';
      y += grpGap;
    });
    h += '<line class="baseline" x1="' + padL + '" y1="' + padT + '" x2="' + padL +
      '" y2="' + (H - 24) + '"/></svg>';
    $('b-plan-chart').innerHTML = legend(series.map(function (s) { return [s[0], s[1]]; })) + h;
    bindHover($('b-plan-chart'));

    var rows = plans.map(function (k) {
      var s = R.panelB.byPlan[k];
      return { cells: [
        '<span class="swatch" style="background:' + planColor(k) + '"></span>' + planNameHtml(k),
        num(s.participants, 1), usdM(s.price), usdM(s.valueSub), usdM(s.valueWte),
        usdM(s.valueBlended), usdM(s.netLiability), bp3(s.bpContribution)] };
    });
    rows.push({ total: true, cells: ['Combined', num(C.participants, 1), usdM(C.price),
      usdM(C.valueSub), usdM(C.valueWte), usdM(C.valueBlended),
      usdM(C.netLiability), bp3(C.bp)] });
    $('b-plan-table').innerHTML = table(
      'The benefit-structure basis-point figures are each structure’s additive ' +
      'contribution to the combined rate (its liability over combined covered payroll), ' +
      'so they sum to the combined figure.',
      ['Benefit structure', 'Participants', 'Member payments in',
       'Value (frozen-service)', 'Value (work-to-eligibility)',
       'Value (blended)', L.pension, 'Rate contribution'], rows);

    var erows = ['ST', 'TC', 'PS'].map(function (e) {
      var a = R.panelB.byEmployer[e];
      return { cells: [esc(a.label), num(a.participants, 1), usdM(a.payroll),
        usdM(a.price), usdM(a.netLiability), bp(a.bp), pct(a.erDbRate, 2),
        pct(a.erDbRateWithImpact, 2)] };
    });
    erows.push({ total: true, cells: ['Combined', num(C.participants, 1),
      usdM(C.aggregatePayroll), usdM(C.price), usdM(C.netLiability), bp(C.bp), '—', '—'] });
    $('b-emp-table').innerHTML = table(
      'Employer DB rates are the FY2027–FY2028 certified rates (SRC-15). The ' +
      'liability layer is amortized as a level percent of payroll over the published ' +
      '20-year period (ASM-20) — VRS’s method, not VRS’s calculation.',
      ['Employer plan', 'Participants', 'Covered payroll', 'Member payments in',
       L.pension, 'Rate impact', 'Published rate', 'Rate incl. impact'], erows);

    var same = ['ST', 'TC', 'PS'].every(function (e) {
      var a = R.panelB.byEmployer[e];
      return Math.abs(a.erDbRate - a.erDbRateWithImpact) < 0.00005;
    });
    $('b-note').innerHTML =
      '<p><strong>Every basis-point figure on this panel is the modeled ' +
      'retirement-plan employer contribution impact. It excludes the separately ' +
      'funded health insurance credit and COLA effects, including unquantified ' +
      'COLA exposure.</strong> The fiscal model is complete for bill version 1.1; ' +
      'a version 1.2 refresh is required before external use.</p>' +
      (same ? '<p>At these assumptions, <strong>to the nearest basis point no ' +
       'plan’s employer contribution rate changes</strong> — about ' +
       num(C.participants, 0) + ' purchasers against ' + usdM(C.aggregatePayroll) +
       ' of covered payroll.</p>' : '') +
      '<p>The <strong>sign of the per-member result depends on φ</strong>, on ' +
      'which no published data bears. At φ = 0 every purchaser is treated as ' +
      'leaving anyway and is subsidised; at φ = 1 every purchaser is treated as ' +
      'having worked on, and purchasers overpay. The aggregate modeled pension ' +
      'impact crosses zero at approximately <strong>φ = 0.84</strong>.</p>' +
      (Math.abs(p.phi - 0.5) < 1e-9
        ? '<p><strong>The central-case result is entirely a Plan 1 result.</strong> ' +
          'Plan 2 purchasers in aggregate pay approximately ' +
          usdM(Math.abs(R.panelB.byPlan.P2.netLiability)) + ' more than the value ' +
          'they receive because one purchased Rule-of-90 point buys only half a ' +
          'year of acceleration.</p>' : '') +
      (p.phi < 0.25 || p.phi > 0.75
        ? '<p><strong>Outside documented φ range.</strong> ASM-22 documents 0.25–0.75; ' +
          'this control permits exploration from 0 to 1. Purchaser counts are ' +
          '<strong>not re-estimated</strong> when φ moves.</p>' : '');
  }

  /* ==================================================================== */
  /*  PANEL C — workforce / payroll                                       */
  /* ==================================================================== */
  function renderC(R) {
    var w = R.panelC.combined, p = R.params;
    $('c-tiles').innerHTML = [
      ['accent-mute', 'Departing member payroll over the acceleration window',
       usdM(w.departingPayroll), 'present value; <strong>never</strong> a saving by itself'],
      ['accent-mute', 'Replacement payroll', usdM(w.replacementPayroll),
       'at ' + pct(p.replacementPct, 0) + ' of departing compensation'],
      ['accent-1', 'Payroll difference from lower-paid replacements',
       usdM(w.lowerPaidDiff), p.replacementPct >= 1
         ? (Math.abs(w.total) < 0.5
           ? '<strong>zero with no vacancy or eliminated positions</strong>'
           : '<strong>lower-paid differential is zero; the nonzero total below is ' +
             'vacancy, eliminated positions, and related contributions</strong>')
         : 'the differential only'],
      ['accent-2', 'Payroll on positions not replaced', usdM(w.notReplacedPayroll),
       pct(p.notReplacedPct, 1) + ' eliminated &mdash; a workforce decision, not a pension effect'],
      ['accent-3', 'Temporary vacancy effect', usdM(w.vacancyPayroll),
       p.vacancyMonths + ' month(s) &mdash; one-off, not a recurring saving'],
      ['accent-mute', 'Employer retirement contribution difference',
       usdM(w.erContribDiff), 'at the published employer DB rates'],
      ['accent-mute', g('payroll effect', L.payroll) + ' — total ' +
       provBadge('Scenario Assumption'), usdM(w.total),
       '<strong>not a pension saving</strong>']
    ].map(function (t) {
      return '<div class="tile ' + t[0] + '"><span class="k">' + t[1] +
        '</span><span class="v sm">' + t[2] + '</span><span class="u">' + t[3] +
        '</span></div>';
    }).join('');

    /* replacement ladder — single series, vertical bars, selected emphasised */
    var lad = R.panelC.replacementLadder;
    var top = niceMax(Math.max.apply(null, lad.map(function (r) { return r.total; })) || 1);
    var W = 760, padL = 74, padR = 16, padT = 26, padB = 44;
    var H = 240, bw = 56, slot = (W - padL - padR) / lad.length;
    var sy = function (v) { return H - padB - (v / top) * (H - padT - padB); };
    var h = svgOpen(W, H, 'Modeled payroll effect at each replacement salary percentage');
    [0, 0.25, 0.5, 0.75, 1].forEach(function (f) {
      var yy = sy(top * f);
      h += '<line class="gridline" x1="' + padL + '" y1="' + yy + '" x2="' + (W - padR) +
        '" y2="' + yy + '"/><text x="' + (padL - 8) + '" y="' + (yy + 4) +
        '" text-anchor="end">' + usdM(top * f) + '</text>';
    });
    lad.forEach(function (r, i) {
      var x = padL + i * slot + (slot - bw) / 2;
      var hh = (H - padB) - sy(r.total);
      h += '<path class="bar" data-tip="' + esc(tipRows(
        pct(r.pct, 0) + ' replacement salary',
        [['Lower-paid differential', usdM(r.lowerPaidDiff)],
         ['Employer contribution diff.', usdM(r.erContribDiff)],
         ['Positions not replaced', usdM(r.notReplacedPayroll)],
         ['Vacancy effect', usdM(r.vacancyPayroll)],
         [L.payroll + ' total', usdM(r.total)]])) +
        '" d="' + vBarPath(x, H - padB, hh, bw) + '" fill="var(--series-1)" ' +
        'opacity="' + (r.selected ? 1 : 0.4) + '"' +
        (r.selected ? ' stroke="var(--surface-1)" stroke-width="2"' : '') + '/>';
      h += '<text class="lbl-val" x="' + (x + bw / 2) + '" y="' + (sy(r.total) - 7) +
        '" text-anchor="middle">' + usdM(r.total) + '</text>';
      h += '<text class="lbl-cat" x="' + (x + bw / 2) + '" y="' + (H - padB + 16) +
        '" text-anchor="middle">' + pct(r.pct, 0) + '</text>';
    });
    h += '<text x="' + padL + '" y="' + (H - 8) + '" class="lbl-cat">' +
      'Replacement salary as a % of departing compensation</text>';
    h += '<line class="baseline" x1="' + padL + '" y1="' + (H - padB) + '" x2="' +
      (W - padR) + '" y2="' + (H - padB) + '"/></svg>';
    $('c-chart').innerHTML = h;
    bindHover($('c-chart'));

    $('c-ladder-table').innerHTML = table(
      'Required reading of the payroll effect at each replacement percentage. At 100% ' +
      'the lower-paid differential and the employer contribution difference are both ' +
      'zero; anything remaining is the separately-identified non-replacement and ' +
      'vacancy effect.',
      ['Replacement salary', 'Lower-paid differential', 'Employer contribution diff.',
       'Positions not replaced', 'Vacancy effect', L.payroll + ' total'],
      lad.map(function (r) {
        return { total: r.selected, cells: [
          pct(r.pct, 0) + (r.selected ? ' <span class="pill live">selected</span>' : ''),
          usdM(r.lowerPaidDiff), usdM(r.erContribDiff),
          usdM(r.notReplacedPayroll), usdM(r.vacancyPayroll), usdM(r.total)] };
      }));

    var rows = ['ST', 'TC', 'PS'].map(function (e) {
      var r = R.panelC.byEmployer[e];
      return { cells: [esc(r.label), usdM(r.departingPayroll), usdM(r.replacementPayroll),
        usdM(r.lowerPaidDiff), usdM(r.notReplacedPayroll), usdM(r.vacancyPayroll),
        usdM(r.erContribDiff), usdM(r.total)] };
    });
    rows.push({ total: true, cells: ['Combined', usdM(w.departingPayroll),
      usdM(w.replacementPayroll), usdM(w.lowerPaidDiff), usdM(w.notReplacedPayroll),
      usdM(w.vacancyPayroll), usdM(w.erContribDiff), usdM(w.total)] });
    $('c-table').innerHTML = table(
      'All figures are present values over the acceleration window at the scenario ' +
      'discount rate.',
      ['Employer plan', 'Departing payroll', 'Replacement payroll',
       'Lower-paid differential', 'Not replaced', 'Vacancy', 'Employer contrib. diff.',
       L.payroll], rows);

    $('c-note').innerHTML =
      '<p><strong>These are employer workforce/payroll effects, not pension ' +
      'savings.</strong> The full salary of a retiring employee is never counted as ' +
      'a saving where the position is refilled. At 90% replacement only the 10% ' +
      'differential and the related employer-cost differential count. At 100% ' +
      'replacement <strong>with nothing eliminated and no vacancy</strong>, the ' +
      'payroll effect is exactly zero; otherwise the remaining effect is the ' +
      'separately identified non-replacement, vacancy, and related contribution ' +
      'effect.</p>' +
      '<p><strong>No dollar value is assigned</strong> to recruiting, onboarding, ' +
      'productivity ramp-up, institutional-knowledge loss or service-delivery ' +
      'effects, because no data supports one — and all of them run the other ' +
      'way. The honest statement is that the payroll effect is directionally ' +
      'favourable to the employer and <strong>quantitatively indeterminate</strong>. ' +
      'It should not be presented to a committee as a saving.</p>';
  }

  /* ==================================================================== */
  /*  PANEL D — combined view                                             */
  /* ==================================================================== */
  function renderD(R) {
    var d = R.panelD;
    var pensionReading = d.pensionImpact > 0.5
      ? 'a cost to the plan'
      : d.pensionImpact < -0.5
        ? 'a gain to the plan — at this φ purchasers pay more than the value received'
        : 'approximately neutral at this φ';
    $('d-hero').innerHTML = [
      ['accent-3', '1. ' + L.pension + ' ' + provBadge('Scenario Assumption'),
       usdM(d.pensionImpact), bp(d.pensionBp) + ' on employer contribution rates — ' +
       pensionReading],
      ['accent-1', '2. ' + L.payroll + ' / ' + L.workforce + ' ' +
       provBadge('Scenario Assumption'), usdM(d.payrollWorkforceEffect),
       'an employer compensation effect — <strong>not</strong> a pension saving'],
      ['accent-mute', '3. ' + L.combined + ' ' + provBadge('Scenario Assumption'),
       usdM(d.combinedScenarioEffect),
       'payroll effect less pension impact — the least reliable of the three']
    ].map(function (t) {
      return '<div class="tile ' + t[0] + '"><span class="k">' + t[1] +
        '</span><span class="v">' + t[2] + '</span><span class="u">' + t[3] +
        '</span></div>';
    }).join('');
    $('d-note').innerHTML =
      '<p><strong>Combined fiscal effect is a scenario result, not an actuarial ' +
      'certification or VRS fiscal impact statement.</strong></p>' +
      '<p>The three totals are different kinds of claim and are deliberately not ' +
      'merged into one headline. The pension figure is a modeled liability change on ' +
      'the plan. The payroll figure depends entirely on a hiring assumption the ' +
      'Commonwealth controls and which this model cannot observe. Adding them ' +
      'produces a number with the weaker component’s reliability, so read it ' +
      'last. Setting replacement to 100% with nothing eliminated — the ' +
      '<em>No Workforce Savings</em> preset — shows the pension impact standing ' +
      'alone, which is the figure a money committee should start from.</p>';
  }

  /* ==================================================================== */
  /*  PANEL E — member examples                                           */
  /* ==================================================================== */
  function renderE() {
    var html = '';
    var profileA = null;
    [['A', 'Plan 1'], ['D', 'Plan 2']].forEach(function (pair) {
      var c = E.memberExample(pair[0], state);
      if (pair[0] === 'A') profileA = c;
      var pr = B.profiles[pair[0]];
      var verdict = c.gainsOnBlend
        ? '<strong>Gains</strong> at φ = ' + c.phi.toFixed(2)
        : '<strong>Overpays</strong> at φ = ' + c.phi.toFixed(2);
      var rows = [
        ['Age at purchase', c.ageNow.toFixed(1)],
        ['Actual ' + g('creditable service') + ' at purchase', c.serviceNow.toFixed(1) + ' years'],
        ['Salary / ' + g('creditable service', 'AFC') + ' basis for the price', usd(c.priceBase)],
        [g('eligibility deficit', 'Eligibility deficit'),
          c.deficit.toFixed(1) + (pair[1] === 'Plan 1' ? ' years' : ' points')],
        ['Bridge ' + (pair[1] === 'Plan 1' ? 'years' : 'points') + ' purchased',
          c.yearsPurchased.toFixed(2)],
        [g('approximate normal cost', 'ANC') + ' paid by the member',
          '<strong>' + usd(c.pricePaid) + '</strong> (' + pct(c.ancRate, 2) + ' × ' +
          c.yearsPurchased.toFixed(2) + ' × ' + usd(c.priceBase) + ')'],
        ['Retirement age under current law', c.currentLawRetirementAge.toFixed(2)],
        ['Retirement age under the bridge', c.propAge.toFixed(2)],
        ['<strong>Years of acceleration</strong>',
          '<strong>' + c.accelerationYears.toFixed(2) + '</strong>'],
        ['Creditable service at retirement (bridge credit excluded)',
          c.propService.toFixed(2) + ' years'],
        ['Annual allowance &mdash; current law, same date, reduced',
          usd(c.subAnnual) + ' <span class="muted">(factor ' +
          c.subFactor.toFixed(3) + ', ' + esc(c.subRule) + ')</span>'],
        ['Annual allowance &mdash; under the bridge, ' + g('unreduced retirement', 'unreduced'),
          '<strong>' + usd(c.propAnnual) + '</strong>'],
        [g('present value', 'Present value') + ' of acceleration &mdash; ' +
          g('frozen-service baseline', 'frozen-service'),
          usd(c.valueSub) + ' <span class="muted">(net ' + usd(c.netSub) + ')</span>'],
        [g('present value', 'Present value') + ' of acceleration &mdash; ' +
          g('work-to-eligibility baseline', 'work-to-eligibility'),
          usd(c.valueWte) + ' <span class="muted">(net ' + usd(c.netWte) + ')</span>'],
        ['<strong>Gains or overpays on the selected behavioural baseline</strong>',
          verdict + ' &mdash; net ' + usd(c.netBlended)],
        ['Cost recovery / actuarially equivalent price',
          (c.recoverySub ? c.recoverySub.toFixed(1) + '% recovered; ' : '') +
          (c.breakevenRateSub ? g('actuarial equivalent cost',
            pct(c.breakevenRateSub, 1) + ' of salary per year') + ' would be needed' : '—')]
      ];
      html += '<h3>' + esc(pair[1]) + ' example &mdash; profile ' + pair[0] +
        ' <span class="pill">' + esc(pr.employer === 'ST' ? 'state employee'
          : pr.employer === 'TC' ? 'teacher' : 'political subdivision') + '</span></h3>' +
        '<p class="card-sub" style="margin-bottom:9px">' + esc(pr.note) + '</p>' +
        '<div class="table-wrap">' + table('', ['Item', 'Value'],
          rows.map(function (r) { return { cells: [r[0], r[1]] }; })) + '</div>';
    });
    html += '<div class="note"><p><strong>The member examples respond to the ' +
      'bridge-amount control and the selected actuarial assumptions.</strong> ' +
      'A negative present value means that retiring earlier is worth less than ' +
      'working on before the purchase price.</p><p><strong>The sign flips between the two ' +
      'baselines, and that is the central fact about this bill.</strong> A member ' +
      'who was leaving anyway receives a large subsidy; a member who would have ' +
      'worked on to unreduced eligibility pays more than the extra actuarial value ' +
      'received. Which group a real purchaser falls into is unobservable in any ' +
      'published data.</p><p>At the selected settings, illustrative profile A’s ' +
      'modeled net value above the purchase price under the frozen-service/subsidy ' +
      'scenario is <strong>' + usd(profileA.netSub) + '</strong>. At the published ' +
      'central assumptions it is <strong>$341,065</strong>, the most favorable of ' +
      'the seven published profiles—not a cost per veteran and not a model-wide ' +
      'maximum. The underlying cell grid reaches approximately <strong>$419,000</strong> ' +
      'in its most favorable single cell.</p></div>';
    $('e-body').innerHTML = html;
  }

  /* ==================================================================== */
  /*  PANEL F — tornado                                                   */
  /* ==================================================================== */
  function renderF(T) {
    var rows = T.rows, base = T.baseBp;
    var lo = Math.min.apply(null, rows.map(function (r) { return Math.min(r.lowBp, r.highBp); }).concat([base]));
    var hi = Math.max.apply(null, rows.map(function (r) { return Math.max(r.lowBp, r.highBp); }).concat([base]));
    var span = Math.max(hi - lo, 0.02), pad = span * 0.14;
    lo -= pad; hi += pad;
    var W = 840, padL = 232, padR = 76, padT = 10, rowH = 22, gapR = 8;
    var H = padT + rows.length * (rowH + gapR) + 28;
    var sx = function (v) { return padL + ((v - lo) / (hi - lo)) * (W - padL - padR); };

    var h = svgOpen(W, H, 'Tornado diagram of assumption sensitivity on the modeled pension impact');
    var ticks = 5;
    for (var i = 0; i <= ticks; i++) {
      var v = lo + (hi - lo) * i / ticks, x = sx(v);
      h += '<line class="gridline" x1="' + x + '" y1="' + padT + '" x2="' + x +
        '" y2="' + (H - 28) + '"/><text x="' + x + '" y="' + (H - 13) +
        '" text-anchor="middle">' + v.toFixed(2) + '</text>';
    }
    h += '<text x="' + padL + '" y="' + (H - 1) + '" class="lbl-cat">' +
      'Modeled pension impact, employer contribution-rate basis points</text>';
    var y = padT;
    rows.forEach(function (r) {
      var xb = sx(base), xl = sx(r.lowBp), xh = sx(r.highBp);
      var tip = esc(tipRows(r.label, [
        [r.lowLabel, bp(r.lowBp)], [r.highLabel, bp(r.highBp)],
        ['Current scenario', bp(base)],
        ['Swing on pension impact', bp(r.swing)],
        [L.payroll + ' swing', usdM(r.payrollSwing)]]));
      /* 2px surface gap at the midpoint keeps the two arms legible */
      if (Math.abs(xl - xb) > 1) {
        h += '<path class="bar" data-tip="' + tip + '" d="' +
          hBarPath(xb + (xl < xb ? -1 : 1), y, (xl - xb) - (xl < xb ? -1 : 1), rowH) +
          '" fill="var(--diverge-low)"' + (r.pensionNeutral ? ' opacity="0.33"' : '') + '/>';
      }
      if (Math.abs(xh - xb) > 1) {
        h += '<path class="bar" data-tip="' + tip + '" d="' +
          hBarPath(xb + (xh < xb ? -1 : 1), y, (xh - xb) - (xh < xb ? -1 : 1), rowH) +
          '" fill="var(--diverge-high)"' + (r.pensionNeutral ? ' opacity="0.33"' : '') + '/>';
      }
      var lab = r.pensionNeutral ? 'no pension effect' : bp(r.swing);
      h += '<text class="lbl-val" x="' + (W - padR + 6) + '" y="' + (y + rowH - 6) +
        '"' + (r.pensionNeutral ? ' opacity="0.6"' : '') + '>' + lab + '</text>';
      h += '<text class="lbl-cat" x="' + (padL - 10) + '" y="' + (y + rowH - 6) +
        '" text-anchor="end">' + esc(r.label) + '</text>';
      y += rowH + gapR;
    });
    h += '<line class="baseline" x1="' + sx(base) + '" y1="' + padT + '" x2="' +
      sx(base) + '" y2="' + (H - 28) + '" stroke-width="2"/></svg>';
    if (lo < 0 && hi > 0) {
      h = h.replace('</svg>', '<line class="baseline" x1="' + sx(0) + '" y1="' +
        padT + '" x2="' + sx(0) + '" y2="' + (H - 28) +
        '" stroke-dasharray="4 3"/><text x="' + (sx(0) + 4) + '" y="' +
        (H - 31) + '" class="lbl-cat">zero crossing</text></svg>');
    }
    $('f-chart').innerHTML =
      legend([['Lower modeled pension impact', 'var(--diverge-low)'],
              ['Higher modeled pension impact', 'var(--diverge-high)']]) + h;
    bindHover($('f-chart'));

    $('f-table').innerHTML = table(
      'Each driver moved one at a time from the current scenario. The two workforce ' +
      'drivers are shown faded because they move the payroll effect only — by ' +
      'design they cannot touch the pension impact. Drivers are not independent ' +
      'and these one-at-a-time swings cannot be added; moving take-up and the ' +
      'population funnel together spans approximately 0.02 to 1.11 basis points.',
      ['Driver', 'Low setting', 'Low', 'High setting', 'High',
       'Swing (pension)', 'Swing (' + L.payroll.toLowerCase() + ')'],
      rows.map(function (r) {
        return { cells: [esc(r.label), esc(r.lowLabel), bp(r.lowBp),
          esc(r.highLabel), bp(r.highBp),
          r.pensionNeutral ? '<span class="muted">none</span>' : bp(r.swing),
          usdM(r.payrollSwing)] };
      }));

    var topTwo = rows.filter(function (r) { return !r.pensionNeutral; }).slice(0, 2);
    $('f-note').innerHTML =
      '<p><strong>Only assumptions about people matter.</strong> At these settings ' +
      'the two largest drivers are <strong>' + topTwo.map(function (r) {
        return esc(r.label); }).join('</strong> and <strong>') + '</strong>. Every ' +
      'classical actuarial lever — discount rate, mortality improvement, ' +
      'salary growth — moves the answer far less. That is why the ' +
      'pre-introduction asks are for VRS <em>member-level data</em>, not for a ' +
      'different actuarial method.</p>' +
      '<p>The two workforce drivers move the payroll effect substantially and the ' +
      'pension impact not at all. Any presentation that lets the first stand in for ' +
      'the second is misleading.</p><p><strong>φ guard band:</strong> ASM-22’s ' +
      'documented range is 0.25–0.75, while the control and this tornado span 0–1 ' +
      'and expose the sign change near φ = 0.84. Purchaser counts are not ' +
      're-estimated as φ moves.</p>';
  }

  /* ==================================================================== */
  /*  PANEL G — population funnel                                         */
  /* ==================================================================== */
  function renderG(R) {
    var steps = R.panelG.steps, top = steps[0].value;
    $('g-funnel').innerHTML = steps.map(function (s, i) {
      var frac = Math.max(Math.sqrt(s.value / top), 0.004);
      return '<div class="funnel-row"><div class="funnel-label">' +
        '<strong>' + (i + 1) + '.</strong> ' + esc(s.label) + ' ' + provBadge(s.provenance) +
        '<span class="meta">' + esc(s.source) + '</span></div>' +
        '<div class="funnel-bar-wrap"><div class="funnel-bar" style="width:' +
        (frac * 76) + 'px"></div><span class="funnel-val">' +
        num(s.value, s.value < 100 ? 1 : 0) + '</span></div></div>';
    }).join('');
    $('g-note').innerHTML =
      '<p>Bar lengths are square-root scaled so the later steps stay visible against ' +
      'a first step of ' + num(top, 0) + '. <strong>Read the badges, not the ' +
      'bars.</strong> Only steps 1 and the state component of step 3 rest on a ' +
      'published figure; steps 4 through 8 are assumptions with no Virginia or VRS ' +
      'data behind them.</p>' +
      (R.panelG.directEntry
        ? '<p><strong>Participant counts are being entered directly</strong>, so the ' +
          'final step is your figure rather than the model’s. Steps 1 to 7 still ' +
          'show what the model estimates the eligible population to be — compare ' +
          'them against your entry.</p>'
        : '') +
      '<p><strong>The funnel is one of the two largest sources of uncertainty, ' +
      'alongside take-up.</strong> At the current settings its low and high cases ' +
      'move the aggregate from ' + bp((lastTornado && lastTornado.rows.filter(function (r) {
        return r.key === 'funnel'; })[0] || { lowBp: 0 }).lowBp) + ' to ' +
      bp((lastTornado && lastTornado.rows.filter(function (r) {
        return r.key === 'funnel'; })[0] || { highBp: 0 }).highBp) +
      '. It is also the part that VRS member-level data would replace ' +
      'outright — see <em>Official VRS data mode</em>.</p>';
  }

  /* ==================================================================== */
  /*  HIC & COLA                                                          */
  /* ==================================================================== */
  function renderAncillary(R) {
    var a = R.ancillary;
    $('hc-tiles').innerHTML = [
      ['accent-mute', g('health insurance credit', 'Health insurance credit') +
       ' — earlier commencement', usdM(a.hicPvEstimate),
       'illustrative, on a separately funded trust'],
      ['accent-mute', g('cola', 'COLA') + ' — earlier commencement',
       '<span class="muted">Not quantified</span>',
       'no figure in this model or the fiscal model'],
      ['accent-mute', 'Included in the basis-point figures above?',
       '<span class="muted">No</span>', 'both sit outside every rate figure shown']
    ].map(function (t) {
      return '<div class="tile ' + t[0] + '"><span class="k">' + t[1] +
        '</span><span class="v sm">' + t[2] + '</span><span class="u">' + t[3] +
        '</span></div>';
    }).join('');
    $('hc-note').innerHTML =
      '<p><strong>HIC and COLA follow the retirement date, so preventing earlier ' +
      'commencement would require separate statutory changes outside the bridge</strong> ' +
      '— to Chapter 14 and to § 51.1-166. The proposal <strong>deliberately ' +
      'accepts and discloses</strong> the earlier commencement rather than adding ' +
      'separate delay provisions (resolved October 20, 2026). Enactment clause 3(vi) ' +
      'directs the Board to report both costs, stated separately by trust.</p>' +
      '<p>' + esc(a.hicPerRetireeNote) + ' <strong>The COLA exposure is not ' +
      'quantified at all</strong>, and that is the one acknowledged gap in the fiscal ' +
      'case. It should be raised before a committee finds it.</p>';
  }

  /* ==================================================================== */
  /*  Registry                                                            */
  /* ==================================================================== */
  function renderRegistry() {
    var r = B.registry, html = '';
    html += '<h3>Published sources</h3><div class="table-wrap">' + table(
      'Every published document the model draws on.', ['Key', 'Document'],
      Object.keys(r.sources).map(function (k) {
        return { cells: ['<code>' + esc(k) + '</code>', esc(r.sources[k])] };
      })) + '</div>';

    var all = Object.assign({}, r.assumptions, r.extra_assumptions);
    var keys = Object.keys(all).sort();
    html += '<h3>Analytical assumptions</h3><div class="table-wrap">' + table(
      'Chosen by the modeler and not published. Each is labelled wherever it is used.',
      ['Key', 'Assumption'], keys.map(function (k) {
        return { cells: ['<code>' + esc(k) + '</code>', esc(all[k])] };
      })) + '</div>';

    html += '<h3>Plain-language glossary</h3><div class="table-wrap">' + table(
      'The terms used throughout the dashboard, as they are explained in the tooltips.',
      ['Term', 'Plain meaning'], Object.keys(REG.glossary).map(function (k) {
        var e = REG.glossary[k];
        return { cells: ['<strong>' + esc(k) + '</strong>',
          '<strong>' + esc(e.short) + '</strong> ' + esc(e.long)] };
      })) + '</div>';

    html += '<div class="note"><p>This registry is exported from the fiscal ' +
      'model’s own <code>inputs.py</code> at build time by ' +
      '<code>fiscal-model/calibrate_explorer.py</code>. It cannot drift from the ' +
      'model that produced the numbers. The browser engine is verified against the ' +
      'model’s committed CSV tables by ' +
      '<code>explorer/test/reconcile.js</code> — 98 assertions, including the ' +
      'illustrative profile A’s central-case $341,065 net value (the most ' +
      'favorable of seven published profiles, not a cost per veteran or a ' +
      'model-wide maximum) and the central-case combined employer contribution-rate ' +
      'impact. That 0.19 bp figure is the modeled retirement-plan employer ' +
      'contribution impact, excluding separately funded HIC and COLA effects ' +
      'including unquantified COLA exposure; it is complete for bill version 1.1 ' +
      'with a version 1.2 refresh required.</p></div>';
    $('reg-body').innerHTML = html;
  }

  /* ==================================================================== */
  /*  Official VRS data mode                                              */
  /* ==================================================================== */
  function syncOfficialSpec() {
    $('official-spec').hidden = !$('i-official').checked;
  }

  function renderOfficialSpec() {
    $('official-spec').innerHTML = '<div class="table-wrap">' + table(
      'Supplying any field replaces the corresponding estimate and re-tags it a ' +
      'Published Fact. The engine reads these from one object, so no formula changes.',
      ['Field', 'Replaces', 'What to ask VRS for'],
      REG.officialDataSpec.map(function (f) {
        return { cells: ['<code>' + esc(f.field) + '</code>', esc(f.replaces), esc(f.ask)] };
      })) + '</div>' +
      '<div class="note warn"><p><strong>No VRS member-level data is loaded.</strong> ' +
      'Until it is, every population figure in this tool is an estimate built from ' +
      'one published anchor — the 6% classified state veteran share — plus ' +
      'four assumed filters.</p></div>';
  }

  /* ==================================================================== */
  /*  Controls                                                            */
  /* ==================================================================== */
  function syncConditionalVisibility() {
    document.querySelectorAll('[data-when]').forEach(function (el) {
      var k = el.getAttribute('data-when'), on;
      if (k === 'model' || k === 'direct') on = (state.participantMode === k);
      else if (k === 'dist' || k === 'fixed') on = (state.bridgeYearsMode === k);
      else if (k === 'scaled') on = (state.salaryMode === 'scaled');
      else on = true;
      el.style.display = on ? '' : 'none';
    });
  }
  function setSeg(id, value) {
    $(id).querySelectorAll('button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-v') === value ? 'true' : 'false');
    });
  }

  var sliders = [
    ['i-takeup', 'v-takeup', 'takeUp', 100, function (v) { return pct(v, 0); }],
    ['i-p1y', 'v-p1y', 'p1BridgeYears', 1, function (v) { return v.toFixed(1); }],
    ['i-p2y', 'v-p2y', 'p2BridgeYears', 1, function (v) { return v.toFixed(1); }],
    ['i-phi', 'v-phi', 'phi', 100, function (v) { return pct(v, 0); }],
    ['i-repl', 'v-repl', 'replacementPct', 100, function (v) { return pct(v, 0); }],
    ['i-notrepl', 'v-notrepl', 'notReplacedPct', 100, function (v) { return pct(v, 1); }],
    ['i-vac', 'v-vac', 'vacancyMonths', 1, function (v) { return v.toFixed(0); }],
    ['i-growth', 'v-growth', 'salaryGrowth', 100, function (v) { return pct(v, 2); }],
    ['i-disc', 'v-disc', 'discount', 100, function (v) { return pct(v, 2); }],
    ['i-impr', 'v-impr', 'improvement', 100, function (v) { return pct(v, 2); }],
    ['i-qual', 'v-qual', 'qualifyingShare', 100, function (v) { return pct(v, 0); }],
    ['i-bar', 'v-bar', 'retiredPayBar', 100, function (v) { return pct(v, 0); }],
    ['i-notbought', 'v-notbought', 'notAlreadyBought', 100, function (v) { return pct(v, 0); }]
  ];
  var vetSliders = [['i-vst', 'v-vst', 'ST'], ['i-vtc', 'v-vtc', 'TC'], ['i-vps', 'v-vps', 'PS']];

  /* A range input SNAPS whatever value it is handed onto its own min/step
     grid. If a preset asks for a setting off that grid, the control ends up
     holding a different number from the one the label prints and the model
     computed with — and the next touch of any other control silently adopts
     the snapped value instead. So read every control back after writing it
     and keep `state` equal to what the interface can actually express. The
     display, the control and the model then cannot disagree. */
  function pushStateToControls() {
    sliders.forEach(function (s) {
      $(s[0]).value = state[s[2]] * s[3];
      state[s[2]] = parseFloat($(s[0]).value) / s[3];
      $(s[1]).innerHTML = s[4](state[s[2]]);
    });
    var vs = {};
    vetSliders.forEach(function (s) {
      $(s[0]).value = state.veteranShare[s[2]] * 100;
      vs[s[2]] = parseFloat($(s[0]).value) / 100;
      $(s[1]).innerHTML = pct(vs[s[2]], 1);
    });
    state.veteranShare = vs;
    setSeg('seg-participant-mode', state.participantMode);
    setSeg('seg-bridge-mode', state.bridgeYearsMode);
    setSeg('seg-salary-mode', state.salaryMode);
    $('i-rule').value = state.rule;
    $('i-hybrid').checked = state.includeHybrid;
    $('i-amort').checked = state.amortizeAtScenarioDiscount;
    $('phi-sub').textContent = pct(1 - state.phi, 0);
    $('phi-wte').textContent = pct(state.phi, 0);
    syncConditionalVisibility();
  }

  function readControls() {
    sliders.forEach(function (s) { state[s[2]] = parseFloat($(s[0]).value) / s[3]; });
    var vs = {};
    vetSliders.forEach(function (s) { vs[s[2]] = parseFloat($(s[0]).value) / 100; });
    state.veteranShare = vs;
    state.rule = $('i-rule').value;
    state.includeHybrid = $('i-hybrid').checked;
    state.amortizeAtScenarioDiscount = $('i-amort').checked;
    var p1 = parseFloat($('i-p1n').value), p2 = parseFloat($('i-p2n').value);
    state.p1Participants = isNaN(p1) ? null : p1;
    state.p2Participants = isNaN(p2) ? null : p2;
    var s1 = parseFloat($('i-p1sal').value), s2 = parseFloat($('i-p2sal').value);
    state.p1Salary = isNaN(s1) ? null : s1;
    state.p2Salary = isNaN(s2) ? null : s2;
    sliders.forEach(function (s) { $(s[1]).innerHTML = s[4](state[s[2]]); });
    vetSliders.forEach(function (s) { $(s[1]).innerHTML = pct(state.veteranShare[s[2]], 1); });
    $('phi-sub').textContent = pct(1 - state.phi, 0);
    $('phi-wte').textContent = pct(state.phi, 0);
  }

  /* ----------------------------------------------------------- rendering */
  var tornadoTimer = null;
  function renderAll(withTornado) {
    var R = E.run(state);
    lastResult = R;
    if (withTornado) lastTornado = E.tornado(state);
    renderA(R); renderB(R); renderC(R); renderD(R); renderE();
    renderG(R); renderAncillary(R);
    updateNotes(R);
    $('scenario-chip').textContent = presetLabel();
    /* Highlight the preset actually in force, not a fixed one. */
    $('presets').querySelectorAll('[data-preset]').forEach(function (b) {
      b.classList.toggle('btn-primary', b.getAttribute('data-preset') === activePreset);
      b.setAttribute('aria-pressed', b.getAttribute('data-preset') === activePreset
        ? 'true' : 'false');
    });

    /* the tornado needs 16 recomputes; debounce it behind the main render so
       dragging a slider never waits on it */
    clearTimeout(tornadoTimer);
    if (withTornado) { renderF(lastTornado); }
    else {
      tornadoTimer = setTimeout(function () {
        lastTornado = E.tornado(state); renderF(lastTornado);
        renderG(lastResult);
      }, 220);
    }
  }

  function updateNotes(R) {
    var P1 = R.panelB.byPlan.P1, P2 = R.panelB.byPlan.P2;
    $('note-participant-mode').innerHTML = state.participantMode === 'model'
      ? 'Participants are the modeled purchasable pool times the take-up rate.'
      : 'Your counts replace the modeled totals. The model’s age, service and ' +
        'deficit mix is <strong>preserved</strong> and rescaled, not flattened to an ' +
        'average member.';
    $('note-takeup').innerHTML = 'Gives <strong>' + num(P1.participants, 0) +
      '</strong> Plan 1 and <strong>' + num(P2.participants, 0) + '</strong> Plan 2 ' +
      'participants over the ten-year cohort. Model scenarios: low 10%, moderate 20%, high 30%.';
    $('note-p1n').innerHTML = 'Model estimate at the current funnel and take-up: <strong>' +
      num(P1.modeledParticipants, 0) + '</strong> (purchasable pool ' +
      num(P1.purchasablePool, 0) + ').';
    $('note-p2n').innerHTML = 'Model estimate: <strong>' +
      num(P2.modeledParticipants, 0) + '</strong> (purchasable pool ' +
      num(P2.purchasablePool, 0) + ').';
    $('note-bridge-mode').innerHTML = state.bridgeYearsMode === 'dist'
      ? 'Uses the model’s own distribution of purchasable qualifying service ' +
        '(ASM-25). <strong>This reproduces the published tables exactly.</strong> ' +
        'Resulting mean purchase: Plan 1 ' + P1.meanYears.toFixed(2) + ', Plan 2 ' +
        P2.meanYears.toFixed(2) + '.'
      : 'Sets a uniform amount of qualifying service available to every member. The ' +
        'actual purchase is still capped at each member’s eligibility deficit, so ' +
        'the mean purchase comes out lower: Plan 1 ' + P1.meanYears.toFixed(2) +
        ', Plan 2 ' + P2.meanYears.toFixed(2) + '. The modeled mean deficit is Plan 1 ' +
        P1.meanDeficit.toFixed(2) + ', Plan 2 ' + P2.meanDeficit.toFixed(2) + '.';
    $('note-salary-mode').innerHTML = state.salaryMode === 'model'
      ? 'Uses the published age-banded payroll curve (SRC-19) cell by cell. Modeled ' +
        'mean departing salary: Plan 1 ' + usd(P1.modelMeanSalary) + ', Plan 2 ' +
        usd(P2.modelMeanSalary) + ' (future dollars, rolled forward to each fiscal year).'
      : 'Scales the whole modeled salary distribution to your stated average. Price ' +
        'and value are exactly proportional to pay, so this is an exact rescaling.';
    $('note-disc').innerHTML = Math.abs(state.discount - B.published.discount) < 1e-9
      ? 'The VRS Board’s published assumption.'
      : '<strong>Scenario only — this is not an official VRS assumption.</strong> ' +
        'The Board’s published rate is ' + pct(B.published.discount, 2) + '.';
    if (!$('i-p1n').value) $('i-p1n').placeholder = num(P1.modeledParticipants, 0);
    if (!$('i-p2n').value) $('i-p2n').placeholder = num(P2.modeledParticipants, 0);
    if (!$('i-p1sal').value) $('i-p1sal').placeholder = Math.round(P1.modelMeanSalary);
    if (!$('i-p2sal').value) $('i-p2sal').placeholder = Math.round(P2.modelMeanSalary);
  }

  function presetLabel() {
    var pr = E.presets();
    return activePreset && pr[activePreset] ? pr[activePreset].name + ' case' : 'Custom scenario';
  }

  /* -------------------------------------------------------------- presets */
  function buildPresets() {
    var pr = E.presets();
    $('presets').innerHTML = Object.keys(pr).map(function (k) {
      return '<button class="btn" type="button" data-preset="' + k + '">' +
        esc(pr[k].name) + '</button>' +
        '<p class="preset-desc">' + esc(pr[k].description) + '</p>';
    }).join('');
    $('presets').querySelectorAll('[data-preset]').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-preset');
        state = Object.assign({}, E.defaults(), pr[k].params);
        activePreset = k;
        $('i-p1n').value = ''; $('i-p2n').value = '';
        $('i-p1sal').value = ''; $('i-p2sal').value = '';
        pushStateToControls();
        renderAll(true);
      });
    });
  }

  /* ------------------------------------------------------------- download */
  function scenarioRows(R) {
    var p = R.params, P1 = R.panelB.byPlan.P1, P2 = R.panelB.byPlan.P2;
    var C = R.panelB.combined, w = R.panelC.combined;
    return {
      inputs: [
        ['Participant basis', p.participantMode === 'direct'
          ? 'counts entered directly' : 'participation rate'],
        ['Take-up rate', pct(p.takeUp, 0)],
        ['Plan 1 participants', num(P1.participants, 0)],
        ['Plan 2 participants', num(P2.participants, 0)],
        ['Bridge amount basis', p.bridgeYearsMode === 'dist'
          ? 'model distribution (ASM-25)' : 'fixed average'],
        ['Mean bridge credit purchased (Plan 1 / Plan 2)',
          P1.meanYears.toFixed(2) + ' / ' + P2.meanYears.toFixed(2)],
        ['Behavioural assumption φ (share who would have worked on)', pct(p.phi, 0)],
        ['Replacement salary percentage', pct(p.replacementPct, 0)],
        ['Positions not replaced', pct(p.notReplacedPct, 1)],
        ['Average vacancy before refill', p.vacancyMonths + ' months'],
        ['Mean departing salary (Plan 1 / Plan 2)',
          usd(P1.meanSalary) + ' / ' + usd(P2.meanSalary)],
        ['Salary growth', pct(p.salaryGrowth, 2)],
        ['Discount rate', pct(p.discount, 2) +
          (Math.abs(p.discount - B.published.discount) < 1e-9
            ? ' (published Board assumption)' : ' (SCENARIO — not an official VRS assumption)')],
        ['Mortality improvement', pct(p.improvement, 2)],
        ['Veteran share (state / teacher / pol. sub.)',
          pct(p.veteranShare.ST, 1) + ' / ' + pct(p.veteranShare.TC, 1) + ' / ' +
          pct(p.veteranShare.PS, 1)],
        ['Qualifying service share', pct(p.qualifyingShare, 0)],
        ['Excluded by the military retired pay bar', pct(p.retiredPayBar, 0)],
        ['Did not already purchase in the 24-month window', pct(p.notAlreadyBought, 0)],
        ['Purchase rule', p.rule === 'D4a'
          ? 'D4a — partial purchase capped at the deficit (the bill as drafted)'
          : 'D4b — only where the deficit is fully coverable (rejected alternative)'],
        ['Hybrid participants', p.includeHybrid
          ? 'INCLUDED — separate scenario; the bill excludes them' : 'excluded (the bill)']
      ],
      outputs: [
        ['Total participants, FY2029–FY2038 cohort', num(C.participants, 0)],
        ['Total years / points purchased', num(C.years, 0)],
        ['Member ANC payments received', usd(C.price)],
        ['Value of acceleration — frozen-service baseline', usd(C.valueSub)],
        ['Value of acceleration — work-to-eligibility baseline', usd(C.valueWte)],
        ['Value of acceleration — blended at φ', usd(C.valueBlended)],
        [L.pension + ' (net liability change)', usd(C.netLiability)],
        ['Employer contribution-rate impact — combined', bp(C.bp)],
        ['Employer contribution-rate impact — state plan', bp(R.panelB.byEmployer.ST.bp)],
        ['Employer contribution-rate impact — teacher plan', bp(R.panelB.byEmployer.TC.bp)],
        ['Employer contribution-rate impact — political subdivisions',
          bp(R.panelB.byEmployer.PS.bp)],
        [L.pension + ' — Plan 1 rate contribution', bp(P1.bpContribution)],
        [L.pension + ' — Plan 2 rate contribution', bp(P2.bpContribution)],
        ['Departing member payroll (PV)', usd(w.departingPayroll)],
        ['Payroll difference from lower-paid replacements', usd(w.lowerPaidDiff)],
        ['Payroll on positions not replaced', usd(w.notReplacedPayroll)],
        ['Temporary vacancy effect', usd(w.vacancyPayroll)],
        ['Employer retirement contribution difference', usd(w.erContribDiff)],
        [L.payroll + ' — total' + (p.replacementPct >= 1
          ? ' (100% replacement: any nonzero amount consists of vacancy, ' +
            'positions eliminated, and related employer contributions)' : ''), usd(w.total)],
        [L.combined + ' (READ LAST — least reliable total; combines a pension ' +
          'measurement with a workforce assumption the Commonwealth controls and ' +
          'this model cannot observe)', usd(R.panelD.combinedScenarioEffect)],
        ['Health insurance credit — earlier commencement (illustrative, outside the bp figures)',
          usd(R.ancillary.hicPvEstimate)],
        ['COLA — earlier commencement', 'NOT QUANTIFIED']
      ]
    };
  }

  var QUALIFIER =
    'Every basis-point figure is the modeled retirement-plan employer contribution ' +
    'impact and excludes the separately funded health insurance credit and COLA ' +
    'effects, including unquantified COLA exposure. The fiscal model is complete for ' +
    'bill version 1.1; a version 1.2 refresh is required before external use.';

  var BEHAVIOURAL_BASIS =
    'The behavioural assumption (phi) decides whether a purchaser is subsidised ' +
    'or overpays, and no published data bears on it. ASM-22 states low 0.25, ' +
    'central 0.50, high 0.75; purchaser counts are not re-estimated when phi ' +
    'moves. Population inputs use one published anchor (6% of the Virginia ' +
    'classified state workforce, June 30, 2024) plus four assumed filters; no ' +
    'published veteran share exists for teachers or political subdivisions. The ' +
    '18% military-retired-pay exclusion is also an unsourced scenario assumption.';

  function downloadBlob(name, mime, text) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: mime }));
    a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }

  function buildHandout(R) {
    var s = scenarioRows(R), when = new Date().toISOString().slice(0, 10);
    function rows(list) {
      return list.map(function (r) {
        return '<tr><th>' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>';
      }).join('');
    }
    return '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">' +
      '<title>Military Service Retirement Bridge — scenario summary</title>' +
      '<style>body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;' +
      'max-width:7.2in;margin:0.5in auto;color:#111;line-height:1.5;font-size:11pt}' +
      'h1{font-size:15pt;margin:0 0 2px}h2{font-size:12pt;margin:20px 0 6px;' +
      'border-bottom:1px solid #bbb;padding-bottom:3px}' +
      '.sub{color:#555;font-size:9.5pt;margin:0 0 12px}' +
      'table{width:100%;border-collapse:collapse;font-size:9.5pt;margin:0 0 8px}' +
      'th,td{text-align:left;padding:3px 7px;border-bottom:1px solid #e3e3e3;' +
      'vertical-align:top}th{font-weight:600;width:62%}' +
      'td{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}' +
      '.warn{border:1px solid #b23;border-left:4px solid #b23;background:#fdf4f4;' +
      'padding:8px 10px;font-size:9.5pt;margin:10px 0}' +
      '.note{background:#f4f4f1;border-left:3px solid #999;padding:8px 10px;' +
      'font-size:9.5pt;margin:10px 0}' +
      '@page{margin:0.6in}</style></head><body>' +
      '<h1>Military Service Retirement Bridge — scenario summary</h1>' +
      '<p class="sub">Proposed new Va. Code § 51.1-142.4 &middot; bill version 1.2, ' +
      'package version 1.3 &middot; ' + esc(presetLabel()) + ' &middot; generated ' +
      esc(when) + '</p>' +
      '<div class="warn"><strong>This is an illustrative policy-analysis model. It is ' +
      'not an actuarial certification, the VRS Board impact statement required under ' +
      '§ 30-19.1:7, or a General Assembly fiscal impact statement.</strong> ' +
      'Combined fiscal effect is a scenario result. Payroll and workforce effects are ' +
      'employer compensation effects, not pension savings, and are never included in ' +
      'any contribution-rate figure.</div>' +
      '<h2>Assumptions selected</h2><table>' + rows(s.inputs) + '</table>' +
      '<h2>Modeled results</h2><table>' + rows(s.outputs) + '</table>' +
      '<div class="note"><strong>Required qualifier.</strong> ' + esc(QUALIFIER) + '</div>' +
      '<div class="note"><strong>Behavioural and population basis.</strong> ' +
      esc(BEHAVIOURAL_BASIS) + '</div>' +
      '<div class="note">The population inputs are estimated from one published ' +
      'anchor — veterans are 6% of the Virginia classified state workforce ' +
      '(June 30, 2024) — plus four assumed filters. No published veteran share ' +
      'exists for teachers or political subdivisions. The behavioural assumption ' +
      'φ decides whether a purchaser is subsidised or overpays, and no published ' +
      'data bears on it. Reserve and Guard service: federal law protects qualifying ' +
      'service associated with non-regular Reserve-component retired pay under ' +
      '10 U.S.C. ch. 1223, with § 12736 application to the bridge subject to ' +
      'counsel confirmation.</div>' +
      '<div class="note">Prepared by Policy Development Team using legal, policy, and ' +
      'financial analysis tools, pending review by veterans’ legal counsel.</div>' +
      '</body></html>';
  }

  function buildCsv(R) {
    var s = scenarioRows(R);
    function q(v) { return '"' + String(v).replace(/"/g, '""') + '"'; }
    var out = [['Section', 'Item', 'Value']];
    out.push([q('Header'), q('Scenario'), q(presetLabel())]);
    out.push([q('Header'), q('Generated'), q(new Date().toISOString())]);
    out.push([q('Header'), q('Bill / package version'), q('bill 1.2 / package 1.3')]);
    out.push([q('Header'), q('Status'), q('Illustrative policy-analysis model. Not an ' +
      'actuarial certification, not the VRS Board statement under Sec. 30-19.1:7, not ' +
      'a General Assembly fiscal impact statement.')]);
    out.push([q('Header'), q('Required qualifier'), q(QUALIFIER)]);
    out.push([q('Header'), q('Behavioural assumption basis'), q(BEHAVIOURAL_BASIS)]);
    s.inputs.forEach(function (r) { out.push([q('Input'), q(r[0]), q(r[1])]); });
    s.outputs.forEach(function (r) { out.push([q('Output'), q(r[0]), q(r[1])]); });
    R.panelG.steps.forEach(function (st) {
      out.push([q('Population funnel'), q(st.label + ' [' + st.provenance + ']'),
        q(num(st.value, 1))]);
    });
    var exportTornado = E.tornado(R.params);
    exportTornado.rows.forEach(function (r) {
        out.push([q('Sensitivity'), q(r.label + ' — ' + r.lowLabel + ' / ' + r.highLabel),
          q(r.lowBp.toFixed(3) + ' bp / ' + r.highBp.toFixed(3) + ' bp')]);
      });
    return out.map(function (r) { return r.join(','); }).join('\r\n');
  }

  /* ----------------------------------------------------------------- wire */
  function wire() {
    var t = null;
    function onInput(immediate) {
      readControls();
      activePreset = matchPreset();
      syncConditionalVisibility();
      clearTimeout(t);
      if (immediate) renderAll(false);
      else { t = setTimeout(function () { renderAll(false); }, 40); }
    }
    sliders.concat(vetSliders).forEach(function (s) {
      $(s[0]).addEventListener('input', function () { onInput(false); });
    });
    ['i-p1n', 'i-p2n', 'i-p1sal', 'i-p2sal'].forEach(function (id) {
      $(id).addEventListener('input', function () { onInput(false); });
    });
    ['i-rule', 'i-hybrid', 'i-amort'].forEach(function (id) {
      $(id).addEventListener('change', function () { onInput(true); });
    });
    /* "Official VRS data mode" discloses the data contract; it is not a
       scenario parameter. It used to be written into `state`, which flipped
       the scenario chip to "Custom scenario" while changing no figure and
       revealing nothing — a control that read as a mode which had taken
       effect. It now does exactly what its label offers. */
    $('i-official').addEventListener('change', syncOfficialSpec);
    [['seg-participant-mode', 'participantMode'], ['seg-bridge-mode', 'bridgeYearsMode'],
     ['seg-salary-mode', 'salaryMode']].forEach(function (pair) {
      $(pair[0]).querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () {
          state[pair[1]] = b.getAttribute('data-v');
          setSeg(pair[0], state[pair[1]]);
          onInput(true);
        });
      });
    });

    $('btn-reset').addEventListener('click', function () {
      state = Object.assign({}, E.defaults());
      activePreset = 'central';
      ['i-p1n', 'i-p2n', 'i-p1sal', 'i-p2sal'].forEach(function (id) { $(id).value = ''; });
      $('adv-panel').open = false;
      $('i-official').checked = false;
      syncOfficialSpec();
      pushStateToControls();
      renderAll(true);
    });
    $('btn-theme').addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme');
      /* dark -> light -> follow the system, then round again */
      var next = cur === 'dark' ? 'light' : cur === 'light' ? '' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      /* Persisted so the choice survives the hop to the methodology page,
         which is a separate document and would otherwise reset it. */
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* no storage */ }
      if (lastTornado) renderF(lastTornado);
    });
    $('btn-handout').addEventListener('click', function () {
      readControls();
      downloadBlob('military-service-retirement-bridge-scenario-summary.html',
        'text/html;charset=utf-8', buildHandout(E.run(state)));
    });
    $('btn-csv').addEventListener('click', function () {
      readControls();
      downloadBlob('military-service-retirement-bridge-scenario.csv',
        'text/csv;charset=utf-8', buildCsv(E.run(state)));
    });
  }

  /* Which preset, if any, does the current state correspond to? */
  function matchPreset() {
    var pr = E.presets(), d = E.defaults();
    var keys = Object.keys(pr);
    for (var i = 0; i < keys.length; i++) {
      var cand = Object.assign({}, d, pr[keys[i]].params), ok = true;
      Object.keys(cand).forEach(function (k) {
        if (!ok) return;
        var a = cand[k], b = state[k];
        if (a && typeof a === 'object') {
          Object.keys(a).forEach(function (kk) {
            if (Math.abs(a[kk] - b[kk]) > 1e-9) ok = false;
          });
        } else if (typeof a === 'number') {
          if (Math.abs(a - b) > 1e-9) ok = false;
        } else if (a !== b && !(a === null && b === null)) ok = false;
      });
      if (ok) return keys[i];
    }
    return null;
  }

  /* ------------------------------------------------------------- startup */
  buildPresets();
  renderRegistry();
  renderOfficialSpec();
  syncOfficialSpec();
  pushStateToControls();
  wire();
  renderAll(true);
})();
