#!/usr/bin/env python3
"""Estimate the rendered page length of a brief before it reaches Word.

Why this exists: the JLC briefs are named for a page count ("one-page brief",
"two-page brief"), so length is a correctness property, not a matter of taste.
No LibreOffice or Word automation is available in this environment, so the
length is computed from the same page geometry md2docx.py writes into the
.docx (the BRIEF_* constants there), with real glyph widths measured by PIL.

Deliberately conservative, so a "fits" verdict holds in Word:
  * Arial metrics stand in for Calibri. Arial is roughly 6-8% wider at the
    same point size, so every line is slightly over-measured.
  * Table rows carry full Word default cell margins plus padding.
  * The verdict requires the content to fit inside FILL_LIMIT of the text
    block, leaving headroom for Word's own line-breaking differences.

Usage: pagecheck.py FILE.md [expected_pages]
"""
import math
import os
import re
import sys

from PIL import ImageFont

import md2docx

PAGE_W_IN, PAGE_H_IN = 8.5, 11.0
FILL_LIMIT = 0.95          # must fit within this fraction of the last page
TABLE_CELL_MARGIN_PT = 11.52   # Word default 0.08" left + right
TABLE_ROW_PAD_PT = 4.0         # space_before + space_after inside a cell
LIST_INDENT_PT = 18.0          # List Bullet / List Number default indent
RULE_HEIGHT_PT = 11.0 + md2docx.BRIEF_SPACE_AFTER_PT

FONT_DIR = "/System/Library/Fonts/Supplemental"
FONTS = {False: os.path.join(FONT_DIR, "Arial.ttf"),
         True: os.path.join(FONT_DIR, "Arial Bold.ttf")}
_cache = {}


def font(size_pt, bold=False):
    """Arial at a given point size, rendered at 4x for sub-pixel accuracy."""
    key = (round(size_pt, 2), bold)
    if key not in _cache:
        _cache[key] = ImageFont.truetype(FONTS[bold], int(round(size_pt * 4)))
    return _cache[key]


def strip_markup(text):
    """Reduce inline Markdown to the characters that actually get rendered."""
    text = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r"\1 (\2)", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"\*\*\*|\*\*|~~|`|\*", "", text)
    return re.sub(r"\\([\\`*_{}\[\]()#+\-.!=~|>])", r"\1", text)


def text_width(text, size_pt, bold=False):
    return font(size_pt, bold).getlength(text) / 4.0


def wrapped_lines(text, width_pt, size_pt, bold=False):
    """Greedy word wrap, matching how Word breaks on spaces."""
    text = strip_markup(text).strip()
    if not text:
        return 1
    words, lines, cur = text.split(), 1, ""
    for word in words:
        trial = f"{cur} {word}".strip()
        if cur and text_width(trial, size_pt, bold) > width_pt:
            lines, cur = lines + 1, word
        else:
            cur = trial
    return lines


def column_widths(rows, total_pt):
    """Approximate Word's autofit: share width by longest cell per column."""
    cols = max(len(r) for r in rows)
    demand = []
    for j in range(cols):
        longest = max(
            (text_width(strip_markup(r[j]), md2docx.BRIEF_TABLE_PT, bold=True)
             for r in rows if j < len(r)),
            default=1.0)
        demand.append(max(longest, 1.0))
    usable = total_pt - cols * TABLE_CELL_MARGIN_PT
    scale = usable / sum(demand)
    return [max(d * scale, 18.0) for d in demand]


def table_height(rows, total_pt):
    widths = column_widths(rows, total_pt)
    line_pt = md2docx.BRIEF_TABLE_PT * 1.22
    height = 0.0
    for i, row in enumerate(rows):
        lines = 1
        for j, cell in enumerate(row):
            if j < len(widths):
                lines = max(lines, wrapped_lines(
                    cell, widths[j], md2docx.BRIEF_TABLE_PT, bold=(i == 0)))
        height += lines * line_pt + TABLE_ROW_PAD_PT
    return height + 4.0  # the sized spacer md2docx adds after a brief table


