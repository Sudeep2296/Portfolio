"use client";

import React, { useEffect, useState } from "react";
import { Globe, Clock, Compass, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { contactConfig } from "@/data/socials";

interface FocusAvailabilityPanelProps {
  initialType?: "globe" | "clock";
}

export const FocusAvailabilityPanel: React.FC<FocusAvailabilityPanelProps> = ({
  initialType = "globe",
}) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST is UTC+5:30
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-teal-300">
            <span>Engineering Horizon & Availability</span>
          </div>
          <h2 className="mt-1 text-xl font-bold text-white">Global Focus & Availability</h2>
          <p className="text-xs text-slate-400">
            Research domains, engineering interests, and current communication availability.
          </p>
        </div>
      </div>

      {/* Real-time Clock & Status Card */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-950/30 to-[#06081e] p-5 shadow-lg backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>Current Local Time</span>
            </span>
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="mt-3 font-mono text-3xl font-extrabold text-white">
            {currentTime || "Loading..."}
          </div>
          <p className="mt-1 text-xs text-teal-200/80">
            Indian Standard Time (IST · UTC +5:30)
          </p>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-teal-500/10 px-3 py-2 text-xs text-teal-300 border border-teal-500/20">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>Open to Remote, Hybrid, and Global Time Zone Collaboration</span>
          </div>
        </div>

        <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/30 to-[#06081e] p-5 shadow-lg backdrop-blur-md">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            <span>Work Status</span>
          </span>
          <div className="mt-3 text-lg font-bold text-white">
            {contactConfig.availability}
          </div>
          <p className="mt-1 text-xs text-slate-300">
            Available for technical interview loops, system design sessions, and engineering contract or full-time roles.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>Response time: within 24 hours</span>
          </div>
        </div>
      </div>

      {/* Global Learning and Focus Areas */}
      <div className="rounded-2xl border border-white/10 bg-space-850/80 p-5 shadow-xl backdrop-blur-md">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Globe className="h-4 w-4 text-sky-400" />
          <span>Active Learning & Research Interests</span>
        </h3>
        <p className="mt-0.5 text-xs text-slate-400">
          Domains of ongoing technical investigation and self-directed study.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <h4 className="text-xs font-bold text-sky-300">Post-Quantum Cryptography (PQC)</h4>
            <p className="mt-1 text-xs text-slate-400">
              Investigating lattice-based key encapsulation mechanisms (ML-KEM/Kyber) and stateless hash-based signatures for quantum-resistant communications.
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <h4 className="text-xs font-bold text-purple-300">Acoustic Foundation Models</h4>
            <p className="mt-1 text-xs text-slate-400">
              Fine-tuning low-resource phonetic architectures for non-standard speech disorders (dysarthria, aphasia) with parameter-efficient adapters.
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <h4 className="text-xs font-bold text-emerald-300">Graph Neural Networks & SNA</h4>
            <p className="mt-1 text-xs text-slate-400">
              Extending social network analysis toward inductive graph node embeddings and community boundary detection in collaboration structures.
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <h4 className="text-xs font-bold text-amber-300">Real-Time WebGL & 3D Shaders</h4>
            <p className="mt-1 text-xs text-slate-400">
              Explaining intricate mathematical ideas through interactive GLSL fragments, physically-based materials, and responsive 3D web environments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
