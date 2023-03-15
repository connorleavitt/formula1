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

  const raceDateRange = `${firstPracticeDayOfWeek} ${firstPracticeDayOfMonth} - ${raceDayOfWeek} ${raceDayOfMonth}`;

  const raceMonth = raceDate.toLocaleString("en-US", { month: "short" });

  return (
    <div className="p-2 w-max">
      <h3 className="p-2 font-bold">{`Next - Round ${nextRace.round} - ${nextRace.raceName}`}</h3>
      <div className="flex justify-between m-2 w-1/2">
        <p>{raceDateRange}</p>
        <div className="py-1 px-2 bg-gray-400 rounded-lg">{raceMonth}</div>
      </div>
      <table className="bg-red-200 rounded-md">
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Time (local)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>First Practice</td>
            <td className="text-center">
              {new Date(nextRace.FirstPractice.date).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </td>
            <td className="text-center">
              {new Date(
                nextRace.FirstPractice.date + " " + nextRace.FirstPractice.time
              ).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </td>
          </tr>
          <tr>
            <td>Second Practice</td>
            <td className="text-center">
              {new Date(nextRace.SecondPractice.date).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </td>
            <td className="text-center">
              {new Date(
                nextRace.SecondPractice.date +
                  " " +
                  nextRace.SecondPractice.time
              ).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </td>
          </tr>
          <tr>
            <td>Third Practice</td>
            <td className="text-center">
              {new Date(nextRace.ThirdPractice.date).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </td>
            <td className="text-center">
              {new Date(
                nextRace.ThirdPractice.date + " " + nextRace.ThirdPractice.time
              ).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </td>
          </tr>
          <tr>
            <td>Qualifying</td>
            <td className="text-center">
              {new Date(nextRace.Qualifying.date).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </td>
            <td className="text-center">
              {new Date(
                nextRace.Qualifying.date + " " + nextRace.Qualifying.time
              ).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </td>
          </tr>
          {nextRace.Sprint && (
            <tr>
              <td>Sprint</td>
              <td className="text-center">
                {new Date(nextRace.Sprint.date).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="text-center">
                {new Date(
                  nextRace.Sprint.date + " " + nextRace.Sprint.time
                ).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </td>
            </tr>
          )}
          <tr>
            <td>Race</td>
            <td className="text-center">
              {new Date(nextRace.date).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </td>
            <td className="text-center">
              {new Date(nextRace.date + " " + nextRace.time).toLocaleString(
                "en-US",
                {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
