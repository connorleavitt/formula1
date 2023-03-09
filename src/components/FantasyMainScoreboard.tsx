import axios from "axios";
import fantasy from "../data/fantasy.json";
import driverInfo from "../data/driverInfo.json";
import { useEffect, useState } from "react";

export function FantasyMainScoreboard() {
  const [standings, setStandings] = useState<any[]>([]);

  const getStandings = async () => {
    return await axios
      .get("http://ergast.com/api/f1/2023/driverStandings.json")
      .then((res) => {
        setStandings(
          res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStandings();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  function getDriverPoints(driverName: string) {
    // get driverID from driverInfo data based off of input
    let playerDriverId: string;
    let points: number = 0;
    driverInfo.find((value) => {
      if (driverName == value.name) return (playerDriverId = value.driverId);
    });
    standings.filter((value) => {
      if (playerDriverId === value.Driver.driverId) {
        return (points = value.points);
      }
    });
    return +points;
  }

  function sumTeamPoints(nickName: string) {
    let sum = 0;
    fantasy.filter((value) => {
      // find nickName's drivers
      if (nickName === value.nickName) {
        //return if no match
        value.mainDrivers.map((e) => {
          //iterate over drivers and add points to sum
          sum += getDriverPoints(e);
        });
      }
    });
    return sum;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="underline">Main Scoreboard</h1>
      <div className="flex justify-center items-center">
        <table className="border-4 border-pink-400">
          <thead className="text-white">
            <tr>
              <th className="p-2 bg-green-800">Squad</th>
              <th
                colSpan={2}
                className="p-2 bg-green-800 border-l-4 border-pink-400"
              >
                Driver 1
              </th>
              <th
                colSpan={2}
                className="p-2 bg-green-800 border-l-4 border-pink-400"
              >
                Driver 2
              </th>
              <th
                colSpan={2}
                className="p-2 bg-green-800 border-l-4 border-pink-400"
              >
                Driver 3
              </th>
              <th
                colSpan={2}
                className="p-2 bg-green-800 border-l-4 border-pink-400"
              >
                Driver 4
              </th>
              <th className="p-2 bg-red-200 text-black border-l-4 border-pink-400">
                Points
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr className="bg-green-400 border-b-2 border-gray-400 ">
              <td>
                <button
                  className="py-3 px-6"
                  // onClick={() => orderColumn()}
                >
                  &#9660;
                </button>
              </td>
              <td className="py-3 px-6 border-l-4 border-pink-400">Driver</td>
              <td className="py-3 px-6">Points</td>
              <td className="py-3 px-6 border-l-4 border-pink-400">Driver</td>
              <td className="py-3 px-6">Points</td>
              <td className="py-3 px-6 border-l-4 border-pink-400">Driver</td>
              <td className="py-3 px-6">Points</td>
              <td className="py-3 px-6 border-l-4 border-pink-400">Driver</td>
              <td className="py-3 px-6 border-r-4 border-pink-400">Points</td>
              <td className="py-3 px-6 bg-red-200">
                <button>&#9660;</button>
              </td>
            </tr>
            {fantasy.map((person) => (
              <tr
                key={person.id}
                className="bg-green-200  hover:bg-green-400 cursor-pointer duration-300 border-b-2 border-gray-400 border-dashed"
              >
                <td className="py-3 px-6 border-r-4 border-pink-400">
                  {person.nickName}
                </td>
                <td className="py-3 px-6 border-r-2 border-gray-400 border-dashed">
                  {person.mainDrivers[0]}
                </td>
                <td className="py-3 px-6 border-r-4 border-pink-400 font-bold">
                  {getDriverPoints(person.mainDrivers[0])}
                </td>
                <td className="py-3 px-6 border-r-2 border-gray-400 border-dashed">
                  {person.mainDrivers[1]}
                </td>
                <td className="py-3 px-6 border-r-4 border-pink-400 font-bold">
                  {getDriverPoints(person.mainDrivers[1])}
                </td>
                <td className="py-3 px-6 border-r-2 border-gray-400 border-dashed">
                  {person.mainDrivers[2]}
                </td>
                <td className="py-3 px-6 border-r-4  border-pink-400 font-bold">
                  {getDriverPoints(person.mainDrivers[2])}
                </td>

                <td className="py-3 px-6 border-r-2 border-gray-400 border-dashed">
                  {person.mainDrivers[3]}
                </td>
                <td className="py-3 px-6 border-r-4 border-pink-400 font-bold">
                  {getDriverPoints(person.mainDrivers[3])}
                </td>

                <td className="py-3 px-6 font-bold text-lg">
                  {sumTeamPoints(person.nickName)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
