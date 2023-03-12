import { useEffect, useMemo, useState } from "react";
import fantasy from "../data/fantasy.json";
import axios from "axios";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export function FantasyPropsFastestLapWidget() {
  const [fastestLaps, setFastestLaps] = useState([]);

  useEffect(() => {
    async function fetchFastestLaps() {
      const roundNumbers = [
        1,
        2,
        3 /* ... add more round numbers here ... */,
        ,
      ];
      const fastestLapsByRound = await Promise.all(
        roundNumbers.map(async (round) => {
          const response = await fetch(
            `http://ergast.com/api/f1/2022/${round}/fastest/1/results.json`
          );
          const data = await response.json();
          console.log(data);
          // return { round, fastestLaps: data.MRData.RaceTable.Races[0].Results };
        })
      );
      setFastestLaps(fastestLapsByRound);
    }

    fetchFastestLaps();
  }, []);
  console.log(fastestLaps);

  return (
    <div>
      <h1>Fastest Laps By Driver</h1>
      <ul>
        {fastestLaps.map((race) => (
          <li key={race.round}>
            <h2>Round {race.round}</h2>
            <ul>
              {race.fastestLaps.map((result) => (
                <li key={result.Driver.driverId}>
                  {result.Driver.givenName} {result.Driver.familyName}:{" "}
                  {result.FastestLap.Time.time}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
