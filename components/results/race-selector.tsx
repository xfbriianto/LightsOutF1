"use client";

import { Race } from "@/types/f1";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RaceSelectorProps {
  races: Race[];
  selectedRound: string;
  onRoundChange: (round: string) => void;
}

export function RaceSelector({
  races,
  selectedRound,
  onRoundChange,
}: RaceSelectorProps) {
  const finishedRaces = races.filter((race) => {
    const raceDate = new Date(race.date);
    return raceDate <= new Date();
  });

  const racesToShow = finishedRaces.length > 0 ? finishedRaces : races;

  return (
  <div className="overflow-hidden rounded-2xl border border-[#2a2530] bg-[#141118]">

    {/* Wave BG */}
    <div className="relative min-h-[90px] bg-[#141118] px-[22px] py-5">
      <svg
        className="absolute inset-0 h-full w-full opacity-50 pointer-events-none"
        viewBox="0 0 680 110"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="sg1" cx="75%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#c00000" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#141118" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sg2" cx="95%" cy="90%" r="30%">
            <stop offset="0%" stopColor="#8b0000" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#141118" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="680" height="110" fill="#141118" />
        <rect width="680" height="110" fill="url(#sg1)" />
        <rect width="680" height="110" fill="url(#sg2)" />
        <path d="M200 55 Q320 20 450 50 Q550 70 650 35" stroke="#c00000" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M160 72 Q300 42 430 65 Q530 82 630 55" stroke="#8b0000" strokeWidth="1" fill="none" opacity="0.35" />
        <path d="M180 88 Q340 65 460 80 Q560 92 640 72" stroke="#c00000" strokeWidth="0.8" fill="none" opacity="0.2" />
      </svg>

      {/* Content */}
      <div className="relative z-10 grid gap-3 md:grid-cols-[1fr_minmax(18rem,28rem)] md:items-end">
        <div className="space-y-1">
          <label className="text-[15px] font-bold text-white">
            Select Race
          </label>
          <p className="text-[13px] text-[#706a7a]">
            Choose a completed race to view its classification.
          </p>
        </div>

        <Select value={selectedRound} onValueChange={onRoundChange}>
          <SelectTrigger className="h-11 w-full rounded-[10px] border border-[#2a2530] bg-[#1e1a26] text-[#c8c2d4] shadow-none hover:bg-[#242030] hover:border-[#3d3648] transition-colors focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="Choose a race..." />
          </SelectTrigger>
          <SelectContent className="rounded-xl border border-[#2a2530] bg-[#1a1621] text-[#c8c2d4] backdrop-blur-xl">
            {racesToShow.length === 0 ? (
              <div className="px-3 py-2 text-[13px] text-[#706a7a]">
                No races available
              </div>
            ) : (
              racesToShow.map((race) => {
                const raceDate = new Date(race.date);
                const isFinished = raceDate <= new Date();

                return (
                  <SelectItem
                    key={race.round}
                    value={race.round}
                    className="text-[13px] text-[#c8c2d4] focus:bg-[#e03535] focus:text-white rounded-lg"
                  >
                    {isFinished ? "Finished — " : ""}
                    Round {race.round} · {race.raceName}
                  </SelectItem>
                );
              })
            )}
          </SelectContent>
        </Select>
      </div>

      {finishedRaces.length === 0 && (
        <p className="relative z-10 mt-4 text-[13px] text-[#706a7a]">
          No race results available yet. The first race will be available after it concludes.
        </p>
      )}
    </div>

  </div>
);
}
