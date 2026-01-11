"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageTransition from "./components/PageTransition";
import TypedText from "./components/TypedText";
import SocialLinks from "./components/SocialLinks";
import GitHubContributions from "./components/GitHubContributions";
import GitHubActivity from "./components/GitHubActivity";
import SlideIn from "./components/SlideIn";
import ExpandArrow from "./components/ExpandArrow";
import AboutMeMarkdown from "./components/AboutMeMarkdown";

export default function Home() {  
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const aboutBlurb =
    "Hi, I’m Kevin. I focus on backend engineering, but I enjoy working across the stack. I’ve explored everything from web and frontend to ML, game dev, and distributed systems out of curiosity, all in the process of becoming a more adaptable engineer.";
  const moreAboutContent = `
I'm Kevin

- WIP
`;

  return (
    <PageTransition>
      <div className="min-h-screen font-sans pt-64 pb-12 page-gutters">
        <div className="page-container flex flex-col gap-10">
          <div>
            <SlideIn
              direction="top"
              delay={0.1}
              duration={0.6}
              maxHeight="100%"
              maxWidth="100%"
              minHeight={undefined}
              className="flex items-start"
            >
              <TypedText 
                text="Hi There!🫡" 
                typingSpeed={80}
                className="w-full"
                textClassName="hero-text font-sans"
                cursorClassName=""
                showCursor={true}
                onComplete={undefined}
              />
            </SlideIn>
          </div>

          <div>
            <SlideIn
              direction="left"
              delay={0.2}
              duration={0.6}
              maxHeight="100%"
              maxWidth="100%"
              minHeight={undefined}
              className="flex items-start"
            >
              <TypedText
                text={aboutBlurb}
                typingSpeed={30}
                className="w-full"
                textClassName="text-[clamp(1.05rem,2.1vw,1.6rem)] text-[var(--color-text-secondary)] leading-relaxed max-w-[70rem] whitespace-normal"
                cursorClassName=""
                showCursor={false}
                onComplete={undefined}
              />
            </SlideIn>
          </div>

          <div>
            <div className="grid w-full grid-cols-1 md:grid-cols-[minmax(320px,440px)_minmax(0,1fr)] lg:grid-cols-[minmax(320px,440px)_minmax(0,1.2fr)_minmax(260px,360px)] gap-8 items-start">
              <SlideIn
                direction="left"
                delay={0.3}
                duration={0.6}
                maxHeight="100%"
                maxWidth="100%"
                minHeight={undefined}
                className=""
              >
                <SocialLinks 
                  github="https://github.com/kcccr123"
                  linkedin="https://www.linkedin.com/in/kevin-chen-095702262/"
                  email="kevinz.chen@mail.utoronto.ca"
                  title="Links"
                  maxHeight="400px"
                  maxWidth="100%"
                  minHeight="260px"
                  className=""
                />
              </SlideIn>

              <SlideIn
                direction="right"
                delay={0.5}
                duration={0.6}
                maxHeight="100%"
                maxWidth="100%"
                minHeight={undefined}
                className=""
              >
                <GitHubContributions 
                  username="kcccr123" 
                  title="GitHub Contributions"
                  weeks={52}
                  maxHeight="480px"
                  minHeight="380px"
                  maxWidth="100%"
                  className=""
                />
              </SlideIn>

              <SlideIn
                direction="right"
                delay={0.7}
                duration={0.6}
                maxHeight="100%"
                maxWidth="100%"
                minHeight={undefined}
                className=""
              >
                <GitHubActivity
                  username="kcccr123"
                  title="GitHub Activity"
                  eventCount={10}
                  maxHeight="400px"
                  maxWidth="360px"
                  minHeight="320px"
                  className=""
                  showIcon={true}
                />
              </SlideIn>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => setIsAboutOpen((prev) => !prev)}
              aria-expanded={isAboutOpen}
              aria-controls="more-about-me-section"
              className="group inline-flex items-center gap-3 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass)] px-6 py-3 text-[clamp(0.95rem,1.4vw,1.1rem)] font-medium text-white/90 transition-all duration-300 hover:border-[var(--color-glass-border-hover)] hover:text-white"
            >
              <span>{isAboutOpen ? "Hide More About Me" : "More About Me"}</span>
              <ExpandArrow
                isOpen={isAboutOpen}
                size={20}
                className="text-white/80 group-hover:text-white transition-colors duration-300"
              />
            </button>

            <AnimatePresence initial={false}>
              {isAboutOpen && (
                <motion.div
                  id="more-about-me-section"
                  role="region"
                  initial={{ height: 0, opacity: 0, y: -8 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="w-full overflow-hidden"
                >
                  <AboutMeMarkdown
                    title="More About Me"
                    content={moreAboutContent}
                    filePath={undefined}
                    className="w-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
