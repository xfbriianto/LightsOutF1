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
    <div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm backdrop-blur-xl">
      <div className="grid gap-3 md:grid-cols-[1fr_minmax(18rem,28rem)] md:items-end">
        <div className="space-y-1">
          <label className="text-base font-semibold text-foreground">
            Select Race
          </label>
          <p className="text-sm text-muted-foreground">
            Choose a completed race to view its classification.
          </p>
        </div>

        <Select value={selectedRound} onValueChange={onRoundChange}>
          <SelectTrigger className="h-11 w-full border-white/10 bg-white/5 text-foreground shadow-none hover:bg-white/10">
            <SelectValue placeholder="Choose a race..." />
          </SelectTrigger>
          <SelectContent className="border-border bg-card/95 text-card-foreground backdrop-blur-xl">
            {racesToShow.length === 0 ? (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
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
                    className="focus:bg-[#ff1600] focus:text-white"
                  >
                    {isFinished ? "Finished - " : ""}
                    Round {race.round} - {race.raceName}
                  </SelectItem>
                );
              })
            )}
          </SelectContent>
        </Select>
      </div>

      {finishedRaces.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          No race results available yet. The first race will be available after it concludes.
        </p>
      )}
    </div>
  );
}
