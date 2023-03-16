import { useEffect, useState } from "react";

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
    }
  }, [raceSchedule]);

  if (!nextRace) {
    return null; // no next race found
  }

  // format the race date range
  const firstPracticeDate = new Date(nextRace.FirstPractice.date);
  const raceDate = new Date(nextRace.date);

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

  const raceDateRange = `${firstPracticeDayOfWeek} (${firstPracticeDayOfMonth}) - ${raceDayOfWeek} (${raceDayOfMonth})`;

  const raceMonth = raceDate.toLocaleString("en-US", { month: "short" });

  return (
    <div className="p-2 w-max border-t-4 border-r-8 border-red-500 border-double">
      <h3 className="p-2 font-bold">{`Round ${nextRace.round} - ${nextRace.raceName}`}</h3>
      <div className="flex m-2 justify-between">
        <div className="flex flex-col items-center">
          <p className="px-4">{raceDateRange}</p>
          <div className="px-2 my-2">{raceMonth}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-bold">{nextRace.Circuit.Location.locality}</div>
          <div className="mt-2">{nextRace.Circuit.Location.country}</div>
        </div>
      </div>
      <div className="bg-gray-200 rounded-md">
        <div className="flex p-2 justify-between">
          <div className="w-[100px]">Practice 1</div>
          <div className="w-[100px] text-center">
            {new Date(nextRace.FirstPractice.date).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="w-[100px] text-right">
            {new Date(
              nextRace.FirstPractice.date + " " + nextRace.FirstPractice.time
            ).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </div>
        </div>
        <div className="flex p-2 justify-between">
          <div className="w-[100px]">Practice 2</div>
          <div className="w-[100px] text-center">
            {new Date(nextRace.SecondPractice.date).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="w-[100px] text-right">
            {new Date(
              nextRace.SecondPractice.date + " " + nextRace.SecondPractice.time
            ).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </div>
        </div>
        <div className="flex p-2 justify-between">
          <div className="w-[100px]">Practice 3</div>
          <div className="w-[100px] text-center">
            {new Date(nextRace.ThirdPractice.date).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="w-[100px] text-right">
            {new Date(
              nextRace.ThirdPractice.date + " " + nextRace.ThirdPractice.time
            ).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </div>
        </div>
        <div className="flex p-2 justify-between">
          <div className="w-[100px]">Qualifying</div>
          <div className="w-[100px] text-center">
            {new Date(nextRace.Qualifying.date).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="w-[100px] text-right">
            {new Date(
              nextRace.Qualifying.date + " " + nextRace.Qualifying.time
            ).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </div>
        </div>
        {nextRace.Sprint && (
          <div className="flex p-2 justify-between">
            <div className="w-[100px]">Sprint</div>
            <div className="w-[100px]">
              {new Date(nextRace.Sprint.date).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="w-[100px] text-right">
              {new Date(
                nextRace.Sprint.date + " " + nextRace.Sprint.time
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
            {new Date(nextRace.date).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="w-[100px] text-right">
            {new Date(nextRace.date + " " + nextRace.time).toLocaleString(
              "en-US",
              {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
