import { Race } from "@/types/f1";
import { Card, CardContent } from "@/components/ui/card";
import { formatWIBDateShort, formatWIBTime } from "@/lib/timezone";

interface RaceCardProps {
  race: Race;
}

export function RaceCard({ race }: RaceCardProps) {
  const raceDate = new Date(race.date);
  const now = new Date();
  const isUpcoming = raceDate > now;
  const isFinished = raceDate <= now;

  const formattedDate = formatWIBDateShort(race.date);
  const formattedTime = formatWIBTime(race.date, race.time);

  return (
    <Card className="group overflow-hidden border-border transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="space-y-4 p-4 sm:p-6">
          {/* Round and Status Badge */}
          <div className="flex items-start justify-between">
            <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
              Round {race.round}
            </span>
            {isUpcoming && (
              <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                Upcoming
              </span>
            )}
            {isFinished && (
              <span className="inline-flex items-center rounded-full bg-green-900/20 px-3 py-1 text-xs font-medium text-green-400">
                Finished
              </span>
            )}
          </div>

          {/* Race Name and Location */}
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-foreground">{race.raceName}</h3>
            <p className="text-sm text-muted-foreground">
              {race.Circuit.Location.locality},{" "}
              {race.Circuit.Location.country}
            </p>
            <p className="text-xs text-muted-foreground">
              {race.Circuit.circuitName}
            </p>
          </div>

          {/* Date and Time */}
          <div className="flex flex-col gap-1 border-t border-border pt-4">
            <p className="text-sm font-medium text-foreground">{formattedDate}</p>
            <p className="text-sm text-muted-foreground">{formattedTime}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
