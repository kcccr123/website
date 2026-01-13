"use client";

import { useEffect, useRef, useState } from "react";
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
  const moreAboutRef = useRef<HTMLDivElement | null>(null);
  const aboutBlurb =
    "Hi, I’m Kevin. My focus is in backend engineering and distributed systems, but I enjoy working across the stack. I’ve explored everything from web and frontend to ML, game development, and cloud out of curiosity, all in the process of becoming a more effective and adaptable engineer.";
const moreAboutContent = ` 
I'm a **Computer Science** student currently studying at the **University of Toronto**, pursuing Computer Science and Statistics, and expecting to graduate in December 2026. Originally from **British Columbia**, I became interested in software engineering in high school.

## Career In Software

I’m currently studying **Computer Science and Statistics** at the **University of Toronto**, and I’m planning to graduate in **December 2026**. I grew up in **British Columbia**, and I first got into software engineering in high school through a mix of curiosity for computers and wanting to build projects.

Right now, I’m most focused on **backend engineering and distributed systems**. I enjoy problems where reliability matters, where performance has real constraints, and where systems need to hold up under real-world load. I’m moving my career in this direction as I look to find my niche in industry.

At the same time, I genuinely enjoy learning across all areas of software engineering. I’ve explored **ML and AI**, **full stack web development**, and **game development**, and I try to carry those lessons back into how I design backend systems. **(Check out my projects page! It’s pretty diverse!)** Exploring different areas has made me more adaptable as an engineer, and it helps me understand how backend code fits into the bigger picture, from product and UX all the way to data, infrastructure, and deployment.

I specifically want to continue improving at **game dev** simply because I enjoy it and the kind of systems-level thinking it encourages. It’s a fun hobby, and I want to see what I can build.

## A little bit more about me...

### Sports

- **Badminton:** I’ve been playing since high school. I haven’t played in a while, but it’s still one of my favorite sports, and I enjoy the occasional session with friends.
- **Skiing:** I try to go a few times a year. Growing up in **BC** makes it hard not to, since places like **Whistler**, **Grouse**, and **Cypress** are so close. My dream ski trip is the **Alps during Christmas**.

### Hobbies

- **Online games:** Usually whatever my friends are into at the moment.
- **Game development:** As I mentioned earlier, I want to get better at building games. I’ve had a lot of moments where I think, “I really want to play a game like this,” so if no one makes them, I’m hoping to make them myself.

### Other stuff

- **Christmas is my favorite holiday, and winter is my favorite season:** I get really festive.
`;

  useEffect(() => {
    if (!isAboutOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const target = moreAboutRef.current;
      if (!target) {
        return;
      }

      const rect = target.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const targetBottom = rect.bottom + scrollTop;
      const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const extraOffset = 120;
      const nextScrollTop = Math.min(
        targetBottom - window.innerHeight + extraOffset,
        maxScrollTop
      );

      const startScrollTop = window.scrollY || document.documentElement.scrollTop;
      const delta = Math.max(nextScrollTop, 0) - startScrollTop;
      const durationMs = 200;
      const startTime = window.performance.now();

      const animateScroll = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(0, startScrollTop + delta * eased);

        if (progress < 1) {
          window.requestAnimationFrame(animateScroll);
        }
      };

      window.requestAnimationFrame(animateScroll);
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [isAboutOpen]);

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
                  ref={moreAboutRef}
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
