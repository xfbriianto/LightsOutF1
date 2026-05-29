import {
  RacesResponse,
  ResultsResponse,
  SprintResultsResponse,
  StandingsResponse,
  Race,
  RaceResult,
  DriverStanding,
  ConstructorStanding,
} from "@/types/f1";
import { getWIBDate } from "@/lib/timezone";

const JOLPI_API_BASE = "https://api.jolpi.ca/ergast/f1";

// Cache for API responses (simple in-memory cache)
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 1 * 60 * 1000; // 1 minute for more real-time data

async function fetchWithCache<T>(url: string): Promise<T> {
  const now = Date.now();
  const cached = cache.get(url);

  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }

  const response = await fetch(url, {
    next: { revalidate: 60 }, // Next.js ISR - revalidate every 1 minute for real-time data
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  const data = await response.json();
  cache.set(url, { data, timestamp: now });

  return data as T;
}

// Get current season races
export async function getCurrentRaces(): Promise<Race[]> {
  try {
    const url = `${JOLPI_API_BASE}/current/races.json`;
    const response = await fetchWithCache<RacesResponse>(url);
    return response.MRData.RaceTable.Races || [];
  } catch (error) {
    console.error("Error fetching races:", error);
    return [];
  }
}

// Get races by season
export async function getRacesBySeason(season: string): Promise<Race[]> {
  try {
    const url = `${JOLPI_API_BASE}/${season}/races.json`;
    const response = await fetchWithCache<RacesResponse>(url);
    return response.MRData.RaceTable.Races || [];
  } catch (error) {
    console.error("Error fetching races:", error);
    return [];
  }
}

// Get race results by round
export async function getRaceResults(
  season: string,
  round: string
): Promise<RaceResult[]> {
  try {
    const url = `${JOLPI_API_BASE}/${season}/${round}/results.json`;
    const response = await fetchWithCache<ResultsResponse>(url);
    if (response.MRData.RaceTable.Races && response.MRData.RaceTable.Races[0]) {
      return response.MRData.RaceTable.Races[0].Results || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching race results:", error);
    return [];
  }
}

// Get sprint results by round
export async function getSprintResults(
  season: string,
  round: string
): Promise<RaceResult[]> {
  try {
    const url = `${JOLPI_API_BASE}/${season}/${round}/sprint.json`;
    const response = await fetchWithCache<SprintResultsResponse>(url);
    if (response.MRData.RaceTable.Races && response.MRData.RaceTable.Races[0]) {
      return response.MRData.RaceTable.Races[0].SprintResults || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching sprint results:", error);
    return [];
  }
}

// Get driver standings
export async function getDriverStandings(
  season?: string
): Promise<DriverStanding[]> {
  try {
    const seasonPath = season || "current";
    const url = `${JOLPI_API_BASE}/${seasonPath}/driverStandings.json`;
    const response = await fetchWithCache<StandingsResponse>(url);
    return (
      response.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || []
    );
  } catch (error) {
    console.error("Error fetching driver standings:", error);
    throw error;
  }
}

// Get constructor standings
export async function getConstructorStandings(
  season?: string
): Promise<ConstructorStanding[]> {
  try {
    const seasonPath = season || "current";
    const url = `${JOLPI_API_BASE}/${seasonPath}/constructorStandings.json`;
    const response = await fetchWithCache<StandingsResponse>(url);
    return (
      response.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings ||
      []
    );
  } catch (error) {
    console.error("Error fetching constructor standings:", error);
    throw error;
  }
}

// Get next race (upcoming race from current season)
export async function getNextRace(): Promise<Race | null> {
  try {
    const races = await getCurrentRaces();
    const now = new Date();

    // Find the first race that hasn't finished yet
    const nextRace = races.find((race) => {
      const raceDate = new Date(race.date);
      return raceDate > now;
    });

    return nextRace || null;
  } catch (error) {
    console.error("Error fetching next race:", error);
    return null;
  }
}

// Get latest race results (most recent finished race)
export async function getLatestResults(): Promise<{
  race: Race;
  results: RaceResult[];
} | null> {
  try {
    const races = await getCurrentRaces();
    const now = new Date();

    // Find the most recent finished race
    const finishedRaces = races.filter((race) => {
      const raceDate = new Date(race.date);
      return raceDate <= now;
    });

    if (finishedRaces.length === 0) {
      return null;
    }

    const latestRace = finishedRaces[finishedRaces.length - 1];
    const results = await getRaceResults(
      new Date().getFullYear().toString(),
      latestRace.round
    );

    return { race: latestRace, results };
  } catch (error) {
    console.error("Error fetching latest results:", error);
    return null;
  }
}

// Utility: Format race date and time
export function formatRaceDateTime(race: Race): string {
  const date = new Date(race.date);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

// Utility: Get time until race (for countdown) - Adjusted for WIB timezone
export function getTimeUntilRace(race: Race): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
} {
  // Convert race time to WIB timezone for accurate countdown
  const raceTime = getWIBDate(race.date, race.time || "14:00:00");
  const now = new Date();
  const diff = raceTime.getTime() - now.getTime();

  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, totalSeconds };
}
