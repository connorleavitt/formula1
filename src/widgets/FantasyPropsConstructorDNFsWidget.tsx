import { useEffect, useMemo, useState } from "react";
import fantasy from "../data/fantasy.json";
import constructors from "../data/constructors.json";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export function FantasyPropsConstructorDNFsWidget({ finalDnfTable }) {
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
      field: "propBetsMostDidNotFinish",
      width: 100,
    },
    {
      headerName: "Placing",
      field: "currentConstructorPlacing",
      width: 100,
    },
  ]);

  const constructorInfo = finalDnfTable.map((value?) => {
    let code = constructors.find((v) => {
      // console.log(v);
      if (v?.urlId && v?.urlId === value?.constructorId) {
        return v;
      } else if (v.constructorId === value?.constructorId) {
        return v;
      }
    });

    let count = 0;
    if (value.Status.length === 0) return (count = 0); //edge case?

    value.Status.forEach((e) => {
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
      constructor: code?.name,
      didNotFinish: count,
    };
  });

  const newPlayerArray = fantasy.map((value) => {
    let propBetsMostDidNotFinish = value.propBets.mostDidNotFinish;

    let thing = constructorInfo.find(
      (v) => v.constructor === propBetsMostDidNotFinish
    );
    return {
      name: value.name,
      nickName: value.nickName,
      propBetsMostDidNotFinish: propBetsMostDidNotFinish,
      currentConstructorPlacing: thing.didNotFinish,
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
      <h3>Most DNFs (Team)</h3>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
