import { Route, Routes } from "react-router-dom";
import { Fantasy } from "./pages/Fantasy";
import { Home } from "./pages/Home";
import "./index.css";
import { Nav } from "./components/Nav";
import { CurrentSeason } from "./pages/CurrentSeason";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const App: React.FC = () => {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <Nav />
      <div className="bg-neutral-200">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/current" element={<CurrentSeason />} />
          <Route path="/fantasy" element={<Fantasy />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
