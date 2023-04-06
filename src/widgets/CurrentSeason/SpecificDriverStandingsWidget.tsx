import { useEffect, useMemo, useState } from "react";
import driverInfo from "../../data/driver.json";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type UpdatedRacesResults = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  circuitId: string;
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
  localRaceDateTime: string;
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
  additionalInfo: {
    circuitId: string;
    imgUrl: string;
    heroImgUrl: string;
    flagUrl: string;
    url: string;
    circuitUrl: string;
    circuitName: string;
    laps: string;
    circuitLength: string;
    raceLength: string;
    firstGrandPrix: string;
    lapRecord: {
      time: string;
      driver: string;
      year: string;
    };
    qualiRecord: {
      time: string;
      driver: string;
      year: string;
    };
    numberOfTimesHeld: string;
    mostDriverWins: string;
    mostConstructorWins: string;
    trackType: string;
    trackComments: string;
    grandPrixComments: {
      1: string;
      2: string;
      3: string;
    };
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
      timezone: string;
      gmtOffset: string;
    };
  };
};
type sprintResultsProp = {
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
  SprintResults: [
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
type QualiResults = {
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
  QualifyingResults: [
    {
      number: string;
      position: string;
      Driver: {
        driverId: string;
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
      Q1: string;
      Q2: string;
      Q3: string;
    }
  ];
};

type RaceSchedule = {
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
  date: string;
  time: string;
  // localRaceDateTime: string;
  FirstPractice: {
    date: string;
    time: string;
  };
  SecondPractice: {
    date: string;
    time: string;
  };
  ThirdPractice: {
    date: string;
    time: string;
  };
  Qualifying: {
    date: string;
    time: string;
  };
  Sprint: {
    date: string;
    time: string;
  };
  additionalInfo: {
    circuitId: string;
    imgUrl: string;
    heroImgUrl: string;
    flagUrl: string;
    url: string;
    circuitUrl: string;
    circuitName: string;
    laps: string;
    circuitLength: string;
    raceLength: string;
    firstGrandPrix: string;
    lapRecord: {
      time: string;
      driver: string;
      year: string;
    };
    qualiRecord: {
      time: string;
      driver: string;
      year: string;
    };
    numberOfTimesHeld: string;
    mostDriverWins: string;
    mostConstructorWins: string;
    trackType: string;
    trackComments: string;
    grandPrixComments: {
      1: string;
      2: string;
      3: string;
    };
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
      timezone: string;
      gmtOffset: string;
    };
  };
};
type ResultsProps = {
  raceResults: UpdatedRacesResults[];
  qualiStandings: QualiResults[];
  sprintResults: sprintResultsProp[];
  screenWidth: number;
  activeSpecificDriver: string;
  raceSchedule: RaceSchedule[];
};
type DriverDataProps = {
  constructorId: string;
  driverId: string;
  driverName: string;
  driverCode: string;
  raceResultsArray: [
    {
      round: string;
      country: string;
      position: string;
      time: string;
      points: string;
      raceName: string;
      test: string;
    }
  ];
  sprintResultsArray: sprintResultsProp[];
  qualiResultsArray: [
    {
      round: string;
      qualiInfo: {
        number: string;
        position: string;
        Driver: {
          driverId: string;
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
        Q1: string;
        Q2: string;
        Q3: string;
      };
      raceName: string;
    }
  ];

  combinedPointsArray: [
    {
      round: string;
      combinedPoints: number;
      raceName: string;
      country: string;
    }
  ];
  totalPoints: number;
};

export function SpecificDriverStandingsWidget({
  raceResults,
  qualiStandings,
  sprintResults,
  screenWidth,
  raceSchedule,
  activeSpecificDriver,
}: ResultsProps) {
  const mobilePinned = screenWidth <= 450 ? "left" : "";
  const mobileWidth = screenWidth <= 450 ? screenWidth - 32 : 1162;

  const [driverToggle, setDriverToggle] = useState(
    screenWidth <= 450 ? false : true
  );
  const [driverData, setDriverData] = useState<DriverDataProps>();

  useEffect(() => {
    const driverRaceArray = driverInfo.map((dr) => {
      const driverResults = raceResults.filter((race) =>
        race?.Results.some((result) => result.Driver.driverId === dr.driverId)
      );

      const qualiResults = qualiStandings.filter((race) =>
        race?.QualifyingResults.some(
          (result) => result.Driver.driverId === dr.driverId
        )
      );

      //check if race also had a sprint race to add those points
      const driverSprintResults = sprintResults.filter((race) =>
        race?.SprintResults.some(
          (result) => result.Driver.driverId === dr.driverId
        )
      );

      const sprintResultsArray = driverSprintResults.map((result) => {
        const sprintResult = result.SprintResults.find(
          (r) => r.Driver.driverId === dr.driverId
        );
        return {
          round: result.round,
          position: sprintResult?.position ?? "DNF",
          time: sprintResult?.Time?.time ?? "DNF",
          points: sprintResult?.points,
          raceName: result.raceName,
        };
      });

      const qualiResultsArray = qualiResults.map((result) => {
        const qauliResult = result.QualifyingResults.find(
          (r) => r.Driver.driverId === dr.driverId
        );
        return {
          round: result.round,
          qualiInfo: qauliResult,
          raceName: result.raceName,
        };
      });

      const raceResultsArray = driverResults.map((result) => {
        const raceResult = result.Results.find(
          (r) => r.Driver.driverId === dr.driverId
        );
        return {
          round: result.round,
          country: result.Circuit.Location.country,
          position: raceResult?.position ?? "DNF",
          time: raceResult?.Time?.time ?? "DNF",
          points: raceResult?.points,
          raceName: result.raceName,
          test: raceResult?.status,
        };
      });

      const combinedPointsArray = raceResultsArray.map((raceResult) => {
        const sprintResult = sprintResultsArray.find(
          (sprintResult) => sprintResult.round === raceResult.round
        );
        const combinedPoints =
          (Number(raceResult.points) ?? 0) + Number(sprintResult?.points ?? 0);
        return {
          round: raceResult.round,
          combinedPoints: combinedPoints,
          raceName: raceResult.raceName,
          country: raceResult.country,
        };
      });

      return {
        constructorId: dr.team,
        driverId: dr.driverId,
        driverName: dr.name,
        driverCode: dr.code,
        raceResultsArray: raceResultsArray,
        sprintResultsArray: sprintResultsArray,
        qualiResultsArray: qualiResultsArray,
        combinedPointsArray: combinedPointsArray,
      };
    });
    const driversWithTotalPoints = driverRaceArray.map((driver) => {
      const racePoints = driver.raceResultsArray.reduce(
        (accumulator, result) => {
          return accumulator + parseInt(result.points as string);
        },
        0
      );

      const sprintPoints = driver.sprintResultsArray.reduce(
        (accumulator, result) => {
          return accumulator + parseInt(result.points as string);
        },
        0
      );

      const totalPoints = racePoints + sprintPoints;

      return {
        ...driver,
        totalPoints,
      };
    });

    const specificDriverInfo = driversWithTotalPoints.find(
      (driverCodeInfo) => driverCodeInfo.driverCode === activeSpecificDriver
    );

    setDriverData(specificDriverInfo as any);
  }, [raceResults, sprintResults, activeSpecificDriver]);

  if (!driverData) return null;
  function handleClick() {
    // setColumnDefs(colData);
    setDriverToggle(!driverToggle);
  }

  const updatedData = {
    ...driverData,
    breakdownByCountry: driverData.raceResultsArray.map((raceResult) => {
      const quali = driverData.qualiResultsArray.find((qualiResult) => {
        return qualiResult.round === raceResult.round;
      });

      return {
        round: raceResult.round,
        country: raceResult.country,
        racePosition: raceResult.position,
        raceTime: raceResult.time,
        racePoints: raceResult.points,
        raceName: raceResult.raceName,
        testing: raceResult.test,
        qualiInfo: quali?.qualiInfo,
        combinedPoints: driverData.combinedPointsArray.find(
          (combinedPoints) => combinedPoints.round === raceResult.round
        )?.combinedPoints,
      };
    }),
  };

  return (
    <div className="flex flex-col">
      <button
        className={`p-1 border-2 standings-btn rounded-lg my-4 mx-auto text-sm ${
          screenWidth <= 450 ? "w-full " : "w-max"
        }`}
        onClick={handleClick}
      >
        {driverToggle ? "Show Driver Code" : "Show Driver Name"}
      </button>
      <div>Total Season Points: {driverData.totalPoints}</div>
      <div className="flex justify-between text-xs text-gray-500 my-1">
        <p className="w-28">GRAND PRIX</p>
        <p className="w-24">QUALIFYING</p>
        <p className="w-12 flex-auto">RACE POSITION</p>
        <p className="w-8">PTS</p>
      </div>
      {updatedData.breakdownByCountry.map((selectedCountry) => (
        <div
          key={selectedCountry.round}
          className="flex justify-between py-1 [&:nth-child(odd)]:bg-gray-100
[&:nth-child(even)]:bg-gray-200"
        >
          <p className="w-28">{selectedCountry.country}</p>
          <p className="w-24">{selectedCountry?.qualiInfo?.position}</p>
          <p className="w-12 flex-auto">{selectedCountry.racePosition}</p>
          <p className="w-8">{selectedCountry.combinedPoints}</p>
        </div>
      ))}
      {driverInfo.map((driver) => (
        <div
          className="flex flex-col"
          key={driver.id}
          style={{
            display: activeSpecificDriver === driver.code ? "block" : "none",
          }}
        >
          <div>{driver.code}</div>
          <div>{driver.dateOfBirth}</div>
          <div>{driver.nationality}</div>
          <div>{driver.permanentNumber}</div>
          <div>{driver.team}</div>
          <div>{driver.url}</div>
        </div>
      ))}
    </div>
  );
}
