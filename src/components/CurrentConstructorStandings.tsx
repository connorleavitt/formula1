import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export function CurrentConstructorStandings() {
  // const [constructorStandings, setConstructorStandings] = useState([]);

  const getConstructorStandings = async () => {
    const response = await axios
      .get("https://ergast.com/api/f1/2023/constructorStandings.json")
      .catch((err) => console.log(err));

    if (response) {
      const constructorStandings =
        response.data.MRData.StandingsTable.StandingsLists[0]
          .ConstructorStandings;
      // setConstructorStandings(constructorStandings);
      setRowData(constructorStandings);
    }
  };

  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "position",
      width: 106,
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    { headerName: "Constructor", field: "Constructor.name", width: 140 },
    {
      field: "points",
      width: 106,
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    {
      field: "wins",
      width: 106,
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
    getConstructorStandings();
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 472, width: 465 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
