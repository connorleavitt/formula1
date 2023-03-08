import { Route, Routes } from "react-router-dom";
import { Fantasy } from "./pages/Fantasy";
import { Home } from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fantasy" element={<Fantasy />} />
    </Routes>
  );
}

export default App;
