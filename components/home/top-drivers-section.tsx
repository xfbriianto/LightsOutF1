import { DriverStanding } from "@/types/f1";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TopDriversSectionProps {
  standings: DriverStanding[];
}

export function TopDriversSection({ standings }: TopDriversSectionProps) {
  const topDrivers = standings.slice(0, 5);

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

  return (
    <div className="overflow-hidden rounded-2xl border border-[#2a2530] bg-[#141118]">

      {/* Wave Header Title */}
      <div className="relative h-14 border-b border-[#2a2530]">
        <svg className="absolute inset-0 h-full w-full opacity-55 pointer-events-none" viewBox="0 0 680 56" preserveAspectRatio="none">
          <defs>
            <radialGradient id="tds-wave" cx="75%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#c00000" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#141118" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="680" height="56" fill="#141118" />
          <rect width="680" height="56" fill="url(#tds-wave)" />
          <path d="M160 28 Q300 8 450 26 Q560 38 670 16" stroke="#c00000" strokeWidth="1.3" fill="none" opacity="0.5" />
          <path d="M140 42 Q290 20 440 35 Q550 46 655 28" stroke="#8b0000" strokeWidth="0.8" fill="none" opacity="0.3" />
        </svg>
        <div className="relative z-10 flex h-full items-center px-5">
          <h3 className="text-[13px] font-bold uppercase tracking-widest text-white">
            Championship Leaders
          </h3>
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#2a2530]">
            <th className="w-16 px-4 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-[#706a7a]">Pos</th>
            <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-[#706a7a]">Driver</th>
            <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-widest text-[#706a7a]" style={{ borderLeft: "1px solid #1e1a26" }}>Points</th>
            <th className="px-4 py-3 pr-5 text-right text-[10px] font-bold uppercase tracking-widest text-[#706a7a]" style={{ borderLeft: "1px solid #1e1a26" }}>Wins</th>
          </tr>
        </thead>
        <tbody>
          {topDrivers.map((standing) => {
            const pos = parseInt(standing.positionText);
            return (
              <tr
                key={standing.Driver.driverId}
                className={`border-b border-[#1e1a26] transition-colors hover:bg-[#1a1621] last:border-0 ${podiumBorder(pos)}`}
              >
                <td className="w-16 px-4 py-3 text-center">
                  <span className={`text-[15px] font-bold ${podiumColor(pos)}`}>
                    {standing.positionText}
                  </span>
                </td>
                <td className="px-4 py-3">
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
                </td>
                <td className="px-4 py-3 text-right text-[13px] font-bold text-white" style={{ borderLeft: "1px solid #1e1a26" }}>
                  {standing.points}
                </td>
                <td className="px-4 py-3 pr-5 text-right text-[13px] text-[#706a7a]" style={{ borderLeft: "1px solid #1e1a26" }}>
                  {standing.wins}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
}
