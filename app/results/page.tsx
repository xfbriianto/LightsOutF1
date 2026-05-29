"use client";

import { useEffect, useState } from "react";
import { Race, RaceResult } from "@/types/f1";
import { getCurrentRaces, getRaceResults, getSprintResults } from "@/lib/api";
import { RaceSelector } from "@/components/results/race-selector";
import {
  ResultTypeSelector,
  type ResultType,
} from "@/components/results/result-type-selector";
import { ResultsTable } from "@/components/results/results-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ResultsPage() {
  const [races, setRaces] = useState<Race[]>([]);
  const [selectedRound, setSelectedRound] = useState("");
  const [resultType, setResultType] = useState<ResultType>("race");
  const [results, setResults] = useState<RaceResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRaceInfo, setSelectedRaceInfo] = useState<Race | null>(null);

  // Load available races on mount
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const data = await getCurrentRaces();
        setRaces(data);

        // Find the most recent finished race
        const now = new Date();
        const finishedRaces = data.filter((race) => new Date(race.date) <= now);
        if (finishedRaces.length > 0) {
          const latestRace = finishedRaces[finishedRaces.length - 1];
          setSelectedRound(latestRace.round);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load races"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  // Reset to race results when selected GP has no sprint
  useEffect(() => {
    if (selectedRaceInfo && !selectedRaceInfo.Sprint && resultType === "sprint") {
      setResultType("race");
    }
  }, [selectedRaceInfo, resultType]);

  // Load results when selected race or result type changes
  useEffect(() => {
    if (!selectedRound || races.length === 0) return;

    const selectedRace = races.find((r) => r.round === selectedRound);
    if (!selectedRace) return;

    setSelectedRaceInfo(selectedRace);

    const effectiveType =
      resultType === "sprint" && selectedRace.Sprint ? "sprint" : "race";

    const fetchResults = async () => {
      setResultsLoading(true);
      try {
        const season = new Date(selectedRace.date).getFullYear().toString();
        const data =
          effectiveType === "sprint"
            ? await getSprintResults(season, selectedRound)
            : await getRaceResults(season, selectedRound);
        setResults(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load results"
        );
      } finally {
        setResultsLoading(false);
      }
    };

    fetchResults();
  }, [selectedRound, races, resultType]);

  if (error) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-900/20 bg-red-900/10 p-6 text-center">
            <p className="text-red-400">Error loading results: {error}</p>
          </div>
        </div>
      </main>
    );
  }

  const finishedRaces = races.filter((race) => new Date(race.date) <= new Date());
  const hasNoResults = finishedRaces.length === 0;
  const hasSprint = Boolean(selectedRaceInfo?.Sprint);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Results</h1>
          <p className="text-lg text-muted-foreground">
            View race and sprint results from completed Grand Prix
          </p>
        </div>

        {hasNoResults ? (
          <Card className="border-border">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No finished races yet. Check back after the first race of the
                season!
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Selectors */}
            <div className="grid gap-4 lg:grid-cols-2">
              {loading ? (
                <>
                  <Skeleton className="h-28 w-full rounded-xl" />
                  <Skeleton className="h-28 w-full rounded-xl" />
                </>
              ) : (
                <>
                  <RaceSelector
                    races={races}
                    selectedRound={selectedRound}
                    onRoundChange={setSelectedRound}
                  />
                  <ResultTypeSelector
                    value={resultType}
                    onChange={setResultType}
                    hasSprint={hasSprint}
                  />
                </>
              )}
            </div>

            {selectedRaceInfo && (
  <div className="overflow-hidden rounded-2xl border border-[#2a2530] bg-[#141118]">
    <div className="relative min-h-[120px] bg-[#141118] px-[22px] py-5">

      {/* Wave SVG */}
      <svg
        className="absolute inset-0 h-full w-full opacity-55 pointer-events-none"
        viewBox="0 0 680 120"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="ri1" cx="75%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#c00000" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#141118" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ri2" cx="95%" cy="85%" r="30%">
            <stop offset="0%" stopColor="#8b0000" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#141118" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="680" height="120" fill="#141118" />
        <rect width="680" height="120" fill="url(#ri1)" />
        <rect width="680" height="120" fill="url(#ri2)" />
        <path d="M200 55 Q320 18 460 48 Q560 68 660 32" stroke="#c00000" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M160 75 Q300 42 440 65 Q545 82 640 55" stroke="#8b0000" strokeWidth="1" fill="none" opacity="0.35" />
        <path d="M180 95 Q340 68 470 84 Q570 96 650 76" stroke="#c00000" strokeWidth="0.8" fill="none" opacity="0.2" />
      </svg>

      {/* Content */}
      <div className="relative z-10 space-y-[5px]">
        <h2 className="text-[24px] font-bold text-white leading-tight">
          {selectedRaceInfo.raceName}
        </h2>
        <p className="text-[14px] text-[#a09aaa]">
          {selectedRaceInfo.Circuit.Location.locality},{" "}
          {selectedRaceInfo.Circuit.Location.country}
        </p>
        <p className="text-[12px] font-semibold text-[#e03535]">
          {new Date(selectedRaceInfo.date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

    </div>
  </div>
)}

            {/* Results Table */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {resultType === "sprint" && hasSprint
                    ? "Sprint Results"
                    : "Race Results"}
                </span>
              </p>
            </div>
            {resultsLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <ResultsTable results={results} />
            )}
          </>
        )}
      </div>
    </main>
  );
}
