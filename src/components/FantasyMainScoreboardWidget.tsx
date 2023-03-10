import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import fantasy from "../data/fantasy.json";
import driverInfo from "../data/driverInfo.json";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export function TestingWidget({ driverData }) {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "name",
    },
    // { field: "nickName" },
    {
      headerName: "Group 1",
      children: [
        {
          headerName: "Driver 1",
          field: "drivers.0.driverName",
        },
        {
          headerName: "Points",
          field: "drivers.0.driverPoints",
        },
      ],
    },
    {
      headerName: "Group 2",
      children: [
        {
          headerName: "Driver 2",
          field: "drivers.1.driverName",
        },
        {
          headerName: "Points",
          field: "drivers.1.driverPoints",
        },
      ],
    },
    {
      headerName: "Group 3",
      children: [
        {
          headerName: "Driver 3",
          field: "drivers.2.driverName",
        },
        {
          headerName: "Points",
          field: "drivers.2.driverPoints",
        },
      ],
    },
    {
      headerName: "Group 4",
      children: [
        {
          headerName: "Driver 4",
          field: "drivers.3.driverName",
        },
        {
          headerName: "Points",
          field: "drivers.3.driverPoints",
        },
      ],
    },
    {
      field: "totalPoints",
    },
  ]);

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
  console.log(rowData);
  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: 800 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        // defaultColDef={defaultColDef}
      />
    </div>
  );
}
