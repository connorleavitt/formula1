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

export function FantasyPropsTopConstructorWidget({
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
      field: "propBetsTopConstructor",
      width: 100,
    },
    {
      headerName: "Placing",
      field: "currentConstructorPosition",
      cellClass: "my-class",
      width: 120,
      sort: "asc" as string,
    },
  ]);

  if (constructorStandings instanceof Array) {
    const constructorInfo = constructorStandings.map((value: any) => {
      return {
        constructor: value.Constructor.name,
        position: value.position,
      };
    });

    const newPlayerArray = fantasy.map((value) => {
      let propBetsTopConstructor = value.propBets.topConstructor;
      let thing = constructorInfo.find(
        (v: any) => v.constructor === propBetsTopConstructor
      );
      return {
        name: value.name,
        nickName: value.nickName,
        propBetsTopConstructor: propBetsTopConstructor,
        currentConstructorPosition: thing?.position,
      };
    });

    useEffect(() => setRowData(newPlayerArray as any), []);
    //   console.log(constructorStandings, newPlayerArray);
  }
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      suppressMovable: true,
    }),
    []
  );

  return (
    <div className="bg-neutral-100 p-2  m-4 rounded-2xl border-red-500 border-2">
      <h3 className="p-2 font-bold">Top Constructor</h3>
      <div className="ag-theme-f1" style={{ height: "265px", width: "320px" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs as any}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
}
