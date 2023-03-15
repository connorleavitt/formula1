import { getCurrentDriverStandings } from "../../hooks/getCurrentDriverStandings";
import { FantasyMainScoreboardLeaderWidget } from "../../widgets/FantasyMainScoreboardLeaderWidget";
import { FantasyMainScoreboardWidget } from "../../widgets/FantasyMainScoreboardWidget";

interface driverData {
  driverStandings: DriverStandings[];
}

interface DriverStandings {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: {
    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: Date;
    nationality: string;
  };
  Constructors: [
    {
      constructorId: string;
      url: string;
      name: string;
      nationality: string;
    }
  ];
}

export function FantasyMainScoreboardLeader() {
  const [loading, driverStandings, error, request] = getCurrentDriverStandings({
    method: "get",
    url: "https://ergast.com/api/f1/2023/driverStandings.json",
  });
  // console.log(driverStandings);
  // console.log(loading, driverStandings, error, request);
  if (loading) {
    return (
      <div className="ml-auto mr-auto w-min">
        <h1 className="text-2xl font-bold mb-4">Current Leader</h1>
        <div className="bg-neutral-100 p-2 rounded-2xl border-red-500 border-4">
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  if (error !== "") {
    return <p>{error}</p>;
  }
  if (!driverStandings) {
    return <p>Data is null</p>;
  }

  return (
    <div className="w-max mb-10">
      <h1 className="text-2xl font-bold mb-4">Current Leader</h1>
      <div className="bg-neutral-100 p-2 rounded-2xl border-red-500 border-4">
        <FantasyMainScoreboardLeaderWidget
          driverData={driverStandings as any}
        />
      </div>
    </div>
  );
}
