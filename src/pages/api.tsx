import axios from "axios";

export const getData = () => {
  const driverInfoTest = getDriverStandings();
  return wrapPromise(driverInfoTest);
};

const wrapPromise = (promise) => {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (res) => {
      (status = "success"), (result = res);
    },
    (err) => {
      (status = "error"), (result = err);
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
};

const getDriverStandings = async () => {
  const res = await axios
    .get("http://ergast.com/api/f1/2023/driverStandings.json")
    .then(
      (res) => res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    )
    .catch((err) => console.log(err));
};
