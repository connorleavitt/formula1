import { useEffect, useMemo, useState } from "react";
import fantasy from "../../data/fantasy.json";
import constructors from "../../data/constructors.json";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type FinalDnfTableProps = {
  finalDnfTable: {
    season: number;
    constructorId: string;
    Status: [
      {
        statusId: number;
        count: number;
        status: string;
      }
    ];
  };
};

type value = {
  Status: [
    {
      statusId: number;
      count: number;
      status: string;
    }
  ];
};

type props = {
  finalDnfTable: FinalDnfTableProps;
  screenWidth: number;
};

export function FantasyPropsConstructorDNFsWidget({
  finalDnfTable,
  screenWidth,
}: props) {
  const gridNameWidth = screenWidth <= 450 ? 120 : 168;
  const gridChoiceWidth = screenWidth <= 450 ? 130 : 150;
  const gridPlacingWidth = screenWidth <= 450 ? 93 : 120;
  const gridMobileWidth = screenWidth <= 450 ? 343 : 440;
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
      field: "propBetsMostDidNotFinish",
      width: gridChoiceWidth,
    },
    {
      headerName: gridPlacingName,
      field: "currentConstructorPlacing",
      cellClass: "my-class",
      width: gridPlacingWidth,
      sort: "desc" as string,
    },
  ]);
  if (finalDnfTable instanceof Array) {
    const constructorInfo = finalDnfTable.map(
      (value: { constructorId: string; Status: value[] }) => {
        let code = constructors.find((v) => {
          if (v?.urlId && v?.urlId === value?.constructorId) {
            return v;
          } else if (v.constructorId === value?.constructorId) {
            return v;
          }
        });
        let count = 0;
        if (value?.Status.length === 0) return (count = 0); //edge case?
        if (value instanceof Object) {
          value?.Status.forEach((e: any) => {
            count++;
            if (
              e.statusId === "1" ||
              e.statusId === "11" ||
              e.statusId === "12" ||
              e.statusId === "13" ||
              e.statusId === "14" ||
              e.statusId === "15" ||
              e.statusId === "16" ||
              e.statusId === "17" ||
              e.statusId === "18" ||
              e.statusId === "19"
            ) {
              return count--;
            }
          });

          return {
            constructor: code?.name as string,
            didNotFinish: count as number,
          };
        }
      }
    );

    const newPlayerArray = fantasy.map((value) => {
      let propBetsMostDidNotFinish = value.propBets.mostDidNotFinish;

      let thing = constructorInfo.find(
        (v) => v?.constructor === propBetsMostDidNotFinish
      ) || { constructor: "", didNotFinish: 0 };
      return {
        name: value.name,
        nickName: value.nickName,
        propBetsMostDidNotFinish: propBetsMostDidNotFinish,
        currentConstructorPlacing: thing?.didNotFinish,
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
        <div className="rounded-b-2xl">
          <div
            className="ag-theme-f1-mobile rounded-b-2xl"
            style={{ height: "265px", width: gridMobileWidth }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs as any}
              defaultColDef={defaultColDef}
            />
          </div>
        </div>
      ) : (
        <div className="p-2 rounded-2xl border-gray-300 border-2">
          <h3 className="p-2 font-bold">Most DNFs (Team)</h3>
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
