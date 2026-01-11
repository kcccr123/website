import { useEffect, useRef } from "react";
import { ExperienceItem } from "../../data/experiences";

interface TimelineCardProps {
  item: ExperienceItem;
  period: string;
  logoUrl?: string;
  align?: "left" | "right";
  compact?: boolean;
  onDetailsHeight?: (id: string, height: number) => void;
}

export default function TimelineCard({
  item,
  period,
  logoUrl,
  align = "left",
  compact = false,
  onDetailsHeight
}: TimelineCardProps) {
  const alignRight = align === "right";
  const maxWidthClass = compact ? "max-w-[360px]" : "max-w-[520px]";
  const panelWidthClass = compact ? "md:w-[min(360px,38vw)]" : "md:w-[min(440px,45vw)]";
  const panelSideClass = alignRight
    ? "md:right-full md:mr-6 md:origin-top-right"
    : "md:left-full md:ml-6 md:origin-top-left";
  const panelMotionClass = alignRight ? "md:translate-x-2" : "md:-translate-x-2";
  const initials = item.company
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const detailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!onDetailsHeight || !detailsRef.current) {
      return;
    }

    const element = detailsRef.current;
    const reportHeight = () => {
      const computed = window.getComputedStyle(element);
      const paddingTop = Number.parseFloat(computed.paddingTop) || 0;
      const paddingBottom = Number.parseFloat(computed.paddingBottom) || 0;
      const expandedPadding = paddingTop + paddingBottom > 0 ? 0 : 40;
      onDetailsHeight(item.id, element.scrollHeight + expandedPadding);
    };

    reportHeight();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => {
      reportHeight();
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [item.id, onDetailsHeight]);

  return (
    <div
      className={`group relative w-full ${maxWidthClass} flex flex-col ${
        alignRight ? "items-end" : "items-start"
      }`}
    >
      <button
        type="button"
        aria-label={`View details for ${item.company}`}
        className={`inline-flex items-center gap-3 rounded-full border border-[var(--color-glass-border)] bg-[var(--color-glass)] px-4 py-2 text-sm text-white/90 transition-all duration-300 hover:border-[var(--color-glass-border-hover)] hover:text-white ${
          alignRight ? "self-end" : "self-start"
        }`}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--color-glass-border)] bg-white/5">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${item.company} logo`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-[11px] font-semibold text-white/80">{initials}</span>
            )}
          </span>
          <span className="min-w-0 truncate font-medium">{item.company}</span>
        </span>
        <span className="text-[var(--color-text-muted)]">{period}</span>
      </button>

      <div
        ref={detailsRef}
        className={`mt-4 w-full max-h-0 translate-y-2 overflow-hidden rounded-lg border border-[var(--color-glass-border)] bg-[var(--color-glass)] px-6 py-0 opacity-0 transition-all duration-300 group-hover:max-h-[600px] group-hover:py-5 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:max-h-[600px] group-focus-within:py-5 group-focus-within:opacity-100 group-focus-within:translate-y-0 md:pointer-events-none md:absolute md:top-0 md:mt-0 md:max-h-none md:translate-y-0 md:overflow-visible md:px-6 md:py-5 md:opacity-0 md:shadow-[0_12px_40px_rgba(0,0,0,0.35)] md:transition-all md:duration-300 ${panelWidthClass} ${panelSideClass} ${panelMotionClass} md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-hover:translate-x-0 md:group-focus-within:pointer-events-auto md:group-focus-within:opacity-100 md:group-focus-within:translate-x-0`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[clamp(1.1rem,1.6vw,1.4rem)] font-semibold">{item.role}</h3>
          <span className="text-[var(--color-text-muted)]">at</span>
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[clamp(1.05rem,1.5vw,1.3rem)] font-medium text-blue-300 hover:text-blue-200 transition-colors"
            >
              {item.company}
            </a>
          ) : (
            <span className="text-[clamp(1.05rem,1.5vw,1.3rem)] font-medium text-white">
              {item.company}
            </span>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
          <span>{period}</span>
          {item.location && <span>{item.location}</span>}
        </div>

        {item.summary && (
          <p className="mt-4 text-[clamp(1rem,1.4vw,1.15rem)] text-[var(--color-text-secondary)] leading-relaxed">
            {item.summary}
          </p>
        )}

        {item.highlights && item.highlights.length > 0 && (
          <ul className="mt-4 space-y-2 text-[var(--color-text-secondary)]">
            {item.highlights.map((highlight) => (
              <li key={highlight} className="text-sm leading-relaxed">
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-glass-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
