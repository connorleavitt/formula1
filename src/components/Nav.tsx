import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav className="bg-f1-red">
      <div className="text-white flex flex-col justify-between">
        <div className="font-bold text-3xl pt-4 text-center ">
          <Link to="/" className=" hover:underline">
            Formula 1 Dashboard
          </Link>
        </div>
        <div className="flex m-2 my-6">
          <input
            type="text"
            className="w-full px-4 py-2 pr-8 rounded-md rounded-r-none bg-gray-100 border-2 border-gray-200 focus:outline-none focus:border-gray-300"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-md rounded-l-none bg-gray-800 text-white hover:bg-gray-700 focus:outline-none"
          >
            Search
          </button>
        </div>
        <ul className="flex flex-col justify-between text-xl">
          <li>
            <Link
              to="/current"
              className="block hover:bg-black pl-6 py-4 font-medium  w-full"
            >
              <FontAwesomeIcon icon="flag-checkered" className="pr-3" />
              Current Season
            </Link>
          </li>

          <li>
            <Link
              to="/fantasy"
              className="block hover:bg-black pl-6 py-4 font-medium  w-full"
            >
              <FontAwesomeIcon icon="chart-column" className="pr-3" />
              Fantasy
            </Link>
            {/* &#8595; */}
          </li>
          <li>
            <Link
              to="/"
              className="block hover:bg-black pl-6 py-4 font-medium  w-full"
            >
              <FontAwesomeIcon icon="book" className="pr-3" />
              Historical Data
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
