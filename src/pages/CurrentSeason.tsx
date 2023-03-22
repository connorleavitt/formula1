import { CurrentSeasonData } from "../components/CurrentSeason/CurrentSeasonData";
import { RaceSchedule } from "../components/CurrentSeason/RaceSchedule";

export const CurrentSeason: React.FC = () => {
  return (
    <div className="current-season">
      <CurrentSeasonData />
    </div>
  );
};
