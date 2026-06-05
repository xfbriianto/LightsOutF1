import { Race } from "@/types/f1";
import { getWIBDate } from "@/lib/timezone";

export const RACE_LIVE_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours
/** Podium results shown for 6 hours after the live window ends. */
export const POST_RESULTS_DURATION_MS = 6 * 60 * 60 * 1000;

export const DEFAULT_RACE_TIME_UTC = "14:00:00Z";
/** If FP1 timing is missing, we fallback to race start. */
export const WEEKEND_FALLBACK_SOURCE: "fp1" | "race" = "fp1";

export type RacePhase = "before" | "weekend" | "grid" | "post" | "ended";

/** Scheduled race start as a Date (API date + time, UTC). */
export function getRaceStartTime(race: Race): Date {
  return getWIBDate(race.date, race.time || DEFAULT_RACE_TIME_UTC);
}

/**
 * Weekend start as a Date (API first practice date + time, UTC).
 * Countdown stops at FP1 start (if available).
 */
export function getWeekendStartTime(race: Race): Date {
  if (race.FirstPractice?.date && race.FirstPractice?.time) {
    return getWIBDate(race.FirstPractice.date, race.FirstPractice.time);
  }

  // Fallback: if FP1 doesn't exist in the response, use start-of-day for the race date.
  return getWIBDate(race.date, "00:00:00Z");
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

export function getTimeUntilWeekendStart(race: Race, now: Date = new Date()) {
  const start = getWeekendStartTime(race);
  const diff = start.getTime() - now.getTime();

  const totalSeconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, totalSeconds };
}

export function getRacePhase(race: Race, now: Date = new Date()): RacePhase {
  const weekendStart = getWeekendStartTime(race);
  const raceStart = getRaceStartTime(race);
  const liveEnd = getRaceLiveEndTime(race);
  const postEnd = getPostResultsEndTime(race);

  // Phase 1: before FP1 / weekend begins
  if (now < weekendStart) return "before";

  // Phase 2: weekend started (FP1..race start) - hide countdown, show "Sedang Berlangsung"
  if (now < raceStart) return "weekend";

  // Phase 2b: race live window -> Starting Grid
  if (now <= liveEnd) return "grid";

  // Phase 3: post race -> podium (P1-P3)
  if (now <= postEnd) return "post";

  return "ended";
}

export function getSeasonFromRace(race: Race): string {
  return new Date(race.date).getFullYear().toString();
}
