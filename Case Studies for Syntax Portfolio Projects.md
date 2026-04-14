# Case Studies for Syntax Portfolio Projects

## Overview

This document provides detailed, portfolio-ready case studies for six core projects associated with the Syntax brand and Divyansh Saxena’s work: OneClip Downloader, OneClip Hub, Flux IDE landing page, the Syntax company website, the Horizon HR (Nexus) HR AI concept, and the 3D portfolio website.

Each case study mirrors a modern product-design style similar to Andy Reff’s project pages: a clear snapshot, problem framing, goals, process, and outcomes or learnings.[^1][^2]

***

## Case Study 1: OneClip Downloader

### Snapshot

- **Type:** Fullstack web application + Windows desktop client
- **Role:** Solo designer–developer
- **Timeline:** Initial build in early 2026
- **Stack:** React, React Router, Supabase, Vite, Vitest, custom UI components, dark-mode theming

### Context

OneClip Downloader began as a practical, real-world fullstack project to consolidate video and media downloading into a single, clean interface. It served as a testbed for building a production-style stack with authentication, dashboards, and testing, rather than just a simple side project.

### Problem

Most downloader tools feel untrustworthy, cluttered with ads, or technically clunky. The initial problem statement:

- Provide a **clean, trustworthy, and fast** way to download content.
- Support authenticated users with a dashboard instead of a single bare-bones page.
- Treat it like a real SaaS-style app, not just a script.

The desktop experience also needed to feel native rather than a lazy port of the web UI.

### Goals

- Ship a **fullstack web app** with:
  - Authentication and onboarding
  - A central dashboard and core pages
  - Dark-mode UX aligned with modern tools
  - Supabase-based backend integration
- Build a Windows desktop version to explore a multi-surface product, while identifying what needs to change in UI/UX when moving away from the browser.

### Constraints and Challenges

- Solo execution: design, frontend, backend, and deployment were all handled by a single person.
- The desktop UI reused too much of the web mental model, resulting in an interface that felt “off” and not tailored to Windows conventions.
- Need to keep the stack manageable while still using realistic tools (routing, testing, Supabase, theming).

### Process

#### 1. Architecture and foundations

The project started with a classic React SPA structure: route-based pages, shared layout components, and a design system for buttons, inputs, and cards. Supabase handled authentication, database, and simple server-side logic, enabling rapid fullstack iteration without managing custom infrastructure.

#### 2. Interface and experience design

The UI used dark-mode theming inspired by modern developer tools, with focus on:

- Clear hierarchy for navigation and page titles
- Strong contrast for call-to-action buttons
- Dashboard-style layout for core actions and recent activity

Vitest ensured that core flows and utility logic remained stable as features evolved.

#### 3. Desktop experiment

A Windows desktop version was created to explore the potential of a native-feeling experience. However, the UI was initially carried over too directly from the web, revealing gaps:

- Layout density and spacing felt more like a website than an app window.
- Navigation patterns were not optimized for desktop norms.

This led to a deliberate decision to later redesign the desktop frontend specifically for that context.

### Outcomes

- A complete web-based fullstack application with real authentication, dashboard flows, and Supabase integration was delivered.
- The project served as a **baseline template** for later multi-surface work on OneClip Hub.
- The desktop misalignment became a useful lesson on not blindly reusing UI across platforms.

### What Was Learned

- Fullstack apps require thinking in **systems**, not pages: auth, data, routing, and testing must work together.
- Desktop apps benefit from their own **interaction model** and layouts, even when logic is shared with the web.
- Investing early in testing and theming speeds up later iteration.

***

## Case Study 2: OneClip Hub

### Snapshot

- **Type:** Multi-platform product (web, Windows desktop, Android mobile)
- **Role:** Product designer, fullstack engineer
- **Timeline:** 2026, ongoing
- **Stack:** React (web), Tauri (Windows), React Native + Expo (Android), Supabase backend

