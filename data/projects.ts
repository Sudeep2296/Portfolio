export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Cybersecurity" | "AI / ML" | "Full-Stack" | "Data Science";
  problem: string;
  contribution: string;
  stack: string[];
  results: string;
  status: "Completed" | "Active Research" | "Hackathon Solution" | "Production Ready";
  highlights: string[];
  links?: {
    github?: string;
    demo?: string;
    paper?: string;
    localRef?: string;
  };
}

export const projectsData: Project[] = [
  {
    id: "diffie-hellman",
    title: "Interactive Diffie–Hellman & MITM Simulator",
    subtitle: "2D/3D Cryptographic Laboratory & Protocol Interception Simulator",
    category: "Cybersecurity",
    problem:
      "Diffie–Hellman key exchange and Man-in-the-Middle (MITM) attacks are foundational to network security, but abstract modular arithmetic, cyclic group generators, and unauthenticated channel vulnerabilities are difficult to grasp without visual inspection.",
    contribution:
      "Engineered an interactive cryptographic simulation engine that mathematically validates prime moduli p >= 3, computes generator primitive roots g with multiplicative order p - 1, and simulates Alice, Bob, and Mallory. Visitors can manipulate parameters in real time and watch packets get intercepted, decrypted, and re-encrypted.",
    stack: [
      "JavaScript",
      "Modular Arithmetic",
      "Vite",
      "Cryptography",
      "Playwright E2E",
      "Tailwind CSS",
    ],
    results:
      "Full mathematical validation for cyclic groups Z*_p, real-time generator suggestion algorithm, interactive Mallory packet tampering sandbox, and 100% test passing rate across unit and Playwright end-to-end browser tests.",
    status: "Completed",
    highlights: [
      "Dynamic generator ord_p(g) = p - 1 validation with live suggestion badges",
      "Interactive Mallory tampering: demonstrates split session keys K_A-M ≠ K_M-B",
      "Strict private exponent bounds [1, p - 2] preventing trivial Fermat leakage",
      "Automated Playwright browser test coverage for edge cryptographic cases",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
      localRef: "Local project verified in ../DH",
    },
  },
  {
    id: "neurospeak-ai",
    title: "NeuroSpeak AI",
    subtitle: "Dysarthric Speech Recognition & Multi-Agent Semantic Reconstruction",
    category: "AI / ML",
    problem:
      "Individuals with dysarthria experience motor speech impairments resulting in acoustic distortion, slurring, and inconsistent pitch. Mainstream automatic speech recognition (ASR) tools fail catastrophically with high word-error rates (WER > 40%).",
    contribution:
      "Designed an end-to-end assistive pipeline combining fine-tuned Whisper ASR with acoustic preprocessing, phonetic alignment, and a multi-agent LLM consensus layer that reconstructs intended semantics while strictly constraining hallucinations.",
    stack: [
      "Python",
      "PyTorch",
      "Whisper ASR",
      "Multi-Agent LLMs",
      "FastAPI",
      "Hugging Face",
    ],
    results:
      "Implemented acoustic pre-filtering and phoneme alignment prototype. Multi-agent grammar verification prevents hallucination artifacts. Currently researching low-latency on-device inference for wearable AAC devices.",
    status: "Active Research",
    highlights: [
      "Implemented: Acoustic signal normalization & dysarthric speech feature extraction",
      "Implemented: Multi-agent consensus prompt architecture for semantic correction",
      "Proposed: Patient-personalized phonetic fine-tuning via Low-Rank Adaptation (LoRA)",
      "Proposed: Embedded edge deployment for real-time mobile assistive communication",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
    },
  },
  {
    id: "nexa-standards",
    title: "NexaStandards",
    subtitle: "AI-Powered Compliance Assistant for Indian Standards (BIS)",
    category: "AI / ML",
    problem:
      "Bureau of Indian Standards (BIS) documents and Indian Standards (IS) guidelines span thousands of complex technical PDFs. Finding relevant clauses, testing requirements, and compliance standards is labor-intensive and error-prone.",
    contribution:
      "Built an intelligent RAG (Retrieval-Augmented Generation) assistant that parses, indexes, and vectorizes Indian Standards documentation, providing citation-backed answers, clause lookups, and conversational compliance guidance.",
    stack: [
      "Next.js",
      "Python",
      "LangChain",
      "Vector Database",
      "Semantic Search",
      "FastAPI",
    ],
    results:
      "Created as an innovative solution for the Smart India Hackathon (SIH) Bureau of Indian Standards challenge. Achieved sub-second vector retrieval with exact clause citations and eliminated manual standard searches.",
    status: "Hackathon Solution",
    highlights: [
      "Automated PDF parsing with semantic chunking and hierarchy preservation",
      "Dense vector search with sentence embeddings and hybrid keyword re-ranking",
      "Direct citation linking back to official BIS publication paragraphs",
      "Intuitive dual-interface for technical auditors and non-technical manufacturers",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
    },
  },
  {
    id: "sentiment-analysis",
    title: "Restaurant Review Sentiment Analysis",
    subtitle: "Comparative Natural Language Processing & Classification Pipeline",
    category: "AI / ML",
    problem:
      "Dining establishments need automated sentiment understanding from customer feedback at scale to distinguish food quality, staff efficiency, and ambiance bottlenecks without manual review curation.",
    contribution:
      "Constructed a text processing and machine learning benchmark pipeline implementing TF-IDF vectorization, lemmatization, and comparative classification across Logistic Regression, Multinomial Naive Bayes, and Linear Support Vector Machines (SVM).",
    stack: [
      "Python",
      "Scikit-Learn",
      "NLTK",
      "TF-IDF",
      "Pandas",
      "Matplotlib",
    ],
    results:
      "Evaluated models across precision, recall, and F1-score; identified optimal hyperparameter configurations with SVM and Logistic Regression showing highest discriminatory power for polar and nuanced reviews.",
    status: "Completed",
    highlights: [
      "Custom NLP pipeline: tokenization, stopword filtering, n-gram extraction",
      "Comparative statistical evaluation of Logistic Regression, Naive Bayes, and SVM",
      "Confusion matrix visualization & false-positive misclassification audit",
      "Lightweight inference script for instant sentiment scoring on new reviews",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
    },
  },
  {
    id: "sna-collaboration",
    title: "Research Collaboration Network Analysis",
    subtitle: "Social Network Analysis (SNA) on 379 Researchers & 914 Collaborations",
    category: "Data Science",
    problem:
      "Scientific progress relies on collaborative networks, yet identifying pivotal influencers, isolated clusters, and knowledge-bridge researchers in co-authorship graphs requires graph-theoretic analysis.",
    contribution:
      "Conducted topological analysis on the ca-netscience co-authorship dataset, computing Degree, Closeness, and Betweenness centrality metrics using NetworkX and visualizing community clustering structures.",
    stack: [
      "Python 3.10",
      "NetworkX",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "JupyterLab",
    ],
    results:
      "Identified top 10 central figures who hold highest betweenness (critical knowledge brokers) vs high degree (prolific co-authors), explaining network vulnerability and resilience to node removal.",
    status: "Completed",
    highlights: [
      "Constructed 379-node, 914-edge undirected graph from ca-netscience.mtx",
      "Computed Degree, Closeness, and Betweenness Centrality distributions",
      "Generated comparative centrality correlation charts and node rankings",
      "Verified against academic dataset benchmarks in verified repository",
    ],
    links: {
      github: "https://github.com/Sudeep2296",
      localRef: "Local project verified in ../BA",
    },
  },
];
