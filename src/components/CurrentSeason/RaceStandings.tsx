import { parseISO } from "date-fns";
import trackInfo from "../../data/trackInfo.json";
import React, { useEffect, useState } from "react";
import { RaceResultsQualifyingWidget } from "../../widgets/CurrentSeason/RaceResultsQualifyingWidget";
import { RaceResultsFastestLapsWidget } from "../../widgets/CurrentSeason/RaceResultsFastestLapsWidget";
import { RaceResultsStartingGridWidget } from "../../widgets/CurrentSeason/RaceResultsStartingGridWidget";
import { RaceResultsDriverWidget } from "../../widgets/CurrentSeason/RaceResultsDriverWidget";
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
  activeRace: string;
  raceSchedule: RaceSchedule[];
};

export function RaceStandings({
  raceResults,
  qualiStandings,
  sprintResults,
  screenWidth,
  raceSchedule,
  activeRace,
}: ResultsProps) {
  const [raceTrackInfo, setRaceTrackInfo] = useState<RaceSchedule>();
  const [activeData, setActiveData] = useState("result");
  const [selectedQuali, setSelectedQuali] = useState<QualiResults | null>(null);
  const [selectedRace, setSelectedRace] = useState<UpdatedRacesResults | null>(
    raceResults[0]
  );

  useEffect(() => {
    const race = raceResults.find(
      (race) => race?.Circuit.circuitId === activeRace
    );
    const quali = qualiStandings.find(
      (object) => object.Circuit.circuitId === activeRace
    );
    const truncatedRaceSchedule = raceSchedule.map((value: any) => {
      return {
        ...value,
        circuitId: value.Circuit.circuitId,
      };
    });
    const updatedRaceSchedule = truncatedRaceSchedule.map((value) => {
      const additionalInfo = trackInfo.find(
        (race) => race.circuitId === value.Circuit.circuitId
      );

      return {
        ...value,
        additionalInfo,
      };
    });
    const raceChoice = updatedRaceSchedule.find(
      (race) => race?.Circuit.circuitId === activeRace
    );
    setRaceTrackInfo(raceChoice as any);
    setSelectedRace(race as UpdatedRacesResults);
    setSelectedQuali(quali as QualiResults);
  }, [raceResults, activeRace]);

  if (!raceTrackInfo) return null;

  const raceDateFuture = parseISO(
    raceTrackInfo.date + "T" + raceTrackInfo.time
  );

  if (!selectedRace || !selectedQuali) {
    return (
      <div>
        <div className="m-2 flex flex-col">
          <div className="flex justify-between">
            <p className="text-xs">Round {raceTrackInfo.round}</p>
            <p className="text-xs">
              {new Date(raceDateFuture).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-sm">
                {raceTrackInfo.Circuit?.Location?.locality},{" "}
                {raceTrackInfo.Circuit?.Location?.country}
              </p>
              <p className="font-bold">{raceTrackInfo.Circuit?.circuitName}</p>
            </div>
            <img
              className="rounded-sm w-16 border-2 border-gray-200"
              src={raceTrackInfo.additionalInfo.flagUrl}
              alt={raceTrackInfo.Circuit.circuitName}
            />
          </div>
        </div>
        <p className="m-2 text-sm">
          No results yet! Check back after the race has occured.
        </p>
      </div>
    );
    // no next race found
  }

  const raceDate = parseISO(selectedRace.date + "T" + selectedRace.time);

  return (
    <div className="">
      <div className="my-3 w-full">
        <label htmlFor="results--widget-select"></label>
        <select
          id="results--widget-select"
          value={activeData}
          onChange={(event) => setActiveData(event.target.value)}
          className="p-2 standings--widget-select rounded-lg w-full"
        >
          <option value="result">Race Result</option>
          <option value="fastest">Fastest Laps</option>
          <option value="pit">Pit Stop Summary</option>
          <option value="grid">Starting Grid</option>
          <option value="qualifying">Qualifying</option>
          <option value="p1">Practice 1</option>
          <option value="p2">Practice 2</option>
          <option value="p3">Practice 3</option>
        </select>
      </div>
      <div className="m-2 flex flex-col">
        <div className="flex justify-between">
          <p className="text-xs">Round {selectedRace.round}</p>
          <p className="text-xs">
            {new Date(raceDate).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-sm">
              {selectedRace.Circuit?.Location?.locality},{" "}
              {selectedRace.Circuit?.Location?.country}
            </p>
            <p className="font-bold">{selectedRace.Circuit?.circuitName}</p>
          </div>
          <img
            className="rounded-sm w-16 border-2 border-gray-200"
            src={selectedRace.additionalInfo.flagUrl}
            alt={selectedRace.Circuit.circuitName}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        <div className={activeData === "result" ? "block" : "hidden"}>
          <RaceResultsDriverWidget
            raceResult={selectedRace}
            screenWidth={screenWidth}
          />
        </div>
        <div className={activeData === "grid" ? "block" : "hidden"}>
          <RaceResultsStartingGridWidget
            raceResult={selectedRace}
            qualiResult={selectedQuali}
            screenWidth={screenWidth}
          />
        </div>
        <div className={activeData === "fastest" ? "block" : "hidden"}>
          <RaceResultsFastestLapsWidget
            raceResult={selectedRace}
            screenWidth={screenWidth}
          />
        </div>
        <div className={activeData === "qualifying" ? "block" : "hidden"}>
          <RaceResultsQualifyingWidget
            qualiResult={selectedQuali}
            screenWidth={screenWidth}
          />
        </div>
      </div>
    </div>
  );
}