### Context

OneClip Hub is the evolution of OneClip Downloader into a cohesive, multi-platform hub for media operations. It extends beyond a single downloader to a system that feels like a polished product across devices, packaged under the Syntax brand.

### Problem

Once the initial downloader was stable, the next challenge was:

- Consolidate functionality into a **hub** that works across web, desktop, and mobile.
- Maintain a consistent visual language and UX, while respecting each platform’s expectations.
- Keep the experience smooth even on **budget Android devices**.

### Goals

- Create a **premium-feeling UI** that looks and behaves consistently across platforms.
- Use a single Supabase backend to centralize authentication, preferences, and data.
- Implement a robust settings system that exposes key configuration without overwhelming users.

### Constraints and Challenges

- Tauri and React Native introduce platform-specific constraints for packaging, performance, and system integration.
- Android devices with limited resources required strict performance discipline: no heavy unnecessary animations, optimized rendering, and careful state management.
- UX needed to feel native but still recognizably “OneClip Hub” everywhere.

### Process

#### 1. Experience and information architecture

The hub experience was mapped around core user flows (search, download, manage content) and supported by a settings architecture split into four tabs: **Profile, Appearance, Filename, Engines**.

This created a mental model where:

- Profile handled identity and account details.
- Appearance controlled theming, including a global neon accent color.
- Filename and Engines exposed power-user controls without polluting the main interface.

#### 2. Visual system and neon identity

The product adopted a neon-accented, dark theme aesthetic that carried across platforms. Key elements:

- A global accent color picker to let users personalize the neon highlight color.
- Consistent typography and spacing between web and mobile.
- Clean, card-based layout patterns.

#### 3. Multi-platform implementation

- **Web:** Built in React, leveraging component reuse from OneClip Downloader but refactored into a more modular design system.
- **Windows (Tauri):** The web UI was adapted into a desktop shell, with attention to window controls and desktop-friendly navigation.
- **Android (React Native + Expo):** A bottom-tab navigation structure mirrored the desktop’s conceptual layout but in a mobile-native pattern, ensuring smooth interaction even on budget phones.

#### 4. Performance and polish

Performance work on Android focused on reducing unnecessary renders, optimizing lists, and avoiding heavyweight effects. The goal was that the app should feel “premium” even on hardware that normally struggles with complex UIs.

### Outcomes

- OneClip Hub became a **multi-surface product**: web, Windows, and Android shared a unified identity and backend.
- Settings architecture and neon theming created a recognizable product feel under the Syntax umbrella.
- The project positioned Syntax as capable of delivering cross-platform, production-style software.

### What Was Learned

- Multi-platform products require a **platform-aware design system**, not just responsive layouts.
- Centralizing configuration (like theme and engine settings) improves coherence when users switch devices.
- Performance constraints on low-end devices are a strong forcing function for better engineering discipline.

***

## Case Study 3: Flux IDE – Cinematic Landing Page

### Snapshot

- **Type:** Marketing/landing site with cinematic 3D storytelling
- **Role:** Designer, front-end developer
- **Timeline:** 2026
- **Stack:** React-based front-end (deployed on Vercel), dark glassmorphism visuals, gradients, 3D-inspired motion
- **URL:** https://flux-ide.vercel.app/

### Context

Flux IDE needed a landing page that felt like a **cinematic trailer** for a developer tool, not just a typical hero + features layout. The goal was to showcase advanced visual storytelling and motion design skills within a single-page experience.

### Problem

Most IDE marketing sites either look generic or rely on static screenshots. The challenge was to:

- Communicate the personality and power of Flux IDE through **motion and atmosphere**.
- Create a page that feels like a story unfolding, rather than a static brochure.
- Keep it performant enough for web deployment on typical devices.

### Goals

- Use 3D-inspired visuals and cinematic transitions to stand out from typical dev-tool marketing sites.
- Apply a consistent dark glassmorphism style with purple-blue gradients.
- Demonstrate the ability to craft a premium, animated landing page end-to-end.

