import { Route, Routes } from "react-router-dom";
import { Fantasy } from "./pages/Fantasy";
import { Home } from "./pages/Home";
import "./index.css";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fantasy" element={<Fantasy />} />
    </Routes>
  );
};

export default App;
