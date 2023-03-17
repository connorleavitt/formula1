import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-f1-red flex items-center">
      <div className="text-white text-2xl font-thin ml-6">
        <Link to="/">Formula 1 Dashboard</Link>
      </div>
    </header>
  );
}
