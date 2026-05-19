import { Race } from "@/types/f1";
import { CountdownTimer } from "./countdown-timer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toWIBTime, formatWIBTime } from "@/lib/timezone";

interface NextRaceCardProps {
  race: Race;
}

export function NextRaceCard({ race }: NextRaceCardProps) {
  const { date: formattedDate } = toWIBTime(race.date);

  const sessions = [
    { name: "FP1", time: race.FirstPractice?.time, date: race.FirstPractice?.date },
    { name: "FP2", time: race.SecondPractice?.time, date: race.SecondPractice?.date },
    { name: "FP3", time: race.ThirdPractice?.time, date: race.ThirdPractice?.date },
    { name: "Q", time: race.Qualifying?.time, date: race.Qualifying?.date },
    { name: "Race", time: race.time, date: race.date },
  ]
    .filter((s) => s.time)
    .map((s) => ({
      ...s,
      wibTime: formatWIBTime(s.date || race.date, s.time),
    }));

  return (
    <Card className="border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center justify-between">
          <span>Next Race</span>
          <span className="text-sm font-normal text-muted-foreground">
            Round {race.round}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Race Info */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            {race.raceName}
          </h2>
          <p className="text-lg text-muted-foreground">
            {race.Circuit.Location.locality}, {race.Circuit.Location.country}
          </p>
          <p className="text-sm text-muted-foreground">{race.Circuit.circuitName}</p>
          <p className="text-sm font-medium text-accent">{formattedDate}</p>
        </div>

        {/* Countdown Timer */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-foreground">Time Until Race</p>
          <CountdownTimer race={race} />
        </div>

        {/* Race Sessions */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Race Sessions (WIB)</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {sessions.map((session) => (
              <div
                key={session.name}
                className="rounded-lg bg-muted p-2 text-center"
              >
                <p className="text-xs font-bold text-accent">{session.name}</p>
                <p className="text-xs text-muted-foreground">{session.wibTime}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
