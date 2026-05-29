"use client";

import { useCallback, useEffect, useState } from "react";
import { Race, QualifyingResult, RaceResult } from "@/types/f1";
import { getQualifyingResults, getRaceResults } from "@/lib/api";
import { getRacePhase, getSeasonFromRace, type RacePhase } from "@/lib/race-phase";
import { CountdownTimer } from "./countdown-timer";
import { OfficialStartingGrid } from "./official-starting-grid";
import { PodiumResults } from "./podium-results";

interface RacePhaseContentProps {
  race: Race;
}

export function RacePhaseContent({ race }: RacePhaseContentProps) {
  const [phase, setPhase] = useState<RacePhase>(() => getRacePhase(race));
  const [qualifying, setQualifying] = useState<QualifyingResult[]>([]);
  const [raceResults, setRaceResults] = useState<RaceResult[]>([]);
  const [loading, setLoading] = useState(false);

  const updatePhase = useCallback(() => {
    setPhase(getRacePhase(race));
  }, [race]);

  useEffect(() => {
    updatePhase();
    const interval = setInterval(updatePhase, 1000);
    return () => clearInterval(interval);
  }, [updatePhase]);

  useEffect(() => {
    if (phase !== "live") {
      setQualifying([]);
      return;
    }

    let cancelled = false;

    const fetchGrid = async () => {
      setLoading(true);
      try {
        const season = getSeasonFromRace(race);
        const data = await getQualifyingResults(season, race.round);
        if (!cancelled) setQualifying(data);
      } catch {
        if (!cancelled) setQualifying([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchGrid();
  }, [phase, race]);

  useEffect(() => {
    if (phase !== "post") {
      setRaceResults([]);
      return;
    }

    let cancelled = false;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const season = getSeasonFromRace(race);
        const data = await getRaceResults(season, race.round);
        if (!cancelled) setRaceResults(data);
      } catch {
        if (!cancelled) setRaceResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchResults();
  }, [phase, race]);

  if (phase === "live") {
    return <OfficialStartingGrid results={qualifying} loading={loading} />;
  }

  if (phase === "post") {
    return <PodiumResults results={raceResults} loading={loading} />;
  }

  if (phase === "before") {
    return <CountdownTimer race={race} />;
  }

  return <CountdownTimer race={race} />;
}

export function RacePhaseLabel({ race }: { race: Race }) {
  const [phase, setPhase] = useState<RacePhase>(() => getRacePhase(race));

  useEffect(() => {
    const tick = () => setPhase(getRacePhase(race));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [race]);

  if (phase === "live") {
    return (
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#e03535]">
        Race In Progress
      </p>
    );
  }

  if (phase === "before") {
    return (
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#706a7a]">
        Time Until Race
      </p>
    );
  }

  if (phase === "post") {
    return (
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#706a7a]">
        Race Results — Podium
      </p>
    );
  }

  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#706a7a]">
      Time Until Race
    </p>
  );
}
