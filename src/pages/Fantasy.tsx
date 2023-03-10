import { CurrentConstructorStandings } from "../components/CurrentConstructorStandings";
import { CurrentDriverStandings } from "../components/CurrentDriverStandings";
import { FantasyMainScoreboard } from "../components/FantasyMainScoreboard";
import { FantasyPropsScoreboard } from "../components/FantasyPropsScoreboard";
// import fantasy from "../data/fantasy.json";
import axios from "axios";
import { useEffect, useState } from "react";
import { CurrentSeasonData } from "../components/CurrentSeasonData";

export const Fantasy: React.FC = () => {
  // const test: [] | undefined = driverStandings;
  return (
    <div className="bg-green-200 ml-20 mr-20">
      <h1 className="text-2xl font-bold text-center">FANTASY PAGE</h1>
      <FantasyMainScoreboard />
      <CurrentSeasonData />
      <FantasyPropsScoreboard />
    </div>
  );
};
