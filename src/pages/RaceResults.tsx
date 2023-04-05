import { RaceResults } from "../components/CurrentSeason/RaceResults";

type ScreenWidthProps = {
  screenWidth: number;
};

export function RaceResultsPage({ screenWidth }: ScreenWidthProps) {
  return (
    <div
      className={screenWidth <= 450 ? "race-results-mobile" : "race-results"}
    >
      <h1
        className={
          screenWidth <= 450 ? "font-bold" : "font-bold pt-6 mb-4 mx-8"
        }
      >
        Race Results
      </h1>
      <RaceResults screenWidth={screenWidth} />
    </div>
  );
}
