import { Route, Routes } from "react-router-dom";
import { Fantasy } from "./pages/Fantasy";
import { Home } from "./pages/Home";
import "./index.css";

//pages
import { Nav } from "./components/Nav";
import { MobileNav } from "./components/MobileNav";
import { CurrentSeason } from "./pages/CurrentSeason";
import { About } from "./pages/About";
import { Header } from "./components/Header";
import { RaceSchedulePage } from "./pages/RaceSchedule";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { CurrentSeasonData } from "./components/CurrentSeason/CurrentSeasonData";
import { useEffect, useState } from "react";

library.add(fas);

const App: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(screenWidth);

  return (
    <div>
      {screenWidth <= 450 ? (
        <></> //custom mobile nav header inside MobileNav
      ) : (
        <Header />
      )}
      {/* <Header /> */}
      <div className={`${screenWidth <= 450 ? "flex flex-col" : "flex"}`}>
        {screenWidth <= 450 ? <MobileNav /> : <Nav />}
        <main className={`${screenWidth <= 450 ? "main-mobile" : "main"}`}>
          <Routes>
            <Route path="/" element={<Home screenWidth={screenWidth} />} />
            <Route path="/home" element={<Home screenWidth={screenWidth} />} />
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
