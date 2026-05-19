import { RaceResult } from "@/types/f1";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface ResultsTableProps {
  results: RaceResult[];
}

export function ResultsTable({ results }: ResultsTableProps) {
  if (results.length === 0) {
    return (
      <Card className="border-border">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No results available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border border-[#2a2530] bg-[#141118]">
      <CardContent className="relative overflow-x-auto p-0">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12" aria-hidden>
          <svg className="h-full w-full opacity-55" viewBox="0 0 680 48" preserveAspectRatio="none">
            <defs>
              <radialGradient id="rh1" cx="75%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#c00000" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#141118" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="680" height="48" fill="#141118" />
            <rect width="680" height="48" fill="url(#rh1)" />
            <path d="M160 24 Q300 7 450 22 Q560 32 670 14" stroke="#c00000" strokeWidth="1.3" fill="none" opacity="0.5" />
            <path d="M140 36 Q290 18 440 30 Q550 40 655 25" stroke="#8b0000" strokeWidth="0.8" fill="none" opacity="0.3" />
          </svg>
        </div>

        <Table className="relative table-fixed border-collapse">
          <TableHeader>
            <TableRow className="h-12 border-b border-[#2a2530] hover:bg-transparent">
              <TableHead className="w-14 bg-transparent px-3 text-center text-[10px] font-bold uppercase tracking-widest text-[#706a7a]">
                Pos
              </TableHead>
              <TableHead className="w-[42%] bg-transparent px-3 text-[10px] font-bold uppercase tracking-widest text-[#706a7a] sm:w-[30%]">
                Driver
              </TableHead>
              <TableHead className="hidden w-[30%] bg-transparent px-3 text-[10px] font-bold uppercase tracking-widest text-[#706a7a] sm:table-cell md:w-[28%]">
                Constructor
              </TableHead>
              <TableHead className="hidden w-20 bg-transparent px-3 text-center text-[10px] font-bold uppercase tracking-widest text-[#706a7a] md:table-cell">
                Grid
              </TableHead>
              <TableHead className="w-16 bg-transparent px-3 text-right text-[10px] font-bold uppercase tracking-widest text-[#706a7a]">
                Pts
              </TableHead>
              <TableHead className="hidden w-32 bg-transparent px-3 text-right text-[10px] font-bold uppercase tracking-widest text-[#706a7a] lg:table-cell">
                Time
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {results.map((result) => {
              const pos = parseInt(result.positionText);
              const podiumBorder =
                pos === 1
                  ? "border-l-2 border-l-[#e03535]"
                  : pos === 2
                    ? "border-l-2 border-l-[#888]"
                    : pos === 3
                      ? "border-l-2 border-l-[#b87333]"
                      : "border-l-2 border-l-transparent";

              return (
                <TableRow
                  key={result.Driver.driverId}
                  className={`border-b border-[#1e1a26] transition-colors hover:bg-[#1a1621] last:border-0 ${podiumBorder}`}
                >
                  <TableCell className="w-14 px-3 text-center">
                    {result.status === "Finished" && result.positionText !== "R" ? (
                      <span className={`text-[15px] font-bold ${
                        pos === 1
                          ? "text-[#e03535]"
                          : pos === 2
                            ? "text-[#aaa]"
                            : pos === 3
                              ? "text-[#b87333]"
                              : "text-white"
                      }`}>
                        {result.positionText}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#706a7a]">
                        {result.status === "Finished" ? "R" : result.status.substring(0, 3)}
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="px-3">
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="truncate text-[13px] font-semibold leading-tight text-white">
                        {result.Driver.givenName} {result.Driver.familyName}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#706a7a]">
                        {result.Driver.code}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="hidden truncate px-3 text-[13px] text-[#a09aaa] sm:table-cell">
                    {result.Constructor.name}
                  </TableCell>

                  <TableCell className="hidden px-3 text-center text-[13px] text-[#a09aaa] md:table-cell">
                    {result.grid}
                  </TableCell>

                  <TableCell className="px-3 text-right text-[13px] font-bold text-white">
                    {result.points}
                  </TableCell>

                  <TableCell className="hidden truncate px-3 text-right text-[12px] text-[#706a7a] lg:table-cell">
                    {result.Time?.time ?? (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#e03535]">DNF</span>
                    )}
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
