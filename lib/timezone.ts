// Timezone conversion utilities for WIB (Waktu Indonesia Barat / UTC+7)
// The API returns times in UTC, we add 7 hours for WIB display

const WIB_TIMEZONE = "Asia/Jakarta";

/**
 * Convert a UTC date to WIB timezone and return formatted string
 */
export function toWIBTime(
  dateString: string,
  timeString?: string
): { date: string; time: string } {
  try {
    const fullDateTime = timeString
      ? `${dateString}T${timeString}`
      : `${dateString}T00:00:00`;

    const date = new Date(fullDateTime);

    // Format date in WIB timezone
    const wibDate = date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: WIB_TIMEZONE,
    });

    // Format time in WIB timezone  
    const wibTime = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: WIB_TIMEZONE,
    });

    return { date: wibDate, time: wibTime };
  } catch (error) {
    console.error("[v0] Error converting to WIB:", error);
    return { date: dateString, time: timeString || "00:00" };
  }
}

/**
 * Get UTC Date for countdown timer - treats date/time from API as already in correct format
 */
export function getWIBDate(dateString: string, timeString?: string): Date {
  try {
    const fullDateTime = timeString
      ? `${dateString}T${timeString}`
      : `${dateString}T00:00:00`;

    return new Date(fullDateTime);
  } catch (error) {
    console.error("[v0] Error getting date:", error);
    return new Date();
  }
}

/**
 * Format date in short format for calendar (WIB)
 */
export function formatWIBDateShort(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: WIB_TIMEZONE,
    });
  } catch (error) {
    console.error("[v0] Error formatting date:", error);
    return dateString;
  }
}

/**
 * Format time in HH:MM format for display (WIB)
 */
export function formatWIBTime(dateString: string, timeString?: string): string {
  try {
    const fullDateTime = timeString
      ? `${dateString}T${timeString}`
      : `${dateString}T00:00:00`;

    const date = new Date(fullDateTime);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: WIB_TIMEZONE,
    });
  } catch (error) {
    console.error("[v0] Error formatting time:", error);
    return timeString || "00:00";
  }
}
