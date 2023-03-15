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

  return (
    <div className="p-2">
      <h3 className="p-2 font-bold">{`Next - Round ${raceSchedule.round} - ${raceSchedule.raceName}`}</h3>

      <p>{raceDateRange}</p>

      <table>
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
            <td>
              {new Date(raceSchedule.firstPracticeDate).toLocaleString(
                "en-US",
                {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                }
              )}
            </td>
            <td>{raceSchedule.firstPracticeTime}</td>
          </tr>
          <tr>
            <td>Qualifying</td>
            <td>
              {new Date(raceSchedule.qualifyingDate).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </td>
            <td>{raceSchedule.qualifyingTime}</td>
          </tr>
          <tr>
            <td>Second Practice</td>
            <td>
              {new Date(raceSchedule.secondPracticeDate).toLocaleString(
                "en-US",
                {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                }
              )}
            </td>
            <td>{raceSchedule.secondPracticeTime}</td>
          </tr>
          <tr>
            <td>Sprint</td>
            <td>
              {new Date(raceSchedule.sprintDate).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </td>
            <td>{raceSchedule.sprintTime}</td>
          </tr>
          <tr>
            <td>Race</td>
            <td>
              {new Date(raceSchedule.date).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </td>
            <td>{raceSchedule.time}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