def measure(path):
    """Return (total content height in points, per-block breakdown)."""
    width = (PAGE_W_IN - 2 * md2docx.BRIEF_MARGIN_LR) * 72
    body, line = md2docx.BRIEF_BODY_PT, md2docx.BRIEF_LINE_PT
    after = md2docx.BRIEF_SPACE_AFTER_PT

    lines_in = open(path, encoding="utf-8").read().replace("\r\n", "\n").split("\n")
    total, blocks, i = 0.0, [], 0

    while i < len(lines_in):
        raw, cur = lines_in[i], lines_in[i].strip()
        if not cur:
            i += 1
            continue

        if cur.startswith("|") and i + 1 < len(lines_in) and md2docx.is_separator(lines_in[i + 1]):
            rows = [md2docx.split_row(cur)]
            i += 2
            while i < len(lines_in) and lines_in[i].strip().startswith("|"):
                rows.append(md2docx.split_row(lines_in[i]))
                i += 1
            height = table_height(rows, width)
            blocks.append((height, f"table ({len(rows)} rows)"))
            total += height
            continue

        if re.fullmatch(r"(-{3,}|\*{3,}|_{3,})", cur):
            blocks.append((RULE_HEIGHT_PT, "rule"))
            total += RULE_HEIGHT_PT
            i += 1
            continue

        match = re.match(r"^(#{1,6})\s+(.*)$", cur)
        if match:
            level = min(len(match.group(1)), 4)
            size, before, after_h = md2docx.BRIEF_HEADINGS[level]
            n = wrapped_lines(match.group(2), width, size, bold=True)
            height = n * (size + 2) + before + after_h
            blocks.append((height, f"h{level}: {strip_markup(match.group(2))[:48]}"))
            total += height
            i += 1
            continue

        if cur.startswith(">"):
            height = 0.0
            while i < len(lines_in) and lines_in[i].strip().startswith(">"):
                quote = re.sub(r"^\s*>\s?", "", lines_in[i]).strip()
                i += 1
                if quote:
                    height += wrapped_lines(quote, width - 12, body) * line + 2
            blocks.append((height, "blockquote"))
            total += height
            continue

        match = re.match(r"^(\s*)([-*+]|\d+[.)])\s+(.*)$", raw)
        if match:
            indent = LIST_INDENT_PT * (2 if len(match.group(1)) >= 2 else 1)
            n = wrapped_lines(match.group(3), width - indent, body)
            height = n * line + 2
            blocks.append((height, f"list: {strip_markup(match.group(3))[:40]}"))
            total += height
            i += 1
            continue

        buf = [cur]
        i += 1
        while i < len(lines_in):
            nxt, s = lines_in[i], lines_in[i].strip()
            if (not s or s.startswith(("#", ">", "|", "```"))
                    or re.match(r"^\s*([-*+]\s+|\d+[.)]\s+)", nxt)
                    or re.fullmatch(r"(-{3,}|\*{3,}|_{3,})", s)):
                break
            buf.append(s)
            i += 1
        text = " ".join(buf)
        n = wrapped_lines(text, width, body)
        height = n * line + after
        blocks.append((height, f"p({n}L): {strip_markup(text)[:44]}"))
        total += height

    return total, blocks


def main():
    path = sys.argv[1]
    expected = int(sys.argv[2]) if len(sys.argv) > 2 else None
    page_pt = (PAGE_H_IN - 2 * md2docx.BRIEF_MARGIN_TB) * 72
    total, blocks = measure(path)

    print(f"{os.path.basename(path)}")
    print(f"  text block per page : {page_pt:.0f} pt "
          f"({PAGE_H_IN - 2 * md2docx.BRIEF_MARGIN_TB:.2f} in)")
    print(f"  content height      : {total:.0f} pt")
    print(f"  pages (conservative): {total / page_pt:.2f}")

    if expected:
        budget = page_pt * expected
        fill = total / budget
        print(f"  budget for {expected} page(s): {budget:.0f} pt — fill {fill:.1%}")
        if fill <= FILL_LIMIT:
            print(f"  VERDICT: FITS ({(budget * FILL_LIMIT - total):.0f} pt of slack "
                  f"below the {FILL_LIMIT:.0%} limit)")
        else:
            over = total - budget * FILL_LIMIT
            print(f"  VERDICT: OVER by {over:.0f} pt "
                  f"(~{over / md2docx.BRIEF_LINE_PT:.0f} body lines) — must cut")
        print("\n  largest blocks:")
        for height, label in sorted(blocks, reverse=True)[:12]:
            print(f"    {height:6.1f} pt  {label}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
