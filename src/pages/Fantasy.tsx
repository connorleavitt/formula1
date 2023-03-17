import { useState } from "react";
import { FantasyMainScoreboard } from "../components/FantasyScoreboards/FantasyMainScoreboard";
import { FantasyPropsScoreboard } from "../components/FantasyScoreboards/FantasyPropsScoreboard";

export const Fantasy: React.FC = () => {
  return (
    <div className="max-w-6xl ml-10 mt-4">
      <FantasyMainScoreboard />
      <FantasyPropsScoreboard />
    </div>
  );
};
