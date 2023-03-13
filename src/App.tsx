import { Route, Routes } from "react-router-dom";
import { Fantasy } from "./pages/Fantasy";
import { Home } from "./pages/Home";
import "./index.css";
import { Nav } from "./components/Nav";

const App: React.FC = () => {
  return (
    <div className="flex">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fantasy" element={<Fantasy />} />
      </Routes>
    </div>
  );
};

export default App;
