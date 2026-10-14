export interface SocialLink {
  id: string;
  name: string;
  label: string;
  href: string;
  icon: string;
  color: string;
  isExternal?: boolean;
}

export const contactConfig = {
  name: "Sudeep S.",
  role: "Software Developer · AI & ML · Cybersecurity",
  tagline: "Building resilient systems, intelligent speech pipelines, and interactive 3D web experiences.",
  email: "sudeep.developer@example.com", // Configurable verified email placeholder
  phone: "+91 90000 00000",              // Configurable verified phone placeholder
  location: "India (UTC +5:30)",
  availability: "Open to Software Engineering, AI/ML, and Cybersecurity Opportunities",
  socials: [
    {
      id: "github",
      name: "GitHub",
      label: "github.com/Sudeep2296",
      href: "https://github.com/Sudeep2296",
      icon: "Github",
      color: "#38bdf8",
      isExternal: true,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      label: "linkedin.com/in/sudeep-s",
      href: "https://linkedin.com/in/sudeep-s",
      icon: "Linkedin",
      color: "#818cf8",
      isExternal: true,
    },
    {
      id: "email",
      name: "Email",
      label: "Send Email",
      href: "mailto:sudeep.developer@example.com?subject=Inquiry%20from%20Portfolio",
      icon: "Mail",
      color: "#f43f5e",
      isExternal: false,
    },
    {
      id: "phone",
      name: "Phone",
      label: "Call Sudeep",
      href: "tel:+919000000000",
      icon: "Phone",
      color: "#34d399",
      isExternal: false,
    },
  ] as SocialLink[],
};
