import { useState } from "react";
import { getRaceResults } from "../../hooks/getRaceResults";
import { CurrentConstructorRaceStandingsWidget } from "../../widgets/CurrentSeason/CurrentConstructorRaceStandingsWidget";
import { CurrentDriverRaceStandingsWidget } from "../../widgets/CurrentSeason/CurrentDriverRaceStandingsWidget";
import { CurrentConstructorStandings } from "./CurrentConstructorStandings";
import { CurrentDriverStandings } from "./CurrentDriverStandings";

export function CurrentSeasonData() {
  const [activeWidget, setActiveWidget] = useState("drivers");

  const raceResults = getRaceResults();

  if (!raceResults) return null;

  return (
    <div className="current-season--container">
      <div className="flex items-center justify-between w-full text-sm border-b-2 border-gray-400">
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
            Driver
          </button>
          <button
            className={`my-1 py-1 px-2 h-8 border-2 rounded-lg hover:bg-gray-100 ${
              activeWidget === "constructors"
                ? "bg-black text-white border-black hover:bg-gray-800"
                : "border-gray-300"
            }`}
            onClick={() => setActiveWidget("constructors")}
          >
            Constructor
          </button>
          <button
            className={`my-1 py-1 px-2 h-8 border-2 rounded-lg hover:bg-gray-100 ${
              activeWidget === "driverRaces"
                ? "bg-black text-white border-black hover:bg-gray-800"
                : "border-gray-300"
            }`}
            onClick={() => setActiveWidget("driverRaces")}
          >
            Race Overview (Driver)
          </button>
          <button
            className={`my-1 py-1 px-2 h-8 border-2 rounded-lg hover:bg-gray-100 ${
              activeWidget === "constructorRaces"
                ? "bg-black text-white border-black hover:bg-gray-800"
                : "border-gray-300"
            }`}
            onClick={() => setActiveWidget("constructorRaces")}
          >
            Race Overview (Constructor)
          </button>
        </div>
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
          <CurrentConstructorRaceStandingsWidget
            raceResults={raceResults as any}
          />
        </div>
      </div>
    </div>
  );
}
