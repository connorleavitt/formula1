import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { PreviousRaceWidget } from "../../widgets/PreviousRaceWidget";
import { getRaceSchedule } from "../../hooks/getRaceSchedule";
import { NextRaceWidget } from "../../widgets/NextRaceWidget";
import { UpcomingRacesWidget } from "../../widgets/UpcomingRacesWidget";
import { NextRaceDetailedWidget } from "../../widgets/NextRaceDetailedWidget";

export function RaceSchedule() {
  const [loading, raceSchedule, error, request] = getRaceSchedule({
    method: "get",
    url: "https://ergast.com/api/f1/current.json",
  });

  if (loading) {
    return (
      <div className="ml-20 mr-20 pb-20">
        <h1 className="text-lg pb-2">Race Schedule</h1>
        <p>Loading...</p>
      </div>
    );
  }
  if (error !== "") {
    return <p>{error}</p>;
  }
  if (!raceSchedule) {
    return <p>Data is null</p>;
  }
  return (
    <div>
      <div className="flex">
        <NextRaceWidget raceSchedule={raceSchedule as any} />
        <NextRaceDetailedWidget raceSchedule={raceSchedule as any} />
      </div>
      <div className="flex overflow-auto">
        <PreviousRaceWidget raceSchedule={raceSchedule as any} />
        <UpcomingRacesWidget raceSchedule={raceSchedule as any} />
      </div>
    </div>
  );
}
