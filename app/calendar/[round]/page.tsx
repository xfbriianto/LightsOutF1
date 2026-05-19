import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentRaces, getRaceResults } from "@/lib/api";
import { formatWIBDateShort, formatWIBTime } from "@/lib/timezone";
import { Race } from "@/types/f1";
import { ResultsTable } from "@/components/results/results-table";

interface RaceDetailPageProps {
  params: Promise<{
    round: string;
  }>;
}

function getRaceSessions(race: Race) {
  return [
    { label: "FP1", session: race.FirstPractice },
    { label: "FP2", session: race.SecondPractice },
    { label: "FP3", session: race.ThirdPractice },
    { label: "Sprint", session: race.Sprint },
    { label: "Qualifying", session: race.Qualifying },
    { label: "Race", session: { date: race.date, time: race.time || "00:00:00Z" } },
  ].filter(
    (
      item
    ): item is {
      label: string;
      session: { date: string; time: string };
    } => Boolean(item.session)
  );
}

export default async function RaceDetailPage({ params }: RaceDetailPageProps) {
  const { round } = await params;
  const races = await getCurrentRaces();
  const race = races.find((item) => item.round === round);

  if (!race) {
    notFound();
  }

  const now = new Date();
  const raceDate = new Date(race.date);
  const isFinished = raceDate <= now;
  const sessions = getRaceSessions(race);
  const season = new Date(race.date).getFullYear().toString();
  const results = isFinished ? await getRaceResults(season, race.round) : [];

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Link
              href="/calendar"
              className="text-[12px] font-semibold uppercase tracking-widest text-[#706a7a] transition-colors hover:text-white"
            >
              Back to Calendar
            </Link>
            <h1 className="text-4xl font-bold text-foreground">
              {race.raceName}
            </h1>
            <p className="text-lg text-muted-foreground">
              Round {race.round} / {race.Circuit.circuitName}
            </p>
          </div>
          <span
            className={`w-fit rounded-full border px-4 py-2 text-[12px] font-bold uppercase tracking-widest ${
              isFinished
                ? "border-green-400/20 bg-green-400/10 text-green-400"
                : "border-white/10 bg-white/7 text-[#c8c2d4]"
            }`}
          >
            {isFinished ? "Finished" : "Upcoming"}
          </span>
        </div>

        <section className="overflow-hidden rounded-2xl border border-[#2a2530] bg-[#141118]">
          <div className="relative min-h-[220px] px-[22px] py-6">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
              viewBox="0 0 900 240"
              preserveAspectRatio="none"
            >
              <defs>
                <radialGradient id="detail-hero-1" cx="78%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="#c00000" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#141118" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="detail-hero-2" cx="95%" cy="85%" r="32%">
                  <stop offset="0%" stopColor="#8b0000" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#141118" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="900" height="240" fill="#141118" />
              <rect width="900" height="240" fill="url(#detail-hero-1)" />
              <rect width="900" height="240" fill="url(#detail-hero-2)" />
              <path d="M210 100 Q390 35 590 92 Q720 130 890 58" stroke="#c00000" strokeWidth="1.5" fill="none" opacity="0.5" />
              <path d="M160 145 Q350 82 560 126 Q730 164 880 108" stroke="#8b0000" strokeWidth="1" fill="none" opacity="0.35" />
            </svg>

            <div className="relative z-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-5">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-widest text-[#e03535]">
                    Race Overview
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-white">
                    {race.Circuit.Location.locality},{" "}
                    {race.Circuit.Location.country}
                  </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#24202c] bg-[#1a1621] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#706a7a]">
                      Race Date
                    </p>
                    <p className="mt-1 text-[14px] font-semibold text-white">
                      {formatWIBDateShort(race.date)}
                    </p>
                    <p className="text-[13px] text-[#e03535]">
                      {formatWIBTime(race.date, race.time)} WIB
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#24202c] bg-[#1a1621] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#706a7a]">
                      Coordinates
                    </p>
                    <p className="mt-1 text-[14px] font-semibold text-white">
                      {race.Circuit.Location.lat}, {race.Circuit.Location.long}
                    </p>
                    {race.url && (
                      <a
                        href={race.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[13px] font-semibold text-[#e03535] transition-colors hover:text-white"
                      >
                        Open race info
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#24202c] bg-[#1a1621] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#706a7a]">
                  Circuit
                </p>
                <p className="mt-2 text-[20px] font-bold leading-tight text-white">
                  {race.Circuit.circuitName}
                </p>
                <p className="mt-2 text-[13px] text-[#a09aaa]">
                  {race.Circuit.Location.locality},{" "}
                  {race.Circuit.Location.country}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Weekend Schedule
            </h2>
            <p className="text-sm text-muted-foreground">
              Session times are shown in WIB.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sessions.map(({ label, session }) => (
              <div
                key={label}
                className="rounded-xl border border-[#2a2530] bg-[#141118] px-4 py-3"
              >
                <p className="text-[12px] font-bold uppercase tracking-widest text-[#e03535]">
                  {label}
                </p>
                <p className="mt-2 text-[14px] font-semibold text-white">
                  {formatWIBDateShort(session.date)}
                </p>
                <p className="text-[13px] text-[#706a7a]">
                  {formatWIBTime(session.date, session.time)} WIB
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Race Results
            </h2>
            <p className="text-sm text-muted-foreground">
              {isFinished
                ? "Official results from the race endpoint."
                : "Results will appear after the race is completed."}
            </p>
          </div>
          {isFinished ? (
            <ResultsTable results={results} />
          ) : (
            <div className="rounded-xl border border-[#2a2530] bg-[#141118] p-6 text-center">
              <p className="text-sm text-[#a09aaa]">
                No results available yet for this race.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
