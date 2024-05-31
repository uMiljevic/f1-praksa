import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import Home from "./Components/Home";
import Drivers from "./Components/Drivers";
import DriverDetails from "./Components/DriverDetails";
import TeamDetails from "./Components/TeamDetails";
import RaceDetails from "./Components/RaceDetails";
import Races from "./Components/Races";
import Teams from "./Components/Teams";
import React, { useEffect, useState } from "react";
import Logo from "./images/f1 logo.png";
import { Input, Space } from 'antd';
import axios from "axios";

function App() {

  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    getFlags();
  }, []);

  const getFlags = async () => {
    const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const response = await axios.get(urlFlags);
    console.log('flag', response.data);
    setFlags(response.data);
  };

  return (
    <div className="main-container">
      <Router>
        <nav className="nav-bar">

          <div className="nav-img">
            <Link to="/">
              <img src={Logo} alt="F1 Logo" />
            </Link>
          </div>

          <div className="list-container">
            <ul>
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
        </nav>
              
        <Routes>
          <Route path="/" element={<Home flags={flags} />} />
          <Route path="/drivers" element={<Drivers flags={flags} />} />
          <Route path="/teams" element={<Teams flags={flags} />} />
          <Route path="/races" element={<Races flags={flags} />} />
          <Route path="/driverDetails/:driverId" element={<DriverDetails flags={flags} />} />
          <Route path="/teamDetails/:teamId" element={<TeamDetails flags={flags} />} />
          <Route path="/raceDetails/:raceId" element={<RaceDetails flags={flags} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

