import axios from "axios";
import { useEffect, useState } from "react";

export const getCurrentDriverStandings = () => {
  const [driverStandings, setDriverStandings] = useState<any[] | null>();

  const getDriverStandings = async () => {
    const response = await axios
      .get("http://ergast.com/api/f1/2023/driverStandings.json")
      .catch((err) => console.log(err));

    if (response) {
      const driverStandings =
        response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      setDriverStandings(driverStandings);
    }
  };

  useEffect(() => {
    getDriverStandings();
  }, []);
  return driverStandings;
};
