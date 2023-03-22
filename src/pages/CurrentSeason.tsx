import { CurrentSeasonData } from "../components/CurrentSeason/CurrentSeasonData";
import { RaceSchedule } from "../components/CurrentSeason/RaceSchedule";

export const CurrentSeason: React.FC = () => {
  return (
    <div className="current-season">
      <h1 className="text-3xl font-bold pt-6 pb-3 mb-6 mx-8 border-b-2 border-gray-400">
        Current Season
      </h1>
      {/* <RaceSchedule /> */}
      <CurrentSeasonData />
    </div>
  );
};
