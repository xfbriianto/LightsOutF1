import { Race } from "@/types/f1";
import { getWIBDate } from "@/lib/timezone";

export const RACE_LIVE_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours
/** Podium results shown for 6 hours after the live window ends. */
export const POST_RESULTS_DURATION_MS = 6 * 60 * 60 * 1000;

export type RacePhase = "before" | "live" | "post" | "ended";

/** Scheduled race start as a Date (API date + time, UTC). */
export function getRaceStartTime(race: Race): Date {
  return getWIBDate(race.date, race.time || "14:00:00Z");
}

/** End of the live window (start + 2 hours). */
export function getRaceLiveEndTime(race: Race): Date {
  return new Date(getRaceStartTime(race).getTime() + RACE_LIVE_DURATION_MS);
}

/** End of the post-race podium window (live end + 6 hours). */
export function getPostResultsEndTime(race: Race): Date {
  return new Date(
    getRaceLiveEndTime(race).getTime() + POST_RESULTS_DURATION_MS
  );
}

export function getRacePhase(race: Race, now: Date = new Date()): RacePhase {
  const start = getRaceStartTime(race);
  const liveEnd = getRaceLiveEndTime(race);
  const postEnd = getPostResultsEndTime(race);

  if (now < start) return "before";
  if (now <= liveEnd) return "live";
  if (now <= postEnd) return "post";
  return "ended";
}

export function getSeasonFromRace(race: Race): string {
  return new Date(race.date).getFullYear().toString();
}
