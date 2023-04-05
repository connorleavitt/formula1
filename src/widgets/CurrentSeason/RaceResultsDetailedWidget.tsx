import { useEffect, useRef, useState } from "react";
import { RaceResultsDriver } from "../../components/CurrentSeason/RaceResultsDriver";

type RacesResultsProps = {
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

type CircuitInfo = {
  raceName: string;
  date: string;
  time: string;
  round: string;
  circuitId: string;
};

type RaceResultsDetailedWidgetProps = {
  raceResults: RacesResultsProps[];
  circuit: CircuitInfo;
  screenWidth: number;
};

export function RaceResultsDetailedWidget({
  circuit,
  raceResults,
  screenWidth,
}: RaceResultsDetailedWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLHeadingElement>(null);

  const [selectedRace, setSelectedRace] = useState<RacesResultsProps | null>(
    null
  );

  const [isRaceNameSticky, setIsRaceNameSticky] = useState(false);

  useEffect(() => {
    const race = raceResults.find(
      (object) => object.circuitId === circuit.circuitId
    );
    setSelectedRace(race as RacesResultsProps);
  }, [raceResults]);

  useEffect(() => {
    const handleScroll = () => {
      const div = mainContentRef.current;
      if (div) {
        if (div.getBoundingClientRect().top <= 130) {
          setIsRaceNameSticky(true);
        } else {
          setIsRaceNameSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!selectedRace) {
    return null; // no next race found
  }

  return (
    <div
      // ref={containerRef}
      className="flex flex-col"
    >
      <RaceResultsDriver raceResult={selectedRace} screenWidth={screenWidth} />
    </div>
  );
}
