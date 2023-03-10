import { getCurrentConstructorStandings } from "../hooks/getCurrentConstructorStandings";
import { getCurrentDriverStandings } from "../hooks/getCurrentDriverStandings";
import { FantasyMainScoreboardWidget } from "../widgets/FantasyMainScoreboardWidget";
import { FantasyPropsBottomConstructorWidget } from "../widgets/FantasyPropsBottomConstructorWidget";
import { FantasyPropsTopConstructorWidget } from "../widgets/FantasyPropsTopConstructorWidget";

export function FantasyPropsScoreboard() {
  const [loading, constructorStandings, error, request] =
    getCurrentConstructorStandings({
      method: "get",
      url: "http://ergast.com/api/f1/current/constructorStandings.json",
    });
  // console.log(loading, constructorStandings, error, request);
  if (loading) {
    console.log("Loading...");
    return <p>Loading...</p>;
  }
  if (error !== "") {
    console.log("Error...");
    return <p>{Error}...</p>;
  }
  if (!constructorStandings) {
    console.log("null");
    return <p>Data is null</p>;
  }

  return (
    <div className="ml-auto mr-auto w-min pb-20">
      <h1 className="text-lg">Prop Bets</h1>
      <FantasyPropsTopConstructorWidget
        constructorStandings={constructorStandings}
      />
      <FantasyPropsBottomConstructorWidget
        constructorStandings={constructorStandings}
      />
      {/* <FantasyPropsMostDidNotFinishesWidget constructorStandings={constructorStandings} /> */}
    </div>
  );
}
