import { useEffect, useMemo, useState } from "react";
import driver from "../../data/driver.json";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type raceResultsProp = {
  round: number;
  raceResults: {
    season: string;
    round: string;
    url: string;
    raceName: string;
    Circuit: {
      circuitId: string;
      url: string;
      circuitName: string;
      Location: {
        lat: string;
        long: string;
        locality: string;
        country: string;
      };
    };
    date: string;
    time: string;
    Results: [
      {
        number: string;
        position: string;
        positionText: string;
        points: string;
        Driver: {
          driverId: string;
          permanentNumber: string;
          code: string;
          url: string;
          givenName: string;
          familyName: string;
          dateOfBirth: string;
          nationality: string;
        };
        Constructor: {
          constructorId: string;
          url: string;
          name: string;
          nationality: string;
        };
        grid: string;
        laps: string;
        status: string;
        Time: {
          millis: string;
          time: string;
        };
        FastestLap: {
          rank: string;
          lap: string;
          Time: {
            time: string;
          };
          AverageSpeed: {
            units: string;
            speed: string;
          };
        };
      }
    ];
  };
};

type raceResultsProps = {
  raceResults: raceResultsProp[];
};

type resultsByDriver = {
  name: string;
  nickName: string;
  totalPoints: number;
  drivers: {
    driverName: string;
    driverCode: string;
    driverPoints: number;
  };
};

interface DriverInfo {
  totalPoints: number;
  driverId: string;
  driverName: string;
  results: {
    round: string;
    position: string;
    time: string;
    points: string;
    raceName: string;
  };
}

export function CurrentDriverRaceStandingsWidget({
  raceResults,
}: raceResultsProps) {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "driverName",
      width: 150,
    },
    {
      headerName: "Bahrain" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.0.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Jeddah" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.1.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Albert Park" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.2.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Baku" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.3.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Miami" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.4.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Imola" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.5.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Monaco" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.6.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Spain" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.7.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Canada" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.8.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Austria" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.9.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Britian" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.10.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Hungary" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.11.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Belgium" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.12.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Netherlands" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.13.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Monza" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.14.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Singapore" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.15.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Japan" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.16.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Qatar" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.17.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "COTA" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.18.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Mexico" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.19.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Brazil" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.20.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Vegas" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.21.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      headerName: "Abu Dhabi" as string,
      headerClass: "ag-theme-groups-even right-group" as string,
      children: [
        {
          headerName: "Points" as string,
          headerClass: "sub-headers" as string,
          width: 100,
          field: "results.22.points",
          comparator: (valueA: number, valueB: number) => valueA - valueB,
          cellClass: "centered",
        },
      ],
    },
    {
      field: "totalPoints",
      headerName: "Total",
      comparator: (valueA: number, valueB: number) => valueA - valueB,
      sort: "desc" as string,
      width: 100,
      headerClass: "sub-headers" as string,
      cellClass: "my-class",
    },
  ]);

  useEffect(() => {
    const driverArray = driver.map((dr) => {
      const driverResults = raceResults.filter((race) =>
        race?.raceResults.Results.some(
          (result) => result.Driver.driverId === dr.driverId
        )
      );

      const results = driverResults.map((result) => {
        const raceResult = result.raceResults.Results.find(
          (r) => r.Driver.driverId === dr.driverId
        );
        return {
          round: result.round,
          position: raceResult?.position ?? "DNF",
          time: raceResult?.Time?.time ?? "DNF",
          points: raceResult?.points,
          raceName: result.raceResults.raceName,
        };
      });

      return {
        driverId: dr.driverId,
        driverName: dr.name,
        results: results,
      };
    });

    const driversWithTotalPoints = driverArray.map((driver) => {
      const totalPoints = driver.results.reduce((accumulator, result) => {
        return accumulator + parseInt(result.points as string);
      }, 0);

      return {
        ...driver,
        totalPoints,
      };
    });

    // console.log(driversWithTotalPoints);

    setRowData(driversWithTotalPoints as any);
  }, [raceResults]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      suppressMovable: true,
    }),
    []
  );
  if (!rowData) return null;
  return (
    <div className="p-2 rounded-2xl border-gray-300 border-2">
      <h3 className="p-2 font-bold">Race Overview (Driver)</h3>
      <div className="ag-theme-f1" style={{ height: "950px", width: "800px" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs as any}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
}
