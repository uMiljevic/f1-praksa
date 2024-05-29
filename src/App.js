import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
  const [flag, setFlag] = useState([]);

  useEffect(()=>{
    getFlag();
  }, []);

  const getFlag = async () => {
    const urlFlag = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const response = await axios.get(urlFlag);
    console.log('flag', response.data);
    setFlag(response.data);
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
          <Route path="/" element={<Home />} flags={flag}/>
          <Route path="/drivers" element={<Drivers />} flags={flag}/>
          <Route path="/teams" element={<Teams />} flags={flag}/>
          <Route path="/races" element={<Races />} flags={flag}/>
          <Route path="/driverDetails/:driverId" element={<DriverDetails />} flags={flag}/>
          <Route path="/teamDetails/:teamId" element={<TeamDetails />} flags={flag}/>
          <Route path="/raceDetails/:raceId" element={<RaceDetails />} flags={flag}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

