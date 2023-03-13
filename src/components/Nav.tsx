import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav>
      <div className="flex flex-col justify-between">
        <div className="font-bold text-xl py-2 px-4">
          <Link to="/">Formula 1 Dashboard</Link>
        </div>
        <div className="flex m-2">
          <input
            type="text"
            // placeholder={props.placeholder}
            // value={searchTerm}
            // onChange={handleInputChange}
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
          <li className="py-2">
            <Link
              to="/current"
              className="text-gray-800 hover:text-blue-800 px-3 py-2 rounded-md font-medium"
            >
              <FontAwesomeIcon icon="flag-checkered" className="pr-2" />
              Current Season
            </Link>
          </li>

          <li className="py-2">
            <Link
              to="/fantasy"
              className="text-gray-800 hover:text-white px-3 py-2 rounded-md font-medium"
            >
              <FontAwesomeIcon icon="chart-column" className="pr-2" />
              Fantasy
            </Link>
            {/* &#8595; */}
          </li>
          <li className="py-2">
            <Link
              to="/"
              className="text-gray-800 hover:text-white px-3 py-2 rounded-md font-medium"
            >
              <FontAwesomeIcon icon="book" className="pr-2" />
              Historical Data
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
