import { Suspense } from "react";
import { DriverStanding } from "@/types/f1";
import { getDriverStandings } from "@/lib/api";
import { StandingsTable } from "@/components/standings/standings-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

function LoadingSkeleton() {
  return (
    <Card className="border-border">
      <CardContent className="p-0">
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
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

    return (
      <StandingsTable
        type="driver"
        standings={standings as DriverStanding[]}
      />
    );
  } catch (error) {
    return (
      <div className="rounded-lg border border-red-900/20 bg-red-900/10 p-6 text-center">
        <p className="text-red-400">
          Error loading standings:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }
}

export default function DriversPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Driver Standings
          </h1>
          <p className="text-lg text-muted-foreground">
            Current championship standings for drivers
          </p>
        </div>

        {/* Standings Table */}
        <Suspense fallback={<LoadingSkeleton />}>
          <DriversStandingsSection />
        </Suspense>
      </div>
    </main>
  );
}
