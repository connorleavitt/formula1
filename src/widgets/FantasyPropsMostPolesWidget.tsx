import { useEffect, useMemo, useState } from "react";
import fantasy from "../data/fantasy.json";
import driver from "../data/driver.json";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type qualiStandings = {
  qualiStandings: [
    {
      season: number;
      round: number;
      url: string;
      raceName: string;
      Circuit: {
        circuitId: string;
        url: string;
        circuitName: string;
        Location: {
          lat: number;
          long: number;
          locality: string;
          country: string;
        };
      };
      date: Date;
      time: number;
      QualifyingResults: [
        {
          number: number;
          position: number;
          Driver: {
            driverId: string;
            permanentNumber: number;
            code: string;
            url: string;
            givenName: string;
            familyName: string;
            dateOfBirth: Date;
            nationality: string;
          };
          Constructor: {
            constructorId: string;
            url: string;
            name: string;
            nationality: string;
          };
          Q1: number;
          Q2: number;
          Q3: number;
        }
      ];
    }
  ];
};

interface driverTableProps {
  driverId: string;
  name: string;
  numberOfPoles: number;
}

const driverTable: driverTableProps[] = driver.map((value) => {
  return {
    name: value.name,
    driverId: value.driverId,
    numberOfPoles: 0,
  };
});

export function FantasyPropsMostPolesWidget({
  qualiStandings,
}: qualiStandings) {
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
      field: "propBetsMostPoles",
      width: 150,
    },
    {
      headerName: "Placing",
      field: "totalPoles",
      cellClass: "my-class",
      width: 120,
      sort: "desc" as string,
    },
  ]);

  useEffect(() => {
    // create a copy of the driver table array with the numberOfPoles property set to 0
    const drivers = driver.map((value) => {
      return {
        name: value.name,
        driverId: value.driverId,
        numberOfPoles: 0,
      };
    });

    // iterate over each race in the qualiStandings array
    if (qualiStandings instanceof Array) {
      qualiStandings.forEach((race) => {
        // iterate over each QualifyingResult in this race
        race.QualifyingResults.forEach((result) => {
          // find the driver in the drivers array that matches the driverId of this QualifyingResult
          const driverIndex = drivers.findIndex(
            (driver) => driver.driverId === result.Driver.driverId
          );

          // if the driver is found, increment their numberOfPoles property
          if (driverIndex !== -1) {
            drivers[driverIndex].numberOfPoles += 1;
          }
        });
      });
    }

    // create a new array with the driver information and their total number of poles

    const newPlayerArray = fantasy.map((value) => {
      let propBetsMostPoles = value.propBets.mostPoles;
      let thing = drivers.find((v: any) => v.name === propBetsMostPoles);
      return {
        name: value.name,
        nickName: value.nickName,
        propBetsMostPoles: propBetsMostPoles,
        totalPoles: thing?.numberOfPoles,
      };
    });

    setRowData(newPlayerArray as any);
  }, []);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      suppressMovable: true,
    }),
    []
  );

  return (
    <div className="bg-neutral-100 p-2 m-4 rounded-2xl border-red-500 border-2">
      <h3>Most Pirelli Poles (Driver)</h3>
      <div className="ag-theme-f1" style={{ height: "265px", width: "375px" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs as any}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
}
