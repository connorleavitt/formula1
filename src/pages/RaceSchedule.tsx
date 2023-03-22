import { RaceSchedule } from "../components/CurrentSeason/RaceSchedule";

export const RaceSchedulePage: React.FC = () => {
  return (
    <div className="race-schedule">
      <h1 className="text-3xl font-bold pt-6 pb-3 mb-6 mx-8 border-b-2 border-gray-400">
        Race Schedule
      </h1>
      <RaceSchedule />
    </div>
  );
};
