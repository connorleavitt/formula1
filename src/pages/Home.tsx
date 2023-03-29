import { FantasyMainScoreboardLeader } from "../components/FantasyScoreboards/FantasyMainScoreboardLeader";
import { CurrentDriverStandingsHome } from "../components/Home/CurrentDriverStandingsHome";
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

type ScreenWidthProps = {
  screenWidth: number;
};

export function Home({ screenWidth }: ScreenWidthProps) {
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
    <>
      {screenWidth <= 450 ? (
        <div className="home-mobile m-6">
          <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
          <FantasyMainScoreboardLeader screenWidth={screenWidth} />
          <NextRaceDetailedWidget
            raceSchedule={raceSchedule as any}
            screenWidth={screenWidth}
          />
        </div>
      ) : (
        <div className="home m-6">
          <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
          <FantasyMainScoreboardLeader screenWidth={screenWidth} />
          <div className="flex gap-16 mt-4">
            <div className="w-1/2">
              <NextRaceDetailedWidget
                raceSchedule={raceSchedule as any}
                screenWidth={screenWidth}
              />
            </div>
            <div className="w-1/2">
              <CurrentDriverStandingsHome />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
