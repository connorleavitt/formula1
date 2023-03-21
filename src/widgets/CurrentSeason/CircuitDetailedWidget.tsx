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
  // raceDayTrackWeather: TrackWeather;
  // weatherIcon: WeatherIcon;
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
      precipitationSum: number;
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

type WeatherIconProps = {
  weather: string;
  viewBox: string;
  d: string;
};

export function CircuitDetailedWidget({
  circuit,
  raceSchedule,
}: CircuitDetailedWidgetProps) {
  const [selectedRace, setSelectedRace] = useState<RaceSchedule | null>(null);
  const [nextRace, setNextRace] = useState<RaceSchedule | null>(null);
  const [raceDayTrackWeather, setRaceDayTrackWeather] =
    useState<TrackWeather | null>(null);
  const [weatherIcon, setWeatherIcon] = useState<WeatherIconProps | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  useEffect(() => {
    const truncatedRaceSchedule = raceSchedule.map((value: any) => {
      return {
        ...value,
        circuitId: value.Circuit.circuitId,
      };
    });
    const updatedRaceSchedule = truncatedRaceSchedule.map((value) => {
      const offsetAtTrack = trackInfo.find(
        (race) => race.circuitId === value.Circuit.circuitId
      )?.Location.gmtOffset;
      const trackLocation = trackInfo.find(
        (race) => race.circuitId === value.Circuit.circuitId
      )?.Location;
      return {
        ...value,
        trackLocation,
        localRaceDateTime: getLocalTime(
          value.date,
          value.time,
          Number(offsetAtTrack)
        ),
      };
    });
    const now = new Date();
    const race = raceSchedule.find(
      (race) => race.Circuit.circuitId === circuit.circuitId
    );

    if (race) {
      setSelectedRace(race as RaceSchedule);
      setNextRace(race as RaceSchedule);
      const raceDate = parseISO(race.date + "T" + race.time);
      const diffInSeconds = differenceInSeconds(raceDate, now);
      setRemainingSeconds(diffInSeconds);
      const days = Math.floor(diffInSeconds / (3600 * 24));

      const nextRace = trackInfo.find(
        (track) => track.circuitId === race.Circuit.circuitId
      );
      const lat = nextRace?.Location.lat as string;
      const long = nextRace?.Location.long as string;
      const timezone = nextRace?.Location.timezone as string;
      const mainHourWeather = Number(race?.localRaceDateTime.slice(11, 13));
      if (days < 15 && days > 0) {
        //checking for under 15 days since api can't call exact dates further than 16 days out
        getRaceDayWeather(
          race.date,
          parseFloat(lat),
          parseFloat(long),
          timezone
        )
          .then((res) => {
            setRaceDayTrackWeather(res as TrackWeather);
            setWeatherIcon(
              getIcon(
                res.hourly[mainHourWeather - 1].iconCode
              ) as WeatherIconProps
            );
          })
          .catch((e) => {
            console.error(e);
            alert("Problem getting raceday weather data!");
          });

        const intervalId = setInterval(() => {
          setRemainingSeconds((prevRemainingSeconds) =>
            prevRemainingSeconds ? prevRemainingSeconds - 1 : null
          );
        }, 1000);
        return () => clearInterval(intervalId);
      } else {
        const intervalId = setInterval(() => {
          setRemainingSeconds((prevRemainingSeconds) =>
            prevRemainingSeconds ? prevRemainingSeconds - 1 : null
          );
        }, 1000);
        return () => clearInterval(intervalId);
      }
    }
  }, [raceSchedule]);

  if (!selectedRace) {
    return null; // no next race found
  }

  function getIcon(iconCode: string) {
    const weatherName = ICON_MAP.get(iconCode);
    const weather = icons.find((type) => type.weather === weatherName);
    return {
      weather: weather?.weather,
      viewBox: weather?.viewBox,
      d: weather?.d,
    };
  }
  function getLocalTime(date: string, time: string, offset: number) {
    // need to add the mins, etc back on
    const mainHour = Number(time.split(":")[0]);
    let result = mainHour + offset;
    const timeArr = time.split(":");
    if (result < 0) {
      result = 24 + result;
      const updatedTime =
        result + ":" + time.split(":")[1] + ":" + time.split(":")[2];
      const updatedDateDay = (date.slice(8) as any) - 1;
      const updatedDate = date.slice(0, 8) + updatedDateDay;
      return updatedDate + "T" + updatedTime;
    }
    const updatedTime =
      result + ":" + time.split(":")[1] + ":" + time.split(":")[2];

    return date + "T" + updatedTime;
  }
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
  const mainHourWeather = Number(nextRace?.localRaceDateTime.slice(11, 13)) - 1;
  const weatherTemp = raceDayTrackWeather?.hourly[mainHourWeather].temp;
  return (
    <div>
      <h2 className="p-2 text-lg font-bold">Circuit Info</h2>
      <div className="flex p-2 w-[1000px] border-t-4 rounded-sm border-r-8 border-red-500">
        <div>
          <h3 className="p-2 font-bold">{`Round ${selectedRaceCombined.round} - ${selectedRaceCombined.raceName}`}</h3>
          {formattedCountdown.seconds > 0 && (
            <div className="w-max current-season-next-race--countdown-container my-1 flex justify-start">
              <div className="flex flex-col items-center p-2 w-[75px]">
                <p className="text-3xl font-bold">{formattedCountdown.days}</p>
                <p className="text-md">days</p>
              </div>
              <div className="flex flex-col items-center p-2 w-[75px]">
                <p className="text-3xl font-bold">{formattedCountdown.hours}</p>
                <p className="text-md">hrs</p>
              </div>
              <div className="flex flex-col items-center p-2 w-[75px]">
                <p className="text-3xl font-bold">
                  {formattedCountdown.minutes}
                </p>
                <p className="text-md">mins</p>
              </div>
              <div className="flex flex-col items-center p-2 w-[75px]">
                <p className="text-3xl font-bold">
                  {formattedCountdown.seconds}
                </p>
                <p className="text-md">secs</p>
              </div>
            </div>
          )}
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
          {selectedRaceCombined.round === nextRace?.round &&
            weatherIcon !== null && (
              <div className="flex items-center justify-between">
                <p>Forcasted Race Weather: </p>
                <div className="text-3xl">{weatherTemp}&deg;</div>
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