### Constraints and Challenges

- Cinematic presentation can easily become heavy; the design needed to balance animation and performance.
- The project had to respect deployment and hosting constraints on Vercel while maintaining smooth interactions.

### Process

#### 1. Visual direction and mood

The visual concept centered around a **dark, glassy interface** with purple-blue gradients, reflecting a futuristic IDE command center. Components were layered using semi-transparent panels and glow effects to build depth without overwhelming users.

#### 2. Layout and storytelling

The page structure followed a narrative arc:

- Hero section with strong headline and core value proposition.
- Scroll-driven sections introducing key capabilities and design elements.
- Cinematic transitions between panels to maintain a sense of flow.

Each section was designed to feel like a “scene” rather than a discrete block.

#### 3. Implementation and deployment

The front-end was implemented with modern React tooling and deployed using Vercel for fast global delivery. Careful use of animations and gradients helped maintain good performance while still delivering a “wow” factor.

### Outcomes

- Flux IDE’s landing page established a clear **visual identity** distinct from typical developer product sites.
- The project demonstrated capability in cinematic storytelling, modern web animation, and production-ready deployment.
- It became a key showcase piece under the Syntax brand portfolio.

### What Was Learned

- Storytelling through layout and motion can make even abstract tools feel emotionally engaging.
- Glassmorphism and heavy gradients must be paired with careful performance tuning.
- A single landing page can double as both marketing asset and design/engineering case study.

***

## Case Study 4: Syntax – Company Website

### Snapshot

- **Type:** Corporate/portfolio site for Syntax
- **Role:** Brand, UX, and front-end implementation
- **Timeline:** 2026
- **Stack:** React-based front-end generated from a Stitch layout, inspired by Andy Reff’s dark editorial style[^2][^3]

### Context

Syntax is positioned as a **unified publishing company** that offers fullstack web development and motion graphics design services. The website needed to look like it belonged to a designer–developer studio capable of cinematic and technical work.

### Problem

Generic agency templates would not convey the desired personality or technical depth. The key challenge was to:

- Build a **dark, editorial site** that feels handcrafted and premium.
- Introduce a distinctive hero centered on the word “SYNTAX” as a living, interactive object.
- Ensure the site works as both a brand anchor and a work showcase.[^3][^4][^5]

### Goals

- Translate a Stitch-generated layout into production-ready front-end code while preserving structure, spacing, and type hierarchy.[^3]
- Emulate the interaction language of Andy Reff’s portfolio: dark canvas, dot-grid feel, and interactive hero typography.[^2][^3]
- Use the site as a container for projects like OneClip Hub and Flux IDE under a unified brand.

### Constraints and Challenges

- The layout and interaction model had to be derived from a static Stitch design, then extended for real-world responsiveness and interactivity.[^3]
- The hero word “SYNTAX” needed to visually carry the brand while keeping the codebase maintainable.[^4][^5]

### Process

#### 1. From Stitch layout to live code

The process started by exporting the Stitch layout and using it as a blueprint for semantic HTML and React components. The focus was on:[^3]

- Preserving exact spacing, grids, and typography hierarchy.
- Recreating the dark near-black background and subtle editorial styling.
- Ensuring a responsive system that works across desktop, tablet, and mobile.

#### 2. Designing the SYNTAX hero

The hero revolved around a selection-style box containing the word **SYNTAX**, with a visual duality:

- `SYN` rendered as a solid, filled word.
- `TAX` rendered as outline-only, often in a contrasting amber stroke.[^5][^4]

The bounding box, subtle handles, and overlay labels (such as `// initializing syntax...` and `<Divyansh />`) created a metaphor of “code being parsed,” inspired by Reff’s own typographic hero.[^4][^5]

The hero was iterated to ensure the full word SYNTAX appeared on one line, fully inside the selection box, and later as a large background element in the manifesto section.[^6][^4]

