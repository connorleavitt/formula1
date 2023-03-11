import { useEffect, useMemo, useState } from "react";
import fantasy from "../data/fantasy.json";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export function FantasyPropsTopConstructorWidget({ constructorStandings }) {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Name",
      field: "nickName",
      width: 100,
      sortingOrder: ["desc"],
    },
    {
      headerName: "Choice",
      field: "propBetsTopConstructor",
      width: 100,
    },
    {
      headerName: "Placing",
      field: "currentConstructorPosition",
      width: 100,
    },
  ]);

  const constructorInfo = constructorStandings.map((value) => {
    return {
      constructor: value.Constructor.name,
      position: value.position,
    };
  });

  const newPlayerArray = fantasy.map((value) => {
    let propBetsTopConstructor = value.propBets.topConstructor;
    let thing = constructorInfo.find(
      (v) => v.constructor === propBetsTopConstructor
    );
    return {
      name: value.name,
      nickName: value.nickName,
      propBetsTopConstructor: propBetsTopConstructor,
      currentConstructorPosition: thing.position,
    };
  });

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      suppressMovable: true,
    }),
    []
  );

  useEffect(() => {
    setRowData(newPlayerArray);
  }, []);
  //   console.log(constructorStandings, newPlayerArray);

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "261px", width: "302px" }}
    >
      <h3>Top Contructor</h3>

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
