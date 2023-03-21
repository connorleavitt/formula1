import { useEffect, useState } from "react";
import { differenceInSeconds, formatDuration, parseISO } from "date-fns";
import trackInfo from "../../data/trackInfo.json";
import { ICON_MAP } from "../../utilities/Weather/iconMap";
import icons from "../../utilities/Weather/icons.json";
import {
  getRaceDayWeather,
  getWeather,
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

type NextRaceWidgetProps = {
  raceSchedule: RaceSchedule[];
  // trackWeather: TrackWeather;
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

export function NextRaceDetailedWidget({
  raceSchedule,
}: // trackWeather,
NextRaceWidgetProps) {
  const [nextRace, setNextRace] = useState<RaceSchedule | null>(null);
  const [raceDayTrackWeather, setRaceDayTrackWeather] =
    useState<TrackWeather | null>(null);
  const [weatherIcon, setWeatherIcon] = useState<WeatherIcon | null>(null);
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
    // sort the races by date in ascending order
    const sortedRaces = updatedRaceSchedule.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    // find the first race that is in the future compared to the current date + time
    const race = sortedRaces.find(
      (race) => new Date(race.date + "T" + race.time) >= now
    );

    if (race) {
      setNextRace(race);

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
      if (days < 15) {
        //checking for under 15 days since api can't call exact dates further than 16 days out
        getRaceDayWeather(
          race.date,
          parseFloat(lat),
          parseFloat(long),
          timezone
        )
          .then((res) => {
            console.log(res);
            setRaceDayTrackWeather(res as TrackWeather);
            setWeatherIcon(
              getIcon(res.hourly[mainHourWeather - 1].iconCode) as WeatherIcon
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
  // console.log(combinedNextRace.date + "T" + combinedNextRace.time);
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
    <div className="my-4">
      <div className="w-max">
        <h3 className="p-2 text-2xl font-bold">Next Race</h3>
        <div className="home-next-race--container flex flex-col rounded-lg w-96">
          <h3 className="px-3 mt-5 font-bold my-1">{`${combinedNextRace.raceName} - Round ${combinedNextRace.round}`}</h3>
          <div className="w-max home-next-race--countdown-container my-1 flex justify-start">
            <div className="flex flex-col items-center p-2 w-[75px]">
              <p className="text-3xl font-bold">{formattedCountdown.days}</p>
              <p className="text-md">days</p>
            </div>
            <div className="flex flex-col items-center p-2 w-[75px]">
              <p className="text-3xl font-bold">{formattedCountdown.hours}</p>
              <p className="text-md">hrs</p>
            </div>
            <div className="flex flex-col items-center p-2 w-[75px]">
              <p className="text-3xl font-bold">{formattedCountdown.minutes}</p>
              <p className="text-md">mins</p>
            </div>
            <div className="flex flex-col items-center p-2 w-[75px]">
              <p className="text-3xl font-bold">{formattedCountdown.seconds}</p>
              <p className="text-md">secs</p>
            </div>
          </div>
          <div className="home-next-race--times-container my-1">
            <div className="flex p-2 justify-between border-b-2 border-gray-300">
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
            <div className="flex p-2 justify-between border-b-2 border-gray-300">
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
            {combinedNextRace.ThirdPractice && (
              <div className="flex p-2 justify-between border-b-2 border-gray-300">
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
            )}
            <div className="flex p-2 justify-between border-b-2 border-gray-300">
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
              <div className="flex p-2 justify-between border-b-2 border-gray-300">
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
          {combinedNextRace.round === nextRace?.round && weatherIcon !== null && (
            <div className="flex">
              <p>Forcasted Race Weather: </p>
              <div className="text-3xl">{weatherTemp}&deg;</div>
              <div className="w-[40px]">
                <svg
                  className="fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox={weatherIcon?.viewBox}
                >
                  <path d={weatherIcon?.d} />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
