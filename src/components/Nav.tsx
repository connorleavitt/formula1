import { Link, NavLink } from "react-router-dom";

export function Nav() {
  return (
    <nav className="bg-gray-800 h-full w-64">
      <div className="flex flex-col h-full justify-between">
        <div className="text-white font-bold text-xl py-2 px-4">
          Formula 1 Dashboard
        </div>
        <ul className="flex flex-col justify-between">
          <li>
            <Link
              to="/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/fantasy"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Fantasy
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
