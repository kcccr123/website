"use client";

import { notFound } from "next/navigation";
import PageTransition from "../../components/PageTransition";
import { projects, ComponentConfig } from "../data/projects";
import { FaGithub } from "react-icons/fa";
import { SiDevpost } from "react-icons/si";
import { use } from "react";
import dynamic from "next/dynamic";

const componentMap = {
  'tech-stack': dynamic(() => import('./components/TechStack')),
  'features': dynamic(() => import('./components/Features')),
  'demo-link': dynamic(() => import('./components/DemoLink')),
  'image': dynamic(() => import('./components/ImageDisplay')),
  'video': dynamic(() => import('./components/VideoDisplay')),
  'wasm': dynamic(() => import('./components/WasmDisplay')),
  'wasm-iframe': dynamic(() => import('./components/WasmDisplayIFrame')),
  'screenshots': dynamic(() => import('./components/TechStack')),
  'markdown': dynamic(() => import('./components/MarkdownBlock')),
  'text-section': dynamic(() => import('./components/TechStack')),
} as const;

/**
 * ProjectPage component for displaying individual project details.
 * @param {Object} props - The component props.
 * @param {Promise<{slug: string}>} props.params - The route parameters containing the project slug.
 */
export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-black font-sans pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors duration-200"
                >
                  <FaGithub className="text-2xl" />
                  <span className="text-sm">View on GitHub</span>
                </a>
              )}
              
              {project.link && project.link.includes('devpost.com') && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors duration-200"
                >
                  <SiDevpost className="text-2xl" />
                  <span className="text-sm">View on Devpost</span>
                </a>
              )}
            </div>
            
            <div className="p-6 rounded-lg bg-glass backdrop-blur-sm border border-glass-border">
              <p className="text-lg text-text-secondary leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {project.components?.map((config: ComponentConfig, index: number) => {
              const Component = componentMap[config.type];
              if (!Component) return null;
              
              return (
                <Component 
                  key={`${config.type}-${index}`} 
                  {...config.props} 
                />
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
