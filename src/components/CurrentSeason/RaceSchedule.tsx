import { getRaceSchedule } from "../../hooks/getRaceSchedule";
import { getRecentPole } from "../../hooks/getRecentPole";
import { getRecentRaceResults } from "../../hooks/getRecentRaceResults";
import { RaceScheduleWidget } from "../../widgets/CurrentSeason/RaceScheduleWidget";
import { RaceScheduleWidgetMobile } from "../../widgets/CurrentSeason/RaceScheduleWidgetMobile";

type ScreenWidthProps = {
  screenWidth: number;
};

export function RaceSchedule({ screenWidth }: ScreenWidthProps) {
  const [loading, raceSchedule, error, request] = getRaceSchedule({
    method: "get",
    url: "https://ergast.com/api/f1/current.json",
  });

  const recentRacesResults = getRecentRaceResults();
  const recentPoleWinners = getRecentPole();

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
    <div
      className={
        screenWidth <= 450
          ? "race-schedule-container-mobile m-4"
          : "race-schedule-container"
      }
    >
      {screenWidth <= 450 ? (
        <RaceScheduleWidgetMobile
          raceSchedule={raceSchedule as any}
          recentRacesResults={recentRacesResults as any}
          recentPoleWinners={recentPoleWinners as any}
          screenWidth={screenWidth}
        />
      ) : (
        <RaceScheduleWidget
          raceSchedule={raceSchedule as any}
          recentRacesResults={recentRacesResults as any}
          recentPoleWinners={recentPoleWinners as any}
          screenWidth={screenWidth}
        />
      )}
    </div>
  );
}
