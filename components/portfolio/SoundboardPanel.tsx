"use client";

import React, { useState } from "react";
import { contactConfig } from "@/data/socials";
import {
  Mail,
  Github,
  Linkedin,
  Phone,
  Send,
  Check,
  Copy,
  ExternalLink,
  Volume2,
} from "lucide-react";
import { playSound } from "@/lib/audio";

interface SoundboardPanelProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const SoundboardPanel: React.FC<SoundboardPanelProps> = ({
  soundEnabled,
  onToggleSound,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [msgName, setMsgName] = useState("");
  const [msgEmail, setMsgEmail] = useState("");
  const [msgText, setMsgText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    playSound("click", soundEnabled);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    playSound("bell", soundEnabled);
    // Pre-fill mailto link with encoded message
    const subject = encodeURIComponent(`Portfolio Message from ${msgName || "Visitor"}`);
    const body = encodeURIComponent(`From: ${msgName} (${msgEmail})\n\nMessage:\n${msgText}`);
    window.open(`mailto:${contactConfig.email}?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="space-y-6 text-slate-200">
      {/* Soundboard Header */}
      <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-300">
            <span>Audio Console & Communications Hub</span>
          </div>
          <h2 className="mt-1 text-xl font-bold text-white">Soundboard & Direct Connect</h2>
          <p className="text-xs text-slate-400">
            Trigger real-time communication channels, explore profiles, or adjust room audio.
          </p>
        </div>

        {/* Audio Knob Toggle */}
        <button
          type="button"
          onClick={() => {
            playSound("switch", true);
            onToggleSound();
          }}
          className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
            soundEnabled
              ? "border-amber-500/50 bg-amber-500/15 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
              : "border-white/15 bg-white/5 text-slate-400 hover:bg-white/10"
          }`}
        >
          <Volume2 className={`h-4 w-4 ${soundEnabled ? "text-amber-400" : "text-slate-500"}`} />
          <span>{soundEnabled ? "Audio Effects: ON" : "Audio Effects: MUTED"}</span>
        </button>
      </div>

      {/* Verified Channels Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* GitHub Channel */}
        <div className="rounded-2xl border border-sky-500/30 bg-[#06081e] p-4 transition hover:border-sky-500/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white">GitHub Profile</span>
                <p className="text-[11px] text-slate-400">Verified Repository & Code</p>
              </div>
            </div>
            <a
              href="https://github.com/Sudeep2296"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound("click", soundEnabled)}
              className="inline-flex items-center gap-1 rounded-lg bg-sky-500/20 px-2.5 py-1 text-xs font-semibold text-sky-300 transition hover:bg-sky-500/30"
            >
              <span>Visit</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-slate-300">
            <span className="font-mono text-[11px] text-slate-400">github.com/Sudeep2296</span>
            <button
              type="button"
              onClick={() => handleCopy("https://github.com/Sudeep2296", "github")}
              className="text-slate-400 hover:text-white"
              title="Copy URL"
            >
              {copiedKey === "github" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* LinkedIn Channel */}
        <div className="rounded-2xl border border-indigo-500/30 bg-[#06081e] p-4 transition hover:border-indigo-500/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
                <Linkedin className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white">LinkedIn</span>
                <p className="text-[11px] text-slate-400">Professional Network</p>
              </div>
            </div>
            <a
              href="https://linkedin.com/in/sudeep-s"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound("click", soundEnabled)}
              className="inline-flex items-center gap-1 rounded-lg bg-indigo-500/20 px-2.5 py-1 text-xs font-semibold text-indigo-300 transition hover:bg-indigo-500/30"
            >
              <span>Connect</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-slate-300">
            <span className="font-mono text-[11px] text-slate-400">linkedin.com/in/sudeep-s</span>
            <button
              type="button"
              onClick={() => handleCopy("https://linkedin.com/in/sudeep-s", "linkedin")}
              className="text-slate-400 hover:text-white"
              title="Copy URL"
            >
              {copiedKey === "linkedin" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Email Channel */}
        <div className="rounded-2xl border border-rose-500/30 bg-[#06081e] p-4 transition hover:border-rose-500/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white">Direct Email</span>
                <p className="text-[11px] text-slate-400">Recruitment & Inquiries</p>
              </div>
            </div>
            <a
              href={`mailto:${contactConfig.email}`}
              onClick={() => playSound("click", soundEnabled)}
              className="inline-flex items-center gap-1 rounded-lg bg-rose-500/20 px-2.5 py-1 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/30"
            >
              <span>Mail</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-slate-300">
            <span className="font-mono text-[11px] text-slate-400">{contactConfig.email}</span>
            <button
              type="button"
              onClick={() => handleCopy(contactConfig.email, "email")}
              className="text-slate-400 hover:text-white"
              title="Copy Email"
            >
              {copiedKey === "email" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Phone Channel */}
        <div className="rounded-2xl border border-emerald-500/30 bg-[#06081e] p-4 transition hover:border-emerald-500/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white">Telephone / WhatsApp</span>
                <p className="text-[11px] text-slate-400">{contactConfig.location}</p>
              </div>
            </div>
            <a
              href={`tel:${contactConfig.phone.replace(/\s+/g, "")}`}
              onClick={() => playSound("click", soundEnabled)}
              className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/30"
            >
              <span>Call</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-slate-300">
            <span className="font-mono text-[11px] text-slate-400">{contactConfig.phone}</span>
            <button
              type="button"
              onClick={() => handleCopy(contactConfig.phone, "phone")}
              className="text-slate-400 hover:text-white"
              title="Copy Phone"
            >
              {copiedKey === "phone" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Direct Message Form (Soundboard_Btn_Message) */}
      <div className="rounded-2xl border border-white/10 bg-space-850/80 p-5 shadow-xl backdrop-blur-md">
        <h3 className="text-sm font-bold text-white">Dispatch a Direct Message</h3>
        <p className="mt-0.5 text-xs text-slate-400">
          Sends directly to Sudeep's verified inbox.
        </p>

        <form onSubmit={handleSendMessage} className="mt-4 space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="msg-name" className="text-[11px] font-medium text-slate-300">
                Your Name
              </label>
              <input
                id="msg-name"
                type="text"
                required
                value={msgName}
                onChange={(e) => setMsgName(e.target.value)}
                placeholder="e.g. Alex Miller"
                className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition focus:border-purple-500 focus:bg-white/10"
              />
            </div>
            <div>
              <label htmlFor="msg-email" className="text-[11px] font-medium text-slate-300">
                Your Email
              </label>
              <input
                id="msg-email"
                type="email"
                required
                value={msgEmail}
                onChange={(e) => setMsgEmail(e.target.value)}
                placeholder="alex@company.com"
                className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition focus:border-purple-500 focus:bg-white/10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="msg-text" className="text-[11px] font-medium text-slate-300">
              Message
            </label>
            <textarea
              id="msg-text"
              rows={3}
              required
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
              placeholder="Hi Sudeep, I would love to discuss an engineering opportunity..."
              className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition focus:border-purple-500 focus:bg-white/10"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            {submitted ? (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                <Check className="h-4 w-4" />
                <span>Message composer launched! Thank you.</span>
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">Prompt reply guaranteed.</span>
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-glow transition hover:bg-purple-500"
            >
              <span>Send Message</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