#### 3. Content and brand structure

The site structure reinforced Syntax as a studio:

- Hero and manifesto focusing on craft and technical precision.[^6]
- Work section highlighting projects like OneClip Hub and Flux IDE as case studies under one umbrella.

### Outcomes

- A **dark, editorial portfolio site** that visually aligns with modern high-end product designer portfolios.[^2]
- A distinctive SYNTAX hero that serves as a visual anchor and a narrative motif across sections.[^5][^4]
- A centralized home for future case studies and experiments under the Syntax name.

### What Was Learned

- Translating static layout tools (like Stitch) into production code requires careful attention to hierarchy and interaction details.[^3]
- Hero typography can act as both branding and narrative when designed with a clear metaphor.
- A studio site is not just a container; it sets the tone for how every project is perceived.

***

## Case Study 5: Horizon HR (Nexus) – HR AI Concept

### Snapshot

- **Type:** Conceptual HR automation and AI assistant
- **Role:** Product concept, systems thinking
- **Timeline:** 2026 (concept and planning)
- **Scope:** Automated job posting, candidate screening, test administration

### Context

Horizon HR (internally referred to as **Nexus**) explores how AI agents can streamline HR workflows that are typically manual, repetitive, and error-prone. The concept was shaped by research into HR technology, automation, and AI-driven decision support systems.

### Problem

Hiring and candidate management often involve:

- Posting similar roles across multiple platforms (LinkedIn, Shine, etc.).
- Manually filtering large volumes of applicants.
- Running tests and interviews without a unified pipeline.

The challenge was to envision a system that would **automate the busywork** while keeping humans in control of critical decisions.

### Goals

- Design an AI agent that can post jobs to multiple platforms with a **single action**.
- Provide an integrated interviewee panel for online tests, scoring, and candidate filtering.
- Use HR-tech best practices as a foundation rather than reinventing the entire workflow.

### Constraints and Challenges

- As a concept-stage project, Horizon HR had to balance ambition with realism: what can current AI and automation actually handle, and where must humans remain in the loop?
- Data privacy, fairness, and bias mitigation are non-negotiable concerns for HR AI tools.

### Process

#### 1. Researching HR technology landscape

Initial exploration focused on how existing HR tech platforms manage job postings, ATS flows, and candidate evaluation. This research informed decisions about which parts of the workflow can be safely automated.

#### 2. Defining the agent’s responsibilities

The Nexus agent was scoped around three primary responsibilities:

- **Job distribution:** Publish a single job description across platforms like LinkedIn and Shine via API or automated flows.
- **Candidate funnel:** Track applicants in a unified interface, with metadata and statuses.
- **Assessment panel:** Host online tests, capture scores, and propose ranking suggestions, with humans approving final decisions.

#### 3. Experience and system design

Concept screens and flows were drafted to visualize how an HR manager would:

- Create a job once and let the agent handle distribution.
- Watch candidates move through stages, assisted by AI summaries and recommendations.
- Review test results and adjust thresholds or criteria.

### Outcomes

- A clear **concept blueprint** for an HR AI system that could later be implemented as a product.
- A better understanding of the intersection between HR workflows and AI/automation constraints.
- A reusable mental model for future AI-agent products beyond HR.

### What Was Learned

- HR automation touches sensitive areas like fairness and bias, requiring careful guardrails.
- AI agents are most valuable when they automate repetitive mechanical work while keeping humans in control of approvals.
- Early conceptual work can de-risk later engineering by clarifying scope and responsibilities.

***

## Case Study 6: 3D Portfolio Website – In Progress

### Snapshot

- **Type:** Personal 3D storytelling portfolio
- **Role:** Product owner, designer, front-end developer
- **Timeline:** 2026, ongoing
- **Stack (planned):** React-based front-end, Spline 3D integration, scroll-driven animations, custom cursor and sound design

### Context

