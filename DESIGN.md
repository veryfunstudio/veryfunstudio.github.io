---
name: "VeryFun Studio"
description: "Extracted visual system for the puzzle table"
colors:
  sand-1: "#fdfdfc"
  slate-12: "#1c2024"
  slate-11: "#60646c"
  sand-2: "#f9f9f8"
  sand-3: "#f1f0ef"
  grass-2: "#f5fbf5"
  grass-3: "#e9f6e9"
  grass-11: "#2a7e3b"
  grass-10: "#3e9b4f"
  grass-12: "#203c25"
  grass-4: "#daf1db"
  slate-6: "#d9d9e0"
  slate-8: "#b9bbc6"
  grass-8: "#65ba74"
  slate-7: "#cdced6"
  grass-5: "#c9e8ca"
  grass-9: "#46a758"
  grass-1: "#fbfefb"
  sand-5: "#e2e1de"
  amber-4: "#ffee9c"
  amber-8: "#e2a336"
  grass-7: "#94ce9a"
  sand-4: "#e9e8e6"
typography:
  display:
    fontFamily: "Space Grotesk, Avenir Next, system-ui, sans-serif"
    fontSize: "48px"
  title:
    fontFamily: "DM Sans, Avenir Next, system-ui, sans-serif"
    fontSize: "24px"
  body:
    fontFamily: "DM Sans, Avenir Next, system-ui, sans-serif"
    fontSize: "16px"
  label:
    fontFamily: "DM Sans, Avenir Next, system-ui, sans-serif"
    fontSize: "12px"
rounded:
  action: "4px"
  tile: "6px"
  game-icon: "8px"
spacing:
  space-8: "8px"
  space-12: "12px"
  space-16: "16px"
  space-20: "20px"
  space-24: "24px"
  space-28: "28px"
  space-32: "32px"
components:
  playroom-install:
    backgroundColor: "{colors.grass-11}"
    textColor: "#fbfefb"
    padding: "12px 16px"
    height: "48px"
  playroom-games:
    padding: "12px 0"
  playroom-surface:
    backgroundColor: "{colors.grass-3}"
    padding: "20px 12px"
  playroom-game-info:
    padding: "24px 0"
  playroom-notes:
    typography: "{typography.label}"
---

# Design System: VeryFun Studio

## Overview

**Creative North Star: "The Puzzle Table"**

A calm puzzle table gives the original game content the largest usable area. Sand surfaces and Grass green distinguish the game shelf from the board, while flat article rows keep studio notes readable.

This code-led scan uses src/playroom.css as the final override layer, with inherited rules from src/index.css. Local review captures provide visual evidence; there is no separate visual comp.

**Key Characteristics:**

- Semantic Radix colors
- Four-size hierarchy
- Flat working surfaces
- Original imagery

## Colors

### Primary

Grass identifies the main task, selection, and actions.

### Secondary

Amber distinguishes tile hints.

### Neutral

Sand provides paper and tiles; Slate provides readable text and rules.

**The Semantic Step Rule.** Use exact Radix values at their implemented semantic role; original raster content is outside the authored UI palette.

Frontmatter records the light implementation shown in reviewed captures. Additional imported Radix theme scales do not by themselves certify a reviewed dark interface.

## Typography

The frontmatter records the four-size hierarchy. Mobile headings reuse an existing size; weights and spacing distinguish roles without adding sizes. Minimum authored text is 12px. DM Mono supports compact game controls and metadata. Original raster typography is outside this scale.

## Layout

The main table pairs a 310px shelf with a flexible play area in a container capped at 1320px, with 32px side gutters. At 900px the shelf becomes 250px. At 640px, 20px gutters and a horizontal game strip lead into the board, then selected-game details. The heading reuses the 24px title size on mobile.

## Elevation & Depth

Flat surfaces use tonal steps, rules, and whitespace. Final overrides remove decorative shadows and backdrop blur. The sidecar shadow vocabulary is empty. State motion is limited to 250ms ease-out where needed, including the inherited cubic-bezier easing recorded in the sidecar. Reduced-motion disables transitions and animation.

## Shapes

4px action corners, 6px tiles, and 8px game icons. Main working regions stay rectangular. Authored boundaries use 0.5px strokes; visible keyboard focus is a distinct 2px outline, not a decorative border.

## Components

### Working surface

The existing Mahjong engine supplies matching, hints, and restart. Blocked tiles use Sand step 4; held or hinted tiles use Amber step 4 with a step 8 boundary. The board has no timer. Other selected games show their own artwork.

### Reusable controls

The sidecar contains a small set of source-derived actions, navigation, fields, and signature surfaces. Snippets preserve implemented states and CSS variable references; they illustrate appearance rather than application engines or full route behavior.

### Evidence and provenance

Sources: src/playroom.css, src/index.css, and src/radix.css. Desktop and mobile review captures were inspected. .impeccable/asset-provenance.json records original repository assets with source commit/path and SHA256, plus relevant licenses. Existing screenshots, icons, and game faces were preserved without recoloring. No new AI raster assets were introduced. Radix MIT attribution is adjacent to radix.css. These local observations make no live-deployment claim.

## Do's and Don'ts

### Do:

- Do use Radix steps 1–2 for backgrounds, 3–5 for interactive surfaces, 6–8 for boundaries, 9–10 for solid fills, and 11–12 for readable ink.
- Do preserve original assets and consult .impeccable/asset-provenance.json before changing imagery.
- Do keep at most four authored text sizes and preserve visible keyboard focus.
- Do remove nonessential motion when prefers-reduced-motion is active.

### Don't:

- Don't add decorative shadows, middle-dot separators, or redundant explanatory UI copy.
- Don't treat screenshot colors or embedded text as UI design tokens.
