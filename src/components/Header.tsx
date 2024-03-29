import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="main-header flex items-center">
      <div className="text-white text-2xl font-thin">
        <Link to="/">
          FANTASY<span className="font-bold">1</span>
        </Link>
      </div>
    </header>
  );
}
