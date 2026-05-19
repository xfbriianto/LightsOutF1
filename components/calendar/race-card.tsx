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
  const sessions = [
    { label: "FP1", session: race.FirstPractice },
    { label: "FP2", session: race.SecondPractice },
    { label: "FP3", session: race.ThirdPractice },
    { label: "Sprint", session: race.Sprint },
    { label: "Qualifying", session: race.Qualifying },
  ].filter(
    (
      item
    ): item is {
      label: string;
      session: { date: string; time: string };
    } => Boolean(item.session)
  );

  return (
  <Card className="group overflow-hidden border border-[#2a2530] bg-[#141118] transition-all hover:border-[#3d3648] hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)] rounded-2xl">
    <CardContent className="p-0">

      {/* Wave BG Header */}
      <div className="relative min-h-[130px] bg-[#141118] px-[18px] pt-4 pb-[14px]">
        <svg
          className="absolute inset-0 h-full w-full opacity-55 pointer-events-none"
          viewBox="0 0 320 130"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id={`wave-${race.round}`} cx="80%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#c00000" stopOpacity={isFinished ? "0.25" : "0.45"} />
              <stop offset="100%" stopColor="#141118" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="320" height="130" fill="#141118" />
          <rect width="320" height="130" fill={`url(#wave-${race.round})`} />
          <path d="M60 65 Q130 30 200 60 Q260 80 320 45" stroke="#c00000" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M40 85 Q120 55 200 78 Q270 95 320 65" stroke="#8b0000" strokeWidth="1" fill="none" opacity="0.35" />
        </svg>

        {/* Round + Status */}
        <div className="relative z-10 flex items-start justify-between mb-[14px]">
          <span className="text-[11px] font-bold tracking-wide text-white bg-[#e03535] px-3 py-[3px] rounded-full">
            Round {race.round}
          </span>
          {isUpcoming && (
            <span className="text-[11px] font-semibold text-[#a09aaa] bg-white/7 border border-white/10 px-3 py-[3px] rounded-full">
              Upcoming
            </span>
          )}
          {isFinished && (
            <span className="text-[11px] font-semibold text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-[3px] rounded-full">
              Finished
            </span>
          )}
        </div>

        {/* Race info */}
        <div className="relative z-10 space-y-[3px]">
          <h3 className="text-[17px] font-bold text-white leading-tight">
            {race.raceName}
          </h3>
          <p className="text-[13px] text-[#a09aaa]">
            {race.Circuit.Location.locality}, {race.Circuit.Location.country}
          </p>
          <p className="text-[11px] text-[#706a7a]">
            {race.Circuit.circuitName}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#1e1a26] bg-[#141118] px-[18px] py-3 flex flex-col gap-[3px]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold text-white">{formattedDate}</p>
            <p className="text-[12px] text-[#706a7a]">{formattedTime} WIB</p>
          </div>
          {race.url && (
            <a
              href={race.url}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-full border border-[#2a2530] px-3 py-[5px] text-[11px] font-semibold text-[#c8c2d4] transition-colors hover:border-[#e03535] hover:text-white"
            >
              Details
            </a>
          )}
        </div>

        {sessions.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#1e1a26] pt-3">
            {sessions.map(({ label, session }) => (
              <div
                key={label}
                className="rounded-lg border border-[#24202c] bg-[#1a1621] px-3 py-2"
              >
                <p className="text-[11px] font-semibold text-[#c8c2d4]">
                  {label}
                </p>
                <p className="mt-[2px] text-[11px] text-[#706a7a]">
                  {formatWIBDateShort(session.date)}
                </p>
                <p className="text-[11px] text-[#e03535]">
                  {formatWIBTime(session.date, session.time)} WIB
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </CardContent>
  </Card>
);
}
