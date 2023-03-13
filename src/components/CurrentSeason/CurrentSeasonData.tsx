import { CurrentConstructorStandings } from "./CurrentConstructorStandings";
import { CurrentDriverStandings } from "./CurrentDriverStandings";

export const CurrentSeasonData: React.FC = () => {
  // const test: [] | undefined = driverStandings;
  return (
    <div className="ml-auto mr-auto w-min mt-10 mb-10">
      <h2 className="text-center text-2xl">Current Season Data</h2>
      <div className="flex mt-4">
        <div className="flex-col">
          <h4 className="text-center mb-2 text-lg">Driver Standings</h4>
          <CurrentDriverStandings />
        </div>
        <div className="flex-col ml-4">
          <h4 className="text-center mb-2 text-lg">Constructor Standings</h4>
          <CurrentConstructorStandings />
        </div>
      </div>
    </div>
  );
};
