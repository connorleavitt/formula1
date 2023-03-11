import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import fantasy from "../data/fantasy.json";
import driverInfo from "../data/driverInfo.json";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export function FantasyMainScoreboardWidget({ driverData }) {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "name",
      width: 168,
      // sortingOrder: ["desc"],
      headerClass: "ag-theme-name",
    },
    {
      headerName: "Group 1",
      headerClass: "ag-theme-groups-odd",
      children: [
        {
          headerName: "Driver 1",
          width: 160,
          field: "drivers.0.driverName",
        },
        {
          headerName: "Points",
          width: 80,
          field: "drivers.0.driverPoints",
        },
      ],
    },
    {
      headerName: "Group 2",
      headerClass: "ag-theme-groups-even",

      children: [
        {
          headerName: "Driver 2",
          width: 100,
          field: "drivers.1.driverCode",
        },
        {
          headerName: "Points",
          width: 80,
          field: "drivers.1.driverPoints",
        },
      ],
    },
    {
      headerName: "Group 3",
      headerClass: "ag-theme-groups-odd",

      children: [
        {
          headerName: "Driver 3",
          width: 100,
          field: "drivers.2.driverCode",
        },
        {
          headerName: "Points",
          width: 80,
          field: "drivers.2.driverPoints",
        },
      ],
    },
    {
      headerName: "Group 4",
      headerClass: "ag-theme-groups-even",

      children: [
        {
          headerName: "Driver 4",
          width: 100,
          field: "drivers.3.driverCode",
        },
        {
          headerName: "Points",
          width: 80,
          field: "drivers.3.driverPoints",
        },
      ],
    },
    {
      field: "totalPoints",
      comparator: (valueA: number, valueB: number) => valueA - valueB,
      sort: "desc",
      width: 130,
      headerClass: "ag-theme-points",
      cellClass: "my-class",
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      suppressMovable: true,
    }),
    []
  );

  const newDriverArray = driverData.map((value) => {
    return {
      code: value.Driver.code,
      points: value.points,
    };
  });

  function getDriverPoints(driverCode: string) {
    // get driverID from driverInfo data based off of input
    let playerDriverPoints: number = 0;
    let points: number = 0;
    newDriverArray.find((value) => {
      if (driverCode == value.code) return (playerDriverPoints = value.points);
    });
    return +playerDriverPoints;
  }

  function sumTeamPoints(nickName: string) {
    let sum = 0;
    fantasy.filter((value) => {
      // find nickName's drivers
      if (nickName === value.nickName) {
        //return if no match
        value.mainDrivers.map((e) => {
          //iterate over drivers and add points to sum
          sum += getDriverPoints(e.code);
        });
      }
    });
    return sum;
  }

  const newPlayerArray = fantasy.map((value) => {
    return {
      name: value.name,
      nickName: value.nickName,
      drivers: value.mainDrivers.map((v) => {
        let thing = newDriverArray.find((t) => t.code == v.code);
        return {
          driverName: v.fullName,
          driverCode: v.code,
          driverPoints: thing?.points,
        };
      }),
      totalPoints: sumTeamPoints(value.nickName),
    };
  });

  useEffect(() => {
    setRowData(newPlayerArray);
  }, []);

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "310px", width: "1082px" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
