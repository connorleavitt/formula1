import { getCurrentConstructorStandings } from "../hooks/getCurrentConstructorStandings";
import { getCurrentDriverStandings } from "../hooks/getCurrentDriverStandings";
import { FantasyMainScoreboardWidget } from "../widgets/FantasyMainScoreboardWidget";
import { FantasyPropsBottomConstructorWidget } from "../widgets/FantasyPropsBottomConstructorWidget";
import { FantasyPropsConstructorDNFsWidget } from "../widgets/FantasyPropsConstructorDNFsWidget";
import { FantasyPropsTopConstructorWidget } from "../widgets/FantasyPropsTopConstructorWidget";
import fantasy from "../data/fantasy.json";
import { getCurrentConstructorDNFs } from "../hooks/getCurrentConstructorDNFs";
import constructors from "../data/constructors.json";

export function FantasyPropsScoreboard() {
  const [loading, constructorStandings, error, request] =
    getCurrentConstructorStandings({
      method: "get",
      url: "http://ergast.com/api/f1/current/constructorStandings.json",
    });

  const dnfChoice = fantasy.map((value) => {
    let playerChoice = value.propBets.mostDidNotFinish;
    let code = constructors.find((v) => v.name === playerChoice);
    if (code?.urlId)
      return {
        constructor: playerChoice,
        url: `http://ergast.com/api/f1/current/constructors/${code?.urlId}/status.json`,
      };
    return {
      constructor: playerChoice,
      url: `http://ergast.com/api/f1/current/constructors/${code?.constructorId}/status.json`,
    };
  });
  const dnfChoice1 = getCurrentConstructorDNFs({
    method: "get",
    url: dnfChoice[0].url,
  });
  const dnfChoice2 = getCurrentConstructorDNFs({
    method: "get",
    url: dnfChoice[1].url,
  });
  const dnfChoice3 = getCurrentConstructorDNFs({
    method: "get",
    url: dnfChoice[2].url,
  });
  const dnfChoice4 = getCurrentConstructorDNFs({
    method: "get",
    url: dnfChoice[3].url,
  });

  let finalDnfTable = [];

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
  finalDnfTable.push(dnfChoice1[1]);
  finalDnfTable.push(dnfChoice2[1]);
  finalDnfTable.push(dnfChoice3[1]);
  finalDnfTable.push(dnfChoice4[1]);

  return (
    <div className="ml-auto mr-auto w-min pb-20">
      <h1 className="text-lg">Prop Bets</h1>
      <FantasyPropsTopConstructorWidget
        constructorStandings={constructorStandings}
      />
      <FantasyPropsBottomConstructorWidget
        constructorStandings={constructorStandings}
      />
      <FantasyPropsConstructorDNFsWidget finalDnfTable={finalDnfTable} />
    </div>
  );
}
