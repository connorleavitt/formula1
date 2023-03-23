import { FantasyMainScoreboardLeader } from "../components/FantasyScoreboards/FantasyMainScoreboardLeader";
import { getRaceSchedule } from "../hooks/getRaceSchedule";
import { NextRaceDetailedWidget } from "../widgets/HomeWidgets/NextRaceDetailedWidget";

type RaceSchedule = {
  season: number;
  round: number;
  url: string;
  raceName: string;
  Circuit: {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: {
      lat: number;
      long: number;
      locality: string;
      country: string;
    };
  };
  date: string;
  time: string;
  localRaceDateTime: string;
  FirstPractice: {
    date: string;
    time: string;
  };
  SecondPractice: {
    date: string;
    time: string;
  };
  ThirdPractice: {
    date: string;
    time: string;
  };
  Qualifying: {
    date: string;
    time: string;
  };
  Sprint: {
    date: string;
    time: string;
  };
};

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
