import Home from "./components/home";
import Projects from "./components/projects";
import "./App.scss";
import Navbar from "./components/navbar";
import About from "./components/about";
import Skills from "./components/skills";
import Contact from "./components/contact";
function App() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Skills/>
      <Projects />
       <Contact />
    </>
  );
}

export default App;
