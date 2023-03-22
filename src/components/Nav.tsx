import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function Nav() {
  const [activeNav, setActiveNav] = useState("current");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveNav("home");
    } else if (location.pathname === "/home") {
      setActiveNav("home");
    } else if (location.pathname === "/current") {
      setActiveNav("current");
    } else if (location.pathname === "/schedule") {
      setActiveNav("schedule");
    } else if (location.pathname === "/fantasy") {
      setActiveNav("fantasy");
    } else if (location.pathname === "/historical") {
      setActiveNav("historical");
    } else if (location.pathname === "/about") {
      setActiveNav("about");
    }
  }, [location]);
  return (
    <nav className="bg-f1-red">
      <ul className="flex flex-col justify-between text-md m-4">
        <li className="mb-2">
          <Link
            to="/"
            className={`block hover:font-bold rounded-xl py-3 pl-4 ${
              activeNav === "home" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="house" className="pr-2" />
            Home
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/current"
            className={`block hover:font-bold rounded-xl py-3 pl-4 ${
              activeNav === "current" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="flag-checkered" className="pr-2" />
            Current Season
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/schedule"
            className={`block hover:font-bold rounded-xl py-3 pl-4 ${
              activeNav === "schedule" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="flag-checkered" className="pr-2" />
            Race Scedule
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/fantasy"
            className={`block hover:font-bold rounded-xl py-3 pl-4 ${
              activeNav === "fantasy" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="chart-column" className="pr-2" />
            Fantasy
          </Link>
          {/* &#8595; */}
        </li>
        <li className="mb-2">
          <Link
            to="/historical"
            className={`block hover:font-bold rounded-xl py-3 pl-4 ${
              activeNav === "historical" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="clock-rotate-left" className="pr-2" />
            Historical Data
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/about"
            className={`block hover:font-bold rounded-xl py-3 pl-4 ${
              activeNav === "about" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="book" className="pr-2" />
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
