"use client";

import PageTransition from "../components/PageTransition";
import ProjectCard from "./components/ProjectCard";
import { projects } from "./data/projects";

/**
 * Projects page component for displaying a grid of project cards.
 */
export default function Projects() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black font-sans pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-12">Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}