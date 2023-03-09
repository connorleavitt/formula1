import { FantasyMainScoreboard } from "../components/FantasyMainScoreboard";
import { FantasyPropsScoreboard } from "../components/FantasyPropsScoreboard-ag-grid";
// import fantasy from "../data/fantasy.json";

export function Fantasy() {
  return (
    <div>
      <h1 className="text-2xl font-bold">FANTASY PAGE</h1>
      <FantasyMainScoreboard />
      <FantasyPropsScoreboard />
    </div>
  );
}
