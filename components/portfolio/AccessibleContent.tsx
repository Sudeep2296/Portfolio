"use client";

import React from "react";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { contactConfig } from "@/data/socials";
import { ArrowLeft, ExternalLink, Github, Mail, Phone, CheckCircle2, Shield, Brain, Network } from "lucide-react";

interface AccessibleContentProps {
  onClose?: () => void;
  isStandalone?: boolean;
}

export const AccessibleContent: React.FC<AccessibleContentProps> = ({
  onClose,
  isStandalone = false,
}) => {
  return (
    <div className="min-h-screen bg-[#03040f] text-slate-200">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#05061a]/90 backdrop-blur-xl px-5 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">{contactConfig.name}</h1>
            <p className="text-xs text-purple-300">{contactConfig.role}</p>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Return to 3D Room</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Document Content */}
      <main className="mx-auto max-w-5xl space-y-12 px-5 py-10">
        {/* About Section */}
        <section aria-labelledby="about-heading" className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
            <span>Identity & Summary</span>
          </div>
          <h2 id="about-heading" className="text-2xl font-extrabold text-white sm:text-3xl">
            Software Developer & Cryptographic Systems Builder
          </h2>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            I am a software engineer focused on building robust AI/ML systems, cryptographic protocol simulators, and performant web applications. My work spans the mathematical foundations of network security (Diffie–Hellman & MITM defense), speech recognition architectures for dysarthria, and graph-theoretic social network analysis.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="https://github.com/Sudeep2296"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-purple-500"
            >
              <Github className="h-4 w-4" />
              <span>GitHub: Sudeep2296</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <a
              href={`mailto:${contactConfig.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              <Mail className="h-4 w-4 text-rose-400" />
              <span>{contactConfig.email}</span>
            </a>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section aria-labelledby="projects-heading" className="space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h2 id="projects-heading" className="text-xl font-bold text-white">
              Featured Verified Projects
            </h2>
            <p className="text-xs text-slate-400">
              In-depth engineering contributions, problem statements, and results.
            </p>
          </div>

          <div className="space-y-6">
            {projectsData.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl border border-white/10 bg-space-850/70 p-6 shadow-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-xs font-medium text-purple-300">
                      {project.category}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-400">
                      {project.status}
                    </span>
                  </div>
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:underline"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>Source Repository</span>
                    </a>
                  )}
                </div>

                <h3 className="mt-3 text-lg font-bold text-white sm:text-xl">
                  {project.title}
                </h3>
                <p className="text-xs font-medium text-purple-300">{project.subtitle}</p>

                <div className="mt-4 grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <span className="font-bold text-rose-300">Problem Statement</span>
                    <p className="mt-1 leading-relaxed text-slate-300">{project.problem}</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
                    <span className="font-bold text-purple-300">My Contribution</span>
                    <p className="mt-1 leading-relaxed text-slate-300">{project.contribution}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Key Highlights
                  </span>
                  <ul className="space-y-1">
                    {project.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-white/10 pt-3">
                  <span className="text-[11px] font-semibold text-slate-400 mr-2">Stack:</span>
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Technical Skills Section */}
        <section aria-labelledby="skills-heading" className="space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h2 id="skills-heading" className="text-xl font-bold text-white">
              Technical Skills Matrix
            </h2>
            <p className="text-xs text-slate-400">
              Competencies and toolsets across full-stack and research engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {skillsData.map((category) => (
              <div
                key={category.title}
                className="rounded-2xl border border-white/10 bg-space-850/60 p-5"
              >
                <h3 className="text-sm font-bold text-white">{category.title}</h3>
                <p className="mt-0.5 text-xs text-slate-400">{category.description}</p>

                <div className="mt-3 space-y-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between rounded-lg bg-white/[0.02] p-2 text-xs"
                    >
                      <span className="font-medium text-slate-200">{skill.name}</span>
                      <span className="text-[11px] text-purple-300">{skill.focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section aria-labelledby="contact-heading" className="space-y-4 rounded-2xl border border-white/10 bg-space-850/80 p-6">
          <h2 id="contact-heading" className="text-xl font-bold text-white">
            Connect & Contact Information
          </h2>
          <p className="text-xs text-slate-300">
            Currently open to Software Engineering, AI/ML, and Cybersecurity interview opportunities.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2 text-xs">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <span className="text-slate-400">Email</span>
              <p className="mt-1 font-mono text-white">{contactConfig.email}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <span className="text-slate-400">GitHub</span>
              <p className="mt-1 font-mono text-white">github.com/Sudeep2296</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
              <span className="text-slate-400">Location</span>
              <p className="mt-1 font-mono text-white">{contactConfig.location}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
