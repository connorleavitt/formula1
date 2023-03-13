import { useEffect, useMemo, useState } from "react";
import fantasy from "../data/fantasy.json";
import axios from "axios";
import { getFastestLaps } from "../hooks/getFastestLaps";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type fastestLaps = {
  fastestLaps: [
    {
      round: number;
      fastestLaps: [
        {
          number: number;
          position: number;
          positionText: string;
          points: number;
          Driver: {
            driverId: string;
            permanentNumber: number;
            code: string;
            url: string;
            givenName: string;
            familyName: string;
            dateOfBirth: Date;
            nationality: string;
          };
          Constructor: {
            constructorId: string;
            url: string;
            name: string;
            nationality: string;
          };
          grid: number;
          laps: number;
          status: string;
          FastestLap: {
            rank: number;
            lap: number;
            Time: {
              time: number;
            };
            AverageSpeed: {
              units: string;
              speed: number;
            };
          };
        }
      ];
    }
  ];
};

export function FantasyPropsFastestLapWidget({ fastestLaps }: fastestLaps) {
  // const [fastestLaps, setFastestLaps] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Name",
      field: "nickName",
      width: 100,
    },
    {
      headerName: "Choice",
      field: "propBetsMostFastestLaps",
      width: 100,
    },
    {
      headerName: "Placing",
      field: "numberOfFastestLaps",
      width: 100,
      sort: "desc" as any,
    },
  ]);

  // console.log(fastestLaps);
  useEffect(() => {
    const fastestLapsByRoundUpdated = fastestLaps.map((race) => {
      if (race === undefined) return;
      const driverTest = race.fastestLaps[0].Driver;
      return {
        driver: driverTest.givenName + " " + driverTest.familyName,
      };
    });

    const fastestLapCountByDriver = fastestLapsByRoundUpdated.reduce<{
      [key: string]: number;
    }>((acc, curr) => {
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
    const sortedDriverResults = Object.entries(fastestLapCountByDriver)
      .map(([driver, count]) => ({ driver, count }))
      .sort((a, b) => b.count - a.count);

    const propBetTable = fantasy.map((value) => {
      let propBetsMostFastestLaps = value.propBets.mostFastestLaps;

      let thing = sortedDriverResults.find(
        (v: any) => v.driver === propBetsMostFastestLaps
      );
      if (thing?.count === undefined)
        return {
          name: value.name,
          nickName: value.nickName,
          propBetsMostFastestLaps: propBetsMostFastestLaps,
          numberOfFastestLaps: 0 as number,
        };
      return {
        name: value.name,
        nickName: value.nickName,
        propBetsMostFastestLaps: propBetsMostFastestLaps,
        numberOfFastestLaps: thing?.count as number,
      };
    });
    setRowData(propBetTable as any);
  }, [fastestLaps]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      suppressMovable: true,
    }),
    []
  );

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "261px", width: "302px" }}
    >
      <h3>Most Lap</h3>

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs as any}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
