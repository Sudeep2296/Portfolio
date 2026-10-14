"use client";

import React, { useState } from "react";
import { skillsData, SkillCategory } from "@/data/skills";
import { Code2, Layout, Brain, ShieldAlert, Database, Search } from "lucide-react";

export const SkillsPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="h-4 w-4 text-sky-400" />;
      case "Layout":
        return <Layout className="h-4 w-4 text-purple-400" />;
      case "Brain":
        return <Brain className="h-4 w-4 text-pink-400" />;
      case "ShieldAlert":
        return <ShieldAlert className="h-4 w-4 text-emerald-400" />;
      case "Database":
        return <Database className="h-4 w-4 text-amber-400" />;
      default:
        return <Code2 className="h-4 w-4 text-slate-400" />;
    }
  };

  const filteredCategories: SkillCategory[] = skillsData
    .map((category) => {
      const filteredSkills = category.skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.focus.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return {
        ...category,
        skills: filteredSkills,
      };
    })
    .filter((cat) => cat.skills.length > 0);

  return (
    <div className="space-y-6 text-slate-200">
      {/* Header and Search */}
      <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Technical Skills & Competencies</h2>
          <p className="text-xs text-slate-400">
            Substantiated skills across software development, AI/ML, and cryptographic engineering.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills or focus..."
            className="w-full rounded-xl border border-white/15 bg-white/5 py-1.5 pl-9 pr-3 text-xs text-white placeholder-slate-400 outline-none transition focus:border-purple-500 focus:bg-white/10"
          />
        </div>
      </div>

      {/* Skills Categories Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {filteredCategories.map((category) => (
          <div
            key={category.title}
            className="rounded-2xl border border-white/10 bg-space-850/80 p-5 shadow-lg backdrop-blur-md transition hover:border-white/20"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                {getCategoryIcon(category.icon)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{category.title}</h3>
                <p className="text-[11px] text-slate-400">{category.description}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-2.5 transition hover:bg-white/[0.05]"
                >
                  <div className="pr-2">
                    <span className="text-xs font-semibold text-white">{skill.name}</span>
                    <p className="text-[11px] text-slate-400">{skill.focus}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      skill.level === "Advanced"
                        ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                        : skill.level === "Proficient"
                        ? "bg-sky-500/15 text-sky-300 border border-sky-500/30"
                        : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
