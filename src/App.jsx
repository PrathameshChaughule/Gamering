import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PS5 from "./pages/PS5";
import PS4 from "./pages/PS4";
import XBOX from "./pages/XBOX";

function App() {
  return (
    <div className="bg-[#111315] text-white h-fit w-[99vw]">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ps5" element={<PS5 />} />
          <Route path="/ps4" element={<PS4 />} />
          <Route path="/xbox" element={<XBOX />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
