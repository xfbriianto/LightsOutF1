import { Race } from "@/types/f1";
import { RacePhaseContent, RacePhaseLabel } from "./race-phase-content";
import { Card, CardContent } from "@/components/ui/card";
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
     <Card className="overflow-hidden border border-[#2a2530] bg-[#141118]">
      {/* Wave BG Header */}
      <div className="relative min-h-[170px] bg-[#141118] px-5 pt-4 pb-0">
        {/* Glow SVG — dekoratif, logic tetap */}
        <svg className="absolute inset-0 h-full w-full opacity-55" viewBox="0 0 680 180" preserveAspectRatio="none">
          <defs>
            <radialGradient id="g1" cx="75%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#c00000" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#141118" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="680" height="180" fill="#141118" />
          <rect width="680" height="180" fill="url(#g1)" />
          <path d="M200 90 Q300 40 420 80 Q520 110 620 60" stroke="#c00000" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M150 110 Q280 70 400 100 Q500 125 600 80" stroke="#8b0000" strokeWidth="1" fill="none" opacity="0.4" />
        </svg>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-white">Grand Prix</span>
          <span className="text-xs text-[#a09aaa] bg-white/7 border border-white/10 px-3 py-1 rounded-full">
            Round {race.round}
          </span>
        </div>

        {/* Race info */}
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-1">{race.raceName}</h2>
          <p className="text-sm text-[#a09aaa]">{race.Circuit.Location.locality}, {race.Circuit.Location.country}</p>
          <p className="text-xs text-[#706a7a] mb-2">{race.Circuit.circuitName}</p>
          <p className="text-sm font-semibold text-[#e03535]">{formattedDate}</p>
        </div>
      </div>

      <div className="h-px bg-[#1e1a26]" />

      <CardContent className="bg-[#141118] px-5 pt-4">
        <div className="mb-3">
          <RacePhaseLabel race={race} />
        </div>
        <RacePhaseContent race={race} />

        {/* Sessions */}
        <p className="text-[11px] font-semibold text-[#706a7a] uppercase tracking-widest mb-3 mt-5">Race Sessions (WIB)</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {sessions.map((session) => (
            <div
              key={session.name}
              className={`rounded-xl border p-2.5 text-center ${
                session.name === "Race"
                  ? "border-[#e03535] bg-[#1e1218]"
                  : "border-[#2a2530] bg-[#1e1a26]"
              }`}
            >
              <p className="text-[11px] font-bold text-[#e03535]">{session.name}</p>
              <p className="text-xs text-[#c8c2d4] mt-1">{session.wibTime}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
};
