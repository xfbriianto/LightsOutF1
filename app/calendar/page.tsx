"use client";

import { useEffect, useState } from "react";
import { Race } from "@/types/f1";
import { getCurrentRaces } from "@/lib/api";
import { CalendarFilters } from "@/components/calendar/calendar-filters";
import { RaceCard } from "@/components/calendar/race-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CalendarPage() {
  const [races, setRaces] = useState<Race[]>([]);
  const [filteredRaces, setFilteredRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const data = await getCurrentRaces();
        setRaces(data);
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

  useEffect(() => {
    const filtered = races.filter((race) => {
      const now = new Date();
      const raceDate = new Date(race.date);
      const isUpcoming = raceDate > now;

      // Apply search filter
      const matchesSearch =
        race.raceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        race.Circuit.Location.country
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        race.Circuit.circuitName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // Apply status filter
      if (statusFilter === "upcoming") return isUpcoming;
      if (statusFilter === "finished") return !isUpcoming;

      return true;
    });

    setFilteredRaces(filtered);
  }, [races, searchTerm, statusFilter]);

  if (error) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-900/20 bg-red-900/10 p-6 text-center">
            <p className="text-red-400">Error loading races: {error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Race Calendar
          </h1>
          <p className="text-lg text-muted-foreground">
            {races.length} races scheduled for the season
          </p>
        </div>

        {/* Filters */}
        <CalendarFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        {/* Races Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        ) : filteredRaces.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRaces.map((race) => (
              <RaceCard key={race.round} race={race} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              No races found matching your filters
            </p>
          </div>
        )}

        {/* Results Summary */}
        {!loading && filteredRaces.length > 0 && (
          <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
            Showing {filteredRaces.length} of {races.length} races
          </div>
        )}
      </div>
    </main>
  );
}
