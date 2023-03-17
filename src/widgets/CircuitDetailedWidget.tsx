import { useEffect, useState } from "react";
import { parseISO } from "date-fns";
import trackInfo from "../data/trackInfo.json";

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
};

export function CircuitDetailedWidget({
  circuit,
  raceSchedule,
}: CircuitDetailedWidgetProps) {
  const [selectedRace, setSelectedRace] = useState<RaceSchedule | null>(null);
  // const [selectedRaceUrl, setselectedRaceUrl] = useState<RaceSchedule | null>(null);

  // console.log(circuit.circuitId);

  useEffect(() => {
    const selected = raceSchedule.find(
      (race) => race.Circuit.circuitId === circuit.circuitId
    );

    setSelectedRace(selected as RaceSchedule);
  }, [raceSchedule]);

  // format the race date range
  // const firstPracticeDate = new Date(selectedRace.FirstPractice.date);
  // const raceDate = new Date(selectedRace.date);

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
  // const thirdPracticeDate = parseISO(
  //   selectedRace.ThirdPractice.date + "T" + selectedRace.ThirdPractice.time
  // );
  const qualifyingDate = parseISO(
    selectedRace.Qualifying.date + "T" + selectedRace.Qualifying.time
  );
  // if (selectedRace.Sprint) {
  //   const sprintDate = parseISO(
  //     selectedRace.Sprint.date + "T" + selectedRace.Sprint.time
  //   );
  // }
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

  return (
    <div>
      <h2 className="p-2 text-lg font-bold">Circuit Info</h2>
      <div className="flex p-2 w-[1000px] border-t-4 border-r-8 border-red-500 border-double">
        <div className="w-96">
          <h3 className="p-2 font-bold">{`Round ${selectedRaceCombined.round} - ${selectedRaceCombined.raceName}`}</h3>
          <div className="flex m-2 justify-between">
            <div className="flex flex-col items-center">
              <p className="px-4">{raceDateRangeDays}</p>
              <div className="px-2 my-2">{raceDateRangeDates}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-bold">
                {selectedRaceCombined.Circuit?.Location?.locality}
              </div>
              <div className="mt-2">
                {selectedRaceCombined.Circuit?.Location?.country}
              </div>
            </div>
          </div>
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
            {selectedRace.ThirdPractice && (
              <div className="flex p-2 justify-between">
                <div className="w-[100px]">Practice 3</div>
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
            {selectedRaceCombined.Sprint && (
              <div className="flex p-2 justify-between">
                <div className="w-[100px]">Sprint</div>
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
        <img
          src={selectedRaceCombined.Circuit.imgUrl}
          alt={selectedRaceCombined.Circuit.circuitName}
          height="200px"
          width="100%"
        />
      </div>
    </div>
  );
}