import { useEffect, useMemo, useState } from "react";
import fantasy from "../data/fantasy.json";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type constructorStandings = {
  constructorStandings: {
    position: number;
    positionText: string;
    points: number;
    wins: number;
    Constructor: {
      constructorId: string;
      url: string;
      name: string;
      nationality: string;
    };
  };
};

export function FantasyPropsBottomConstructorWidget({
  constructorStandings,
}: constructorStandings) {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Name",
      field: "nickName",
      width: 100,
    },
    {
      headerName: "Choice",
      field: "propBetsBottomConstructor",
      width: 130,
    },
    {
      headerName: "Placing",
      field: "currentConstructorPosition",
      cellClass: "my-class",
      width: 120,
      sort: "desc" as string,
      // comparator: (valueA: number, valueB: number) => valueA - valueB,
    },
  ]);
  if (constructorStandings instanceof Array) {
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
        currentConstructorPosition: thing?.position,
      };
    });

    useEffect(() => setRowData(newPlayerArray as any), []);
  }
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      suppressMovable: true,
    }),
    []
  );

  return (
    <div className="m-4">
      <h3 className="font-bold">Bottom Constructor</h3>
      <div className="bg-neutral-100 p-2 mt-2 rounded-2xl border-red-500 border-2">
        <div
          className="ag-theme-f1"
          style={{ height: "265px", width: "350px" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs as any}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </div>
  );
}
