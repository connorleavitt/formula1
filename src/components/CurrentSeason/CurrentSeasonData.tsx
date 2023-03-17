import { CurrentConstructorStandings } from "./CurrentConstructorStandings";
import { CurrentDriverStandings } from "./CurrentDriverStandings";

export const CurrentSeasonData: React.FC = () => {
  // const test: [] | undefined = driverStandings;
  return (
    <div className="current-season--container flex">
      <div className="flex-col">
        <h4 className="text-center mb-2 text-lg">Driver Standings</h4>
        <CurrentDriverStandings />
      </div>
      <div className="flex-col ml-4">
        <h4 className="text-center mb-2 text-lg">Constructor Standings</h4>
        <CurrentConstructorStandings />
      </div>
    </div>
  );
};