The 3D portfolio website is designed to be the **flagship personal experience**, bringing together fullstack engineering, motion design, and storytelling. It draws heavy inspiration from Andy Reff’s interactive portfolio, especially the hero transitions and story-like scrolling.[^2]

### Problem

Standard portfolios often feel like static grids of work. The challenge here is to:

- Tell a **narrative** about Syntax and related projects using 3D and motion.
- Integrate Spline-driven 3D in a way that enhances, rather than distracts from, the content.
- Maintain performance and usability while layering advanced visuals.

### Goals

- Implement a hero section with interactive Spline 3D elements, mirroring the sense of depth and motion seen in modern product-designer portfolios.
- Use **bento grids**, a custom cursor, sound effects, and storytelling animations for a premium, immersive feel.
- Make the site the central entry point for case studies like OneClip Hub, Flux IDE, and the Syntax brand.

### Constraints and Challenges

- Integrating Spline 3D scenes with React while maintaining smooth scrolling and good performance is non-trivial.
- Storytelling animations must be tuned to avoid overwhelming visitors or causing motion discomfort.

### Process (So Far)

#### 1. Inspiration and reference gathering

The portfolio direction was shaped after studying Andrew Reff’s site, focusing on:

- Scroll-driven perspective shifts between sections.
- Character-by-character text reveals and cinematic hero sequences.[^2]

This informed the decision to place heavy emphasis on the hero and early scroll experience.

#### 2. Defining the interaction pillars

Key planned elements include:

- A Spline-powered hero object that reacts subtly to cursor or scroll.
- Bento-style grids that showcase projects in a modular, animated layout.
- Custom cursor and sound design to reinforce the tactile, “live system” feeling.

### Expected Outcomes

- A **showpiece portfolio** that demonstrates deep skills in front-end engineering, motion design, and 3D integration.
- A central narrative layer that ties together Syntax, OneClip Hub, Flux IDE, and future AI products.

### What Is Being Learned

- Combining Spline 3D, scroll-linked animation, and editorial-layout typography requires careful orchestration.
- Strong narrative structure is as important as visuals; every interaction must support the story being told.
- Building a highly opinionated portfolio is a valuable sandbox for testing new interaction patterns before applying them to client or product work.

---

## References

1. [Andy Reff | Product Designer](https://andrewreff.com) - Product designer with 20+ years building systems that scale and experiences that stick.

2. [Site of the Day - Andy Reff A dark, editorial portfolio built in ...](https://www.linkedin.com/posts/greensock_site-of-the-day-andy-reff-a-dark-editorial-activity-7447345331119517696-7NM_) - Site of the Day - Andy Reff A dark, editorial portfolio built in React + Vite with GSAP powering eve...

3. [Give me a single prompt to genrate the code based on attached layout of my website genarted from stitch and above told change web application/stitch/projects/15794892688783406084/screens/fa0f3532ff3c47cd972d12b7e2a581f6](https://www.perplexity.ai/search/b00c3176-af08-458c-ba90-6c538bee37bd) - Use this as your single prompt:
Generate production-ready front-end code for the attached SYNTAX web...

4. [syn and tax are looking good like this , just extend the selected box to the tax](https://www.perplexity.ai/search/16a87418-0200-42f5-8599-86c66ae70024) - Perfect — now I see exactly what you mean. Here's the precise update:



Currently the box only wrap...

5. [I want the syntax word in one line , instead of two](https://www.perplexity.ai/search/e35be520-07ae-4613-84aa-9f84c8170206) - Got it. One line changes the layout logic — here's how to keep the filled vs. outlined duality alive...

6. [Remove the scroll for intent and start a project from the Hero section and in the screenshot I want full SYNTAX in the background](https://www.perplexity.ai/search/4ce69562-29b7-4848-8f69-2b2439feac29) - Crystal clear. Two precise changes noted:



Remove from hero:
~~SCROLL_FOR_INTENT label + vertical ...

