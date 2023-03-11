import { useEffect, useMemo, useState } from "react";
import fantasy from "../data/fantasy.json";
import constructors from "../data/constructors.json";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export function FantasyPropsConstructorDNFsWidget({ finalDnfTable }) {
  console.log(finalDnfTable);
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
      field: "mostDidNotFinish",
      width: 100,
    },
    {
      headerName: "Placing",
      field: "...",
      width: 100,
    },
  ]);

  const constructorInfo = finalDnfTable.map((value) => {
    // console.log(value);
    const team = constructors.find(
      (input) => input.constructorId === value?.constructorId
    );

    // let count = 0;
    // if (value.Status.length === 0) return 0;
    // value.Status.forEach((e) => {
    //   console.log(e.statusId);
    //   if (
    //     e.statusId === "1" ||
    //     e.statusId === "11" ||
    //     e.statusId === "12" ||
    //     e.statusId === "13" ||
    //     e.statusId === "14" ||
    //     e.statusId === "15" ||
    //     e.statusId === "16" ||
    //     e.statusId === "17" ||
    //     e.statusId === "18" ||
    //     e.statusId === "19"
    //   )
    //     return 0;
    //   else count++;
    // });

    return {
      constructor: team?.name,
      // didNotFinish: result,
    };
    // if (value.constructorId === XYZ) {
    // return {
    //   constructor: value.constructorId.name,
    //   position: value.position,
    // };
    // }
  });

  // const newPlayerArray = fantasy.map((value) => {
  //   let propBetsTopConstructor = value.propBets.topConstructor;
  //   let thing = constructorInfo.find(
  //     (v) => v.constructor === propBetsTopConstructor
  //   );
  //   return {
  //     name: value.name,
  //     nickName: value.nickName,
  //     propBetsTopConstructor: propBetsTopConstructor,
  //     currentConstructorPosition: thing.position,
  //   };
  // });

  // const defaultColDef = useMemo(
  //   () => ({
  //     sortable: true,
  //     suppressMovable: true,
  //   }),
  //   []
  // );

  // useEffect(() => {
  //   setRowData(newPlayerArray);
  // }, []);
  // //   console.log(constructorStandings, newPlayerArray);

  // return (
  //   <div
  //     className="ag-theme-alpine"
  //     style={{ height: "261px", width: "302px" }}
  //   >
  //     <AgGridReact
  //       rowData={rowData}
  //       columnDefs={columnDefs}
  //       defaultColDef={defaultColDef}
  //     />
  //   </div>
  // );
}
