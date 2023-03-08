import { FantasyMainScoreboard } from "../components/FantasyMainScoreboard";
import fantasy from "../data/fantasy.json";

export function Fantasy() {
  let testId = fantasy[2].id;
  let testNickName = fantasy[2].nickName;
  let testMainDrivers = fantasy[2].mainDrivers;

  return (
    <div>
      <h1>FANTASY PAGE</h1>
      <FantasyMainScoreboard />
    </div>
  );
}
