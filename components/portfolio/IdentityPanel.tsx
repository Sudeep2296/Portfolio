"use client";

import React from "react";
import { contactConfig } from "@/data/socials";
import { ArrowRight, Code, ShieldCheck, Cpu, Github, ExternalLink } from "lucide-react";

interface IdentityPanelProps {
  onNavigateToProjects: () => void;
  onNavigateToContact: () => void;
}

export const IdentityPanel: React.FC<IdentityPanelProps> = ({
  onNavigateToProjects,
  onNavigateToContact,
}) => {
  return (
    <div className="space-y-6 text-slate-200">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-950/30 via-space-850 to-purple-950/20 p-6 shadow-glow-magenta">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-300">
              <span className="h-2 w-2 rounded-full bg-rose-400 animate-ping" />
              <span>Interactive 3D Workspace</span>
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {contactConfig.name}
            </h1>
            <p className="mt-1 text-sm font-medium text-rose-300/90 sm:text-base">
              {contactConfig.role}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Sudeep2296"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
          Welcome to my developer workspace. I specialize in building cryptographically sound
          protocols, applied AI/ML architectures (speech recognition and RAG knowledge assistants),
          and modern high-performance full-stack web applications.
        </p>
      </div>

      {/* Core Focus Pillars */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-space-800/60 p-4 transition hover:border-purple-500/40">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
            <Cpu className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-sm font-semibold text-white">AI & Machine Learning</h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            Dysarthric speech recognition with Whisper, phonetic normalization, semantic RAG systems,
            and classifier evaluation.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-space-800/60 p-4 transition hover:border-sky-500/40">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-sm font-semibold text-white">Cybersecurity & Crypto</h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            Diffie–Hellman key exchange simulation, MITM packet manipulation, modular group theory,
            and cryptographic security.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-space-800/60 p-4 transition hover:border-emerald-500/40">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <Code className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-sm font-semibold text-white">Full-Stack Engineering</h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            Type-safe Next.js & React architectures, 3D WebGL experiences with Three.js, RESTful
            services, and graph modeling.
          </p>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <button
          type="button"
          onClick={onNavigateToProjects}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/30 transition hover:from-purple-500 hover:to-indigo-500"
        >
          <span>Explore Featured Projects</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onNavigateToContact}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <span>Get in Touch</span>
        </button>
      </div>
    </div>
  );
};
