import { Suspense } from "react";
import { HeroSection } from "@/components/home/hero-section";
import { NextRaceCard } from "@/components/home/next-race-card";
import { TopDriversSection } from "@/components/home/top-drivers-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { getNextRace, getDriverStandings } from "@/lib/api";

function LoadingSkeleton() {
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
}

async function NextRaceSection() {
  const race = await getNextRace();

  if (!race) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <p className="text-muted-foreground">No upcoming races scheduled</p>
      </div>
    );
  }

  return <NextRaceCard race={race} />;
}

async function DriversStandingsSection() {
  try {
    const standings = await getDriverStandings();

    if (!standings || standings.length === 0) {
      return (
        <div className="rounded-lg border border-border bg-card p-6 text-center">
          <p className="text-muted-foreground">
            Championship standings not yet available. Check back after the first race of the season.
          </p>
        </div>
      );
    }

    return <TopDriversSection standings={standings} />;
  } catch (error) {
    console.error("[v0] Error in standings section:", error);
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <p className="text-muted-foreground">
          Championship standings not yet available. Check back after the first race of the season.
        </p>
      </div>
    );
  }
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Next Race Section */}
        <Suspense fallback={<LoadingSkeleton />}>
          <NextRaceSection />
        </Suspense>

        {/* Drivers Standings Section */}
        <Suspense fallback={<LoadingSkeleton />}>
          <DriversStandingsSection />
        </Suspense>
      </div>
    </main>
  );
}
