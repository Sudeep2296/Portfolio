"use client";

import React, { useState } from "react";
import { projectsData, Project } from "@/data/projects";
import {
  Code,
  Shield,
  Brain,
  Network,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export const ProjectExplorer: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectsData[0].id);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Cybersecurity", "AI / ML", "Data Science"];

  const filteredProjects =
    filter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  const activeProject =
    projectsData.find((p) => p.id === selectedProjectId) || projectsData[0];

  const getCategoryIcon = (category: Project["category"]) => {
    switch (category) {
      case "Cybersecurity":
        return <Shield className="h-4 w-4 text-sky-400" />;
      case "AI / ML":
        return <Brain className="h-4 w-4 text-purple-400" />;
      case "Data Science":
        return <Network className="h-4 w-4 text-emerald-400" />;
      default:
        return <Code className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 text-slate-200">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filter === cat
                  ? "bg-purple-600 text-white shadow-glow"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400">
          Showing {filteredProjects.length} verified projects
        </span>
      </div>

      {/* Main Grid: Project List & Detail View */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Project Selector Sidebar */}
        <div className="space-y-2 lg:col-span-5">
          {filteredProjects.map((project) => {
            const isSelected = project.id === activeProject.id;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelectedProjectId(project.id)}
                className={`w-full rounded-xl border p-3.5 text-left transition ${
                  isSelected
                    ? "border-purple-500/60 bg-purple-950/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                    : "border-white/10 bg-space-800/50 hover:border-white/20 hover:bg-space-800/80"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(project.category)}
                    <span className="text-xs font-medium text-slate-400">
                      {project.category}
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      project.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : project.status === "Active Research"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                        : "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <h2 className="mt-2 text-sm font-bold text-white line-clamp-1">
                  {project.title}
                </h2>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                  {project.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Project Card */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-white/15 bg-space-850/90 p-5 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  {getCategoryIcon(activeProject.category)}
                  <span className="text-xs font-semibold text-purple-300">
                    {activeProject.category}
                  </span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs text-slate-400">{activeProject.status}</span>
                </div>
                <h3 className="mt-1.5 text-xl font-extrabold text-white">
                  {activeProject.title}
                </h3>
                <p className="text-xs font-medium text-slate-300">
                  {activeProject.subtitle}
                </p>
              </div>

              {activeProject.links?.github && (
                <a
                  href={activeProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              )}
            </div>

            {/* Problem Statement */}
            <div className="mt-4 space-y-1.5">
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-300">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>The Problem</span>
              </h4>
              <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                {activeProject.problem}
              </p>
            </div>

            {/* My Contribution */}
            <div className="mt-4 space-y-1.5">
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Engineering Contribution</span>
              </h4>
              <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                {activeProject.contribution}
              </p>
            </div>

            {/* Key Technical Highlights */}
            <div className="mt-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Verified Highlights
              </h4>
              <ul className="space-y-1.5">
                {activeProject.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology Stack Tags */}
            <div className="mt-5 border-t border-white/10 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Technologies Used
              </h4>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {activeProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Results / Status */}
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-slate-300">
              <span className="font-semibold text-white">Status / Results: </span>
              {activeProject.results}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
