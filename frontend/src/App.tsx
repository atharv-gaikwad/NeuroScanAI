import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Detection from "./pages/Detection";
import Results from "./pages/Results";
import Contact from "./pages/Contact";
import Models from "./pages/Models";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detect" element={<Detection />} />
        <Route path="/results" element={<Results />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/models" element={<Models />} />
      </Routes>
    </>
  );
}

export default App;