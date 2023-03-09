import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export function FantasyPropsScoreboard() {
  const [constructorStandings, setConstructorStandings] = useState([]);

  const getConstructorStandings = async () => {
    const response = await axios
      .get("http://ergast.com/api/f1/2023/constructorStandings.json")
      .catch((err) => console.log(err));

    if (response) {
      const constructorStandings =
        response.data.MRData.StandingsTable.StandingsLists[0]
          .ConstructorStandings;
      console.log("Constructor Standings:", constructorStandings);
      setConstructorStandings(constructorStandings);
      setRowData(constructorStandings);
    }
  };

  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "position",
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    { field: "Constructor.name" },
    {
      field: "points",
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
    <div className="ag-theme-alpine" style={{ height: 500, width: 800 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
