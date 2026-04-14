export type Category = 'fullstack' | 'video';

export interface ProjectContent {
  context: string;
  problem: string;
  goals: string[];
  process: { title: string; desc: string }[];
  outcomes: string[];
  learnings: string[];
}

export interface Project {
  id: string;
  category: Category;
  title: string;
  subtitle: string;
  desc: string;
  tech: string[];
  accentColor: string;
  gradient: string;
  year: string;
  role: string;
  metrics?: { label: string; value: string }[];
  featured?: boolean;
  content: ProjectContent;
}

export const projects: Project[] = [
  {
    id: 'oneclip-downloader',
    category: 'fullstack',
    title: 'OneClip Downloader',
    subtitle: 'Fullstack App',
    desc: 'A fullstack web application and desktop client designed to provide a clean, trustworthy, and fast media downloading experience.',
    tech: ['React', 'Supabase', 'Vite', 'Vitest'],
    accentColor: '#3ecf8e',
    gradient: 'linear-gradient(135deg, #0a1f16 0%, #03100a 60%, #0b2419 100%)',
    year: '2026',
    role: 'Solo Designer-Developer',
    metrics: [{ label: 'Platform', value: 'Web/Win' }, { label: 'Status', value: 'Completed' }],
    content: {
      context: 'OneClip Downloader began as a practical, real-world fullstack project to consolidate video and media downloading into a single, clean interface. It served as a testbed for building a production-style stack with authentication, dashboards, and testing, rather than just a simple side project.',
      problem: 'Most downloader tools feel untrustworthy, cluttered with ads, or technically clunky. The initial problem statement:\n\n- Provide a clean, trustworthy, and fast way to download content.\n- Support authenticated users with a dashboard instead of a single bare-bones page.\n- Treat it like a real SaaS-style app, not just a script.\n\nThe desktop experience also needed to feel native rather than a lazy port of the web UI.',
      goals: [
        'Ship a fullstack web app with Authentication, Dashboard, Dark-mode UX, and Supabase integration.',
        'Build a Windows desktop version to explore a multi-surface product, identifying necessary UI/UX changes.'
      ],
      process: [
        {
          title: 'Architecture and foundations',
          desc: 'Started with a classic React SPA structure. Supabase handled authentication, database, and simple server-side logic, enabling rapid fullstack iteration without managing custom infrastructure.'
        },
        {
          title: 'Interface and experience design',
          desc: 'The UI used dark-mode theming inspired by modern developer tools, focusing on clear hierarchy for navigation, strong contrast for call-to-action buttons, and a dashboard-style layout.'
        },
        {
          title: 'Desktop experiment',
          desc: 'A Windows version was created to explore the potential of a native-feeling experience. Initial misalignments led to a deliberate decision to redesign the desktop frontend later.'
        }
      ],
      outcomes: [
        'A complete web-based fullstack application with real authentication, dashboard flows, and Supabase integration was delivered.',
        'The project served as a baseline template for later multi-surface work on OneClip Hub.'
      ],
      learnings: [
        'Fullstack apps require thinking in systems, not pages: auth, data, routing, and testing must work together.',
        'Desktop apps benefit from their own interaction model and layouts, even when logic is shared with the web.',
        'Investing early in testing and theming speeds up later iteration.'
      ]
    }
  },
  {
    id: 'oneclip-hub',
    category: 'fullstack',
    title: 'OneClip Hub',
    subtitle: 'Multi-Platform Product',
    desc: 'The evolution of OneClip into a cohesive media command center across Web, Windows (Tauri), and Android with a unified UI/UX.',
    tech: ['React', 'Tauri', 'React Native', 'Supabase'],
    accentColor: '#a78bfa',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #0d0122 40%, #1d0845 100%)',
    year: '2026',
    role: 'Product Designer & Engineer',
    metrics: [{ label: 'Platforms', value: '3' }, { label: 'Status', value: 'Ongoing' }],
    featured: true,
    content: {
      context: 'OneClip Hub is the evolution of OneClip Downloader into a cohesive, multi-platform hub for media operations. It extends beyond a single downloader to a system that feels like a polished product across devices, packaged under the Syntax brand.',
      problem: 'Once the initial downloader was stable, the next challenge was to consolidate functionality into a hub that works across web, desktop, and mobile; maintain a consistent visual language and UX, while respecting each platform’s expectations; and keep the experience smooth even on budget Android devices.',
      goals: [
        'Create a premium-feeling UI that looks and behaves consistently across platforms.',
        'Use a single Supabase backend to centralize authentication, preferences, and data.',
        'Implement a robust settings system that exposes key configuration without overwhelming users.'
      ],
      process: [
        {
          title: 'Experience and information architecture',
          desc: 'The hub experience was mapped around core user flows (search, download, manage content) and supported by a settings architecture split into Profile, Appearance, Filename, and Engines.'
        },
        {
          title: 'Visual system and neon identity',
          desc: 'The product adopted a neon-accented, dark theme aesthetic that carried across platforms, featuring a global accent color picker, consistent typography, and clean, card-based layouts.'
        },
        {
          title: 'Multi-platform implementation',
          desc: 'Built in React for Web, Tauri for Windows desktop shell, and React Native + Expo for Android, mirroring the conceptual layout in a mobile-native pattern.'
        },
        {
          title: 'Performance and polish',
          desc: 'Performance work on Android focused on reducing unnecessary renders, optimizing lists, and avoiding heavyweight effects to ensure it felt premium even on limited hardware.'
        }
      ],
      outcomes: [
        'OneClip Hub became a multi-surface product: web, Windows, and Android shared a unified identity and backend.',
        'Settings architecture and neon theming created a recognizable product feel.',
        'The project positioned Syntax as capable of delivering cross-platform, production-style software.'
      ],
      learnings: [
        'Multi-platform products require a platform-aware design system, not just responsive layouts.',
        'Centralizing configuration improves coherence when users switch devices.',
        'Performance constraints on low-end devices are a strong forcing function for better engineering discipline.'
      ]
    }
  },
  {
    id: 'flux-ide',
    category: 'fullstack',
    title: 'Flux IDE',
    subtitle: 'Cinematic Landing Page',
    desc: 'A futuristic narrative-driven marketing site for a developer tool, combining dark glassmorphism and 3D-inspired motion.',
    tech: ['React', 'Vercel', 'Framer Motion'],
    accentColor: '#60a5fa',
    gradient: 'linear-gradient(135deg, #020f1a 0%, #010810 60%, #020d18 100%)',
    year: '2026',
    role: 'Designer & Front-End',
    metrics: [{ label: 'Style', value: 'Cinematic' }, { label: 'Deploy', value: 'Vercel' }],
    content: {
      context: 'Flux IDE needed a landing page that felt like a cinematic trailer for a developer tool, not just a typical hero + features layout. The goal was to showcase advanced visual storytelling and motion design skills within a single-page experience.',
      problem: 'Most IDE marketing sites either look generic or rely on static screenshots. The challenge was to communicate the personality and power of Flux IDE through motion and atmosphere, creating a page that feels like a story unfolding while staying performant.',
      goals: [
        'Use 3D-inspired visuals and cinematic transitions to stand out.',
        'Apply a consistent dark glassmorphism style with purple-blue gradients.',
        'Demonstrate the ability to craft a premium, animated landing page end-to-end.'
      ],
      process: [
        {
          title: 'Visual direction and mood',
          desc: 'The visual concept centered around a dark, glassy interface with purple-blue gradients, reflecting a futuristic IDE command center. Components were layered using semi-transparent panels and glow effects.'
        },
        {
          title: 'Layout and storytelling',
          desc: 'The page structure followed a narrative arc: a strong hero section, scroll-driven capabilities sections, and cinematic transitions. Each section was designed to feel like a scene.'
        },
        {
          title: 'Implementation and deployment',
          desc: 'The front-end was implemented with modern React tooling and deployed using Vercel. Careful use of animations and gradients helped maintain good performance.'
        }
      ],
      outcomes: [
        'Flux IDE’s landing page established a clear visual identity distinct from typical developer product sites.',
        'The project demonstrated capability in cinematic storytelling, modern web animation, and production-ready deployment.',
        'It became a key showcase piece under the Syntax brand portfolio.'
      ],
      learnings: [
        'Storytelling through layout and motion can make even abstract tools feel emotionally engaging.',
        'Glassmorphism and heavy gradients must be paired with careful performance tuning.',
        'A single landing page can double as both marketing asset and design/engineering case study.'
      ]
    }
  },
  {
    id: 'syntax-website',
    category: 'fullstack',
    title: 'Syntax Studio',
    subtitle: 'Company Portfolio',
    desc: 'A dark, editorial brand anchor for the Syntax publishing company, translating static Stitch layouts into interactive code.',
    tech: ['React', 'Stitch', 'UX Design'],
    accentColor: '#f472b6',
    gradient: 'linear-gradient(135deg, #1a0520 0%, #0d0114 60%, #1c0628 100%)',
    year: '2026',
    role: 'Brand & UX Developer',
    metrics: [{ label: 'Aesthetic', value: 'Editorial' }, { label: 'Role', value: 'Lead' }],
    content: {
      context: 'Syntax is positioned as a unified publishing company that offers fullstack web development and motion graphics design services. The website needed to look like it belonged to a designer–developer studio capable of cinematic and technical work.',
      problem: 'Generic agency templates would not convey the desired personality or technical depth. The key challenge was to build a dark, editorial site that feels handcrafted and premium, introduce a distinctive interactive hero, and ensure the site works as a brand anchor.',
      goals: [
        'Translate a Stitch-generated layout into production-ready front-end code while preserving structure and hierarchy.',
        'Emulate the interaction language of Andy Reff’s portfolio: dark canvas, dot-grid feel, and interactive hero typography.',
        'Use the site as a container for projects like OneClip Hub and Flux IDE under a unified brand.'
      ],
      process: [
        {
          title: 'From Stitch layout to live code',
          desc: 'The process started by using the exported Stitch layout as a blueprint for semantic HTML and React components, preserving exact spacing, grids, and typography hierarchy.'
        },
        {
          title: 'Designing the SYNTAX hero',
          desc: 'The hero revolved around a selection-style box containing the word SYNTAX, with a visual duality: SYN rendered as a solid word, and TAX rendered as outline-only.'
        },
        {
          title: 'Content and brand structure',
          desc: 'The site structure reinforced Syntax as a studio with a focus on craft and technical precision, highlighting projects as case studies under one umbrella.'
        }
      ],
      outcomes: [
        'A dark, editorial portfolio site that visually aligns with modern high-end product designer portfolios.',
        'A distinctive SYNTAX hero that serves as a visual anchor and a narrative motif across sections.',
        'A centralized home for case studies and experiments under the Syntax name.'
      ],
      learnings: [
        'Translating static layout tools into production code requires careful attention to hierarchy and interaction details.',
        'Hero typography can act as both branding and narrative when designed with a clear metaphor.',
        'A studio site sets the tone for how every project is perceived.'
      ]
    }
  },
  {
    id: 'horizon-hr',
    category: 'fullstack',
    title: 'Horizon HR (Nexus)',
    subtitle: 'HR AI Concept',
    desc: 'A conceptual system to automate job distribution, manage candidate funnels, and assist HR managers with AI-powered assessment panels.',
    tech: ['Systems Design', 'AI Workflow', 'UX Research'],
    accentColor: '#fb923c',
    gradient: 'linear-gradient(135deg, #1a1005 0%, #0d0a01 60%, #1c1408 100%)',
    year: '2026',
    role: 'Product Concept Designer',
    metrics: [{ label: 'Stage', value: 'Concept' }, { label: 'Focus', value: 'Automation' }],
    content: {
      context: 'Horizon HR (internally referred to as Nexus) explores how AI agents can streamline HR workflows that are typically manual, repetitive, and error-prone. The concept was shaped by research into HR technology, automation, and AI-driven decision support systems.',
      problem: 'Hiring and candidate management often involve posting similar roles across multiple platforms, manually filtering large volumes of applicants, and running tests without a unified pipeline. The challenge was to envision a system that automates the busywork while keeping humans in control of critical decisions.',
      goals: [
        'Design an AI agent that can post jobs to multiple platforms with a single action.',
        'Provide an integrated interviewee panel for online tests, scoring, and candidate filtering.',
        'Use HR-tech best practices as a foundation rather than reinventing the entire workflow.'
      ],
      process: [
        {
          title: 'Researching HR technology landscape',
          desc: 'Initial exploration focused on how existing HR tech platforms manage job postings, ATS flows, and candidate evaluation, informing decisions about automation safely.'
        },
        {
          title: 'Defining the agent’s responsibilities',
          desc: 'The Nexus agent was scoped around job distribution (publishing across platforms), managing the candidate funnel, and hosting an assessment panel for ranking suggestions.'
        },
        {
          title: 'Experience and system design',
          desc: 'Concept screens and flows were drafted to visualize an HR manager creating jobs, tracking applicants assisted by AI, and reviewing test results.'
        }
      ],
      outcomes: [
        'A clear concept blueprint for an HR AI system that could later be implemented as a product.',
        'A better understanding of the intersection between HR workflows and AI/automation constraints.',
        'A reusable mental model for future AI-agent products beyond HR.'
      ],
      learnings: [
        'HR automation touches sensitive areas like fairness and bias, requiring careful guardrails.',
        'AI agents are most valuable when automating repetitive mechanical work while keeping humans in control.',
        'Early conceptual work can de-risk later engineering by clarifying scope and responsibilities.'
      ]
    }
  },
  {
    id: '3d-portfolio',
    category: 'fullstack',
    title: '3D Portfolio',
    subtitle: 'Personal Flagship',
    desc: 'A highly interactive storytelling experience featuring scroll-driven animations, bento grids, and integrated Spline 3D scenes.',
    tech: ['React', 'Spline 3D', 'Framer Motion'],
    accentColor: '#dd2aff',
    gradient: 'linear-gradient(135deg, #1c0226 0%, #0e0114 60%, #20042b 100%)',
    year: '2026',
    role: 'Product Owner & Dev',
    metrics: [{ label: 'Type', value: 'Flagship' }, { label: 'Status', value: 'In Progress' }],
    content: {
      context: 'The 3D portfolio website is designed to be the flagship personal experience, bringing together fullstack engineering, motion design, and storytelling. It draws heavy inspiration from top tier interactive portfolios.',
      problem: 'Standard portfolios often feel like static grids of work. The challenge here is to tell a narrative about projects using 3D and motion, integrate Spline-driven 3D in an enhancing way, and maintain performance.',
      goals: [
        'Implement a hero section with interactive Spline 3D elements, mirroring a sense of depth and motion.',
        'Use bento-style grids, custom cursor, and storytelling animations for a premium, immersive feel.',
        'Make the site the central entry point for case studies like OneClip Hub and Flux IDE.'
      ],
      process: [
        {
          title: 'Inspiration and reference gathering',
          desc: 'The portfolio direction was shaped by studying the best industry sites, focusing on scroll-driven perspective shifts and character-by-character text reveals.'
        },
        {
          title: 'Defining the interaction pillars',
          desc: 'Key planned elements include a Spline-powered hero object, bento-style grids showcasing projects modularly, and custom visual design to reinforce the tactile feeling.'
        }
      ],
      outcomes: [
        'A showpiece portfolio demonstrating deep skills in front-end engineering, motion design, and 3D integration.',
        'A central narrative layer that ties together Syntax, OneClip Hub, Flux IDE, and future products.'
      ],
      learnings: [
        'Combining Spline 3D, scroll-linked animation, and editorial-layout typography requires careful orchestration.',
        'Strong narrative structure is as important as visuals; every interaction must support the story.',
        'Building a highly opinionated portfolio is a valuable sandbox for testing new interaction patterns.'
      ]
    }
  },
  {
    id: 'herbalife-social',
    category: 'video',
    title: 'Herbalife',
    subtitle: 'Social Content',
    desc: 'Transforming raw material into polished, high-converting social media reels for Herbalife distributors, focusing on lifestyle aspirations and 3-second hooks.',
    tech: ['Premiere Pro', 'CapCut', 'Brand Aesthetics'],
    accentColor: '#34d399',
    gradient: 'linear-gradient(135deg, #021a0e 0%, #010d07 60%, #031a10 100%)',
    year: '2024',
    role: 'Video Editor & Content Strategist',
    metrics: [{ label: 'Audience', value: '2M+' }, { label: 'Format', value: '9:16' }],
    featured: true,
    content: {
      context: 'Herbalife is a global science-backed nutrition and wellness brand with over 2 million Instagram followers. Their independent distributors and coaches constantly need high-converting social media content — product showcases, testimonials, and lifestyle reels — to grow their networks and attract customers.',
      problem: 'Distributors often have raw footage or product clips with no editing structure. The challenge was to transform this raw material into polished, scroll-stopping reels that communicate credibility, maintain brand consistency, and drive engagement within the first 3 seconds.',
      goals: [
        'Create short-form vertical videos (15-60 seconds) that capture attention immediately.',
        'Maintain a consistent, premium brand aesthetic aligned with Herbalife’s internal guidelines.',
        'Provide high-converting assets that distributors can easily share to generate leads.'
      ],
      process: [
        {
          title: 'Footage Auditing & Hook Creation',
          desc: 'Received raw clips and identified the most engaging moments to build strong 3-second visual hooks, ensuring viewer retention.'
        },
        {
          title: 'Pacing & Transition Design',
          desc: 'Applied dynamic jump cuts, seamless transitions, and speed-ramping using Premiere Pro and CapCut to maintain a fast, modern social media pace.'
        },
        {
          title: 'Audio & Visual Polish',
          desc: 'Mixed trending audio with clear, impactful captions. Applied color grading settings to keep skin tones natural and the product colors popping.'
        }
      ],
      outcomes: [
        'Delivered a highly successful package of short-form reels that distributors utilized across Instagram and TikTok.',
        'Increased average completion rates and engagement metrics on distributor pages due to the optimized hook strategy.'
      ],
      learnings: [
        'The first 3 seconds are make-or-break in social media, requiring the most editing attention.',
        'Brand consistency must be maintained without sacrificing the authentic, user-generated feel of modern reels.',
        'Efficient workflows between CapCut (for pacing/effects) and Premiere Pro (for refined finishing) yield the best results for high-volume content.'
      ]
    }
  },
  {
    id: 'sunny-biggy-fitness',
    category: 'video',
    title: 'Sunny Biggy Fitness',
    subtitle: 'Motivational Reels',
    desc: 'Cinematic motivational content for Chicago-based IFBB Pro Sunny Akhigbe, syncing training arc story-telling with high-energy rhythm.',
    tech: ['Premiere Pro', 'Motion Design', 'Color Grading'],
    accentColor: '#fb923c',
    gradient: 'linear-gradient(135deg, #1a1005 0%, #0d0a01 60%, #1c1408 100%)',
    year: '2024',
    role: 'Freelance Video Editor',
    metrics: [{ label: 'Brand Impact', value: 'ABC7' }, { label: 'Reach', value: '1k+ Clients' }],
    content: {
       context: 'Sunny Biggy Fitness is led by IFBB Pro Sunny Akhigbe, representing a high-energy, professional fitness brand that has garnered significant local media attention in Chicago. The brand needed video content that matched the intensity and professionalism of an IFBB Pro’s training regimen.',
       problem: 'Gym footage often looks repetitive and uninspiring if not edited well. The goal was to take standard training footage and transform it into cinematic, high-impact motivational pieces that tell a visual story of dedication and strength.',
       goals: [
         'Produce cinematic, motivational content pieces that emphasize the grit, atmosphere, and intensity of professional bodybuilding.',
         'Align edits seamlessly with high-BPM, rhythm-heavy audio tracks.',
         'Elevate Sunny Biggy Fitness’s digital storytelling to convert followers into training clients.'
       ],
       process: [
         {
           title: 'Narrative Arc Assembly',
           desc: 'Reviewed hours of gym sessions, pulling clips to construct a training crescendo—starting slow and building up to maximum intensity.'
         },
         {
           title: 'Rhythmic Synchronization',
           desc: 'Used Premiere Pro to cut action precisely to the beat drops and bass lines, creating a visceral sense of impact and momentum.'
         },
         {
           title: 'Cinematic Color Grading',
           desc: 'Applied dark, moody, yet high-contrast LUTs to emphasize muscle definition, sweat, and the gritty gym atmosphere.'
         }
       ],
       outcomes: [
         'Established a recognizable, cinematic video style for Sunny Akhigbe’s social channels.',
         'Created highly engaging reels that drove measurable upticks in training inquiries from 1k+ existing and new clients.'
       ],
       learnings: [
         'Audio design is half of the visual experience; editing *to* the beat amplifies emotional resonance.',
         'Cinematic color grading drastically separates professional training videos from casual gym vlogs.',
         'Visual storytelling can happen in under 30 seconds if the emotional arc is well-structured.'
       ]
    }
  }
];
