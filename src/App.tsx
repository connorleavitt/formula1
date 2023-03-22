import { Route, Routes } from "react-router-dom";
import { Fantasy } from "./pages/Fantasy";
import { Home } from "./pages/Home";
import "./index.css";

//pages
import { Nav } from "./components/Nav";
import { CurrentSeason } from "./pages/CurrentSeason";
import { About } from "./pages/About";
import { Header } from "./components/Header";
import { RaceSchedulePage } from "./pages/RaceSchedule";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { CurrentSeasonData } from "./components/CurrentSeason/CurrentSeasonData";

library.add(fas);

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Nav />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/standings" element={<CurrentSeasonData />} />
            <Route path="/schedule" element={<RaceSchedulePage />} />
            <Route path="/fantasy" element={<Fantasy />} />
            <Route path="/historical" element={<About />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
