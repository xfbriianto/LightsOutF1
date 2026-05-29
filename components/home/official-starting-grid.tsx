"use client";

import { QualifyingResult } from "@/types/f1";
import { Skeleton } from "@/components/ui/skeleton";

function getBestQualifyingTime(result: QualifyingResult): string {
  return result.Q3 || result.Q2 || result.Q1 || "—";
}

function GridRow({
  result,
  accent,
}: {
  result: QualifyingResult;
  accent: "podium" | "top" | "bottom";
}) {
  const pos = parseInt(result.position, 10);
  const driverCode = result.Driver.code ?? result.Driver.familyName.slice(0, 3).toUpperCase();
  const time = getBestQualifyingTime(result);

  const borderAccent =
    accent === "podium"
      ? "border-l-[#e03535]"
      : accent === "top"
        ? "border-l-[#c00000]/70"
        : "border-l-[#3d3648]";

  const posColor =
    pos === 1
      ? "text-[#e03535]"
      : pos === 2
        ? "text-[#aaa]"
        : pos === 3
          ? "text-[#b87333]"
          : "text-white";

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border border-[#2a2530]/80 bg-neutral-950/50 px-3 py-2.5 backdrop-blur-sm ${borderAccent} border-l-2`}
    >
      <span className={`w-6 shrink-0 text-center text-[13px] font-bold ${posColor}`}>
        {result.position}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-bold tracking-wide text-white">
            {driverCode}
          </span>
          <span className="truncate text-[11px] text-[#706a7a]">
            {result.Constructor.name}
          </span>
        </div>
      </div>
      <span className="shrink-0 font-mono text-[11px] text-[#a09aaa]">{time}</span>
    </div>
  );
}

interface OfficialStartingGridProps {
  results: QualifyingResult[];
  loading?: boolean;
}

export function OfficialStartingGrid({
  results,
  loading = false,
}: OfficialStartingGridProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="rounded-xl border border-[#2a2530] bg-neutral-950/50 px-4 py-8 text-center backdrop-blur-sm">
        <p className="text-sm text-[#706a7a]">
          Starting grid is not available yet. Check back after qualifying.
        </p>
      </div>
    );
  }

  const sorted = [...results].sort(
    (a, b) => parseInt(a.position, 10) - parseInt(b.position, 10)
  );
  const topTen = sorted.filter((r) => parseInt(r.position, 10) <= 10);
  const bottomTen = sorted.filter((r) => parseInt(r.position, 10) > 10);

  return (
    <div className="space-y-4">
      {/* Live header */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e03535] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#e03535]" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e03535]">
            Live
          </span>
        </div>
        <h3 className="text-[13px] font-bold uppercase tracking-widest text-white">
          Official Starting Grid
        </h3>
        <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-400">
          Green Flag
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#706a7a]">
            P1 – P10
          </p>
          {topTen.map((result) => {
            const pos = parseInt(result.position, 10);
            const accent =
              pos <= 3 ? ("podium" as const) : ("top" as const);
            return (
              <GridRow key={result.Driver.driverId} result={result} accent={accent} />
            );
          })}
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#706a7a]">
            P11 – P20
          </p>
          {bottomTen.map((result) => (
            <GridRow
              key={result.Driver.driverId}
              result={result}
              accent="bottom"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
