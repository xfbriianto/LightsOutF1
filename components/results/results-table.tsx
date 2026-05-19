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
    <Card className="border-border">
      <CardContent className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">Pos</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead className="hidden sm:table-cell">Constructor</TableHead>
              <TableHead className="hidden md:table-cell">Grid</TableHead>
              <TableHead className="text-right">Pts</TableHead>
              <TableHead className="hidden lg:table-cell text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.Driver.driverId}>
                <TableCell className="text-center font-bold">
                  {result.status === "Finished" && result.positionText !== "R" ? (
                    <span
                      className={
                        parseInt(result.positionText) <= 3
                          ? "text-accent"
                          : "text-foreground"
                      }
                    >
                      {result.positionText}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      {result.status === "Finished"
                        ? "R"
                        : result.status.substring(0, 3)}
                    </span>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex flex-col gap-1">
                    <span className="text-foreground">
                      {result.Driver.givenName} {result.Driver.familyName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {result.Driver.code}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                  {result.Constructor.name}
                </TableCell>
                <TableCell className="hidden text-center md:table-cell">
                  {result.grid}
                </TableCell>
                <TableCell className="text-right font-bold">
                  {result.points}
                </TableCell>
                <TableCell className="hidden text-right text-sm text-muted-foreground lg:table-cell">
                  {result.Time?.time || "DNF"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
