"use client";

import PageTransition from "../components/PageTransition";
import Timeline from "./components/Timeline";
import { experiences } from "./data/experiences";

export default function ExperiencesPage() {
  return (
    <PageTransition>
      <div className="min-h-screen font-sans pt-28 pb-20 page-gutters">
        <div className="page-container">
          <div className="mb-12">
            <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold">Experiences</h1>
            <p className="mt-3 text-[clamp(1rem,1.6vw,1.2rem)] text-[var(--color-text-secondary)]">
              A timeline of roles, projects, and milestones.
            </p>
          </div>

          <Timeline items={experiences} className="mx-auto max-w-5xl" />
        </div>
      </div>
    </PageTransition>
  );
}
