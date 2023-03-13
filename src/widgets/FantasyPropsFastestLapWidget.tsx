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
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23,
      ];
      const fastestLapsByRound = await Promise.all(
        roundNumbers.map(async (round) => {
          const response = await fetch(
            `http://ergast.com/api/f1/current/${round}/fastest/1/results.json`
          );
          const data = await response.json();
          if (data.MRData.RaceTable.Races[0] === undefined) return;
          return { round, fastestLaps: data.MRData.RaceTable.Races[0].Results };
        })
      );
      setFastestLaps(fastestLapsByRound);
    }

    fetchFastestLaps();
  }, []);

  const fastestLapsByRound = fastestLaps.map((race) => {
    if (race === undefined) return;
    const driverTest = race.fastestLaps[0].Driver;
    return {
      driver: driverTest.givenName + " " + driverTest.familyName,
    };
  });

  const fastestLapCountByDriver = fastestLapsByRound.reduce((acc, curr) => {
    if (curr === undefined) return acc;
    else {
      if (curr.driver in acc) {
        acc[curr.driver]++;
      } else {
        acc[curr.driver] = 1;
      }
      return acc;
    }
  }, {});

  const sortedTable = Object.entries(fastestLapCountByDriver)
    .map(([driver, count]) => ({ driver, count }))
    .sort((a, b) => b.count - a.count);
  console.log(sortedTable);

  return (
    <div>
      <h1>Fastest Laps By Driver</h1>
      {/* <ul>
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
      </ul> */}
    </div>
  );
}
