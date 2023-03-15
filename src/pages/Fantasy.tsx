import { FantasyMainScoreboard } from "../components/FantasyScoreboards/FantasyMainScoreboard";
import { FantasyPropsScoreboard } from "../components/FantasyScoreboards/FantasyPropsScoreboard";

export const Fantasy: React.FC = () => {
  // const test: [] | undefined = driverStandings;
  return (
    <div className="max-w-6xl ml-10 mt-8">
      <FantasyMainScoreboard />
      <FantasyPropsScoreboard />
    </div>
  );
};
