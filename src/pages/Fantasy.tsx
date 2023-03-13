import { FantasyMainScoreboard } from "../components/FantasyScoreboards/FantasyMainScoreboard";
import { FantasyPropsScoreboard } from "../components/FantasyScoreboards/FantasyPropsScoreboard";
// import fantasy from "../data/fantasy.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { CurrentSeasonData } from "../components/CurrentSeason/CurrentSeasonData";

export const Fantasy: React.FC = () => {
  // const test: [] | undefined = driverStandings;
  return (
    <div className="bg-green-200 w">
      <h1 className="text-2xl font-bold text-center">FANTASY PAGE</h1>
      <FantasyMainScoreboard />
      <CurrentSeasonData />
      <FantasyPropsScoreboard />
    </div>
  );
};
