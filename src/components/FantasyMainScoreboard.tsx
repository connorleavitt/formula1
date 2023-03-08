import axios from "axios";
import fantasy from "../data/fantasy.json";
import driverInfo from "../data/driverInfo.json";
import { useEffect, useState } from "react";

export function FantasyMainScoreboard() {
  const [standings, setStandings] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://ergast.com/api/f1/2023/driverStandings.json",
    })
      .then((res) => {
        setStandings(
          res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
        );
      })
      .catch((err) => console.log(err));
  }, []);

  function getDriverPoints(driverName: string) {
    // get driverID from driverInfo data based off of input
    let playerDriverId, points;
    driverInfo.filter((value) => {
      if (driverName == value.name) return (playerDriverId = value.driverId);
    });
    standings.filter((value) => {
      // console.log(value);
      if (playerDriverId === value.Driver.driverId) {
        return (points = value.points);
      }
    });

    return Number(points);
  }

  // function sumPlayerDriverPoints(nickName) {
  //   fantasy.filter((value) => {
  //     if (nickName === value.nickName) return value.mainDrivers;
  //   });
  // }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Main Scoreboard</h1>
      <div className="flex justify-center items-center m-10">
        <table className="border-4 border-pink-400">
          <thead className="text-white">
            <tr className="border-4 border-pink-400">
              <th className="p-2 bg-green-500">Name</th>
              <th colSpan={2} className="p-2 bg-green-800">
                Driver 1
              </th>
              <th colSpan={2} className="p-2 bg-green-800">
                Driver 2
              </th>
              <th colSpan={2} className="p-2 bg-green-800">
                Driver 3
              </th>
              <th colSpan={2} className="p-2 bg-green-800">
                Driver 4
              </th>
              <th className="p-2 bg-red-200 text-black">Points</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {fantasy.map((person) => (
              <tr
                key={person.id}
                className="bg-green-200 hover:bg-green-400 cursor-pointer duration-300"
              >
                <td className="py-3 px-6">{person.nickName}</td>
                <td className="py-3 px-6 border-l-4 border-pink-400">
                  {person.mainDrivers[0]}
                </td>
                <td className="py-3 px-6 border-r-4 border-pink-400">
                  {getDriverPoints(person.mainDrivers[0])}
                </td>
                <td className="py-3 px-6">{person.mainDrivers[1]}</td>
                <td className="py-3 px-6">
                  {getDriverPoints(person.mainDrivers[1])}
                </td>

                <td className="py-3 px-6">{person.mainDrivers[2]}</td>
                <td className="py-3 px-6">
                  {getDriverPoints(person.mainDrivers[2])}
                </td>

                <td className="py-3 px-6 ">{person.mainDrivers[3]}</td>
                <td className="py-3 px-6">
                  {getDriverPoints(person.mainDrivers[3])}
                </td>

                <td className="py-3 px-6">
                  {getDriverPoints(person.mainDrivers[0]) +
                    getDriverPoints(person.mainDrivers[1]) +
                    getDriverPoints(person.mainDrivers[2]) +
                    getDriverPoints(person.mainDrivers[3])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
