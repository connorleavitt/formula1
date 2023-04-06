import { useEffect, useState } from "react";
import { getRaceResults } from "../hooks/getRaceResults";
import { getSprintResults } from "../hooks/getSprintResults";
import { RaceStandings } from "../components/CurrentSeason/RaceStandings";
import trackInfo from "../data/trackInfo.json";
import driverInfo from "../data/driver.json";
import { getRaceSchedule } from "../hooks/getRaceSchedule";
import { getQualiResults } from "../hooks/getQualiResults";
import { DriverStandings } from "../components/CurrentSeason/DriverStandings";

type ScreenWidthProps = {
  screenWidth: number;
};

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
  // localRaceDateTime: string;
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

type QualiResults = {
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
  QualifyingResults: [
    {
      number: string;
      position: string;
      Driver: {
        driverId: string;
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
      Q1: string;
      Q2: string;
      Q3: string;
    }
  ];
};

export function Standings({ screenWidth }: ScreenWidthProps) {
  // const [activeWidget, setActiveWidget] = useState("drivers");

  const [loading, raceSchedule] = getRaceSchedule<RaceSchedule[]>({
    method: "get",
    url: "https://ergast.com/api/f1/current.json",
  });
  const [qualiLoading, qualiStandings] = getQualiResults<QualiResults[]>({
    method: "get",
    url: "https://ergast.com/api/f1/current/qualifying.json?limit=500",
  });

  const raceResults = getRaceResults();
  const sprintResults = getSprintResults();

  const [activeDriver, setActiveDriver] = useState("overview");
  const [activeRace, setActiveRace] = useState("bahrain");
  const [activePage, setActivePage] = useState("race");

  if (!raceResults || !sprintResults || loading || qualiLoading) {
    return (
      <div className="ml-8 mt-6">
        <p>Loading...</p>
      </div>
    );
  }
  if (!raceSchedule) {
    return (
      <div className="ml-8 mt-6">
        <p>Loading...</p>
      </div>
    );
  }

  function getLocalTime(date: string, time: string, offset: number) {
    // need to add the mins, etc back on
    const mainHour = Number(time.split(":")[0]);
    let result = mainHour + offset;
    const timeArr = time.split(":");
    if (result < 0) {
      result = 24 + result;
      const updatedTime =
        result + ":" + time.split(":")[1] + ":" + time.split(":")[2];
      const updatedDateDay = (date.slice(8) as any) - 1;
      const updatedDate = date.slice(0, 8) + updatedDateDay;
      return updatedDate + "T" + updatedTime;
    }
    const updatedTime =
      result + ":" + time.split(":")[1] + ":" + time.split(":")[2];

    return date + "T" + updatedTime;
  }

  const filteredRaceResults = raceResults.filter(
    (value) => value !== undefined
  );

  const truncatedRaceSchedule = filteredRaceResults.map((value: any) => {
    return {
      ...value,
      circuitId: value.Circuit.circuitId,
    };
  });
  const updatedRaceSchedule = truncatedRaceSchedule.map((value) => {
    const additionalInfo = trackInfo.find(
      (race) => race.circuitId === value.Circuit.circuitId
    );
    return {
      ...value,
      additionalInfo,
      localRaceDateTime: getLocalTime(
        value.date,
        value.time,
        Number(additionalInfo?.Location.gmtOffset)
      ),
    };
  });

  return (
    <>
      {screenWidth <= 450 ? (
        <div className="current-season--container-mobile m-4">
          <div className="flex border-b-2 border-gray-400">
            <h1 className="text-3xl w-full font-bold py-2 ">Standings</h1>
          </div>
          <div className="my-2 w-full">
            <label htmlFor="results--widget-select"></label>
            <select
              id="results--widget-select"
              value={activePage}
              onChange={(event) => setActivePage(event.target.value)}
              className="p-2 standings--widget-select rounded-lg w-full"
            >
              <option value="race">Races</option>
              <option value="drivers">Drivers</option>
              <option value="constructors">Constructors</option>
              <option value="dhlfl">DHL Fastest Lap Award</option>
              <option value="dotd">Driver of the Day Award</option>
            </select>
          </div>
          <div
            className="my-2 w-full"
            style={{ display: activePage === "race" ? "block" : "none" }}
          >
            <label htmlFor="standings-race--widget-select"></label>
            <select
              id="standings-race--widget-select"
              value={activeRace}
              onChange={(event) => setActiveRace(event.target.value)}
              className="p-2 standings--widget-select rounded-lg w-full"
            >
              {raceSchedule.map((track) => (
                <option key={track.round} value={track.Circuit.circuitId}>
                  {track.Circuit.Location.country}
                </option>
              ))}
            </select>
            <RaceStandings
              sprintResults={sprintResults as any}
              raceResults={updatedRaceSchedule as any}
              qualiStandings={qualiStandings as any}
              screenWidth={screenWidth}
              activeRace={activeRace}
            />
          </div>
          <div
            className="mt-4 w-full"
            style={{ display: activePage === "drivers" ? "block" : "none" }}
          >
            <label htmlFor="standings-driver--widget-select"></label>
            <select
              id="standings-driver--widget-select"
              value={activeDriver}
              onChange={(event) => setActiveDriver(event.target.value)}
              className="p-2 standings--widget-select rounded-lg w-full"
            >
              <option value="overview">Driver Overview</option>
              <option value="driverRaces">Driver (by race)</option>
              <option value="driverSprints">Driver (by sprint)</option>
              {driverInfo.map((driver) => (
                <option key={driver.id} value={driver.code}>
                  {driver.name}
                </option>
              ))}
            </select>
            <DriverStandings
              //make a quali table
              sprintResults={sprintResults as any}
              raceResults={raceResults as any}
              screenWidth={screenWidth}
              activeDriver={activeDriver}
            />
          </div>
          {/* <div
            className="mt-4 w-full"
            style={{ display: activePage === "constructors" ? "block" : "none" }}
          >
            <label htmlFor="standings--widget-select"></label>
            <select
              id="standings--widget-select"
              value={activeWidget}
              onChange={(event) => setActiveWidget(event.target.value)}
              className="p-2 standings--widget-select rounded-lg w-full"
            >
              <option value="constructors">Constructor Overview</option>
              <option value="constructorRaces">Constructor (by race)</option>
              <option value="team1Name">team 1 Name</option>
              <option value="team2Name">team 2 Name</option>
            </select>
            <ConstructorsStandings
              sprintResults={sprintResults as any}
              raceResults={raceResults as any}
              screenWidth={screenWidth}
              activeWidget={activeWidget}
            />
          </div> */}
        </div>
      ) : (
        <div className="current-season--container">
          {/* <div className="flex items-center justify-between w-full text-sm border-b-2 border-gray-400">
            <h1 className="text-3xl font-bold pt-4 pb-4 mr-8">Standings</h1>
            <div className="flex gap-4">
              <button
                className={`my-1 py-1 px-2 h-8 border-2 rounded-lg hover:bg-gray-100 ${
                  activeWidget === "drivers"
                    ? "bg-black text-white border-black hover:bg-gray-800"
                    : "border-gray-300"
                }`}
                onClick={() => setActiveWidget("drivers")}
              >
                Driver Overview
              </button>
              <button
                className={`my-1 py-1 px-2 h-8 border-2 rounded-lg hover:bg-gray-100 ${
                  activeWidget === "driverRaces"
                    ? "bg-black text-white border-black hover:bg-gray-800"
                    : "border-gray-300"
                }`}
                onClick={() => setActiveWidget("driverRaces")}
              >
                Driver (by race)
              </button>
              <button
                className={`my-1 py-1 px-2 h-8 border-2 rounded-lg hover:bg-gray-100 ${
                  activeWidget === "driverSprints"
                    ? "bg-black text-white border-black hover:bg-gray-800"
                    : "border-gray-300"
                }`}
                onClick={() => setActiveWidget("driverSprints")}
              >
                Driver (by sprint)
              </button>
              <button
                className={`my-1 py-1 px-2 h-8 border-2 rounded-lg hover:bg-gray-100 ${
                  activeWidget === "constructors"
                    ? "bg-black text-white border-black hover:bg-gray-800"
                    : "border-gray-300"
                }`}
                onClick={() => setActiveWidget("constructors")}
              >
                Constructor Overview
              </button>
              <button
                className={`my-1 py-1 px-2 h-8 border-2 rounded-lg hover:bg-gray-100 ${
                  activeWidget === "constructorRaces"
                    ? "bg-black text-white border-black hover:bg-gray-800"
                    : "border-gray-300"
                }`}
                onClick={() => setActiveWidget("constructorRaces")}
              >
                Constructor (by race)
              </button>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div
              style={{ display: activeWidget === "drivers" ? "block" : "none" }}
            >
              <CurrentDriverStandings screenWidth={screenWidth} />
            </div>
            <div
              style={{
                display: activeWidget === "constructors" ? "block" : "none",
              }}
            >
              <CurrentConstructorStandings screenWidth={screenWidth} />
            </div>
            <div
              style={{
                display: activeWidget === "driverRaces" ? "block" : "none",
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
                display: activeWidget === "constructorRaces" ? "block" : "none",
              }}
            >
              <CurrentConstructorRaceStandingsWidget
                raceResults={raceResults as any}
                screenWidth={screenWidth}
              />
            </div>
            <div
              style={{
                display: activeWidget === "driverSprints" ? "block" : "none",
              }}
            >
              <CurrentDriverSprintStandingsWidget
                sprintResults={sprintResults as any}
                screenWidth={screenWidth}
              />
            </div>
          </div> */}
        </div>
      )}
    </>
  );
}
