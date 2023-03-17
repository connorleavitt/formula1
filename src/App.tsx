import { Route, Routes } from "react-router-dom";
import { Fantasy } from "./pages/Fantasy";
import { Home } from "./pages/Home";
import "./index.css";
import { Nav } from "./components/Nav";
import { CurrentSeason } from "./pages/CurrentSeason";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { About } from "./pages/About";
import { Header } from "./components/Header";
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
            <Route path="/current" element={<CurrentSeason />} />
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
