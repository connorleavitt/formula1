import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { PreviousRaceWidget } from "../../widgets/PreviousRaceWidget";
import { getRaceSchedule } from "../../hooks/getRaceSchedule";
import { NextRaceWidget } from "../../widgets/NextRaceWidget";
import { UpcomingRacesWidget } from "../../widgets/UpcomingRacesWidget";
import { NextRaceDetailedWidget } from "../../widgets/NextRaceDetailedWidget";
import { UpcomingRacesWidgetVertical } from "../../widgets/UpcomingRacesWidgetVertical";
import { Carousel } from "../../widgets/RaceScheduleCarouselWidget";

export function RaceSchedule() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

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
    <div className="race-schedule-container">
      <h2 className="p-2 font-bold">Race Schedule</h2>
      <UpcomingRacesWidget raceSchedule={raceSchedule as any} />
    </div>
  );
}
