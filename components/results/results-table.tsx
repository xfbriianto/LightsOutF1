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
    <CardContent className="overflow-x-auto p-0">
      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="border-b border-[#2a2530] hover:bg-transparent">
            <TableHead className="w-12 text-center text-[11px] font-semibold uppercase tracking-widest text-[#706a7a] bg-[#141118]">
              Pos
            </TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-widest text-[#706a7a] bg-[#141118]">
              Driver
            </TableHead>
            <TableHead className="hidden sm:table-cell text-[11px] font-semibold uppercase tracking-widest text-[#706a7a] bg-[#141118]">
              Constructor
            </TableHead>
            <TableHead className="hidden md:table-cell text-center text-[11px] font-semibold uppercase tracking-widest text-[#706a7a] bg-[#141118]">
              Grid
            </TableHead>
            <TableHead className="text-right text-[11px] font-semibold uppercase tracking-widest text-[#706a7a] bg-[#141118]">
              Pts
            </TableHead>
            <TableHead className="hidden lg:table-cell text-right text-[11px] font-semibold uppercase tracking-widest text-[#706a7a] bg-[#141118]">
              Time
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result) => (
            <TableRow
              key={result.Driver.driverId}
              className="border-b border-[#1e1a26] hover:bg-[#1a1621] transition-colors last:border-0"
            >
              {/* Pos */}
              <TableCell className="text-center w-11">
                {result.status === "Finished" && result.positionText !== "R" ? (
                  <span
                    className={`font-bold text-[15px] ${
                      parseInt(result.positionText) <= 3
                        ? "text-[#e03535]"
                        : "text-white"
                    }`}
                  >
                    {result.positionText}
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold tracking-wide text-[#706a7a]">
                    {result.status === "Finished"
                      ? "R"
                      : result.status.substring(0, 3)}
                  </span>
                )}
              </TableCell>

              {/* Driver */}
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-white">
                    {result.Driver.givenName} {result.Driver.familyName}
                  </span>
                  <span className="text-[11px] font-medium tracking-wider text-[#706a7a]">
                    {result.Driver.code}
                  </span>
                </div>
              </TableCell>

              {/* Constructor */}
              <TableCell className="hidden sm:table-cell text-sm text-[#a09aaa]">
                {result.Constructor.name}
              </TableCell>

              {/* Grid */}
              <TableCell className="hidden md:table-cell text-center text-sm text-[#a09aaa]">
                {result.grid}
              </TableCell>

              {/* Points */}
              <TableCell className="text-right text-sm font-bold text-white">
                {result.points}
              </TableCell>

              {/* Time */}
              <TableCell className="hidden lg:table-cell text-right text-xs text-[#706a7a]">
                {result.Time?.time ? (
                  result.Time.time
                ) : (
                  <span className="text-[#e03535] font-bold text-[11px] tracking-wide">
                    DNF
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
}
