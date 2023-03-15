import { FantasyMainScoreboard } from "../components/FantasyScoreboards/FantasyMainScoreboard";
import { FantasyPropsScoreboard } from "../components/FantasyScoreboards/FantasyPropsScoreboard";
import { CurrentSeasonData } from "../components/CurrentSeason/CurrentSeasonData";
import { FantasyMainScoreboardLeader } from "../components/FantasyScoreboards/FantasyMainScoreboardLeader";

export const Fantasy: React.FC = () => {
  // const test: [] | undefined = driverStandings;
  return (
    <div className="max-w-6xl ml-10 mt-8">
      <FantasyMainScoreboardLeader />
      <FantasyMainScoreboard />
      <FantasyPropsScoreboard />
    </div>
  );
};
