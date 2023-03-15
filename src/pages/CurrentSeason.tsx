import { CurrentSeasonData } from "../components/CurrentSeason/CurrentSeasonData";
import { RaceSchedule } from "../components/CurrentSeason/RaceSchedule";

export const CurrentSeason: React.FC = () => {
  // const test: [] | undefined = driverStandings;
  return (
    <div className="bg-gray-100 flex-col px-4 mb-10">
      <h1 className="text-3xl font-bold py-6 mb-6 border-b-2 border-gray-400 ">
        Current Season
      </h1>
      <CurrentSeasonData />
      <RaceSchedule />
    </div>
  );
};
