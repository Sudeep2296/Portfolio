export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: {
    name: string;
    level: string;
    focus: string;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Core languages used for systems, algorithms, AI pipelines, and application engineering.",
    icon: "Code2",
    skills: [
      { name: "Python", level: "Advanced", focus: "AI/ML, PyTorch, NetworkX, Data Pipelines" },
      { name: "TypeScript", level: "Proficient", focus: "Type-safe full-stack apps & Three.js" },
      { name: "JavaScript (ESNext)", level: "Advanced", focus: "DOM, async architecture, Node.js" },
    ],
  },
  {
    title: "Web & Frontend Engineering",
    description: "Modern, responsive, performant user interfaces and immersive 3D web environments.",
    icon: "Layout",
    skills: [
      { name: "React", level: "Advanced", focus: "Component lifecycles, hooks, state machines" },
      { name: "Next.js", level: "Proficient", focus: "App Router, SSR, Server Components, SEO" },
      { name: "Three.js & R3F", level: "Proficient", focus: "3D scenes, shaders, camera math, GLTF" },
      { name: "Tailwind CSS", level: "Advanced", focus: "Design systems, dark mode, responsive UX" },
      { name: "HTML5 & CSS3", level: "Advanced", focus: "Semantic markup, CSS Grid, animations" },
    ],
  },
  {
    title: "Artificial Intelligence & ML",
    description: "Applied machine learning, natural language processing, vector retrieval, and speech modeling.",
    icon: "Brain",
    skills: [
      { name: "Natural Language Processing (NLP)", level: "Proficient", focus: "Text preprocessing, TF-IDF, tokenization" },
      { name: "Retrieval-Augmented Generation (RAG)", level: "Proficient", focus: "Vector embeddings, chunking, LangChain" },
      { name: "Speech Recognition (ASR)", level: "Applied", focus: "Whisper fine-tuning, phonetic normalization" },
      { name: "Model Evaluation & Benchmarking", level: "Proficient", focus: "Precision, recall, F1-scores, error analysis" },
      { name: "Scikit-Learn & PyTorch", level: "Proficient", focus: "SVM, Naive Bayes, neural representations" },
    ],
  },
  {
    title: "Cybersecurity & Cryptography",
    description: "Mathematical cryptography, protocol security analysis, and vulnerability defense.",
    icon: "ShieldAlert",
    skills: [
      { name: "Public Key Cryptography", level: "Proficient", focus: "Diffie–Hellman, RSA, discrete log problems" },
      { name: "Man-in-the-Middle (MITM) Analysis", level: "Proficient", focus: "Unauthenticated channel interception & defense" },
      { name: "Network Security Fundamentals", level: "Proficient", focus: "TLS handshake, packet flows, port scanning" },
      { name: "Security Testing", level: "Applied", focus: "Playwright security tests, edge-case hardening" },
    ],
  },
  {
    title: "Databases & Infrastructure",
    description: "Data storage, vector search engines, REST APIs, version control, and CI/CD.",
    icon: "Database",
    skills: [
      { name: "SQL (PostgreSQL / MySQL / SQLite)", level: "Proficient", focus: "Relational queries, schema design, indexing" },
      { name: "Vector Databases", level: "Proficient", focus: "Chroma, FAISS, cosine distance search" },
      { name: "RESTful APIs & FastAPI", level: "Proficient", focus: "Endpoint design, request validation, CORS" },
      { name: "Git & Version Control", level: "Advanced", focus: "Git branching, atomic commits, pull requests" },
    ],
  },
];
