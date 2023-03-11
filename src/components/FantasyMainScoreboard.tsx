import { useState } from "react";
import { getCurrentDriverStandings } from "../hooks/getCurrentDriverStandings";
import { FantasyMainScoreboardWidget } from "../widgets/FantasyMainScoreboardWidget";

interface driverData {
  driverStandings: DriverStandings[];
}

interface DriverStandings {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: {
    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: Date;
    nationality: string;
  };
  Constructors: [
    {
      constructorId: string;
      url: string;
      name: string;
      nationality: string;
    }
  ];
}

export function FantasyMainScoreboard() {
  const [loading, driverStandings, error, request] = getCurrentDriverStandings({
    method: "get",
    url: "https://ergast.com/api/f1/2023/driverStandings.json",
  });
  // console.log(driverStandings);
  // console.log(loading, driverStandings, error, request);
  if (loading) {
    console.log("Loading...");
    return <p>Loading...</p>;
  }
  if (error !== "") {
    console.log("Error...");
    return <p>{error}</p>;
  }
  if (!driverStandings) {
    console.log("null");
    return <p>Data is null</p>;
  }

  return (
    <div className="ml-auto mr-auto w-min">
      <h1 className="text-lg">Main Scoreboard</h1>
      <FantasyMainScoreboardWidget driverData={driverStandings as any} />
    </div>
  );
}
