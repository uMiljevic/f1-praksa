import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import Drivers from "./Components/Drivers";
import Races from "./Components/Races";
import Teams from "./Components/Teams";
import React from "react";
import images from "./images/NavBar Image 2.jpg";


function App() {
  return (
    <div className="main-container">

      {/* <div className="search">
        <input type="text" placeholder="Search"/>
      </div> */}

      <Router>
        <nav className="nav-bar">
          <div className="nav-img">
            <img src={images} alt="F1 Feeder"/>
          </div>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/drivers">Drivers</Link>
            </li>
            <li>
              <Link to="/teams" >Teams</Link>
            </li>
            <li>
              <Link to="/races">Races</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/races" element={<Races />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
