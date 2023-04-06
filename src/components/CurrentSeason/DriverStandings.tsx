import { CurrentDriverRaceStandingsWidget } from "../../widgets/CurrentSeason/CurrentDriverRaceStandingsWidget";
import { CurrentDriverSprintStandingsWidget } from "../../widgets/CurrentSeason/CurrentDriverSprintStandingsWidget";
import { CurrentDriverStandings } from "./CurrentDriverStandings";
import driverInfo from "../../data/driver.json";

type raceResultsProp = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
    };
  };
  date: string;
  time: string;
  Results: [
    {
      number: string;
      position: string;
      positionText: string;
      points: string;
      Driver: {
        driverId: string;
        permanentNumber: string;
        code: string;
        url: string;
        givenName: string;
        familyName: string;
        dateOfBirth: string;
        nationality: string;
      };
      Constructor: {
        constructorId: string;
        url: string;
        name: string;
        nationality: string;
      };
      grid: string;
      laps: string;
      status: string;
      Time: {
        millis: string;
        time: string;
      };
      FastestLap: {
        rank: string;
        lap: string;
        Time: {
          time: string;
        };
        AverageSpeed: {
          units: string;
          speed: string;
        };
      };
    }
  ];
};
type sprintResultsProp = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
    };
  };
  date: string;
  time: string;
  SprintResults: [
    {
      number: string;
      position: string;
      positionText: string;
      points: string;
      Driver: {
        driverId: string;
        permanentNumber: string;
        code: string;
        url: string;
        givenName: string;
        familyName: string;
        dateOfBirth: string;
        nationality: string;
      };
      Constructor: {
        constructorId: string;
        url: string;
        name: string;
        nationality: string;
      };
      grid: string;
      laps: string;
      status: string;
      Time: {
        millis: string;
        time: string;
      };
      FastestLap: {
        rank: string;
        lap: string;
        Time: {
          time: string;
        };
        AverageSpeed: {
          units: string;
          speed: string;
        };
      };
    }
  ];
};
type ResultsProps = {
  raceResults: raceResultsProp[];
  sprintResults: sprintResultsProp[];
  screenWidth: number;
  activeDriver: string;
};

export function DriverStandings({
  raceResults,
  sprintResults,
  screenWidth,
  activeDriver,
}: ResultsProps) {
  return (
    <div className="flex flex-wrap overflow-scroll">
      <div style={{ display: activeDriver === "overview" ? "block" : "none" }}>
        <CurrentDriverStandings screenWidth={screenWidth} />
      </div>
      <div
        style={{
          display: activeDriver === "driverRaces" ? "block" : "none",
        }}
      >
        <CurrentDriverRaceStandingsWidget
          sprintResults={sprintResults as any}
          raceResults={raceResults as any}
          screenWidth={screenWidth}
        />
      </div>
      <div
        style={{
          display: activeDriver === "driverSprints" ? "block" : "none",
        }}
      >
        <CurrentDriverSprintStandingsWidget
          sprintResults={sprintResults as any}
          screenWidth={screenWidth}
        />
      </div>
      {driverInfo.map((driver) => (
        <div
          className="flex flex-col"
          key={driver.id}
          style={{
            display: activeDriver === driver.code ? "block" : "none",
          }}
        >
          <div>{driver.code}</div>
          <div>{driver.dateOfBirth}</div>
          <div>{driver.nationality}</div>
          <div>{driver.permanentNumber}</div>
          <div>{driver.team}</div>
          <div>{driver.url}</div>
        </div>
      ))}
    </div>
  );
}
