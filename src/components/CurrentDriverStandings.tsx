import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export function CurrentDriverStandings() {
  const getDriverStandings = async () => {
    const response = await axios
      .get("http://ergast.com/api/f1/2023/driverStandings.json")
      .catch((err) => console.log(err));

    if (response) {
      const driverStandings =
        response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      setRowData(driverStandings);
      console.log("Driver:", driverStandings);
    }
  };

  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "position",
      width: 106,
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    {
      headerName: "Driver",
      width: 160,
      valueGetter: (p) => {
        return p.data.Driver.givenName + " " + p.data.Driver.familyName;
      },
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    {
      field: "Driver.code",
      width: 150,
    },
    { headerName: "Constructor", field: "Constructors.0.name", width: 140 },
    {
      field: "points",
      width: 100,
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  useEffect(() => {
    getDriverStandings();
  }, []);

  return (
    <div className="m-5">
      <div className="ag-theme-alpine" style={{ height: 892, width: 660 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
}
