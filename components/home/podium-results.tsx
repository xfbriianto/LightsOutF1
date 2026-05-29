"use client";

import { RaceResult } from "@/types/f1";
import { Skeleton } from "@/components/ui/skeleton";

const PODIUM_STYLES: Record<
  number,
  { border: string; position: string; glow: string }
> = {
  1: {
    border: "border-l-[#e03535]",
    position: "text-[#e03535]",
    glow: "from-[#e03535]/15 to-transparent",
  },
  2: {
    border: "border-l-[#aaa]",
    position: "text-[#aaa]",
    glow: "from-[#aaa]/10 to-transparent",
  },
  3: {
    border: "border-l-[#b87333]",
    position: "text-[#b87333]",
    glow: "from-[#b87333]/10 to-transparent",
  },
};

function PodiumCard({ result }: { result: RaceResult }) {
  const pos = parseInt(result.position, 10);
  const style = PODIUM_STYLES[pos] ?? PODIUM_STYLES[3];
  const driverCode =
    result.Driver.code ?? result.Driver.familyName.slice(0, 3).toUpperCase();

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-[#2a2530]/80 bg-neutral-950/50 px-4 py-4 backdrop-blur-sm ${style.border} border-l-[3px]`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${style.glow}`}
        aria-hidden
      />
      <div className="relative z-10 flex items-center gap-4">
        <span
          className={`text-3xl font-black tabular-nums ${style.position}`}
        >
          P{result.position}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-bold tracking-wide text-white">
            {driverCode}
          </p>
          <p className="truncate text-[13px] text-[#a09aaa]">
            {result.Driver.givenName} {result.Driver.familyName}
          </p>
          <p className="text-[12px] text-[#706a7a]">{result.Constructor.name}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#706a7a]">
            Points
          </p>
          <p className="text-xl font-bold text-white">{result.points}</p>
          {result.Time?.time && (
            <p className="mt-1 font-mono text-[11px] text-[#a09aaa]">
              {result.Time.time}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

interface PodiumResultsProps {
  results: RaceResult[];
  loading?: boolean;
}

export function PodiumResults({ results, loading = false }: PodiumResultsProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    );
  }

  const podium = results
    .filter((r) => {
      const pos = parseInt(r.position, 10);
      return pos >= 1 && pos <= 3 && r.status === "Finished";
    })
    .sort((a, b) => parseInt(a.position, 10) - parseInt(b.position, 10));

  if (podium.length === 0) {
    return (
      <div className="rounded-xl border border-[#2a2530] bg-neutral-950/50 px-4 py-8 text-center backdrop-blur-sm">
        <p className="text-sm text-[#706a7a]">
          Podium results are not available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#706a7a]">
          Race Finished
        </span>
        <h3 className="text-[13px] font-bold uppercase tracking-widest text-white">
          Podium
        </h3>
      </div>

      <div className="grid gap-3">
        {podium.map((result) => (
          <PodiumCard key={result.Driver.driverId} result={result} />
        ))}
      </div>
    </div>
  );
}
