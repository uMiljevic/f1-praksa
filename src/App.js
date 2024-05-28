import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import Drivers from "./Components/Drivers";
import DriverDetails from "./Components/DriverDetails";
import Races from "./Components/Races";
import Teams from "./Components/Teams";
import React from "react";
import Logo from "./images/f1 logo.png";



function App() {
  return (
    <div className="main-container">

      <Router>
        <nav className="nav-bar">

          <div className="nav-img">
            <img src={Logo} alt="F1 Logo" />
          </div>

<<<<<<< HEAD
          <div className="list-container">
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
          </div>

          <div className="search">
            <input type="text" placeholder="Search" />
          </div>
=======
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
            <li>
              <Link to="/driver-details">Drivers</Link>
            </li>
          </ul>
>>>>>>> be1909d519fe6ce11ffda428805bd50ab0494e94
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/driver-details" element={<DriverDetails />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/races" element={<Races />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

