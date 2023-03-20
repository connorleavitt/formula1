import { FantasyMainScoreboardLeader } from "../components/FantasyScoreboards/FantasyMainScoreboardLeader";
import { getRaceSchedule } from "../hooks/getRaceSchedule";
import { NextRaceDetailedWidget } from "../widgets/CurrentSeason/NextRaceDetailedWidget";

export const Home: React.FC = () => {
  const [loading, raceSchedule, error, request] = getRaceSchedule({
    method: "get",
    url: "https://ergast.com/api/f1/current.json",
  });

  if (loading) {
    return (
      <div className="ml-20 mr-20 pb-20">
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
    <div className="home m-6">
      <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
      <FantasyMainScoreboardLeader />
      <NextRaceDetailedWidget raceSchedule={raceSchedule as any} />
    </div>
  );
};
