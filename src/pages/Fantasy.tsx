import { useState } from "react";
import { FantasyMainScoreboard } from "../components/FantasyScoreboards/FantasyMainScoreboard";
import { FantasyPropsScoreboard } from "../components/FantasyScoreboards/FantasyPropsScoreboard";

type ScreenWidthProps = {
  screenWidth: number;
};

export function Fantasy({ screenWidth }: ScreenWidthProps) {
  return (
    <div className="max-w-6xl ml-10 mt-4">
      <FantasyMainScoreboard screenWidth={screenWidth} />
      <FantasyPropsScoreboard screenWidth={screenWidth} />
    </div>
  );
}
