export interface BlogPost {
  id: number;
  title: string;
  category: 'AI' | 'Blockchain' | 'Engineering' | 'Life' | 'Design';
  date: number;
  readTime: string;
  likes: number;
  image: string;
  excerpt: string;
  content: string[];
}

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Quiet Death of Productivity Theater",
    category: "AI",
    date: 1704240000000,
    readTime: "5 min read",
    likes: 342,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Why modern engineering teams are ditching performative standups and Jira micro-management in favor of high-autonomy asynchronous AI workflows.",
    content: [
      "In an era where every team was chasing velocity metrics, we paused to evaluate what was actually being delivered. For years, software engineering has been smothered by layers of status meetings, ticket estimation rituals, and synthetic velocity points.",
      "Real engineering productivity isn't measured in tickets closed or hours logged; it is measured in outcomes delivered to end-users without technical debt. By introducing autonomous AI workflows that summarize pull requests, generate regression tests, and automate deployments, our team recovered 18 hours per engineer each week.",
      "The key insight was simple: when machines handle the procedural orchestration, human engineers can focus on architecture, deep conceptual modeling, and customer delight."
    ]
  },
  {
    id: 2,
    title: "Why We Moved Our Blockchain to a Spreadsheet",
    category: "Blockchain",
    date: 1704326400000,
    readTime: "7 min read",
    likes: 512,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    excerpt: "A candid retrospective on de-hyping our architecture, eliminating gas fees, and realizing that 99% of distributed ledgers simply needed an audited relational ledger.",
    content: [
      "Three years ago, our leadership mandated that every product transaction be notarized on a public blockchain. We spent hundreds of thousands of dollars in gas fees, wrestled with 15-minute finality delays, and forced users to install browser extensions just to purchase software licenses.",
      "Last quarter, we migrated the entire auditing ledger to a tamper-evident PostgreSQL database with cryptographic hash chaining and append-only WAL streaming.",
      "Latency dropped from 14 seconds to 3 milliseconds. Energy consumption dropped by 99.98%. And our customer satisfaction rating climbed to an all-time high of 4.9 stars."
    ]
  },
  {
    id: 3,
    title: "On Building Slowly — and Shipping Fast",
    category: "Engineering",
    date: 1704412800000,
    readTime: "4 min read",
    likes: 289,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Counter-intuitive product development: why weeks spent refining system abstractions allow single-day feature rollouts that never break.",
    content: [
      "The tech industry worships the mantra 'Move fast and break things.' But in enterprise infrastructure, broken things cost enterprise trust. True speed is not how fast you can hack a feature together; it is the compounding velocity of a clean, well-tested core.",
      "When your type definitions, API boundaries, and database contracts are airtight, building new capabilities is like snapping together precision lego bricks.",
      "Invest deeply in your foundations. The compound interest paid on clean abstractions will outpace any quick-and-dirty sprint shortcut."
    ]
  },
  {
    id: 4,
    title: "The Future Is Not a Feature. It's a Feeling.",
    category: "Design",
    date: 1704499200000,
    readTime: "6 min read",
    likes: 418,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Interface design is moving away from dense button grids toward intuitive, predictive intent-based canvases.",
    content: [
      "When software feels magical, the user ceases to think about the tool and becomes fully immersed in their objective. No one wakes up wanting to navigate three dropdown menus and submit a form.",
      "We examined hundreds of user interaction sessions. The biggest pain points were visual clutter and decision fatigue. By elevating typography, maintaining generous breathing room, and ensuring keyboard accessibility, the entire application feels effortless.",
      "Accessibility and aesthetic refinement are not competing goals; they are two sides of the same coin of respect for your users."
    ]
  },
  {
    id: 5,
    title: "Accessibility Theater — and What Comes After",
    category: "Engineering",
    date: 1704585600000,
    readTime: "5 min read",
    likes: 673,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Moving beyond automated compliance checklists to build truly screen-reader friendly and keyboard-navigable applications.",
    content: [
      "Too many modern web teams treat accessibility as an afterthought — pasting random aria attributes without testing how an actual NVDA or VoiceOver user experiences the tree.",
      "Real accessibility means logical tab ordering, semantic HTML heading structures, visible focus indicators, high-contrast readable color schemes (tested against WCAG AAA), and respecting user motion preferences.",
      "When you design for accessibility first, you inevitably build a superior, more robust product for all users regardless of device or ability."
    ]
  },
  {
    id: 6,
    title: "Dark Mode Is a Mindset: Designing for Focus",
    category: "Design",
    date: 1704672000000,
    readTime: "4 min read",
    likes: 521,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Why pure black backgrounds cause eye strain, and how subtle surface elevation with indigo undertones creates deep focus environments.",
    content: [
      "Pure #000000 pitch-black creates harsh halo effects and optical vibration against high-contrast text. Our design tokens rely on deep slate obsidian (#0b0d12) paired with elevated surface panels (#141821).",
      "This creates a natural sense of spatial hierarchy and depth without excessive borders or glaring drop shadows. Combined with carefully modulated border opacity, information architecture becomes instantly recognizable.",
      "The result is an environment where developers and analysts can work for hours without visual fatigue."
    ]
  },
  {
    id: 7,
    title: "How We Scaled to 10 Million Real-Time Events",
    category: "Engineering",
    date: 1704758400000,
    readTime: "8 min read",
    likes: 839,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Architectural insights from processing billions of telemetry points with zero dropped frames and sub-50ms latency.",
    content: [
      "Building high-throughput analytics dashboards requires careful memory management, zero unnecessary re-renders, and batched stream consumption.",
      "We break down how our ingestion pipelines deduplicate events at the edge, transform continuous timeseries data, and keep client bundle sizes lightweight.",
      "Modern web technology is astonishingly capable when freed from legacy bloat and unneeded duplicate dependencies."
    ]
  },
  {
    id: 8,
    title: "The Ergonomics of Developer Tooling",
    category: "Life",
    date: 1704844800000,
    readTime: "6 min read",
    likes: 394,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Small friction points compound. How shaving 200ms off daily developer tools reshapes creative momentum and team happiness.",
    content: [
      "Every millisecond of latency is a tiny tax on your brain's working memory. When tests run instantly, you stay in flow. When builds lag by 30 seconds, you switch to Twitter.",
      "We systematically audited every internal tool: CLI generators, conversion calculators, API proxies, and local preview environments. Removing unnecessary delays restored immense creative joy across our team.",
      "Tools should feel as responsive as an acoustic instrument: immediate, deterministic, and dependable."
    ]
  }
];
