export interface BookshelfProject {
  id: string;
  meshPrefix: string;
  title: string;
  subtitle: string;
  category: "Professional Projects" | "Personal Projects" | "Academic Projects";
  badgeNumber: number;
  spineBg: string;
  spineAccent: string;
  hasStar?: boolean;
  description: string;
  role: string;
  stack: string[];
  highlights: string[];
  links?: {
    github?: string;
    demo?: string;
  };
}

export const BOOKSHELF_PROJECTS: Record<string, BookshelfProject> = {
  // --- Professional Projects (Top Shelf · 2 Books) ---
  "Shelf_Book_Pro_0": {
    id: "echem-revision",
    meshPrefix: "Shelf_Book_Pro_0",
    title: "Echem Revision 2027",
    subtitle: "Enterprise Chemical Formulation & Compliance Platform",
    category: "Professional Projects",
    badgeNumber: 2,
    spineBg: "#701a75",
    spineAccent: "#f472b6",
    description:
      "Engineered an enterprise batch formulation platform tracking chemical revisions, safety datasheets, and regulatory ISO compliance across production lines.",
    role: "Full Stack Engineer @ Ampron String Solutions",
    stack: ["Next.js 14", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS"],
    highlights: [
      "Real-time formulation validation against chemical compatibility constraints",
      "Cryptographic change auditing preserving historical batch revisions",
      "Sub-second vector lookup across 10,000+ safety regulatory documents",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
    },
  },
  "Shelf_Book_Pro_1": {
    id: "anjun-baby-center",
    meshPrefix: "Shelf_Book_Pro_1",
    title: "Anjun Baby Center",
    subtitle: "Pediatric Clinical Management & Patient Tracking System",
    category: "Professional Projects",
    badgeNumber: 2,
    spineBg: "#be123c",
    spineAccent: "#fda4af",
    description:
      "Comprehensive healthcare web application managing pediatric patient records, vaccination milestone schedules, and appointment telemetry.",
    role: "Full Stack Engineer @ BMS Solutions",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    highlights: [
      "Automated immunization schedule calculation based on WHO protocols",
      "HIPAA-conscious encrypted patient health data storage and audit trails",
      "Zero-latency clinic queue monitoring and SMS alert integrations",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
    },
  },

  // --- Personal Projects (Middle Shelf · 7 Books) ---
  "Shelf_Book_Personal_0": {
    id: "devdeck",
    meshPrefix: "Shelf_Book_Personal_0",
    title: "DevDeck",
    subtitle: "Interactive Developer Workspace & Systems Cockpit",
    category: "Personal Projects",
    badgeNumber: 7,
    spineBg: "#d97706",
    spineAccent: "#fde047",
    hasStar: true,
    description:
      "A developer control console combining live network telemetry, 3D interactive simulators, and real-time benchmark utilities in a unified dark glass cockpit.",
    role: "Lead Systems & Graphics Developer",
    stack: ["Three.js", "React Three Fiber", "TypeScript", "Next.js", "Tailwind CSS"],
    highlights: [
      "Custom 60 FPS Three.js rendering loop with ACES Filmic tone mapping",
      "Zero-overhead audio synthesis with Web Audio API soundboard",
      "Full offline progressive web app support with state persistence",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
    },
  },
  "Shelf_Book_Personal_1": {
    id: "flux",
    meshPrefix: "Shelf_Book_Personal_1",
    title: "FluX",
    subtitle: "Reactive State Management & Real-Time Flow Pipeline",
    category: "Personal Projects",
    badgeNumber: 7,
    spineBg: "#6d28d9",
    spineAccent: "#e9d5ff",
    hasStar: true,
    description:
      "A lightweight, zero-dependency reactive streaming state manager providing atomic transactions, time-travel debugging, and websocket sync.",
    role: "Architect & Core Contributor",
    stack: ["TypeScript", "WebSockets", "RxJS", "Microbenchmarks"],
    highlights: [
      "Deterministic state snapshots with reversible event sourcing",
      "3.2x faster dispatch throughput compared to standard Redux pipelines",
      "Comprehensive automated test harness with 100% mutation branch coverage",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
    },
  },
  "Shelf_Book_Personal_2": {
    id: "sortflow",
    meshPrefix: "Shelf_Book_Personal_2",
    title: "SortFlow",
    subtitle: "Algorithm Visualizer & Complexity Benchmark Suite",
    category: "Personal Projects",
    badgeNumber: 7,
    spineBg: "#ea580c",
    spineAccent: "#fed7aa",
    description:
      "Interactive algorithm visualizer showing array comparisons, partition trees, and memory pointer shifts with synchronized sound frequencies.",
    role: "Creator & Designer",
    stack: ["React", "HTML5 Canvas", "Web Audio API", "Tailwind CSS"],
    highlights: [
      "Visual step-by-step debugger for QuickSort, MergeSort, RadixSort & Timsort",
      "Harmonic pitch generator tied to comparison element magnitudes",
      "Benchmark metrics tracking comparison count, array writes, and time delta",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
    },
  },
  "Shelf_Book_Personal_3": {
    id: "santas-secret-cipher",
    meshPrefix: "Shelf_Book_Personal_3",
    title: "Santa's Secret Cipher",
    subtitle: "Diffie–Hellman & MITM Cryptographic Playground",
    category: "Personal Projects",
    badgeNumber: 7,
    spineBg: "#2563eb",
    spineAccent: "#93c5fd",
    description:
      "Full mathematical simulator of cyclic groups Z*_p, discrete log generation, and Man-in-the-Middle intercept attacks on unauthenticated channels.",
    role: "Security Researcher",
    stack: ["JavaScript", "Modular Arithmetic", "Vite", "Playwright E2E", "Tailwind CSS"],
    highlights: [
      "Prime modulus validation ord_p(g) = p - 1 with live generator badges",
      "Interactive Mallory tampering: demonstrates split session keys K_A-M ≠ K_M-B",
      "Strict private exponent bounds preventing trivial Fermat leakage",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
    },
  },
  "Shelf_Book_Personal_4": {
    id: "alphabetz",
    meshPrefix: "Shelf_Book_Personal_4",
    title: "AlphaBetz",
    subtitle: "Dysarthric Speech Recognition & Acoustic Processing",
    category: "Personal Projects",
    badgeNumber: 7,
    spineBg: "#4338ca",
    spineAccent: "#a5b4fc",
    description:
      "Assistive AI pipeline combining fine-tuned Whisper ASR with acoustic preprocessing and phoneme alignment for speech-impaired individuals.",
    role: "AI / ML Researcher",
    stack: ["Python", "PyTorch", "Whisper ASR", "FastAPI", "Hugging Face"],
    highlights: [
      "Acoustic signal normalization and dysarthric acoustic distortion filtering",
      "Phonetic feature alignment using Wav2Vec2 embeddings",
      "Multi-agent LLM consensus layer eliminating hallucinations",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
    },
  },
  "Shelf_Book_Personal_5": {
    id: "mathway",
    meshPrefix: "Shelf_Book_Personal_5",
    title: "MathWay",
    subtitle: "Discrete Mathematics & Number Theoretic Engine",
    category: "Personal Projects",
    badgeNumber: 7,
    spineBg: "#0d9488",
    spineAccent: "#99f6e4",
    description:
      "Computational mathematics engine computing totient functions, primitive roots, Euclidean GCD steps, and Chinese Remainder Theorem systems.",
    role: "Core Developer",
    stack: ["Python", "FastAPI", "SymPy", "React", "TypeScript"],
    highlights: [
      "Step-by-step Euclidean algorithm derivation with LaTeX proofs",
      "Euler's Totient phi(n) factoring with prime decomposition trees",
      "Real-time benchmark against GMP (GNU Multiple Precision) library",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
    },
  },
  "Shelf_Book_Personal_6": {
    id: "phonemart",
    meshPrefix: "Shelf_Book_Personal_6",
    title: "PhoneMart",
    subtitle: "Full-Stack E-Commerce & Hardware Inventory Platform",
    category: "Personal Projects",
    badgeNumber: 7,
    spineBg: "#7c3aed",
    spineAccent: "#c4b5fd",
    description:
      "Modern e-commerce platform for mobile hardware with real-time stock reservations, Stripe payment flows, and order tracking dashboards.",
    role: "Full Stack Engineer",
    stack: ["Next.js", "React", "Node.js", "MongoDB", "Stripe API"],
    highlights: [
      "Optimistic locking avoiding race conditions during flash sale checkouts",
      "Server-side rendering (SSR) with dynamic SEO metadata generation",
      "Webhook-driven invoice generation and shipping telemetry updates",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
    },
  },

  // --- Academic Projects (Bottom Shelf · 3 Books) ---
  "Shelf_Book_Academic_0": {
    id: "goalgains",
    meshPrefix: "Shelf_Book_Academic_0",
    title: "GoalGains",
    subtitle: "Athletic Metric Tracking & Progressive Overload Analytics",
    category: "Academic Projects",
    badgeNumber: 3,
    spineBg: "#b45309",
    spineAccent: "#fde68a",
    description:
      "Comprehensive fitness tracking platform utilizing periodization models, volume load calculation, and recovery trajectory predictions.",
    role: "Lead Engineer",
    stack: ["React Native", "TypeScript", "FastAPI", "SQLite", "Chart.js"],
    highlights: [
      "1-Rep Max (1RM) regression estimation using Brzycki & Epley formulas",
      "Interactive volume accumulation graphs categorized by muscle group",
      "Offline-first mobile synchronization with SQLite local storage",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
    },
  },
  "Shelf_Book_Academic_1": {
    id: "patient-record-system",
    meshPrefix: "Shelf_Book_Academic_1",
    title: "Patient Record System",
    subtitle: "Cryptographically Verified Hospital Audit Database",
    category: "Academic Projects",
    badgeNumber: 3,
    spineBg: "#047857",
    spineAccent: "#a7f3d0",
    description:
      "Distributed hospital database architecture implementing tamper-evident cryptographic hash chains for patient medical history audits.",
    role: "Database Architect & Developer",
    stack: ["Python", "SQLAlchemy", "PostgreSQL", "Flask", "Cryptography"],
    highlights: [
      "SHA-256 block-linked audit ledger preventing unauthorized record alteration",
      "Role-Based Access Control (RBAC) separating doctors, nurses, and billing staff",
      "Comprehensive benchmark simulating 100 concurrent hospital admissions",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
    },
  },
  "Shelf_Book_Academic_2": {
    id: "electro",
    meshPrefix: "Shelf_Book_Academic_2",
    title: "Electro",
    subtitle: "Electronic Circuit Analysis & SPICE Nodal Simulation",
    category: "Academic Projects",
    badgeNumber: 3,
    spineBg: "#9a3412",
    spineAccent: "#fed7aa",
    description:
      "Nodal analysis circuit simulator solving modified nodal analysis (MNA) matrix equations for RLC circuits, operational amplifiers, and diodes.",
    role: "Systems Researcher",
    stack: ["C++", "Python", "NumPy", "Matplotlib", "GUI"],
    highlights: [
      "Transient and AC frequency response calculation using trapezoidal integration",
      "Interactive circuit schematic editor with instant waveform oscilloscope",
      "Verified against LTspice benchmarks across linear and non-linear testbeds",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
    },
  },
};
