import fantasy from "../data/fantasy.json";

export function FantasyMainScoreboard() {
  return (
    <div>
      <h1>Main Scoreboard</h1>
      <div>
        {fantasy.map((item) => (
          <div key={item.id}>{item.id}</div>
        ))}
      </div>
    </div>
  );
}
