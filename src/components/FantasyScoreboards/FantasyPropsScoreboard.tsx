import { useState } from "react";

// hooks
import { getCurrentConstructorStandings } from "../../hooks/getCurrentConstructorStandings";
import { getCurrentConstructorDNFs } from "../../hooks/getCurrentConstructorDNFs";
import { getQualiResults } from "../../hooks/getQualiResults";
import { getFastestLaps } from "../../hooks/getFastestLaps";

// widgets
import { FantasyPropsBottomConstructorWidget } from "../../widgets/Fantasy/FantasyPropsBottomConstructorWidget";
import { FantasyPropsConstructorDNFsWidget } from "../../widgets/Fantasy/FantasyPropsConstructorDNFsWidget";
import { FantasyPropsTopConstructorWidget } from "../../widgets/Fantasy/FantasyPropsTopConstructorWidget";
import { FantasyPropsMostPolesWidget } from "../../widgets/Fantasy/FantasyPropsMostPolesWidget";
import { FantasyPropsFastestLapWidget } from "../../widgets/Fantasy/FantasyPropsFastestLapWidget";

// data
import fantasy from "../../data/fantasy.json";
import constructors from "../../data/constructors.json";

export function FantasyPropsScoreboard() {
  const fastestLaps = getFastestLaps();
  const [activeWidget, setActiveWidget] = useState("top");

  const [loading, constructorStandings, error, request] =
    getCurrentConstructorStandings({
      method: "get",
      url: "https://ergast.com/api/f1/current/constructorStandings.json",
    });

  const [, qualiStandings] = getQualiResults({
    method: "get",
    url: "https://ergast.com/api/f1/current/qualifying/1.json",
  });
  const dnfChoice = fantasy.map((value) => {
    let playerChoice = value.propBets.mostDidNotFinish;
    let code = constructors.find((v) => v.name === playerChoice);
    if (code?.urlId)
      return {
        constructor: playerChoice,
        url: `https://ergast.com/api/f1/current/constructors/${code?.urlId}/status.json`,
      };
    return {
      constructor: playerChoice,
      url: `https://ergast.com/api/f1/current/constructors/${code?.constructorId}/status.json`,
    };
  });

  const dnfChoice1 = getCurrentConstructorDNFs({
    method: "get",
    url: dnfChoice[0].url,
  });
  const dnfChoice2 = getCurrentConstructorDNFs({
    method: "get",
    url: dnfChoice[1].url,
  });
  const dnfChoice3 = getCurrentConstructorDNFs({
    method: "get",
    url: dnfChoice[2].url,
  });
  const dnfChoice4 = getCurrentConstructorDNFs({
    method: "get",
    url: dnfChoice[3].url,
  });

  let finalDnfTable = [];

  if (loading) {
    return (
      <div className="ml-20 mr-20 pb-20">
        <h1 className="text-lg pb-2">Prop Bets</h1>
        <p>Loading...</p>
      </div>
    );
  }
  if (error !== "") {
    return <p>{error}</p>;
  }
  if (!constructorStandings) {
    return <p>Data is null</p>;
  }
  finalDnfTable.push(dnfChoice1[1]);
  finalDnfTable.push(dnfChoice2[1]);
  finalDnfTable.push(dnfChoice3[1]);
  finalDnfTable.push(dnfChoice4[1]);

  // console.log(activeWidget);
  return (
    <div className="pb-20">
      <h1 className="text-2xl font-bold mb-2">Prop Bets</h1>
      <div className="flex">
        {/* <div className="my-4">
        <label htmlFor="widget-select" className="mr-2 font-bold">
          Select Prop Bet:
        </label>
        <select
          id="widget-select"
          value={activeWidget}
          onChange={(event) => setActiveWidget(event.target.value)}
          className="p-2 bg-gray-200 rounded-lg hover:bg-black hover:text-white"
        >
          <option value="top">Top Contructor</option>
          <option value="bottom">Bottom Contructor</option>
          <option value="dnfs">Most DNFs (Team)</option>
          <option value="poles">Most Pirelli Poles (Driver)</option>
          <option value="fastest">Most DHL Fastest Laps (Driver)</option>
        </select>
      </div> */}

        <div className="flex flex-wrap">
          <div style={{ display: activeWidget === "top" ? "block" : "none" }}>
            <FantasyPropsTopConstructorWidget
              constructorStandings={constructorStandings as any}
            />
          </div>
          <div
            style={{ display: activeWidget === "bottom" ? "block" : "none" }}
          >
            <FantasyPropsBottomConstructorWidget
              constructorStandings={constructorStandings as any}
            />
          </div>
          <div style={{ display: activeWidget === "dnfs" ? "block" : "none" }}>
            <FantasyPropsConstructorDNFsWidget
              finalDnfTable={finalDnfTable as any}
            />
          </div>
          <div style={{ display: activeWidget === "poles" ? "block" : "none" }}>
            <FantasyPropsMostPolesWidget
              qualiStandings={qualiStandings as any}
            />
          </div>
          <div
            style={{ display: activeWidget === "fastest" ? "block" : "none" }}
          >
            <FantasyPropsFastestLapWidget fastestLaps={fastestLaps as any} />
          </div>
        </div>
        <div className="flex flex-col ml-2">
          <button
            className={`my-1 p-2 bg-gray-200 border-2 border-gray-300 rounded-lg hover:bg-black hover:text-white ${
              activeWidget === "top" ? "border-gray-800" : ""
            }`}
            onClick={() => setActiveWidget("top")}
          >
            Top Contructor
          </button>
          <button
            className={`my-1 p-2 bg-gray-200 border-2 border-gray-300 rounded-lg hover:bg-black hover:text-white ${
              activeWidget === "bottom" ? "border-gray-800" : ""
            }`}
            onClick={() => setActiveWidget("bottom")}
          >
            Bottom Contructor
          </button>
          <button
            className={`my-1 p-2 bg-gray-200 border-2 border-gray-300 rounded-lg hover:bg-black hover:text-white ${
              activeWidget === "dnfs" ? "border-gray-800" : ""
            }`}
            onClick={() => setActiveWidget("dnfs")}
          >
            Most DNFs (Team)
          </button>
          <button
            className={`my-1 p-2 bg-gray-200 border-2 border-gray-300 rounded-lg hover:bg-black hover:text-white ${
              activeWidget === "poles" ? "border-gray-800" : ""
            }`}
            onClick={() => setActiveWidget("poles")}
          >
            Most Pirelli Poles (Driver)
          </button>
          <button
            className={`my-1 p-2 bg-gray-200 border-2 border-gray-300 rounded-lg hover:bg-black hover:text-white ${
              activeWidget === "fastest" ? "border-gray-800" : ""
            }`}
            onClick={() => setActiveWidget("fastest")}
          >
            Most DHL Fastest Laps (Driver)
          </button>
        </div>
      </div>
    </div>
  );
}
