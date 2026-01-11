"use client";

import { useCallback, useState } from "react";
import { ExperienceItem } from "../data/experiences";
import TimelineCard from "./timeline/TimelineCard";
import TimelineSegment from "./timeline/TimelineSegment";
import TimelineTrackSegment from "./timeline/TimelineTrackSegment";
import type { TimelineRow } from "./timeline/types";

interface TimelineProps {
  items: ExperienceItem[];
  className?: string;
}

type TrackItem = {
  item: ExperienceItem;
  laneIndex: number;
  columnIndex: number;
  rowStart: number;
  rowEnd: number;
  durationMonths: number;
  isLeft: boolean;
  top: number;
};

const monthIndex: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11
};

const parseMonthYear = (value?: string) => {
  if (!value) {
    return null;
  }
  const [rawMonth, rawYear] = value.trim().split(/\s+/);
  if (!rawMonth || !rawYear) {
    return null;
  }
  const month = monthIndex[rawMonth.slice(0, 3).toLowerCase()];
  const year = Number(rawYear);
  if (Number.isNaN(year) || month === undefined) {
    return null;
  }
  return new Date(year, month, 1);
};

const monthDiff = (start: Date, end: Date) => {
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
};

export default function Timeline({ items, className = "" }: TimelineProps) {
  const [detailsHeights, setDetailsHeights] = useState<Record<string, number>>({});
  const handleDetailsHeight = useCallback((id: string, height: number) => {
    setDetailsHeights((prev) => {
      const nextHeight = Math.ceil(height);
      const currentHeight = prev[id] ?? 0;
      if (currentHeight >= nextHeight) {
        return prev;
      }
      return { ...prev, [id]: nextHeight };
    });
  }, []);

  const maxDetailsHeight = Math.max(0, ...Object.values(detailsHeights));
  const extraBottomPadding = maxDetailsHeight ? maxDetailsHeight + 16 : 0;
  const now = new Date();
  const prepared = items
    .map((item) => {
      const startDate = parseMonthYear(item.start) ?? now;
      const endDate =
        item.end && item.end.toLowerCase() !== "present"
          ? parseMonthYear(item.end) ?? now
          : now;
      return {
        item,
        startDate,
        endDate
      };
    })
    .sort((a, b) => b.endDate.getTime() - a.endDate.getTime());

  const monthHeight = 28;
  const labelHeight = 24;
  const dotSize = 10;
  const dotOffset = 28;
  const segmentGap = 12;
  const labelGap = 12;
  const minGapPx = labelHeight + 16;
  const laneWidth = 96;

  const maxEndDate =
    prepared.reduce((latest, current) => {
      return current.endDate > latest ? current.endDate : latest;
    }, prepared[0]?.endDate ?? now) ?? now;
  const minStartDate =
    prepared.reduce((earliest, current) => {
      return current.startDate < earliest ? current.startDate : earliest;
    }, prepared[0]?.startDate ?? now) ?? now;
  const totalMonths = Math.max(1, monthDiff(minStartDate, maxEndDate) + 1);
  const totalHeight = totalMonths * monthHeight;

  const forcedParallelEntries = prepared.filter((entry) => entry.item.forceParallel);
  const autoEntries = prepared.filter((entry) => !entry.item.forceParallel);

  const sortedByStart = [...autoEntries].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );
  const laneEnds: Date[] = [];
  const laneAssignments = new Map<string, number>();

  sortedByStart.forEach((entry) => {
    let assignedLane = -1;
    for (let i = 0; i < laneEnds.length; i += 1) {
      if (entry.startDate.getTime() > laneEnds[i].getTime()) {
        assignedLane = i;
        break;
      }
    }
    if (assignedLane === -1) {
      assignedLane = laneEnds.length;
      laneEnds.push(entry.endDate);
    } else {
      laneEnds[assignedLane] = entry.endDate;
    }
    laneAssignments.set(entry.item.id, assignedLane);
  });

  const baseLaneCount = autoEntries.length > 0 ? Math.max(laneEnds.length, 1) : 0;
  const forcedLaneStart = baseLaneCount;
  const laneCount = Math.max(baseLaneCount + forcedParallelEntries.length, 1);

  forcedParallelEntries.forEach((entry, index) => {
    laneAssignments.set(entry.item.id, forcedLaneStart + index);
  });
  const laneOffsets: number[] = [];
  laneOffsets.push(0);
  for (let step = 1; laneOffsets.length < laneCount; step += 1) {
    laneOffsets.push(-step);
    if (laneOffsets.length < laneCount) {
      laneOffsets.push(step);
    }
  }

  const resolvedLaneOffsets = laneOffsets;
  const maxOffset = resolvedLaneOffsets.reduce((max, offset) => Math.max(max, Math.abs(offset)), 0);
  const columnCount = maxOffset * 2 + 1;
  const centerColumn = maxOffset;
  const centerGridWidth = columnCount * laneWidth;
  const connectorOffset = Math.max(16, Math.round(monthHeight * 0.6));

  const lanes: TrackItem[][] = Array.from({ length: laneCount }, () => []);
  const leftItems: TrackItem[] = [];
  const rightItems: TrackItem[] = [];

  prepared.forEach((entry, index) => {
    const laneIndex = laneAssignments.get(entry.item.id) ?? 0;
    const endIndex = Math.max(0, monthDiff(entry.endDate, maxEndDate));
    const startIndex = Math.max(endIndex, monthDiff(entry.startDate, maxEndDate));
    const durationMonths = Math.max(1, startIndex - endIndex + 1);
    const rowStart = endIndex + 1;
    const rowEnd = rowStart + durationMonths;
    const columnOffset = resolvedLaneOffsets[laneIndex];
    let isLeft = false;
    if (laneCount === 1) {
      isLeft = index % 2 === 0;
    } else if (columnOffset < 0) {
      isLeft = true;
    } else if (columnOffset > 0) {
      isLeft = false;
    } else {
      isLeft = index % 2 === 0;
    }

    const columnIndex = columnOffset + maxOffset;
    const trackItem: TrackItem = {
      item: entry.item,
      laneIndex,
      columnIndex,
      rowStart,
      rowEnd,
      durationMonths,
      isLeft,
      top: (rowStart - 1) * monthHeight
    };

    lanes[laneIndex].push(trackItem);
    if (isLeft) {
      leftItems.push(trackItem);
    } else {
      rightItems.push(trackItem);
    }
  });

  const stackGap = laneWidth * 4;
  const buildStackInfo = (items: TrackItem[]) => {
    const groups = new Map<number, TrackItem[]>();
    items.forEach((trackItem) => {
      const list = groups.get(trackItem.rowStart) ?? [];
      list.push(trackItem);
      groups.set(trackItem.rowStart, list);
    });

    const stackInfo = new Map<string, { offset: number; count: number }>();
    groups.forEach((group) => {
      if (group.length < 2) {
        return;
      }
      const sorted = [...group].sort((a, b) => a.columnIndex - b.columnIndex);
      sorted.forEach((entry, index) => {
        stackInfo.set(entry.item.id, { offset: index * stackGap, count: group.length });
      });
    });
    return stackInfo;
  };

  const leftStackInfo = buildStackInfo(leftItems);
  const rightStackInfo = buildStackInfo(rightItems);

  const laneLines = lanes
    .map((laneItems) => {
      if (laneItems.length === 0) {
        return null;
      }
      const minRowStart = Math.min(...laneItems.map((item) => item.rowStart));
      const maxRowEnd = Math.max(...laneItems.map((item) => item.rowEnd));
      return {
        columnIndex: laneItems[0].columnIndex,
        minRowStart,
        maxRowEnd,
        fullHeight: laneItems[0].columnIndex === centerColumn
      };
    })
    .filter(
      (
        laneLine
      ): laneLine is { columnIndex: number; minRowStart: number; maxRowEnd: number; fullHeight: boolean } =>
        Boolean(laneLine)
    );

  const rows: TimelineRow[] = [];
  const segmentTop = dotOffset + dotSize + segmentGap;
  let cursorTop = 0;

  prepared.forEach((entry, index) => {
    const durationMonths = Math.max(1, monthDiff(entry.startDate, entry.endDate) + 1);
    const durationHeight = durationMonths * monthHeight;
    const startLabelTop = segmentTop + durationHeight + labelGap;
    const rowHeight = startLabelTop + labelHeight;

    rows.push({
      type: "item",
      item: entry.item,
      top: cursorTop,
      durationHeight,
      segmentTop,
      startLabelTop,
      rowHeight,
      isLeft: index % 2 === 0,
      laneOffset: 0
    });

    const next = prepared[index + 1];
    if (next) {
      const gapMonths = Math.max(0, monthDiff(next.endDate, entry.startDate) - 1);
      const gapHeight = Math.max(minGapPx, gapMonths * monthHeight);
      cursorTop += rowHeight + gapHeight;
    } else {
      cursorTop += rowHeight;
    }
  });

  return (
    <div className={`relative ${className}`}>
      <div className="relative md:hidden" style={{ height: `${cursorTop}px` }}>
        <div className="absolute left-4 top-0 h-full w-px bg-[var(--color-glass-border)]" />
        {rows.map((row) => (
          <TimelineSegment
            key={row.item.id}
            row={row}
            dotOffset={dotOffset}
            dotSize={dotSize}
            onDetailsHeight={handleDetailsHeight}
          />
        ))}
      </div>

      <div className="relative hidden md:block" style={{ height: `${totalHeight}px` }}>
        <div className="grid h-full grid-cols-[1fr_auto_1fr] gap-12">
          <div className="relative">
            {leftItems.map((trackItem) => {
              const { item } = trackItem;
              const period = item.end ? `${item.start} - ${item.end}` : `${item.start} - Present`;
              const logoUrl = item.logoUrl;
              const dotX = (trackItem.columnIndex + 0.5) * laneWidth;
              const baseConnectorWidth = dotX;
              const stack = leftStackInfo.get(item.id);
              const stackOffset = stack?.offset ?? 0;
              const connectorWidth = baseConnectorWidth + stackOffset;
              const compact = (stack?.count ?? 0) > 1;
              return (
                <div
                  key={`left-${item.id}`}
                  className="absolute left-0 right-0 flex justify-end"
                  style={{ top: `${trackItem.top}px` }}
                >
                  <div
                    className="relative"
                    style={stackOffset ? { transform: `translateX(-${stackOffset}px)` } : undefined}
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-full h-px bg-white/50"
                      style={{ top: `${connectorOffset}px`, width: `${connectorWidth}px` }}
                    />
                    <TimelineCard
                      item={item}
                      period={period}
                      logoUrl={logoUrl}
                      align="right"
                      compact={compact}
                      onDetailsHeight={handleDetailsHeight}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="relative grid h-full"
            style={{
              width: `${columnCount * laneWidth}px`,
              gridTemplateColumns: `repeat(${columnCount}, ${laneWidth}px)`,
              gridTemplateRows: `repeat(${totalMonths}, ${monthHeight}px)`
            }}
          >
            {laneLines.map((laneLine) => (
              <div
                key={`lane-line-${laneLine.columnIndex}`}
                className="relative"
                style={{
                  gridColumn: laneLine.columnIndex + 1,
                  gridRow: laneLine.fullHeight
                    ? "1 / -1"
                    : `${laneLine.minRowStart} / ${laneLine.maxRowEnd}`
                }}
              >
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--color-glass-border)]" />
              </div>
            ))}

            {lanes.flatMap((laneItems) =>
              laneItems.map((trackItem) => {
                const { item } = trackItem;
                const endLabel =
                  item.end && item.end.toLowerCase() !== "present" ? item.end : "Present";
                return (
                  <div
                    key={`track-${item.id}`}
                    className="relative z-10 flex justify-center"
                    style={{
                      gridColumn: trackItem.columnIndex + 1,
                      gridRow: `${trackItem.rowStart} / ${trackItem.rowEnd}`
                    }}
                  >
                    <TimelineTrackSegment
                      endLabel={endLabel}
                      startLabel={item.start}
                      durationMonths={trackItem.durationMonths}
                      monthHeight={monthHeight}
                    />
                  </div>
                );
              })
            )}
          </div>

          <div className="relative">
            {rightItems.map((trackItem) => {
              const { item } = trackItem;
              const period = item.end ? `${item.start} - ${item.end}` : `${item.start} - Present`;
              const logoUrl = item.logoUrl;
              const dotX = (trackItem.columnIndex + 0.5) * laneWidth;
              const baseConnectorWidth = centerGridWidth - dotX;
              const stack = rightStackInfo.get(item.id);
              const stackOffset = stack?.offset ?? 0;
              const connectorWidth = baseConnectorWidth + stackOffset;
              const compact = (stack?.count ?? 0) > 1;
              return (
                <div
                  key={`right-${item.id}`}
                  className="absolute left-0 right-0 flex justify-start"
                  style={{ top: `${trackItem.top}px` }}
                >
                  <div
                    className="relative"
                    style={stackOffset ? { transform: `translateX(${stackOffset}px)` } : undefined}
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-full h-px bg-white/50"
                      style={{ top: `${connectorOffset}px`, width: `${connectorWidth}px` }}
                    />
                    <TimelineCard
                      item={item}
                      period={period}
                      logoUrl={logoUrl}
                      align="left"
                      compact={compact}
                      onDetailsHeight={handleDetailsHeight}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {extraBottomPadding > 0 && (
        <div aria-hidden="true" style={{ height: `${extraBottomPadding}px` }} />
      )}
    </div>
  );
}
