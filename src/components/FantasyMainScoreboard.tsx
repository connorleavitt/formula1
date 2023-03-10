import { getCurrentDriverStandings } from "../hooks/getCurrentDriverStandings";
import { FantasyMainScoreboardWidget } from "../widgets/FantasyMainScoreboardWidget";

export function FantasyMainScoreboard() {
  const [loading, driverStandings, error, request] = getCurrentDriverStandings({
    method: "get",
    url: "http://ergast.com/api/f1/2023/driverStandings.json",
  });
  // console.log(loading, driverStandings, error, request);
  if (loading) {
    console.log("Loading...");
    return <p>Loading...</p>;
  }
  if (error !== "") {
    console.log("Error...");
    return <p>{Error}...</p>;
  }
  if (!driverStandings) {
    console.log("null");
    return <p>Data is null</p>;
  }

  return (
    <div className="ml-auto mr-auto w-min">
      <h1 className="text-lg">Main Scoreboard</h1>
      <FantasyMainScoreboardWidget driverData={driverStandings} />
    </div>
  );
}
