import { DriverStanding, ConstructorStanding } from "@/types/f1";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface DriverStandingsTableProps {
  type: "driver";
  standings: DriverStanding[];
}

interface ConstructorStandingsTableProps {
  type: "constructor";
  standings: ConstructorStanding[];
}

type StandingsTableProps =
  | DriverStandingsTableProps
  | ConstructorStandingsTableProps;

export function StandingsTable(props: StandingsTableProps) {
  if (props.standings.length === 0) {
    return (
      <Card className="border-border">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No standings data available</p>
        </CardContent>
      </Card>
    );
  }

  if (props.type === "driver") {
    const standings = props.standings as DriverStanding[];
    return (
      <Card className="border-border">
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">Pos</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead className="hidden sm:table-cell">Constructor</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="text-right">Wins</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings.map((standing) => (
                <TableRow key={standing.Driver.driverId}>
                  <TableCell className="text-center">
                    <span
                      className={
                        parseInt(standing.positionText) <= 3
                          ? "font-bold text-accent"
                          : "font-bold"
                      }
                    >
                      {standing.positionText}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-col gap-1">
                      <span className="text-foreground">
                        {standing.Driver.givenName} {standing.Driver.familyName}
                      </span>
                      {standing.Constructors && standing.Constructors[0] && (
                        <span className="text-xs text-muted-foreground">
                          {standing.Constructors[0].name}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                    {standing.Constructors?.[0]?.name || "-"}
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

  const standings = props.standings as ConstructorStanding[];
  return (
    <Card className="border-border">
      <CardContent className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">Pos</TableHead>
              <TableHead>Constructor</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Wins</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings.map((standing) => (
              <TableRow key={standing.Constructor.constructorId}>
                <TableCell className="text-center">
                  <span
                    className={
                      parseInt(standing.positionText) <= 3
                        ? "font-bold text-accent"
                        : "font-bold"
                    }
                  >
                    {standing.positionText}
                  </span>
                </TableCell>
                <TableCell className="font-medium">
                  {standing.Constructor.name}
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
