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
      headerName: "",
      width: 100,
      headerClass: "sub-headers" as string,
      cellClass: "my-class",
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    {
      headerName: "Constructor",
      field: "Constructor.name",
      width: 150,
      cellClass: "cell-left",
      headerClass: "sub-headers-name" as string,
    },
    {
      field: "wins",
      width: 80,
      headerClass: "sub-headers" as string,
      cellClass: "centered",
      comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
    {
      field: "points",
      width: 100,
      headerClass: "sub-headers" as string,
      cellClass: "my-class",
      sort: "desc" as string,
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
    <div className="mt-4">
      <div className="ag-theme-f1-medium" style={{ height: 395, width: 435 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs as any}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
}
