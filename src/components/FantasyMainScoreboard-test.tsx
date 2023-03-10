import axios from "axios";
import fantasy from "../data/fantasy.json";
import driverInfo from "../data/driverInfo.json";
import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getCurrentDriverStandings } from "../hooks/getCurrentDriverStandings";
import { TestingWidget } from "./FantasyMainScoreboardWidget";

export function FantasyMainScoreboardTest() {
  const [loading, driverStandings, error, request] = getCurrentDriverStandings({
    method: "get",
    url: "http://ergast.com/api/f1/2023/driverStandings.json",
  });
  // console.log(loading, driverStandings, error, request);
  if (loading) {
    console.log("Loading...");
    return <p>Loading...</p>;
  }
  if (error !== "") {
    console.log("Error...");
    return <p>{Error}...</p>;
  }
  if (!driverStandings) {
    console.log("null");
    return <p>Data is null</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="underline">Main Scoreboard</h1>
      <div className="test">
        <TestingWidget driverData={driverStandings} />
      </div>
    </div>
  );
}
