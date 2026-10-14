import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sudeep S. | Interactive 3D Developer Portfolio",
  description:
    "Explore the interactive 3D developer workspace of Sudeep S. — Software Developer specializing in AI & Machine Learning, Cryptographic Simulators, RAG architectures, and Cybersecurity.",
  keywords: [
    "Sudeep S.",
    "Software Developer",
    "AI ML Engineer",
    "Cybersecurity",
    "Diffie-Hellman",
    "Interactive 3D Portfolio",
    "Three.js",
    "React Three Fiber",
    "Next.js",
    "NeuroSpeak AI",
    "NexaStandards",
  ],
  authors: [{ name: "Sudeep S." }],
  creator: "Sudeep S.",
  metadataBase: new URL("https://sudeep-portfolio.vercel.app"),
  openGraph: {
    title: "Sudeep S. | Interactive 3D Developer Portfolio",
    description:
      "Step inside an interactive 3D developer room to explore cryptographic laboratories, speech AI pipelines, and software systems.",
    type: "website",
    locale: "en_US",
    siteName: "Sudeep S. Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudeep S. | Interactive 3D Developer Portfolio",
    description:
      "Interactive 3D developer workspace exploring AI/ML, Cryptography, and Software Engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#03040f" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[#03040f] text-slate-100 antialiased selection:bg-purple-500/30 selection:text-purple-200">
        {children}
      </body>
    </html>
  );
}
