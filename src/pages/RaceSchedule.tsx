import { RaceSchedule } from "../components/CurrentSeason/RaceSchedule";

export const RaceSchedulePage: React.FC = () => {
  return (
    <div className="race-schedule">
      <h1 className="text-3xl font-bold pt-6 mb-4 mx-8">Race schedule</h1>
      <RaceSchedule />
    </div>
  );
};
