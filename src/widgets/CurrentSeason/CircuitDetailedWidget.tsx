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
  const rainProb = raceDayTrackWeather?.daily[0].precipitationSum;

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="p-2 text-lg font-bold">Circuit Info</h2>
        {formattedCountdown.days > 0 && (
          <div className="circuit-countdown--contianer rounded-lg m-2">
            <div className="current-season-next-race--countdown-container flex">
              <h3 className="self-center font-bold text-center px-4">
                COUNTDOWN TO RACE
              </h3>
              <div className="items-center justify-center flex w-[100px] my-2">
                <p className="text-2xl font-bold">{formattedCountdown.days}</p>
                <p className="self-start ml-1 text-sm labels">days</p>
              </div>
              <div className="items-center justify-center flex w-[100px] my-2">
                <p className="text-2xl font-bold">{formattedCountdown.hours}</p>
                <p className="self-start ml-1 text-sm font-light labels">hrs</p>
              </div>
              <div className="items-center justify-center flex w-[100px] my-2">
                <p className="text-2xl font-bold">
                  {formattedCountdown.minutes}
                </p>
                <p className="self-start ml-1 text-sm labels">mins</p>
              </div>
              {/* <div className="flex flex-col items-center p-2 w-[75px]">
              <p className="text-3xl font-bold">{formattedCountdown.seconds}</p>
              <p className="text-md labels">secs</p>
            </div> */}
            </div>
          </div>
        )}
      </div>
      <div className="flex p-2 border-t-8 rounded-sm border-r-[20px] rounded-tr-2xl border-red-500 circuit-info--main-container">
        <div className="flex flex-col w-[400px]">
          <div className="flex items-center">
            <img
              className="rounded-sm w-24 border-2 border-gray-200"
              src={selectedRaceCombined.Circuit.flagUrl}
              alt={selectedRaceCombined.Circuit.circuitName}
            />
            <h3 className="p-2 text-2xl font-bold">
              {selectedRaceCombined.Circuit.circuitName}
            </h3>
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
                <div className="w-[100px] text-center">
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
          {/* {formattedCountdown.days > 0 && (
            <div className="circuit-countdown--contianer rounded-lg p-2">
              <h3 className="p-2 mx-2 font-bold text-center">
                COUNTDOWN TO RACE
              </h3>
              <div className="w-full current-season-next-race--countdown-container my-1 flex justify-start">
                <div className="flex flex-col items-center m-2 w-[75px]">
                  <p className="text-5xl font-bold">
                    {formattedCountdown.days}
                  </p>
                  <p className="text-sm labels">days</p>
                </div>
                <div className="flex flex-col items-center m-2 w-[75px]">
                  <p className="text-5xl font-bold">
                    {formattedCountdown.hours}
                  </p>
                  <p className="text-sm font-light labels">hrs</p>
                </div>
                <div className="flex flex-col items-center m-2 w-[75px]">
                  <p className="text-5xl font-bold">
                    {formattedCountdown.minutes}
                  </p>
                  <p className="text-sm labels">mins</p>
                </div>
                <div className="flex flex-col items-center p-2 w-[75px]">
              <p className="text-3xl font-bold">{formattedCountdown.seconds}</p>
              <p className="text-md labels">secs</p>
            </div>
              </div>
            </div>
          )} */}
          <div className="flex w-full flex-wrap justify-between">
            <div className="w-5/12 my-4 circuit-location border-l-2 border-b-2 pl-2 pb-1 rounded-bl-2xl border-gray-300">
              <p className="text-sm">Round</p>
              <p className="font-bold text-3xl">{selectedRaceCombined.round}</p>
            </div>
            <div className="w-1/2 my-4 circuit-location border-l-2 border-b-2 pl-2 pb-1 rounded-bl-2xl border-gray-300">
              <p className="text-sm">
                {selectedRaceCombined.Circuit?.Location?.locality}
              </p>
              <p className="font-bold text-3xl">
                {selectedRaceCombined.Circuit?.Location?.country}
              </p>
            </div>
            <div className="w-5/12 my-4 circuit-laps border-l-2 border-b-2 pl-2 pb-1 rounded-bl-2xl border-gray-300">
              <p className="text-sm">Number of Laps</p>
              <p className="font-bold text-3xl">
                {selectedRaceCombined.Circuit.laps}
              </p>
            </div>
            <div className="w-1/2 my-4 circuit-round border-l-2 border-b-2 pl-2 pb-1 rounded-bl-2xl border-gray-300">
              <p className="text-sm">First Grand Prix</p>
              <p className="font-bold text-3xl">
                {selectedRaceCombined.Circuit.firstGrandPrix}
              </p>
            </div>
            <div className="w-5/12 my-4 circuit-round border-l-2 border-b-2 pl-2 pb-1 rounded-bl-2xl border-gray-300">
              <p className="text-sm">Circuit Length</p>
              <p className="font-bold text-3xl">
                {selectedRaceCombined.Circuit.circuitLength}{" "}
                <span className="text-sm">km</span>
              </p>
            </div>
            <div className="w-1/2 my-4 circuit-round border-l-2 border-b-2 pl-2 pb-1 rounded-bl-2xl border-gray-300">
              <p className="text-sm">Race Distance</p>
              <p className="font-bold text-3xl">
                {selectedRaceCombined.Circuit.raceLength}
                <span className="text-sm">km</span>
              </p>
            </div>
            {selectedRaceCombined.round === nextRace?.round &&
              weatherIcon !== null && (
                <div className="w-full my-4 circuit-weather border-l-2 border-b-2 pl-2 pb-1 rounded-bl-2xl border-gray-300">
                  <p className="text-sm">Race Weather</p>
                  <div className="flex">
                    <div className="text-3xl mr-2 font-bold">
                      {weatherTemp}&deg;
                    </div>
                    <div className="w-[40px] h-full self-center">
                      <svg
                        // className=""
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox={weatherIcon?.viewBox}
                      >
                        <path d={weatherIcon?.d} />
                      </svg>
                    </div>
                    <p className="text-xs font-light self-end mb-1 ml-1">
                      ({rainProb} in of rain)
                    </p>
                  </div>
                </div>
              )}
          </div>
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
