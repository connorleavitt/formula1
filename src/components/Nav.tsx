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
    } else if (location.pathname === "/fantasy") {
      setActiveNav("fantasy");
    } else if (location.pathname === "/historical") {
      setActiveNav("historical");
    } else if (location.pathname === "/about") {
      setActiveNav("about");
    }
  }, [location]);
  console.log(activeNav);
  return (
    <nav className="bg-f1-red">
      <ul className="flex flex-col justify-between text-md m-4">
        <li className="mb-2">
          <Link
            to="/"
            className={`block hover:font-bold rounded-xl py-3 pl-6 ${
              activeNav === "home" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="flag-checkered" className="pr-3" />
            Home
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/current"
            className={`block hover:font-bold rounded-xl py-3 pl-6 ${
              activeNav === "current" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="flag-checkered" className="pr-3" />
            Current Season
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/fantasy"
            className={`block hover:font-bold rounded-xl py-3 pl-6 ${
              activeNav === "fantasy" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="chart-column" className="pr-3" />
            Fantasy
          </Link>
          {/* &#8595; */}
        </li>
        <li className="mb-2">
          <Link
            to="/historical"
            className={`block hover:font-bold rounded-xl py-3 pl-6 ${
              activeNav === "historical" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="clock-rotate-left" className="pr-3" />
            Historical Data
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/about"
            className={`block hover:font-bold rounded-xl py-3 pl-6 ${
              activeNav === "about" ? "active" : ""
            }`}
          >
            <FontAwesomeIcon icon="book" className="pr-3" />
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
