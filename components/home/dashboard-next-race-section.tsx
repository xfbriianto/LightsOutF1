"use client";

import { useEffect, useMemo, useState } from "react";
import { Race } from "@/types/f1";
import { getCurrentRaces } from "@/lib/api";
import {
  getRacePhase,
  getRaceStartTime,
  getWeekendStartTime,
  type RacePhase,
} from "@/lib/race-phase";
import { NextRaceCard } from "./next-race-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

function pickDashboardRace(races: Race[], now: Date): Race | null {
  const byPhase = (phase: RacePhase) =>
    races.filter((race) => getRacePhase(race, now) === phase);

  const pickEarliest = (items: Race[], timeFn: (r: Race) => Date) => {
    if (items.length === 0) return null;
    return [...items].sort((a, b) => timeFn(a).getTime() - timeFn(b).getTime())[0];
  };

  // Priority: race live grid > podium window > weekend (FP1 started) > next upcoming
  const grid = byPhase("grid");
  const post = byPhase("post");
  const weekend = byPhase("weekend");
  const before = byPhase("before");

  return (
    pickEarliest(grid, getRaceStartTime) ??
    pickEarliest(post, getRaceStartTime) ??
    pickEarliest(weekend, getWeekendStartTime) ??
    pickEarliest(before, getWeekendStartTime)
  );
}

export function DashboardNextRaceSection() {
  const [races, setRaces] = useState<Race[]>([]);
  const [race, setRace] = useState<Race | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        setLoading(true);
        const data = await getCurrentRaces();
        setRaces(data);

        const selected = pickDashboardRace(data, new Date());
        setRace(selected);
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  // Keep switching to next GP as time progresses (no refresh needed).
  useEffect(() => {
    if (races.length === 0) return;

    const tick = () => {
      const selected = pickDashboardRace(races, new Date());
      setRace(selected);
    };

    tick();
    const interval = setInterval(tick, 10_000);
    return () => clearInterval(interval);
  }, [races]);

  const hasRace = Boolean(race);

  const skeleton = useMemo(() => {
    return (
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <div className="space-y-2 pt-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }, []);

  if (loading) return skeleton;

  if (!hasRace) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <p className="text-muted-foreground">No upcoming races scheduled</p>
      </div>
    );
  }

  return <NextRaceCard race={race!} />;
}

