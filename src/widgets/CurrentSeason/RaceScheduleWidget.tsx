import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../index.css";
import trackInfo from "../../data/trackInfo.json";
import { CircuitDetailedWidget } from "./CircuitDetailedWidget";
import { getRaceDayWeather } from "../../utilities/Weather/getWeather";
import { ICON_MAP } from "../../utilities/Weather/iconMap";
import icons from "../../utilities/Weather/icons.json";

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
  // localRaceDateTime: string;
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

type RaceScheduleWidgetProps = {
  raceSchedule: RaceSchedule[];
};

type UpdatedSchedule = {
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

export function RaceScheduleWidget({ raceSchedule }: RaceScheduleWidgetProps) {
  const truncatedRaceSchedule = raceSchedule.map((value: any) => {
    return {
      ...value,
      circuitId: value.Circuit.circuitId,
    };
  });

  const updatedRaceSchedule = truncatedRaceSchedule.map((value) => {
    const additionalInfo = trackInfo.find(
      (race) => race.circuitId === value.Circuit.circuitId
    );

    return {
      ...value,
      additionalInfo,
      localRaceDateTime: getLocalTime(
        value.date,
        value.time,
        Number(additionalInfo?.Location.gmtOffset)
      ),
    };
  });

  const currentDate = new Date();

  // Filter races with date greater than current date
  const futureRaces = updatedRaceSchedule.filter((race: any) => {
    const raceDate = new Date(race.date + "T" + race.time);
    return raceDate > currentDate;
  });

  // Sort future races by round (ascending order)
  futureRaces.sort((a: any, b: any) => a.round - b.round);
  // Next race will be the first race in the sorted array

  const previousRaces = updatedRaceSchedule.filter((race: any) => {
    const raceDate = new Date(race.date + "T" + race.time);
    return raceDate < currentDate;
  });
  // Sort previous races by round (ascending order)
  previousRaces.sort((a: any, b: any) => b.round - a.round);

  const previousRace = previousRaces[0];
  const [selectedCircuit, setSelectedCircuit] = useState(futureRaces[0]);

  const handleRaceClick = (race: any) => {
    setSelectedCircuit(race as UpdatedSchedule);
  };

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

  const initSlide = Number(previousRace.round);

  const settings = {
    // dots: true,
    infinite: false,
    swipeToSlide: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    // variableWidth: false,
    initialSlide: initSlide, // FIX THIS BASED ON NEXT RACE (SLIDE IS DOTS NOT INDEX)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col race-schedule--main-container">
      <div className="mb-4 flex w-full justify-center">
        <Slider className="slider-container w-11/12" {...settings}>
          {updatedRaceSchedule.map((race: any) => (
            <button
              key={race.round}
              className={`relative circuit-info--button text-left px-1 py-2 rounded-xl ${
                race.round === selectedCircuit.round ? "selected" : ""
              }`}
              onClick={() => handleRaceClick(race)}
            >
              <div className="flex items-center">
                <img
                  className="rounded-lg w-[60px] h-[36px] mr-2 ml-1"
                  src={race.additionalInfo.flagUrl}
                  alt={race.additionalInfo.circuitName}
                />
                <div className="flex flex-col">
                  <div
                    className={`text-sm leading-4 ${
                      race.round === selectedCircuit.round ? "text-white" : ""
                    }`}
                  >
                    {new Date(race.date + "T" + race.time).toLocaleString(
                      "en-US",
                      {
                        day: "2-digit",
                      }
                    )}{" "}
                    {new Date(race.date + "T" + race.time)
                      .toLocaleString("en-US", {
                        month: "short",
                      })
                      .toUpperCase()}
                  </div>
                  <div
                    className={`text-md mt-1 leading-4 font-bold ${
                      race.round === selectedCircuit.round
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                  >
                    {race.additionalInfo.Location.country}
                  </div>
                </div>
              </div>
              {race.round === futureRaces[0].round ? (
                <div className="absolute font-bold top-1 right-1 rounded-full py-[2px] px-1 race-schedule--next-tag">
                  <p className="text-[10px] leading-none">NEXT</p>
                </div>
              ) : (
                ""
              )}
            </button>
          ))}
        </Slider>
        {/* <Slider className="slider-container w-11/12" {...settings}>
          {updatedRaceSchedule.map(
            (race: any) => (
              // selectedCircuit && (
              <button
                key={race.round}
                className={`relative circuit-info--button text-left px-4 py-2 rounded-xl ${
                  race.round === selectedCircuit.round ? "selected" : ""
                }`}
                onClick={() => handleRaceClick(race)}
              >
                <div
                  className={`text-gray-500 text-xs ${
                    race.round === selectedCircuit.round ? "text-white" : ""
                  }`}
                >{`Round ${race.round}`}</div>
                <div
                  className={` ${
                    race.round === selectedCircuit.round
                      ? "text-white font-bold"
                      : "text-gray-800"
                  }`}
                >
                  {race.trackLocation.country}
                </div>
                <div
                  className={`text-gray-500 text-xs ${
                    race.round === selectedCircuit.round ? "text-white" : ""
                  }`}
                >
                  {new Date(race.date + "T" + race.time)
                    .toLocaleString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                    .replace(/,/, " at")}
                </div>
                <img
                  className="absolute right-2 bottom-2 ml-4 rounded-md w-14"
                  src={race.flagUrl}
                  alt={race.Circuit.circuitName}
                />
                {race.round === futureRaces[0].round ? (
                  <div className="absolute top-[5px] right-[5px]">
                    <p className="race-schedule--next-tag text-red-600 px-2 py-[1px] font-bold rounded-lg text-xs">
                      NEXT
                    </p>
                  </div>
                ) : (
                  ""
                )}
                {race.round === previousRace.round ? (
                  <div className="absolute top-[5px] right-[5px]">
                    <p className="race-schedule--prev-tag text-gray-400 px-2 py-[1px] font-bold rounded-lg text-xs">
                      PREVIOUS
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </button>
            )
            // )
          )}
        </Slider> */}
      </div>
      {selectedCircuit && (
        <CircuitDetailedWidget
          circuit={selectedCircuit}
          raceSchedule={updatedRaceSchedule}
          key={selectedCircuit.round} // Add key prop to force re-render
        />
      )}
    </div>
  );
}
