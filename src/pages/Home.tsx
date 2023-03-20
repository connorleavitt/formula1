import { useEffect, useState } from "react";
import { FantasyMainScoreboardLeader } from "../components/FantasyScoreboards/FantasyMainScoreboardLeader";
import { getRaceSchedule } from "../hooks/getRaceSchedule";
import { getWeather } from "../utilities/Weather/getWeather";
import { positionSuccess } from "../utilities/Weather/trackWeather";
import { NextRaceDetailedWidget } from "../widgets/CurrentSeason/NextRaceDetailedWidget";

export const Home: React.FC = () => {
  const [loading, raceSchedule, error, request] = getRaceSchedule({
    method: "get",
    url: "https://ergast.com/api/f1/current.json",
  });

  const lat = "-37.8497" as string;
  const long = "144.968" as string;
  const timezone = "Australia/Melbourne";
  // const [weather, setWeather] = useState();

  // useEffect(() => {
  //   positionSuccess();
  // }, []);

  // const positionSuccess = () => {
  //   getWeather(parseFloat(lat), parseFloat(long), timezone)
  //     .then((res) => {
  //       console.log(res);
  //       setWeather(res);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //       alert("Problem getting weather data!");
  //     });
  // };
  // if (!weather) return console.log("weather issues");
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
      <NextRaceDetailedWidget
        raceSchedule={raceSchedule as any}
        // trackWeather={weather as any}
      />
    </div>
  );
};
