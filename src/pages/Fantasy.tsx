import { CurrentConstructorStandings } from "../components/CurrentConstructorStandings";
import { CurrentDriverStandings } from "../components/CurrentDriverStandings";
import { FantasyMainScoreboard } from "../components/FantasyMainScoreboard";
import { FantasyMainScoreboardTest } from "../components/FantasyMainScoreboard-test";
import { FantasyPropsScoreboard } from "../components/FantasyPropsScoreboard";
// import fantasy from "../data/fantasy.json";
import axios from "axios";
import { useEffect, useState } from "react";

export const Fantasy: React.FC = () => {
  // const test: [] | undefined = driverStandings;
  return (
    <div>
      <h1 className="text-2xl font-bold">FANTASY PAGE</h1>
      {/* <FantasyMainScoreboard /> */}
      <FantasyMainScoreboardTest />
      {/* <h2 className="text-lg">Current Season Data</h2>
      <h4>Driver Standings</h4>
      <CurrentDriverStandings />
      <h4>Constructor Standings</h4>
      <CurrentConstructorStandings />
      <h4>Prop Bets Scoreboard</h4>
      <FantasyPropsScoreboard /> */}
    </div>
  );
};
