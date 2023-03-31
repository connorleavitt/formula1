import { useEffect, useMemo, useState } from "react";
import fantasy from "../../data/fantasy.json";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type ConstructorStandings = {
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

type props = {
  constructorStandings: ConstructorStandings;
  screenWidth: number;
};

export function FantasyPropsBottomConstructorWidget({
  constructorStandings,
  screenWidth,
}: props) {
  const gridNameWidth = screenWidth <= 450 ? 120 : 168;
  const gridChoiceWidth = screenWidth <= 450 ? 130 : 150;
  const gridPlacingWidth = screenWidth <= 450 ? 93 : 120;
  const gridMobileWidth = screenWidth - 32;
  const gridPlacingName = screenWidth <= 450 ? "Pos." : "Placing";
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Name",
      field: "name",
      width: gridNameWidth,
    },
    {
      headerName: "Choice",
      field: "propBetsBottomConstructor",
      width: gridChoiceWidth,
    },
    {
      headerName: gridPlacingName,
      field: "currentConstructorPosition",
      cellClass: "my-class",
      width: gridPlacingWidth,
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
    <>
      {screenWidth <= 450 ? (
        <div
          className="ag-theme-f1-mobile"
          style={{ height: "265px", width: gridMobileWidth }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs as any}
            defaultColDef={defaultColDef}
          />
        </div>
      ) : (
        <div className="p-2 rounded-2xl border-gray-300 border-2">
          <h3 className="p-2 font-bold">Bottom Constructor</h3>
          <div
            className="ag-theme-f1"
            style={{ height: "265px", width: gridMobileWidth }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs as any}
              defaultColDef={defaultColDef}
            />
          </div>
        </div>
      )}
    </>
  );
}
