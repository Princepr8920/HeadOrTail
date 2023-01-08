import { Routes, Route } from "react-router-dom";
import "../App.scss";
import About from "../components/about/about";
import HeadAndTail from "../components/headOrtail/headOrTail";
import Home from "../components/home/home";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="head-and-tail" element={<HeadAndTail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
