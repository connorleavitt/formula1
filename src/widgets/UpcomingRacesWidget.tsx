import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

type UpcomingRacesWidgetProps = {
  raceSchedule: RaceSchedule[];
};

export function UpcomingRacesWidget({
  raceSchedule,
}: UpcomingRacesWidgetProps) {
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
  return (
    <div className="p-2">
      <h3 className="p-2 font-bold">Upcoming</h3>
      <Slider
        className="w-[800px]"
        slidesToShow={3}
        slidesToScroll={3}
        arrows={true}
        variableWidth={true}
      >
        {futureRaces.map((race: any) => (
          <div
            key={race.round}
            className="p-2 rounded-2xl w-64 border-gray-300 border-2"
          >
            <div className="text-gray-500 text-xs">{`Round ${race.round}`}</div>
            <div className="font-bold">{race.raceName}</div>
            <div className="text-gray-500 text-xs">
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
          </div>
        ))}
      </Slider>
    </div>
  );
}
