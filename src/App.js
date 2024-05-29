import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import Drivers from "./Components/Drivers";
import DriverDetails from "./Components/DriverDetails";
import TeamDetails from "./Components/TeamDetails";
import RaceDetails from "./Components/RaceDetails";
import Races from "./Components/Races";
import Teams from "./Components/Teams";
import React from "react";
import Logo from "./images/f1 logo.png";
import { Input, Space } from 'antd';

function App() {
  
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);

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
              <li>
                <Link to="/driver/details">Driver Details</Link>
              </li>
              <li>
                <Link to="/team/details">Team Details</Link>
              </li>
              <li>
                <Link to="/race/details">Race Details</Link>
              </li>
            </ul>
          </div>

          <div className="search">
            {/* <input type="text" placeholder="Search" /> */}
            <Space direction="vertical">
              <Search
                placeholder="Search"
                onSearch={onSearch}
                style={{
                  width: 200,
                }}
              />
              </Space>
          </div>

        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/races" element={<Races />} />
          <Route path="/driverDetails/:driverId" element={<DriverDetails />} />
          <Route path="/teamDetails/:teamId" element={<TeamDetails />} />
          <Route path="/raceDetails/:raceId" element={<RaceDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

