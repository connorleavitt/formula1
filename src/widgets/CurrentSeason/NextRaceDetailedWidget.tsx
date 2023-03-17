import { useEffect, useState } from "react";
import { differenceInSeconds, formatDuration, parseISO } from "date-fns";
import trackInfo from "../../data/trackInfo.json";

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

type NextRaceWidgetProps = {
  raceSchedule: RaceSchedule[];
};

export function NextRaceDetailedWidget({ raceSchedule }: NextRaceWidgetProps) {
  const [nextRace, setNextRace] = useState<RaceSchedule | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    // sort the races by date in ascending order
    const sortedRaces = raceSchedule.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // find the first race that is in the future compared to the current date
    const race = sortedRaces.find((race) => new Date(race.date) > now);

    if (race) {
      setNextRace(race);
      const raceDate = parseISO(race.date + "T" + race.time);
      const diffInSeconds = differenceInSeconds(raceDate, now);
      setRemainingSeconds(diffInSeconds);
      const intervalId = setInterval(() => {
        setRemainingSeconds((prevRemainingSeconds) =>
          prevRemainingSeconds ? prevRemainingSeconds - 1 : null
        );
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [raceSchedule]);

  function secondsToHms(d: number) {
    d = Number(d);
    const days = Math.floor(d / (3600 * 24));
    const hours = Math.floor((d % (3600 * 24)) / 3600);
    const minutes = Math.floor((d % 3600) / 60);
    const seconds = Math.floor(d % 60);
    return {
      days,
      hours,
      minutes,
      seconds,
    };
    // return `${days > 0 ? days : ""}${("0" + hours).slice(-2)}:${(
    //   "0" + minutes
    // ).slice(-2)}:${("0" + seconds).slice(-2)}`;
  }

  const formattedCountdown = secondsToHms(remainingSeconds as number);

  if (!nextRace) {
    return null; // no next race found
  }

  const macthedNextRace = trackInfo.find(
    (track) => track.circuitId === nextRace.Circuit.circuitId
  );

  const combinedNextRace = {
    ...nextRace,
    Circuit: {
      ...macthedNextRace,
    },
  };

  // format the race date range
  // const firstPracticeDate = new Date(nextRace.FirstPractice.date);
  // const raceDate = new Date(nextRace.date);

  //using date-fns
  const firstPracticeDate = parseISO(
    nextRace.FirstPractice.date + "T" + nextRace.FirstPractice.time
  );
  const secondPracticeDate = parseISO(
    nextRace.SecondPractice.date + "T" + nextRace.SecondPractice.time
  );
  const thirdPracticeDate = parseISO(
    nextRace.ThirdPractice.date + "T" + nextRace.ThirdPractice.time
  );
  const qualifyingDate = parseISO(
    nextRace.Qualifying.date + "T" + nextRace.Qualifying.time
  );
  const raceDate = parseISO(
    combinedNextRace.date + "T" + combinedNextRace.time
  );

  const firstPracticeDayOfWeek = firstPracticeDate.toLocaleString("en-US", {
    weekday: "short",
  });
  const firstPracticeDayOfMonth = firstPracticeDate.toLocaleString("en-US", {
    day: "numeric",
  });
  const raceDayOfWeek = raceDate.toLocaleString("en-US", {
    weekday: "short",
  });
  const raceDayOfMonth = raceDate.toLocaleString("en-US", {
    day: "numeric",
  });

  const raceDateRangeDays = `${firstPracticeDayOfWeek} - ${raceDayOfWeek}`;
  const raceMonth = raceDate.toLocaleString("en-US", { month: "short" });
  const raceDateRangeDates = `${firstPracticeDayOfMonth} - ${raceDayOfMonth} ${raceMonth}`;

  return (
    <div className="my-4 flex">
      <div className="w-max countdown-container flex flex-col justify-around rounded-lg p-2">
        {/* <p className="p-2 font-bold">Countdown to Race:</p> */}
        <div className="flex flex-col items-center p-2">
          <p className="text-2xl font-bold">{formattedCountdown.days}</p>
          <p className="text-xs">DAYS</p>
        </div>
        <div className="flex flex-col items-center p-2">
          <p className="text-2xl font-bold">{formattedCountdown.hours}</p>
          <p className="text-xs">HRS</p>
        </div>
        <div className="flex flex-col items-center p-2">
          <p className="text-2xl font-bold">{formattedCountdown.minutes}</p>
          <p className="text-xs">MINS</p>
        </div>
        <div className="flex flex-col items-center p-2">
          <p className="text-2xl font-bold">{formattedCountdown.seconds}</p>
          <p className="text-xs">SECS</p>
        </div>
      </div>
      <div className="ml-4">
        <h3 className="p-2 text-2xl">
          <span className="font-bold"> Next Race </span>
          (Round {combinedNextRace.round})
        </h3>
        <div className="flex flex-col p-2 pr-4 border-t-4 border-r-8 border-red-500 border-double w-96">
          <h3 className="p-1 mb-1 font-bold">{`${combinedNextRace.raceName}`}</h3>
          <div className="bg-gray-200 rounded-md">
            <div className="flex p-2 justify-between">
              <div className="w-[100px]">Practice 1</div>
              <div className="w-[100px] text-center">
                {new Date(firstPracticeDate).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="w-[100px] text-right">
                {new Date(firstPracticeDate).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>
            </div>
            <div className="flex p-2 justify-between">
              <div className="w-[100px]">Practice 2</div>
              <div className="w-[100px] text-center">
                {new Date(secondPracticeDate).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="w-[100px] text-right">
                {new Date(secondPracticeDate).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>
            </div>
            <div className="flex p-2 justify-between">
              <div className="w-[100px]">Practice 3</div>
              <div className="w-[100px] text-center">
                {new Date(thirdPracticeDate).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="w-[100px] text-right">
                {new Date(thirdPracticeDate).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>
            </div>
            <div className="flex p-2 justify-between">
              <div className="w-[100px]">Qualifying</div>
              <div className="w-[100px] text-center">
                {new Date(qualifyingDate).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="w-[100px] text-right">
                {new Date(qualifyingDate).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>
            </div>
            {combinedNextRace.Sprint && (
              <div className="flex p-2 justify-between">
                <div className="w-[100px]">Sprint</div>
                <div className="w-[100px]">
                  {new Date(
                    parseISO(
                      combinedNextRace.Sprint.date +
                        "T" +
                        combinedNextRace.Sprint.time
                    )
                  ).toLocaleString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="w-[100px] text-right">
                  {new Date(
                    parseISO(
                      combinedNextRace.Sprint.date +
                        "T" +
                        combinedNextRace.Sprint.time
                    )
                  ).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </div>
              </div>
            )}
            <div className="flex p-2 justify-between">
              <div className="w-[100px]">Race</div>
              <div className="w-[100px] text-center">
                {new Date(raceDate).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="w-[100px] text-right">
                {new Date(raceDate).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
