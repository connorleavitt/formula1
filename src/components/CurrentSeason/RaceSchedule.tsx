import { getRaceSchedule } from "../../hooks/getRaceSchedule";
import { RaceScheduleWidget } from "../../widgets/CurrentSeason/RaceScheduleWidget";

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
    <div className="race-schedule-container">
      <RaceScheduleWidget raceSchedule={raceSchedule as any} />
    </div>
  );
}
