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

  return (
    <Card className="border-border">
      <CardHeader className="border-b border-border">
        <CardTitle>Championship Leaders</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">Pos</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Wins</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topDrivers.map((standing) => (
              <TableRow key={standing.Driver.driverId}>
                <TableCell className="text-center font-bold text-accent">
                  {standing.positionText}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex flex-col gap-1">
                    <span className="text-foreground">
                      {standing.Driver.givenName} {standing.Driver.familyName}
                    </span>
                    {standing.Constructors && standing.Constructors[0] && (
                      <span className="text-sm text-muted-foreground">
                        {standing.Constructors[0].name}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold">
                  {standing.points}
                </TableCell>
                <TableCell className="text-right">{standing.wins}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
