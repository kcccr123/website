"use client";

import { FaEnvelope, FaExternalLinkAlt, FaGithub, FaLinkedin, FaSoundcloud } from "react-icons/fa";
import { SiDevpost, SiItchdotio } from "react-icons/si";
import type { ProjectLink } from "../../data/projects";

const iconMap = {
  email: FaEnvelope,
  linkedin: FaLinkedin,
  github: FaGithub,
  devpost: SiDevpost,
  itch: SiItchdotio,
  soundcloud: FaSoundcloud,
  external: FaExternalLinkAlt
} as const;

type LinkType = keyof typeof iconMap;

const resolveLinkType = (url: string): LinkType => {
  const lower = url.toLowerCase();

  if (lower.startsWith("mailto:")) return "email";
  if (lower.includes("linkedin.com")) return "linkedin";
  if (lower.includes("github.com")) return "github";
  if (lower.includes("devpost.com")) return "devpost";
  if (lower.includes("itch.io")) return "itch";
  if (lower.includes("soundcloud.com")) return "soundcloud";

  return "external";
};

interface ProjectLinksProps {
  links?: ProjectLink[];
}

/**
 * ProjectLinks component for rendering a list of external links with icons.
 */
export default function ProjectLinks({ links }: ProjectLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {links.map((link) => {
        const Icon = iconMap[resolveLinkType(link.url)];
        return (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-text-secondary hover:text-white transition-colors duration-200"
          >
            <Icon className="text-3xl" />
            <span className="text-base">{link.label}</span>
          </a>
        );
      })}
    </div>
  );
}
