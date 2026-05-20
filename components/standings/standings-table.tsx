import { DriverStanding, ConstructorStanding } from "@/types/f1";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface DriverStandingsTableProps {
  type: "driver";
  standings: DriverStanding[];
}
interface ConstructorStandingsTableProps {
  type: "constructor";
  standings: ConstructorStanding[];
}

const thClass = "relative z-10 bg-transparent text-[10px] font-bold uppercase tracking-widest text-[#706a7a]";

function podiumBorder(pos: number) {
  if (pos === 1) return "border-l-2 border-l-[#e03535]";
  if (pos === 2) return "border-l-2 border-l-[#888]";
  if (pos === 3) return "border-l-2 border-l-[#b87333]";
  return "border-l-2 border-l-transparent";
}

function podiumColor(pos: number) {
  if (pos === 1) return "text-[#e03535]";
  if (pos === 2) return "text-[#aaa]";
  if (pos === 3) return "text-[#b87333]";
  return "text-white";
}

// Overlay wave yang diletakkan di luar <table>
function WaveOverlay() {
  return (
    <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none z-0" aria-hidden>
      <svg className="h-full w-full opacity-55" viewBox="0 0 680 48" preserveAspectRatio="none">
        <defs>
          <radialGradient id="sw" cx="75%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#c00000" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#141118" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="680" height="48" fill="#141118" />
        <rect width="680" height="48" fill="url(#sw)" />
        <path d="M160 24 Q300 7 450 22 Q560 32 670 14" stroke="#c00000" strokeWidth="1.3" fill="none" opacity="0.5" />
        <path d="M140 36 Q290 18 440 30 Q550 40 655 25" stroke="#8b0000" strokeWidth="0.8" fill="none" opacity="0.3" />
      </svg>
    </div>
  );
}

export function StandingsTable(props: DriverStandingsTableProps | ConstructorStandingsTableProps) {
  if (props.standings.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[#2a2530] bg-[#141118] px-6 py-8 text-center">
        <p className="text-[13px] text-[#706a7a]">No standings data available</p>
      </div>
    );
  }

  // ── Driver Table ──
  if (props.type === "driver") {
    const standings = props.standings as DriverStanding[];
    return (
      <Card className="overflow-hidden border border-[#2a2530] bg-[#141118]">
        <CardContent className="overflow-x-auto p-0 relative">
          {/* wave overlay di luar table */}
          <WaveOverlay />
          <Table className="border-collapse relative">
            <TableHeader>
              <TableRow className="relative h-12 border-b border-[#2a2530] hover:bg-transparent">
                <TableHead className={`${thClass} w-12 text-center`}>Pos</TableHead>
                <TableHead className={thClass}>Driver</TableHead>
                <TableHead className={`${thClass} hidden sm:table-cell border-l border-[#1e1a26]`}>Constructor</TableHead>
                <TableHead className={`${thClass} border-l border-[#1e1a26] text-right`}>Points</TableHead>
                <TableHead className={`${thClass} border-l border-[#1e1a26] text-right pr-5`}>Wins</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings.map((standing) => {
                const pos = parseInt(standing.positionText);
                return (
                  <TableRow
                    key={standing.Driver.driverId}
                    className={`border-b border-[#1e1a26] transition-colors hover:bg-[#1a1621] last:border-0 ${podiumBorder(pos)}`}
                  >
                    <TableCell className="w-12 text-center py-3">
                      <span className={`text-[15px] font-bold ${podiumColor(pos)}`}>
                        {standing.positionText}
                      </span>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[13px] font-semibold text-white leading-tight">
                          {standing.Driver.givenName} {standing.Driver.familyName}
                        </span>
                        {standing.Constructors?.[0] && (
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#706a7a]">
                            {standing.Constructors[0].name}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden border-l border-[#1e1a26] text-[13px] text-[#a09aaa] sm:table-cell py-3">
                      {standing.Constructors?.[0]?.name || "-"}
                    </TableCell>
                    <TableCell className="border-l border-[#1e1a26] text-right text-[13px] font-bold text-white py-3">
                      {standing.points}
                    </TableCell>
                    <TableCell className="border-l border-[#1e1a26] text-right text-[13px] text-[#706a7a] pr-5 py-3">
                      {standing.wins}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  // ── Constructor Table ──
  const standings = props.standings as ConstructorStanding[];
  return (
    <Card className="overflow-hidden border border-[#2a2530] bg-[#141118]">
      <CardContent className="overflow-x-auto p-0 relative">
        <WaveOverlay />
        <Table className="border-collapse relative">
          <TableHeader>
            <TableRow className="relative h-12 border-b border-[#2a2530] hover:bg-transparent">
              <TableHead className={`${thClass} w-12 text-center`}>Pos</TableHead>
              <TableHead className={thClass}>Constructor</TableHead>
              <TableHead className={`${thClass} border-l border-[#1e1a26] text-right`}>Points</TableHead>
              <TableHead className={`${thClass} border-l border-[#1e1a26] text-right pr-5`}>Wins</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings.map((standing) => {
              const pos = parseInt(standing.positionText);
              return (
                <TableRow
                  key={standing.Constructor.constructorId}
                  className={`border-b border-[#1e1a26] transition-colors hover:bg-[#1a1621] last:border-0 ${podiumBorder(pos)}`}
                >
                  <TableCell className="w-12 text-center py-3">
                    <span className={`text-[15px] font-bold ${podiumColor(pos)}`}>
                      {standing.positionText}
                    </span>
                  </TableCell>
                  <TableCell className="text-[13px] font-semibold text-white py-3">
                    {standing.Constructor.name}
                  </TableCell>
                  <TableCell className="border-l border-[#1e1a26] text-right text-[13px] font-bold text-white py-3">
                    {standing.points}
                  </TableCell>
                  <TableCell className="border-l border-[#1e1a26] text-right text-[13px] text-[#706a7a] pr-5 py-3">
                    {standing.wins}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}