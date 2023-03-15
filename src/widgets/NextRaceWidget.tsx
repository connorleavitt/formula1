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

export function NextRaceWidget({ raceSchedule }: raceSchedule) {
  const truncatedRaceSchedule = raceSchedule.map((value: any) => {
    return {
      raceName: value["raceName"],
      date: value["date"],
      time: value["time"],
      round: value["round"],
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
  const nextRace = futureRaces[0];

  return (
    <div className="p-2">
      <h3 className="p-2 font-bold">Next</h3>
      <div className="p-2 rounded-2xl w-64 border-red-300 border-2 bg-red-100">
        <div className="text-gray-500 text-xs">Round {nextRace.round}</div>
        <div className="font-bold">{nextRace.raceName}</div>
        <div className="text-gray-500 text-xs">
          {new Date(nextRace.date + "T" + nextRace.time)
            .toLocaleString("en-US", {
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
            .replace(/,/, " at")}
        </div>
      </div>
    </div>
  );
}
