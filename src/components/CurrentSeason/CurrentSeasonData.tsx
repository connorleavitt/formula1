import { useEffect, useState } from "react";
import { getRaceResults } from "../../hooks/getRaceResults";
import { getSprintResults } from "../../hooks/getSprintResults";
import { CurrentConstructorRaceStandingsWidget } from "../../widgets/CurrentSeason/CurrentConstructorRaceStandingsWidget";
import { CurrentDriverRaceStandingsWidget } from "../../widgets/CurrentSeason/CurrentDriverRaceStandingsWidget";
import { CurrentDriverSprintStandingsWidget } from "../../widgets/CurrentSeason/CurrentDriverSprintStandingsWidget";
import { CurrentConstructorStandings } from "./CurrentConstructorStandings";
import { CurrentDriverStandings } from "./CurrentDriverStandings";

type ScreenWidthProps = {
  screenWidth: number;
};

export function CurrentSeasonData({ screenWidth }: ScreenWidthProps) {
  const [activeWidget, setActiveWidget] = useState("drivers");

  const raceResults = getRaceResults();
  const sprintResults = getSprintResults();

  if (!raceResults) return null;
  if (!sprintResults) return null;

  return (
    <>
      {screenWidth <= 450 ? (
        <div className="current-season--container-mobile m-4">
          <div className="flex border-b-2 border-gray-400">
            <h1 className="text-3xl w-full font-bold py-2 ">Standings</h1>
            {/* <div className="my-auto">
              <label htmlFor="widget-select"></label>
              <select
                id="widget-select"
                value={activeWidget}
                onChange={(event) => setActiveWidget(event.target.value)}
                className="p-2 bg-gray-200 rounded-lg w-40"
              >
                <option value="drivers">Driver Overview</option>
                <option value="driverRaces">Driver (by race)</option>
                <option value="driverSprints">Driver (by sprint)</option>
                <option value="constructors">Constructor Overview</option>
                <option value="constructorRaces">Constructor (by race)</option>
              </select>
            </div> */}
          </div>
          <div className="mt-4 w-full">
            <label htmlFor="standings--widget-select"></label>
            <select
              id="standings--widget-select"
              value={activeWidget}
              onChange={(event) => setActiveWidget(event.target.value)}
              className="p-2 standings--widget-select rounded-lg w-full"
            >
              <option value="drivers">Driver Overview</option>
              <option value="driverRaces">Driver (by race)</option>
              <option value="driverSprints">Driver (by sprint)</option>
              <option value="constructors">Constructor Overview</option>
              <option value="constructorRaces">Constructor (by race)</option>
            </select>
          </div>
          <div className="flex flex-wrap overflow-scroll">
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
                // screenWidth={screenWidth}
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
          </div>
        </div>
      ) : (
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
          </div>
        </div>
      )}
    </>
  );
}
