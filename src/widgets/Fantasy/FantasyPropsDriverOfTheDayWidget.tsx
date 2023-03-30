import { useEffect, useMemo, useState } from "react";
import fantasy from "../../data/fantasy.json";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// type fastestLaps = {
//   fastestLaps: [
//     {
//       round: number;
//       fastestLaps: [
//         {
//           number: number;
//           position: number;
//           positionText: string;
//           points: number;
//           Driver: {
//             driverId: string;
//             permanentNumber: number;
//             code: string;
//             url: string;
//             givenName: string;
//             familyName: string;
//             dateOfBirth: Date;
//             nationality: string;
//           };
//           Constructor: {
//             constructorId: string;
//             url: string;
//             name: string;
//             nationality: string;
//           };
//           grid: number;
//           laps: number;
//           status: string;
//           FastestLap: {
//             rank: number;
//             lap: number;
//             Time: {
//               time: number;
//             };
//             AverageSpeed: {
//               units: string;
//               speed: number;
//             };
//           };
//         }
//       ];
//     }
//   ];
// };

interface driverOfTheDayProps {
  round: number;
  circuitId: string;
  circuitName: string;
  country: string;
  driverName: string;
  driverId: string;
  code: string;
  finishingPosition: string;
  percentVote: string;
  voting: {
    "1": {
      driverName: string;
      percentVote: string;
    };
    "2": {
      driverName: string;
      percentVote: string;
    };
    "3": {
      driverName: string;
      percentVote: string;
    };
    "4": {
      driverName: string;
      percentVote: string;
    };
    "5": {
      driverName: string;
      percentVote: string;
    };
  };
}

type props = {
  driverOfTheDay: driverOfTheDayProps[];
  screenWidth: number;
};

export function FantasyPropsDriverOfTheDayWidget({
  driverOfTheDay,
  screenWidth,
}: props) {
  // { fastestLaps }: fastestLaps // ergast api
  const gridNameWidth = screenWidth <= 450 ? 105 : 168;
  const gridChoiceWidth = screenWidth <= 450 ? 145 : 150;
  const gridPlacingWidth = screenWidth <= 450 ? 93 : 120;
  const gridMobileWidth = screenWidth <= 450 ? 343 : 440;
  const gridPlacingName = screenWidth <= 450 ? "Pos." : "Placing";
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Name",
      field: "name",
      width: gridNameWidth,
    },
    {
      headerName: "Choice",
      field: "propBetsMostDriverOfTheDay",
      width: gridChoiceWidth,
    },
    {
      headerName: gridPlacingName,
      field: "driverOfTheDayCount",
      cellClass: "my-class",
      width: gridPlacingWidth,
      sort: "desc" as any,
    },
  ]);

  useEffect(() => {
    const driverOfTheDayByRoundUpdated = driverOfTheDay.map((race) => {
      if (race === undefined) return;
      return race.driverName;
    });

    const driverOfTheDayCountByDriver = driverOfTheDayByRoundUpdated.reduce<{
      [key: string]: number;
    }>((acc, curr) => {
      if (curr === undefined) return acc;
      else {
        if (curr in acc) {
          acc[curr]++;
        } else {
          acc[curr] = 1;
        }
        return acc;
      }
    }, {});

    const sortedDriverResults = Object.entries(driverOfTheDayCountByDriver)
      .map(([driver, count]) => ({ driver, count }))
      .sort((a, b) => b.count - a.count);

    const propBetTable = fantasy.map((value) => {
      let propBetsMostDriverOfTheDay = value.propBets.mostDriverOfTheDay;
      let thing = sortedDriverResults.find(
        (v: any) => v.driver === propBetsMostDriverOfTheDay
      );
      if (thing?.count === undefined)
        return {
          name: value.name,
          nickName: value.nickName,
          propBetsMostDriverOfTheDay: propBetsMostDriverOfTheDay,
          driverOfTheDayCount: 0 as number,
        };
      return {
        name: value.name,
        nickName: value.nickName,
        propBetsMostDriverOfTheDay: propBetsMostDriverOfTheDay,
        driverOfTheDayCount: thing?.count as number,
      };
    });
    setRowData(propBetTable as any);
  }, [driverOfTheDay]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      suppressMovable: true,
    }),
    []
  );

  return (
    <>
      {screenWidth <= 450 ? (
        <div className="rounded-b-2xl">
          <div
            className="ag-theme-f1-mobile rounded-b-2xl"
            style={{ height: "265px", width: gridMobileWidth }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs as any}
              defaultColDef={defaultColDef}
            />
          </div>
        </div>
      ) : (
        <div className="p-2 rounded-2xl border-gray-300 border-2">
          <h3 className="p-2 font-bold">Most Driver of the Day</h3>
          <div
            className="ag-theme-f1"
            style={{ height: "265px", width: gridMobileWidth }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs as any}
              defaultColDef={defaultColDef}
            />
          </div>
        </div>
      )}
    </>
  );
}
