import { useEffect, useState } from "react";
import { RaceResultsDriverWidget } from "../../widgets/CurrentSeason/RaceResultsDriverWidget";
import { RaceResultsFastestLapsWidget } from "../../widgets/CurrentSeason/RaceResultsFastestLapsWidget";
import { RaceResultsQualifyingWidget } from "../../widgets/CurrentSeason/RaceResultsQualifyingWidget";
import { RaceResultsStartingGridWidget } from "../../widgets/CurrentSeason/RaceResultsStartingGridWidget";
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
type ResultsProps = {
  raceResults: UpdatedRacesResults[];
  qualiStandings: QualiResults[];
  sprintResults: sprintResultsProp[];
  screenWidth: number;
  activeRace: string;
};

export function RaceStandings({
  raceResults,
  qualiStandings,
  sprintResults,
  screenWidth,
  activeRace,
}: ResultsProps) {
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

    setSelectedRace(race as UpdatedRacesResults);
    setSelectedQuali(quali as QualiResults);
  }, [raceResults, activeRace]);

  if (!selectedRace || !selectedQuali) {
    return <p>No results yet! Check back after the race.</p>;
    // no next race found
  }

  return (
    <div className="">
      <div className="my-2 w-full">
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
      <div className="flex justify-between">
        {/* <h3 className="text-sm">{selectedRace.Circuit.Location.locality}</h3> */}
        <h1 className="text-md font-bold">
          {selectedRace.Circuit.circuitName}
        </h1>
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
