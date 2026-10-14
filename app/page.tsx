import { PortfolioExperience } from "@/components/portfolio/PortfolioExperience";
import { projectsData } from "@/data/projects";
import { contactConfig } from "@/data/socials";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: contactConfig.name,
    jobTitle: "Software Developer",
    description: contactConfig.tagline,
    url: "https://sudeep-portfolio.vercel.app",
    sameAs: [
      "https://github.com/Sudeep2296",
      "https://linkedin.com/in/sudeep-s",
    ],
    knowsAbout: [
      "Cybersecurity",
      "Diffie-Hellman Key Exchange",
      "Machine Learning",
      "Artificial Intelligence",
      "Whisper Speech Recognition",
      "Retrieval-Augmented Generation",
      "Next.js",
      "React",
      "Three.js",
      "TypeScript",
      "Python",
    ],
    hasPart: projectsData.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      description: project.problem,
      keywords: project.stack.join(", "),
    })),
  };

  return (
    <>
      {/* Schema.org JSON-LD for rich search engine indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Screen-reader / SEO accessible hidden heading structure */}
      <div
        className="sr-only"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        <h1>Sudeep S. — Software Developer Portfolio</h1>
        <p>
          Interactive 3D workspace showcasing software development projects in
          cybersecurity, AI/ML, and full-stack systems.
        </p>
        <h2>Verified Projects</h2>
        <ul>
          {projectsData.map((p) => (
            <li key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.problem}</p>
              <p>{p.contribution}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Interactive 3D Portfolio Experience */}
      <main className="h-screen w-screen overflow-hidden">
        <PortfolioExperience />
      </main>
    </>
  );
}
