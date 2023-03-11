import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import fantasy from "../data/fantasy.json";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type DriverProps = {
  driverData: [];
};

type newPlayerArrayType = {
  name: string;
  nickName: string;
  totalPoints: number;
  drivers: {
    driverName: string;
    driverCode: string;
    driverPoints: number;
  };
};

export function FantasyMainScoreboardWidget({ driverData }: DriverProps) {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "name",
      width: 168,
      // sortingOrder: ["desc"],
      headerClass: "ag-theme-name" as string,
    },
    {
      headerName: "Group 1" as string,
      headerClass: "ag-theme-groups-odd" as string,
      children: [
        {
          headerName: "Driver 1" as string,
          width: 160,
          field: "drivers.0.driverName",
        },
        {
          headerName: "Points" as string,
          width: 80,
          field: "drivers.0.driverPoints",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
        },
      ],
    },
    {
      headerName: "Group 2" as string,
      headerClass: "ag-theme-groups-even" as string,

      children: [
        {
          headerName: "Driver 2" as string,
          width: 100,
          field: "drivers.1.driverCode",
        },
        {
          headerName: "Points" as string,
          width: 80,
          field: "drivers.1.driverPoints",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
        },
      ],
    },
    {
      headerName: "Group 3" as string,
      headerClass: "ag-theme-groups-odd" as string,

      children: [
        {
          headerName: "Driver 3" as string,
          width: 100,
          field: "drivers.2.driverCode",
        },
        {
          headerName: "Points" as string,
          width: 80,
          field: "drivers.2.driverPoints",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
        },
      ],
    },
    {
      headerName: "Group 4" as string,
      headerClass: "ag-theme-groups-even" as string,

      children: [
        {
          headerName: "Driver 4" as string,
          width: 100,
          field: "drivers.3.driverCode",
        },
        {
          headerName: "Points" as string,
          width: 80,
          field: "drivers.3.driverPoints",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
        },
      ],
    },
    {
      field: "totalPoints",
      comparator: (valueA: number, valueB: number) => valueA - valueB,
      sort: "desc" as string,
      width: 130,
      headerClass: "ag-theme-points" as string,
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
      code: value["Driver"]["code"],
      points: value["points"],
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

  useEffect(() => setRowData(newPlayerArray as any), []);

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "310px", width: "1082px" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs as any}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
