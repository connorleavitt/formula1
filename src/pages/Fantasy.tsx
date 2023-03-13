import { FantasyMainScoreboard } from "../components/FantasyScoreboards/FantasyMainScoreboard";
import { FantasyPropsScoreboard } from "../components/FantasyScoreboards/FantasyPropsScoreboard";
import { CurrentSeasonData } from "../components/CurrentSeason/CurrentSeasonData";

export const Fantasy: React.FC = () => {
  // const test: [] | undefined = driverStandings;
  return (
    <div className="bg-gray-10 w-full">
      <h1 className="text-2xl font-bold text-center">FANTASY PAGE</h1>
      <FantasyMainScoreboard />
      <FantasyPropsScoreboard />
    </div>
  );
};
