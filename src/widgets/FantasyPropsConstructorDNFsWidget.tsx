import { useEffect, useMemo, useState } from "react";
import fantasy from "../data/fantasy.json";
import constructors from "../data/constructors.json";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type finalDnfTableProps = {
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

export function FantasyPropsConstructorDNFsWidget({
  finalDnfTable,
}: finalDnfTableProps) {
  // console.log(finalDnfTable);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Name",
      field: "nickName",
      width: 100,
    },
    {
      headerName: "Choice",
      field: "propBetsMostDidNotFinish",
      width: 100,
    },
    {
      headerName: "Placing",
      field: "currentConstructorPlacing",
      width: 100,
      sort: "desc" as string,
    },
  ]);
  if (finalDnfTable instanceof Array) {
    const constructorInfo = finalDnfTable.map(
      (value: { constructorId: string; Status: value[] }) => {
        let code = constructors.find((v) => {
          // console.log(v);
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
              return;
            }
            console.log(count);
            count++;
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
    <div
      className="ag-theme-alpine"
      style={{ height: "261px", width: "302px" }}
    >
      <h3>Most DNFs (Team)</h3>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs as any}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
