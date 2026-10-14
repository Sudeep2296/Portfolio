"use client";

import React, { useState } from "react";
import { KeyRound, ShieldAlert, Cpu, FileSearch, ArrowRight, ShieldCheck } from "lucide-react";

export const ArchitecturePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"dh" | "mitm" | "neurospeak" | "rag">("dh");

  return (
    <div className="space-y-6 text-slate-200">
      {/* Header and Diagram Switcher */}
      <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Technical Thinking & System Architecture</h2>
          <p className="text-xs text-slate-400">
            Interactive mathematical diagrams and AI pipeline blueprints from the whiteboard.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("dh")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === "dh"
                ? "bg-purple-600 text-white shadow-glow"
                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <KeyRound className="h-3.5 w-3.5" />
            <span>Diffie–Hellman</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("mitm")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === "mitm"
                ? "bg-rose-600 text-white shadow-glow"
                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>MITM Attack & Defense</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("neurospeak")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === "neurospeak"
                ? "bg-sky-600 text-white shadow-glow"
                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>NeuroSpeak AI</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("rag")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === "rag"
                ? "bg-emerald-600 text-white shadow-glow"
                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FileSearch className="h-3.5 w-3.5" />
            <span>NexaStandards RAG</span>
          </button>
        </div>
      </div>

      {/* DIAGRAM 1: Diffie-Hellman Key Exchange */}
      {activeTab === "dh" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-purple-500/30 bg-space-850/90 p-5 shadow-2xl backdrop-blur-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-purple-400" />
              <span>Diffie–Hellman Key Exchange Protocol (Z*_p)</span>
            </h3>
            <p className="mt-1 text-xs text-slate-300">
              Two parties establish a shared cryptographic secret over an unencrypted channel without ever transmitting the secret key.
            </p>

            {/* SVG Visual Diagram */}
            <div className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-[#06081e] p-4">
              <svg viewBox="0 0 760 340" className="w-full min-w-[680px] h-auto text-xs font-mono">
                {/* Public Parameters */}
                <rect x="230" y="15" width="300" height="45" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                <text x="380" y="34" fill="#c7d2fe" textAnchor="middle" fontWeight="bold">Public Parameters (Agreed Openly)</text>
                <text x="380" y="50" fill="#a5b4fc" textAnchor="middle">Prime p (cyclic group Z*_p), Generator g (order p-1)</text>

                {/* Alice Column */}
                <rect x="30" y="80" width="220" height="220" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="140" y="105" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="13">ALICE</text>
                <text x="50" y="135" fill="#94a3b8">Private Secret: a ∈ [1, p-2]</text>
                <rect x="45" y="150" width="190" height="30" rx="5" fill="#1e293b" />
                <text x="140" y="170" fill="#f8fafc" textAnchor="middle">Compute A = g^a mod p</text>
                <rect x="45" y="240" width="190" height="42" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="140" y="258" fill="#a7f3d0" textAnchor="middle" fontWeight="bold">Compute Shared Secret</text>
                <text x="140" y="274" fill="#6ee7b7" textAnchor="middle">K = B^a mod p = (g^b)^a mod p</text>

                {/* Bob Column */}
                <rect x="510" y="80" width="220" height="220" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                <text x="620" y="105" fill="#a855f7" textAnchor="middle" fontWeight="bold" fontSize="13">BOB</text>
                <text x="530" y="135" fill="#94a3b8">Private Secret: b ∈ [1, p-2]</text>
                <rect x="525" y="150" width="190" height="30" rx="5" fill="#1e293b" />
                <text x="620" y="170" fill="#f8fafc" textAnchor="middle">Compute B = g^b mod p</text>
                <rect x="525" y="240" width="190" height="42" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="620" y="258" fill="#a7f3d0" textAnchor="middle" fontWeight="bold">Compute Shared Secret</text>
                <text x="620" y="274" fill="#6ee7b7" textAnchor="middle">K = A^b mod p = (g^a)^b mod p</text>

                {/* Channel Exchange Arrows */}
                <line x1="240" y1="165" x2="520" y2="165" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5,5" />
                <polygon points="520,165 510,160 510,170" fill="#38bdf8" />
                <rect x="330" y="145" width="100" height="22" rx="4" fill="#0284c7" />
                <text x="380" y="160" fill="#ffffff" textAnchor="middle">Send Public A ➔</text>

                <line x1="520" y1="205" x2="240" y2="205" stroke="#a855f7" strokeWidth="2" strokeDasharray="5,5" />
                <polygon points="240,205 250,200 250,210" fill="#a855f7" />
                <rect x="330" y="195" width="100" height="22" rx="4" fill="#7e22ce" />
                <text x="380" y="210" fill="#ffffff" textAnchor="middle">⬅ Send Public B</text>

                {/* Bottom Identity Result */}
                <rect x="110" y="300" width="540" height="28" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="380" y="318" fill="#a7f3d0" textAnchor="middle" fontWeight="bold">
                  Mathematical Identity: (g^b)^a ≡ g^(ab) ≡ (g^a)^b (mod p) ➔ Shared Secret K Matches!
                </text>
              </svg>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs text-slate-300">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <span className="font-semibold text-white">Security Guarantee: </span>
                An eavesdropper seeing public A, B, g, p cannot deduce secret key K without solving the computationally intractable Discrete Logarithm Problem.
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <span className="font-semibold text-white">Modulus & Generator: </span>
                Prime modulus p guarantees multiplicative inverses; valid generator g ensures maximum orbit cycle of length p - 1.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIAGRAM 2: Man-in-the-Middle Attack and PKI Defense */}
      {activeTab === "mitm" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-rose-500/30 bg-space-850/90 p-5 shadow-2xl backdrop-blur-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-rose-400" />
              <span>Man-in-the-Middle (Mallory) Interception & TLS Defense</span>
            </h3>
            <p className="mt-1 text-xs text-slate-300">
              Unauthenticated Diffie–Hellman allows an active attacker to substitute keys and decrypt or manipulate data on the fly.
            </p>

            <div className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-[#06081e] p-4">
              <svg viewBox="0 0 760 300" className="w-full min-w-[680px] h-auto text-xs font-mono">
                {/* Alice Box */}
                <rect x="20" y="50" width="190" height="220" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="115" y="75" fill="#38bdf8" textAnchor="middle" fontWeight="bold">ALICE</text>
                <text x="35" y="105" fill="#94a3b8">Private key: a</text>
                <text x="35" y="125" fill="#94a3b8">Sends: A = g^a mod p</text>
                <rect x="30" y="160" width="170" height="40" rx="5" fill="#7f1d1d" stroke="#ef4444" />
                <text x="115" y="177" fill="#fecaca" textAnchor="middle">Establishes Alice-Mallory Key</text>
                <text x="115" y="192" fill="#f87171" textAnchor="middle">K_A-M = (M_A)^a mod p</text>
                <text x="115" y="240" fill="#94a3b8" textAnchor="middle">Believes communicating with Bob</text>

                {/* Mallory (Attacker) Box */}
                <rect x="280" y="30" width="200" height="255" rx="8" fill="#2d0614" stroke="#f43f5e" strokeWidth="2" />
                <text x="380" y="55" fill="#fb7185" textAnchor="middle" fontWeight="bold">MALLORY (MITM)</text>
                <text x="295" y="85" fill="#fecdd3">Intercepts A and B</text>
                <text x="295" y="105" fill="#fecdd3">Generates: m_A and m_B</text>
                <rect x="290" y="120" width="180" height="40" rx="4" fill="#881337" />
                <text x="380" y="137" fill="#ffe4e6" textAnchor="middle">Substitutes Keys</text>
                <text x="380" y="152" fill="#fda4af" textAnchor="middle">M_A = g^(m_A), M_B = g^(m_B)</text>
                <rect x="290" y="180" width="180" height="50" rx="4" fill="#4c0519" stroke="#f43f5e" />
                <text x="380" y="198" fill="#fda4af" textAnchor="middle" fontWeight="bold">Split Tunnels Active</text>
                <text x="380" y="213" fill="#fecdd3" textAnchor="middle">Can Decrypt, Read & Alter</text>
                <text x="380" y="225" fill="#ffe4e6" textAnchor="middle">Re-encrypts with other key</text>

                {/* Bob Box */}
                <rect x="550" y="50" width="190" height="220" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                <text x="645" y="75" fill="#a855f7" textAnchor="middle" fontWeight="bold">BOB</text>
                <text x="565" y="105" fill="#94a3b8">Private key: b</text>
                <text x="565" y="125" fill="#94a3b8">Sends: B = g^b mod p</text>
                <rect x="560" y="160" width="170" height="40" rx="5" fill="#7f1d1d" stroke="#ef4444" />
                <text x="645" y="177" fill="#fecaca" textAnchor="middle">Establishes Mallory-Bob Key</text>
                <text x="645" y="192" fill="#f87171" textAnchor="middle">K_M-B = (M_B)^b mod p</text>
                <text x="645" y="240" fill="#94a3b8" textAnchor="middle">Believes communicating with Alice</text>

                {/* Interception Lines */}
                <line x1="210" y1="120" x2="280" y2="120" stroke="#f43f5e" strokeWidth="2" />
                <line x1="480" y1="120" x2="550" y2="120" stroke="#f43f5e" strokeWidth="2" />
              </svg>
            </div>

            <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                <span>The Cryptographic Defense: Ephemeral DH with Digital Signatures (TLS 1.3)</span>
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">
                To prevent key substitution, Alice and Bob sign their ephemeral public keys using private keys bound to verified PKI certificates (RSA-PSS or ECDSA). Mallory cannot counterfeit valid digital signatures without the authentic certificate authority private keys.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DIAGRAM 3: NeuroSpeak AI Pipeline */}
      {activeTab === "neurospeak" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-sky-500/30 bg-space-850/90 p-5 shadow-2xl backdrop-blur-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="h-4 w-4 text-sky-400" />
              <span>NeuroSpeak AI: Dysarthric Speech Reconstruction Pipeline</span>
            </h3>
            <p className="mt-1 text-xs text-slate-300">
              Combines acoustic signal preprocessing, fine-tuned Whisper acoustic models, and multi-agent phonetic reconstruction.
            </p>

            <div className="mt-5 space-y-3">
              {[
                {
                  step: "01",
                  title: "Acoustic Audio Input & Noise Suppression",
                  desc: "Raw dysarthric speech stream is captured, resampled to 16kHz, and processed through spectral noise reduction and adaptive amplitude normalization.",
                  badge: "Implemented",
                  badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                },
                {
                  step: "02",
                  title: "Phonetic Feature Alignment & Whisper ASR",
                  desc: "Extracts mel-spectrograms and utilizes fine-tuned Whisper encoder tokens to produce candidate phoneme sequence hypotheses despite acoustic slurring.",
                  badge: "Implemented",
                  badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                },
                {
                  step: "03",
                  title: "Multi-Agent Semantic Consensus & Hallucination Guardrails",
                  desc: "Three specialized LLM agents (Phonetic Decoder, Context Synthesizer, and Verification Critic) cross-check reconstructed sentences against phonetic constraints to eliminate hallucinations.",
                  badge: "Implemented Prototype",
                  badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
                },
                {
                  step: "04",
                  title: "Patient-Specific Voice Synthesis (Edge AAC)",
                  desc: "Low-latency on-device text-to-speech synthesis generating clear, natural speech output in the user's preserved personal vocal tone.",
                  badge: "Proposed / Research",
                  badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex flex-col gap-2 rounded-xl border border-white/10 bg-[#06081e] p-3.5 transition hover:border-sky-500/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 text-xs font-mono font-bold text-sky-400">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white sm:text-sm">{item.title}</h4>
                      <p className="mt-0.5 text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                  <span
                    className={`self-start sm:self-center shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DIAGRAM 4: NexaStandards RAG Pipeline */}
      {activeTab === "rag" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-emerald-500/30 bg-space-850/90 p-5 shadow-2xl backdrop-blur-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileSearch className="h-4 w-4 text-emerald-400" />
              <span>NexaStandards: Document Retrieval & Semantic RAG Architecture</span>
            </h3>
            <p className="mt-1 text-xs text-slate-300">
              Developed for the Smart India Hackathon: enabling instant compliance lookups across thousands of Bureau of Indian Standards (BIS) documents.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-[#06081e] p-3.5 text-center">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                  1
                </div>
                <h4 className="mt-2 text-xs font-bold text-white">Hierarchical Chunking</h4>
                <p className="mt-1 text-[11px] text-slate-400">
                  Parses complex BIS PDFs while preserving clause hierarchies, tables, and amendment dates.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#06081e] p-3.5 text-center">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 font-bold text-xs">
                  2
                </div>
                <h4 className="mt-2 text-xs font-bold text-white">Dense Embeddings</h4>
                <p className="mt-1 text-[11px] text-slate-400">
                  Embeds text chunks into a 768-dimensional vector space using sentence transformers.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#06081e] p-3.5 text-center">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 font-bold text-xs">
                  3
                </div>
                <h4 className="mt-2 text-xs font-bold text-white">Vector Similarity</h4>
                <p className="mt-1 text-[11px] text-slate-400">
                  Executes cosine distance search + BM25 keyword re-ranking for sub-second precision.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#06081e] p-3.5 text-center">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400 font-bold text-xs">
                  4
                </div>
                <h4 className="mt-2 text-xs font-bold text-white">Cited Generation</h4>
                <p className="mt-1 text-[11px] text-slate-400">
                  Generates plain-language compliance answers strictly referencing original IS standard clauses.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
