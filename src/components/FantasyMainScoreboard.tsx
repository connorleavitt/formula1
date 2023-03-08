import fantasy from "../data/fantasy.json";

export function FantasyMainScoreboard() {
  return (
    <div>
      <h1>Main Scoreboard</h1>
      <div className="flex justify-center items-center">
        <table>
          <thead className="text-white">
            <tr>
              <th className="p-2 bg-teal-500">Name</th>
              <th className="p-2 bg-teal-800">Driver 1</th>
              <th className="p-2 bg-teal-800">Driver 2</th>
              <th className="p-2 bg-teal-800">Driver 3</th>
              <th className="p-2 bg-teal-800">Driver 4</th>
              <th className="p-2 bg-red-200 text-black">Points</th>
            </tr>
          </thead>
          {fantasy.map((person) => (
            <tbody className="text-cyan-900 text-center">
              <tr className="bg-cyan-200 hover:bg-cyan-400 hover:scale-105 cursor-pointer duration-300">
                <td className="py-3 px-6">{person.nickName}</td>
                <td className="py-3 px-6">{person.mainDrivers[0]}</td>
                <td className="py-3 px-6">{person.mainDrivers[1]}</td>
                <td className="py-3 px-6">{person.mainDrivers[2]}</td>
                <td className="py-3 px-6">{person.mainDrivers[3]}</td>
                <td className="py-3 px-6">0</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
