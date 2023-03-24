import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function MobileNav() {
  const [isCurrentOpen, setIsCurrentOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("current");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveNav("home");
    } else if (location.pathname === "/home") {
      setActiveNav("home");
    } else if (location.pathname === "/current") {
      setActiveNav("current");
    } else if (location.pathname === "/standings") {
      setActiveNav("standings");
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

  const handleMenuClick = () => {
    setIsCurrentOpen(!isCurrentOpen);
  };

  return (
    <nav className="bg-f1-red">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center sm:hidden">
              {/* Hamburger menu */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-f1-yellow focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img
                  className="block lg:hidden h-8 w-auto"
                  // src={logoSmall}
                  alt="Formula One Logo"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  // src={logoLarge}
                  alt="Formula One Logo"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {/* Nav items */}
              <Link
                to="/"
                className={`block hover:font-bold rounded-xl py-3 pl-4 ${
                  activeNav === "home" ? "active" : ""
                }`}
              >
                <FontAwesomeIcon icon="house" className="pr-2" />
                Home
              </Link>
              <div className="relative">
                <button
                  onClick={() => setIsCurrentOpen(!isCurrentOpen)}
                  className={`block hover:font-bold rounded-xl py-3 pl-4 ${
                    activeNav === "current" ? "active" : ""
                  }`}
                >
                  <FontAwesomeIcon icon="stream" className="pr-2" />
                  Current Season
                  <FontAwesomeIcon
                    icon={isCurrentOpen ? "caret-up" : "caret-down"}
                    className={
                      isCurrentOpen
                        ? "absolute right-4 bottom-3.5"
                        : "absolute right-4 bottom-4"
                    }
                  />
                </button>
                {isCurrentOpen && (
                  <ul className="pl-6">
                    <li className="my-2">
                      <Link
                        to="/standings"
                        className={`block hover:font-bold rounded-xl py-3 pl-4 ${
                          activeNav === "standings" ? "active" : ""
                        }`}
                      >
                        <FontAwesomeIcon icon="trophy" className="pr-2" />
                        Standings
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        to="/schedule"
                        className={`block hover:font-bold rounded-xl py-3 pl-4 ${
                          activeNav === "schedule" ? "active" : ""
                        }`}
                      >
                        <FontAwesomeIcon icon="calendar" className="pr-2" />
                        Race Schedule
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
