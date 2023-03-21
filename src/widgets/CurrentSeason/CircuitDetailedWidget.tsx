import { useEffect, useState } from "react";
import { differenceInSeconds, parseISO } from "date-fns";
import trackInfo from "../../data/trackInfo.json";
import { ICON_MAP } from "../../utilities/Weather/iconMap";
import icons from "../../utilities/Weather/icons.json";
import {
  getRaceDayWeather,
  // getWeather,
} from "../../utilities/Weather/getWeather";

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
  localRaceDateTime: string;
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

type CircuitInfo = {
  raceName: string;
  date: string;
  time: string;
  round: number;
  circuitId: string;
};

type CircuitDetailedWidgetProps = {
  raceSchedule: RaceSchedule[];
  circuit: CircuitInfo;
  raceDayTrackWeather: TrackWeather;
  weatherIcon: WeatherIcon;
};

type TrackWeather = {
  current: {
    currentTemp: number;
    highTemp: number;
    lowTemp: number;
    feelsLikeHigh: number;
    feelsLikeLow: number;
    windSpeed: number;
    precip: number;
    iconCode: number;
  };
  daily: [
    {
      timestamp: number;
      iconCode: number;
      maxTemp: number;
    }
  ];
  hourly: [
    {
      timestamp: number;
      iconCode: number;
      temp: number;
      feelsLike: number;
      windSpeed: number;
      precip: number;
    }
  ];
};

type WeatherIcon = {
  weather: string;
  viewBox: string;
  d: string;
};

export function CircuitDetailedWidget({
  circuit,
  raceSchedule,
  raceDayTrackWeather,
  weatherIcon,
}: CircuitDetailedWidgetProps) {
  const [selectedRace, setSelectedRace] = useState<RaceSchedule | null>(null);
  const [nextRace, setNextRace] = useState<RaceSchedule | null>(null);
  // const [raceDayTrackWeather, setRaceDayTrackWeather] =
  //   useState<TrackWeather | null>(null);
  // const [weatherIcon, setWeatherIcon] = useState<WeatherIcon | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  useEffect(() => {
    const selected = raceSchedule.find(
      (race) => race.Circuit.circuitId === circuit.circuitId
    );
    const currentDate = new Date();

    // Filter races with date greater than current date
    const futureRaces = raceSchedule.filter((race: any) => {
      const raceDate = new Date(race.date + "T" + race.time);
      return raceDate > currentDate;
    });
    const nextRaceDate = new Date(
      futureRaces[0].date + "T" + futureRaces[0].time
    );
    console.log(nextRaceDate, currentDate);
    // Sort future races by round (ascending order)
    futureRaces.sort((a: any, b: any) => a.round - b.round);

    if (selected) {
      setSelectedRace(selected as RaceSchedule);
      if (nextRaceDate - currentDate) setNextRace(futureRaces[0]);
    }
  }, [raceSchedule]);

  if (!selectedRace) {
    return null; // no next race found
  }

  //using date-fns
  const firstPracticeDate = parseISO(
    selectedRace.FirstPractice.date + "T" + selectedRace.FirstPractice.time
  );
  const secondPracticeDate = parseISO(
    selectedRace.SecondPractice.date + "T" + selectedRace.SecondPractice.time
  );
  const qualifyingDate = parseISO(
    selectedRace.Qualifying.date + "T" + selectedRace.Qualifying.time
  );
  const raceDate = parseISO(selectedRace.date + "T" + selectedRace.time);

  const macthedNextRace = trackInfo.find(
    (track) => track.circuitId === selectedRace.Circuit.circuitId
  );

  const selectedRaceCombined = {
    ...selectedRace,
    Circuit: {
      ...macthedNextRace,
    },
  };

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

  const mainHourWeather = selectedRace.localRaceDateTime.slice(11, 13);
  console.log(mainHourWeather, raceDayTrackWeather);

  return (
    <div>
      <h2 className="p-2 text-lg font-bold">Circuit Info</h2>
      <div className="flex p-2 w-[1000px] border-t-4 rounded-sm border-r-8 border-red-500">
        <div>
          <h3 className="p-2 font-bold">{`Round ${selectedRaceCombined.round} - ${selectedRaceCombined.raceName}`}</h3>
          <div className="flex justify-between mb-4">
            <div className="circuit-location">
              <p className="text-lg">
                {selectedRaceCombined.Circuit?.Location?.locality}
              </p>
              <p className="font-bold text-4xl">
                {selectedRaceCombined.Circuit?.Location?.country}
              </p>
            </div>
            <div className="flex flex-col circuit-laps justify-center items-end">
              <p className="font-bold text-4xl">
                {selectedRaceCombined.Circuit.laps}
              </p>
              <p className="text-sm">LAPS</p>
            </div>
          </div>
          <div className="circuit-times-table rounded-md">
            <div className="flex p-2 justify-between">
              <div className="w-[100px] font-bold">Practice 1</div>
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
              <div className="w-[100px] font-bold">Practice 2</div>
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
            {selectedRace.ThirdPractice && (
              <div className="flex p-2 justify-between">
                <div className="w-[100px] font-bold">Practice 3</div>
                <div className="w-[100px] text-center">
                  {new Date(
                    selectedRaceCombined.ThirdPractice.date +
                      "T" +
                      selectedRaceCombined.ThirdPractice.time
                  ).toLocaleString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="w-[100px] text-right">
                  {new Date(
                    selectedRaceCombined.ThirdPractice.date +
                      "T" +
                      selectedRaceCombined.ThirdPractice.time
                  ).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </div>
              </div>
            )}
            <div className="flex p-2 justify-between">
              <div className="w-[100px] font-bold">Qualifying</div>
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
            {selectedRaceCombined.Sprint && (
              <div className="flex p-2 justify-between">
                <div className="w-[100px] font-bold">Sprint</div>
                <div className="w-[100px]">
                  {new Date(
                    parseISO(
                      selectedRaceCombined.Sprint.date +
                        "T" +
                        selectedRaceCombined.Sprint.time
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
                      selectedRaceCombined.Sprint.date +
                        "T" +
                        selectedRaceCombined.Sprint.time
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
              <div className="w-[100px] font-bold">Race</div>
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
          {selectedRaceCombined.round === nextRace?.round && (
            <div className="flex items-center justify-between">
              <p>Forcasted Race Weather: </p>
              <div className="text-3xl">
                {raceDayTrackWeather?.daily[0].maxTemp}
              </div>
              <div className="w-[40px]">
                <svg
                  className="fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox={weatherIcon?.viewBox}
                >
                  <path d={weatherIcon?.d} />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="circuit-img--container">
          <img
            src={selectedRaceCombined.Circuit.imgUrl}
            alt={selectedRaceCombined.Circuit.circuitName}
          />
        </div>
      </div>
    </div>
  );
}
