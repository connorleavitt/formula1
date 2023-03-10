import { useEffect, useMemo, useState } from "react";
import fantasy from "../data/fantasy.json";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export function FantasyPropsBottomConstructorWidget({ constructorStandings }) {
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
      field: "propBetsBottomConstructor",
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
    let propBetsBottomConstructor = value.propBets.bottomConstructor;
    let thing = constructorInfo.find(
      (v) => v.constructor === value.propBets.bottomConstructor
    );
    return {
      name: value.name,
      nickName: value.nickName,
      propBetsBottomConstructor: propBetsBottomConstructor,
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

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "261px", width: "302px" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
