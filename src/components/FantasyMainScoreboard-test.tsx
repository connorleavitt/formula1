import axios from "axios";
import fantasy from "../data/fantasy.json";
import driverInfo from "../data/driverInfo.json";
import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export const FantasyMainScoreboardTest: React.FC = () => {
  const getDriverStandings = async () => {
    const response = await fetch(
      "http://ergast.com/api/f1/2023/driverStandings.json"
    );
    const data = await response.json();
    const driverStandings =
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  };
  const driverInfoTest = getDriverStandings();

  console.log(driverInfoTest);
  // const newDriverArray = driverInfoTest.map((value) => {
  //   return {
  //     code: value.Driver.code,
  //     points: value.points,
  //   };
  // });
  // const newPlayerArray = fantasy.map((value) => {
  //   return {
  //     name: value.name,
  //     nickName: value.nickName,
  //     drivers: value.mainDrivers.map((v) => {
  //       let thing = newDriverArray.find((t) => t.code == v.code);
  //       return {
  //         driverName: v.fullName,
  //         driverCode: v.code,
  //         driverPoints: thing?.points,
  //       };
  //     }),
  //   };
  // });
  // console.log(newPlayerArray);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="underline">Main Scoreboard</h1>
      {/* {newPlayerArray.map((v) => {
        <div>{v}</div>;
      })} */}
      {/* <div className="ag-theme-alpine" style={{ height: 892, width: 660 }}>
        <AgGridReact
          rowData={driverStandings}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div> */}
    </div>
  );
};
