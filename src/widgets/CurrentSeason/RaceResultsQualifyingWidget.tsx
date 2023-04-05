import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type QualiResult = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
    };
  };
  date: string;
  time: string;
  QualifyingResults: [
    {
      number: string;
      position: string;
      Driver: {
        driverId: string;
        code: string;
        url: string;
        givenName: string;
        familyName: string;
        dateOfBirth: string;
        nationality: string;
      };
      Constructor: {
        constructorId: string;
        url: string;
        name: string;
        nationality: string;
      };
      Q1: string;
    }
  ];
};

type Props = {
  qualiResult: QualiResult;
  screenWidth: number;
};

export function RaceResultsQualifyingWidget({
  qualiResult,
  screenWidth,
}: Props) {
  const mobilePinned = screenWidth <= 450 ? "left" : "";

  const mobileWidth = screenWidth <= 450 ? screenWidth - 32 : 650;
  const mobileHeight = screenWidth <= 450 ? 661 : 661;
  const [driverToggle, setDriverToggle] = useState(
    screenWidth <= 450 ? false : true
  );
  const [rowData, setRowData] = useState([]);
  const mobileCol = [
    {
      field: "position",
      headerName: "",
      width: 50,
      headerClass: "sub-headers" as string,
      cellClass: "my-class",
      pinned: "left",
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    // {
    //   field: driverToggle ? "Driver.code" : "Driver.familyName",
    //   headerName: "Driver",
    //   width: screenWidth <= 450 ? (driverToggle ? 70 : 135) : 135,
    //   cellClass: "cell-left",
    //   pinned: mobilePinned,
    //   headerClass: "sub-headers-name" as string,
    // },
    {
      field: "Driver.code",
      headerName: "Driver",
      width: 50,
      pinned: "left",
      headerClass: "sub-headers" as string,
      cellClass: "left",
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    {
      field: "Q1",
      width: 100,
      headerClass: "sub-headers" as string,
      cellClass: "centered",
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    {
      field: "Q2",
      width: 100,
      headerClass: "sub-headers" as string,
      cellClass: "centered",
      sort: "desc" as string,
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    {
      field: "Q3",
      width: 100,
      headerClass: "sub-headers" as string,
      cellClass: "centered",
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    {
      headerName: "Constructor",
      field: "Constructor.name",
      width: 140,
      cellClass: "centered",
      headerClass: "sub-headers" as string,
    },
  ];
  const fullScreenCol = [
    {
      field: "position",
      headerName: "",
      width: 50,
      headerClass: "sub-headers" as string,
      cellClass: "my-class",
      pinned: "left",
      sort: "asc" as string,
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    // {
    //   field: driverToggle ? "Driver.code" : "Driver.familyName",
    //   headerName: "Driver",
    //   width: screenWidth <= 450 ? (driverToggle ? 70 : 135) : 135,
    //   cellClass: "cell-left",
    //   pinned: mobilePinned,
    //   headerClass: "sub-headers-name" as string,
    // },
    {
      field: "Driver.code",
      headerName: "Driver",
      width: 80,
      pinned: "left",
      headerClass: "sub-headers" as string,
      cellClass: "sub-headers-name-2",
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    {
      field: "laps",
      headerName: "Laps",
      width: 80,
      headerClass: "sub-headers-name" as string,
      cellClass: "sub-headers-name",
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    {
      field: "Time.time",
      headerName: "Time",
      width: 100,
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    {
      headerName: "Constructor",
      field: "Constructor.name",
      width: 140,
    },
    {
      field: "points",
      headerName: "Pts",
      width: 50,
      cellClass: "my-class",
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
  ];
  const [columnDefs, setColumnDefs] = useState(
    screenWidth <= 450 ? mobileCol : fullScreenCol
  );

  useEffect(() => {
    setRowData(qualiResult.QualifyingResults as any);
  }, []);

  // console.log(rowData);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  function handleClick() {
    setColumnDefs(mobileCol);
    setDriverToggle(!driverToggle);
  }

  return (
    <div className="">
      <h3 className="ml-2 mb-1 font-bold text-lg">Qualifying</h3>
      <div
        className="ag-theme-f1-small"
        style={{ height: mobileHeight, width: mobileWidth }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs as any}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
}
