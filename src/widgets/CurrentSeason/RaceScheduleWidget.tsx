import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../index.css";
import trackInfo from "../../data/trackInfo.json";
import { CircuitDetailedWidget } from "./CircuitDetailedWidget";

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

type RaceScheduleWidgetProps = {
  raceSchedule: RaceSchedule[];
};

export function RaceScheduleWidget({ raceSchedule }: RaceScheduleWidgetProps) {
  const truncatedRaceSchedule = raceSchedule.map((value: any) => {
    return {
      raceName: value["raceName"],
      date: value["date"],
      time: value["time"],
      round: value["round"],
      circuitId: value.Circuit.circuitId,
    };
  });

  const currentDate = new Date();

  // Filter races with date greater than current date
  const futureRaces = truncatedRaceSchedule.filter((race: any) => {
    const raceDate = new Date(race.date + "T" + race.time);
    return raceDate > currentDate;
  });

  // Sort future races by round (ascending order)
  futureRaces.sort((a: any, b: any) => a.round - b.round);
  // Next race will be the first race in the sorted array

  const previousRaces = truncatedRaceSchedule.filter((race: any) => {
    const raceDate = new Date(race.date + "T" + race.time);
    return raceDate < currentDate;
  });
  // Sort previous races by round (ascending order)
  previousRaces.sort((a: any, b: any) => b.round - a.round);

  const previousRace = previousRaces[0];
  const [selectedCircuit, setSelectedCircuit] = useState(futureRaces[0]);

  const handleRaceClick = (race: any) => {
    setSelectedCircuit(race);
  };

  const UpdatedRaceSchedule = raceSchedule.map((value) => {
    const offsetAtTrack = trackInfo.find(
      (race) => race.circuitId === value.Circuit.circuitId
    )?.Location.gmtOffset;
    return {
      ...value,
      localRaceDateTime: getLocalTime(
        value.date,
        value.time,
        Number(offsetAtTrack)
      ),
    };
  });

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

  const settings = {
    dots: true,
    infinite: false,
    swipeToSlide: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    // variableWidth: true,
    // initialSlide: test, // FIX THIS BASED ON NEXT RACE (SLIDE IS DOTS NOT INDEX)
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
    <div className="flex flex-col w-full">
      <div className="mb-10 flex w-full">
        <Slider className="w-10/12" {...settings}>
          {truncatedRaceSchedule.map(
            (race: any) => (
              // selectedCircuit && (
              <button
                key={race.round}
                className={`w-[100px] relative circuit-info--button text-left p-2 rounded-2xl border-gray-300 border-2 hover:border-gray-400 ${
                  race.round === selectedCircuit.round ? "bg-black first" : ""
                }`}
                onClick={() => handleRaceClick(race)}
              >
                <div
                  className={`text-gray-500 text-xs ${
                    race.round === selectedCircuit.round
                      ? "text-white first"
                      : ""
                  }`}
                >{`Round ${race.round}`}</div>
                <div
                  className={` ${
                    race.round === selectedCircuit.round
                      ? "text-white font-bold first"
                      : "text-gray-800"
                  }`}
                >
                  {race.raceName}
                </div>
                <div
                  className={`text-gray-500 text-xs ${
                    race.round === selectedCircuit.round
                      ? "text-white first"
                      : ""
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
        </Slider>
      </div>
      <div className="mb-10">
        {selectedCircuit && (
          <CircuitDetailedWidget
            circuit={selectedCircuit}
            raceSchedule={UpdatedRaceSchedule}
            key={selectedCircuit.round} // Add key prop to force re-render
          />
        )}
      </div>
    </div>
  );
}
