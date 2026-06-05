"use client";

import { useEffect, useState } from "react";
import { Race } from "@/types/f1";
import { getTimeUntilWeekendStart } from "@/lib/race-phase";

interface CountdownTimerProps {
  race: Race;
}

export function CountdownTimer({ race }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const time = getTimeUntilWeekendStart(race);
      setTimeLeft({
        days: time.days,
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [race]);

  const TimeUnit = ({
    value,
    label,
  }: {
    value: number;
    label: string;
  }) => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-accent text-2xl font-bold text-accent-foreground sm:h-20 sm:w-20 sm:text-3xl">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-xs font-medium uppercase text-muted-foreground sm:text-sm">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-2xl font-bold text-muted-foreground sm:text-3xl">
        :
      </span>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-2xl font-bold text-muted-foreground sm:text-3xl">
        :
      </span>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <span className="text-2xl font-bold text-muted-foreground sm:text-3xl">
        :
      </span>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
