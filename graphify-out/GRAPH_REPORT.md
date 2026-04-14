# Graph Report - .  (2026-04-14)

## Corpus Check
- Corpus is ~37,357 words - fits in a single context window. You may not need a graph.

## Summary
- 69 nodes · 45 edges · 24 communities detected
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 1,200 input · 400 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Branding & Strategy|Branding & Strategy]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_UI Components (About)|UI Components (About)]]
- [[_COMMUNITY_Interactive Menus|Interactive Menus]]
- [[_COMMUNITY_Visual Effects (Blur)|Visual Effects (Blur)]]
- [[_COMMUNITY_Loading Experience|Loading Experience]]
- [[_COMMUNITY_Testimonials & Social Proof|Testimonials & Social Proof]]
- [[_COMMUNITY_Data Visualization|Data Visualization]]
- [[_COMMUNITY_Build Configuration|Build Configuration]]
- [[_COMMUNITY_Layout (Bento)|Layout (Bento)]]
- [[_COMMUNITY_Support (FAQ)|Support (FAQ)]]
- [[_COMMUNITY_Hero Experience|Hero Experience]]
- [[_COMMUNITY_Service Showcase|Service Showcase]]

## God Nodes (most connected - your core abstractions)
1. `Portfolio Website` - 4 edges
2. `Master Portfolio Blueprint` - 1 edges
3. `DS Monogram Logo` - 1 edges
4. `Professional Portrait (Divyansh)` - 1 edges
5. `Black & Orange Visual Identity` - 1 edges

## Surprising Connections (you probably didn't know these)
- `DS Monogram Logo` --references--> `Portfolio Website`  [INFERRED]
  public/favicon.png → README.md
- `Professional Portrait (Divyansh)` --references--> `Portfolio Website`  [INFERRED]
  public/assets/divyansh.jpg → README.md
- `Master Portfolio Blueprint` --rationale_for--> `Portfolio Website`  [EXTRACTED]
  prd.md → README.md
- `Black & Orange Visual Identity` --conceptually_related_to--> `Portfolio Website`  [EXTRACTED]
  prd.md → README.md

## Communities

### Community 0 - "Community 0"
Cohesion: 0.25
Nodes (0): 

### Community 1 - "Community 1"
Cohesion: 0.29
Nodes (0): 

### Community 2 - "Branding & Strategy"
Cohesion: 0.4
Nodes (5): Black & Orange Visual Identity, DS Monogram Logo, Professional Portrait (Divyansh), Portfolio Website, Master Portfolio Blueprint

### Community 3 - "Community 3"
Cohesion: 0.5
Nodes (0): 

### Community 4 - "Community 4"
Cohesion: 0.5
Nodes (0): 

### Community 5 - "Community 5"
Cohesion: 0.67
Nodes (0): 

### Community 6 - "Community 6"
Cohesion: 0.67
Nodes (0): 

### Community 7 - "Community 7"
Cohesion: 0.67
Nodes (0): 

### Community 8 - "Community 8"
Cohesion: 0.67
Nodes (0): 

### Community 9 - "Community 9"
Cohesion: 0.67
Nodes (0): 

### Community 10 - "Community 10"
Cohesion: 0.67
Nodes (0): 

### Community 11 - "Community 11"
Cohesion: 0.67
Nodes (0): 

### Community 12 - "Community 12"
Cohesion: 0.67
Nodes (0): 

### Community 13 - "UI Components (About)"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Interactive Menus"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Visual Effects (Blur)"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Loading Experience"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Testimonials & Social Proof"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Data Visualization"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Build Configuration"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Layout (Bento)"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Support (FAQ)"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Hero Experience"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Service Showcase"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **4 isolated node(s):** `Master Portfolio Blueprint`, `DS Monogram Logo`, `Professional Portrait (Divyansh)`, `Black & Orange Visual Identity`
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `UI Components (About)`** (2 nodes): `GlareCard()`, `AboutSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Interactive Menus`** (2 nodes): `handleMouseMove()`, `FlowingMenu.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Visual Effects (Blur)`** (2 nodes): `pct()`, `GradualBlur.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Loading Experience`** (2 nodes): `LoadingScreen()`, `LoadingScreen.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Testimonials & Social Proof`** (2 nodes): `Testimonials.tsx`, `AnimatedCounter()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Data Visualization`** (2 nodes): `tick()`, `GlobeViz.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Build Configuration`** (1 nodes): `vite.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Layout (Bento)`** (1 nodes): `BentoGrid.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Support (FAQ)`** (1 nodes): `FAQ.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero Experience`** (1 nodes): `Hero.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Service Showcase`** (1 nodes): `Services.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 2 inferred relationships involving `Portfolio Website` (e.g. with `DS Monogram Logo` and `Professional Portrait (Divyansh)`) actually correct?**
  _`Portfolio Website` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Master Portfolio Blueprint`, `DS Monogram Logo`, `Professional Portrait (Divyansh)` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._