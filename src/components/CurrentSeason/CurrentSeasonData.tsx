import { useState } from "react";
import { getRaceResults } from "../../hooks/getRaceResults";
import { CurrentDriverRaceStandingsWidget } from "../../widgets/CurrentSeason/CurrentDriverRaceStandingsWidget";
import { CurrentConstructorStandings } from "./CurrentConstructorStandings";
import { CurrentDriverStandings } from "./CurrentDriverStandings";

export function CurrentSeasonData() {
  const [activeWidget, setActiveWidget] = useState("drivers");

  const raceResults = getRaceResults();

  if (!raceResults) return null;

  return (
    <div className="current-season--container">
      <div className="flex w-max ml-2">
        <button
          className={`my-1 p-2 bg-gray-200 border-2 border-gray-300 rounded-lg hover:bg-black hover:text-white ${
            activeWidget === "drivers" ? "border-gray-800" : ""
          }`}
          onClick={() => setActiveWidget("drivers")}
        >
          Driver Standings
        </button>
        <button
          className={`my-1 p-2 bg-gray-200 border-2 border-gray-300 rounded-lg hover:bg-black hover:text-white ${
            activeWidget === "constructors" ? "border-gray-800" : ""
          }`}
          onClick={() => setActiveWidget("constructors")}
        >
          Constructor Standings
        </button>
        <button
          className={`my-1 p-2 bg-gray-200 border-2 border-gray-300 rounded-lg hover:bg-black hover:text-white ${
            activeWidget === "driverRaces" ? "border-gray-800" : ""
          }`}
          onClick={() => setActiveWidget("driverRaces")}
        >
          Race by Race Overview (Driver)
        </button>
        <button
          className={`my-1 p-2 bg-gray-200 border-2 border-gray-300 rounded-lg hover:bg-black hover:text-white ${
            activeWidget === "constructorRaces" ? "border-gray-800" : ""
          }`}
          onClick={() => setActiveWidget("constructorRaces")}
        >
          Race by Race Overview (Constructor)
        </button>
      </div>
      <div className="flex flex-wrap">
        <div style={{ display: activeWidget === "drivers" ? "block" : "none" }}>
          <CurrentDriverStandings />
        </div>
        <div
          style={{
            display: activeWidget === "constructors" ? "block" : "none",
          }}
        >
          <CurrentConstructorStandings />
        </div>
        <div
          style={{ display: activeWidget === "driverRaces" ? "block" : "none" }}
        >
          <CurrentDriverRaceStandingsWidget raceResults={raceResults as any} />
        </div>
        <div
          style={{
            display: activeWidget === "constructorRaces" ? "block" : "none",
          }}
        >
          {/* <CurrentConstructorRaceStandings raceResults={raceResults as any} /> */}
        </div>
      </div>
    </div>
  );
}
