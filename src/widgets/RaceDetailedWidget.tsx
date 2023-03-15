import { useEffect, useState } from "react";

type raceSchedule = {
  raceSchedule: {
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
  };
};

export function NextRaceDetailedWidget({ raceSchedule }: raceSchedule) {
  const [raceDateRange, setRaceDateRange] = useState("");

  useEffect(() => {
    const firstPracticeDate = new Date(raceSchedule.FirstPractice.date);
    const raceDate = new Date(raceSchedule.date);

    const firstPracticeDayOfWeek = firstPracticeDate.toLocaleString("en-US", {
      weekday: "short",
    });
    const raceDayOfWeek = raceDate.toLocaleString("en-US", {
      weekday: "short",
    });

    setRaceDateRange(
      `${firstPracticeDayOfWeek} - ${raceDayOfWeek}, ${raceDate.getFullYear()}`
    );
  }, [raceSchedule]);

  return <div className="p-2">GFHJK</div>;
}
