import fantasy from "../data/fantasy.json";

export function FantasyMainScoreboard() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Main Scoreboard</h1>
      <div className="flex justify-center items-center m-10">
        <table className="border-4 border-pink-400">
          <thead className="text-white">
            <tr className="border-4 border-pink-400">
              <th className="p-2 bg-teal-500">Name</th>
              <th colSpan={2} className="p-2 bg-teal-800">
                Driver 1
              </th>
              <th colSpan={2} className="p-2 bg-teal-800">
                Driver 2
              </th>
              <th colSpan={2} className="p-2 bg-teal-800">
                Driver 3
              </th>
              <th colSpan={2} className="p-2 bg-teal-800">
                Driver 4
              </th>
              <th className="p-2 bg-red-200 text-black">Points</th>
            </tr>
          </thead>
          {fantasy.map((person) => (
            <tbody className="text-cyan-900 text-center">
              <tr className="bg-cyan-200 hover:bg-cyan-400 cursor-pointer duration-300">
                <td className="py-3 px-6">{person.nickName}</td>
                <td className="py-3 px-6 border-l-4 border-pink-400">
                  {person.mainDrivers[0]}
                </td>
                <td className="py-3 px-6 border-r-4 border-pink-400">0</td>
                <td className="py-3 px-6">{person.mainDrivers[1]}</td>
                <td className="py-3 px-6">3</td>

                <td className="py-3 px-6">{person.mainDrivers[2]}</td>
                <td className="py-3 px-6">3</td>

                <td className="py-3 px-6 ">{person.mainDrivers[3]}</td>
                <td className="py-3 px-6">3</td>

                <td className="py-3 px-6">0</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
