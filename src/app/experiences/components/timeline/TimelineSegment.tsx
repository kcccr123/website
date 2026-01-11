import TimelineCard from "./TimelineCard";
import TimelineDates from "./TimelineDates";
import type { ItemRow } from "./types";

interface TimelineSegmentProps {
  row: ItemRow;
  dotOffset: number;
  dotSize: number;
  onDetailsHeight?: (id: string, height: number) => void;
}

export default function TimelineSegment({
  row,
  dotOffset,
  dotSize,
  onDetailsHeight
}: TimelineSegmentProps) {
  const isLeft = row.isLeft;
  const period = row.item.end
    ? `${row.item.start} - ${row.item.end}`
    : `${row.item.start} - Present`;
  const logoUrl = row.item.logoUrl;
  const endLabel =
    row.item.end && row.item.end.toLowerCase() !== "present" ? row.item.end : "Present";

  const card = (
    <TimelineCard
      item={row.item}
      period={period}
      logoUrl={logoUrl}
      align={isLeft ? "right" : "left"}
      onDetailsHeight={onDetailsHeight}
    />
  );

  return (
    <div
      className="absolute left-0 right-0 grid grid-cols-1 gap-6 md:grid-cols-[1fr_2rem_1fr]"
      style={{ height: `${row.rowHeight}px`, top: `${row.top}px` }}
    >
      <div className="absolute left-[0.85rem] top-5 h-3 w-3 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.35)] md:hidden" />
      {isLeft ? (
        <>
          <div className="pl-10 md:pl-0 md:col-start-1 md:flex md:justify-end">{card}</div>
          <div className="hidden md:flex md:col-start-2 md:justify-center">
            <TimelineDates
              endLabel={endLabel}
              startLabel={row.item.start}
              durationHeight={row.durationHeight}
              segmentTop={row.segmentTop}
              startLabelTop={row.startLabelTop}
              dotOffset={dotOffset}
              dotSize={dotSize}
              laneOffset={row.laneOffset}
            />
          </div>
          <div className="hidden md:block md:col-start-3" />
        </>
      ) : (
        <>
          <div className="hidden md:block md:col-start-1" />
          <div className="hidden md:flex md:col-start-2 md:justify-center">
            <TimelineDates
              endLabel={endLabel}
              startLabel={row.item.start}
              durationHeight={row.durationHeight}
              segmentTop={row.segmentTop}
              startLabelTop={row.startLabelTop}
              dotOffset={dotOffset}
              dotSize={dotSize}
              laneOffset={row.laneOffset}
            />
          </div>
          <div className="pl-10 md:pl-0 md:col-start-3 md:flex md:justify-start">{card}</div>
        </>
      )}
    </div>
  );
}
