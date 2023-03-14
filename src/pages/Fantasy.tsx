import { FantasyMainScoreboard } from "../components/FantasyScoreboards/FantasyMainScoreboard";
import { FantasyPropsScoreboard } from "../components/FantasyScoreboards/FantasyPropsScoreboard";
import { CurrentSeasonData } from "../components/CurrentSeason/CurrentSeasonData";

export const Fantasy: React.FC = () => {
  // const test: [] | undefined = driverStandings;
  return (
    <div className="w-full">
      {/* <div>Current Leader: dfghjkjhgfgh</div> */}
      <FantasyMainScoreboard />
      <FantasyPropsScoreboard />
    </div>
  );
};
