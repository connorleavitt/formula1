import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import fantasy from "../data/fantasy.json";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type DriverProps = {
  driverData: [];
};

type newPlayerArrayType = {
  name: string;
  nickName: string;
  totalPoints: number;
  drivers: {
    driverName: string;
    driverCode: string;
    driverPoints: number;
  };
};

export function FantasyMainScoreboardLeaderWidget({ driverData }: DriverProps) {
  const newDriverArray = driverData.map((value) => {
    return {
      code: value["Driver"]["code"],
      points: value["points"],
    };
  });

  function getDriverPoints(driverCode: string) {
    // get driverID from driverInfo data based off of input
    let playerDriverPoints: number = 0;
    let points: number = 0;
    newDriverArray.find((value) => {
      if (driverCode == value.code) return (playerDriverPoints = value.points);
    });
    return +playerDriverPoints;
  }

  function sumTeamPoints(nickName: string) {
    let sum = 0;
    fantasy.filter((value) => {
      // find nickName's drivers
      if (nickName === value.nickName) {
        //return if no match
        value.mainDrivers.map((e) => {
          //iterate over drivers and add points to sum
          sum += getDriverPoints(e.code);
        });
      }
    });
    return sum;
  }

  const newPlayerArray = fantasy
    .map((value) => {
      return {
        name: value.name,
        nickName: value.nickName,
        drivers: value.mainDrivers.map((v) => {
          let thing = newDriverArray.find((t) => t.code == v.code);
          return {
            driverName: v.fullName,
            driverCode: v.code,
            driverPoints: thing?.points,
          };
        }),
        totalPoints: sumTeamPoints(value.nickName),
      };
    })
    .sort((a, b) => {
      return b.totalPoints - a.totalPoints;
    });
  const leader = newPlayerArray[0];

  return (
    <div className="flex p-2">
      <p className="text-lg">
        <span className="font-bold">{leader.name}</span> is winning with{" "}
        <span className="font-bold leader-points">{leader.totalPoints}</span>{" "}
        total points!
      </p>
    </div>
  );
}
