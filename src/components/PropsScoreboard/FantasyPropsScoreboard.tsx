// hooks
import { getCurrentConstructorStandings } from "../../hooks/getCurrentConstructorStandings";
import { getCurrentConstructorDNFs } from "../../hooks/getCurrentConstructorDNFs";
import { getQualiResults } from "../../hooks/getQualiResults";
import { getFastestLaps } from "../../hooks/getFastestLaps";

// widgets
import { FantasyPropsBottomConstructorWidget } from "../../widgets/FantasyPropsBottomConstructorWidget";
import { FantasyPropsConstructorDNFsWidget } from "../../widgets/FantasyPropsConstructorDNFsWidget";
import { FantasyPropsTopConstructorWidget } from "../../widgets/FantasyPropsTopConstructorWidget";
import { FantasyPropsMostPolesWidget } from "../../widgets/FantasyPropsMostPolesWidget";
import { FantasyPropsFastestLapWidget } from "../../widgets/FantasyPropsFastestLapWidget";

// data
import fantasy from "../../data/fantasy.json";
import constructors from "../../data/constructors.json";

export function FantasyPropsScoreboard() {
  const fastestLaps = getFastestLaps();
  const [loading, constructorStandings, error, request] =
    getCurrentConstructorStandings({
      method: "get",
      url: "https://ergast.com/api/f1/current/constructorStandings.json",
    });

  const [, qualiStandings] = getQualiResults({
    method: "get",
    url: "https://ergast.com/api/f1/current/qualifying/1.json",
  });
  const dnfChoice = fantasy.map((value) => {
    let playerChoice = value.propBets.mostDidNotFinish;
    let code = constructors.find((v) => v.name === playerChoice);
    if (code?.urlId)
      return {
        constructor: playerChoice,
        url: `https://ergast.com/api/f1/current/constructors/${code?.urlId}/status.json`,
      };
    return {
      constructor: playerChoice,
      url: `https://ergast.com/api/f1/current/constructors/${code?.constructorId}/status.json`,
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
    return <p>Loading...</p>;
  }
  if (error !== "") {
    return <p>{error}</p>;
  }
  if (!constructorStandings) {
    return <p>Data is null</p>;
  }
  finalDnfTable.push(dnfChoice1[1]);
  finalDnfTable.push(dnfChoice2[1]);
  finalDnfTable.push(dnfChoice3[1]);
  finalDnfTable.push(dnfChoice4[1]);

  return (
    <div className="ml-20 mr-20 pb-20">
      <h1 className="text-lg pb-2">Prop Bets</h1>
      <div className="flex justify-between">
        <FantasyPropsTopConstructorWidget
          constructorStandings={constructorStandings as any}
        />
        <FantasyPropsBottomConstructorWidget
          constructorStandings={constructorStandings as any}
        />
        <FantasyPropsConstructorDNFsWidget
          finalDnfTable={finalDnfTable as any}
        />
      </div>
      <div className="flex justify-between mt-10">
        <FantasyPropsMostPolesWidget qualiStandings={qualiStandings as any} />
        <FantasyPropsFastestLapWidget fastestLaps={fastestLaps as any} />
      </div>
    </div>
  );
}
