import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Flag from 'react-flagkit';
import { getAlphaCode } from "../Utils.js";
import { Input, Space } from 'antd';
import Loader from "./Loader.js";



export default function Drivers(props) {
    const [drivers, setDrivers] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { Search } = Input;
    const [inputText, setInputText] = useState("")


    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = async () => {
        const url = "https://ergast.com/api/f1/2013/driverStandings.json";
        const response = await axios.get(url);
        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setIsLoading(false);
    }

    const handleClickDriverDetails = (driverId) => {
        const linkTo = `/driverDetails/${driverId}`;
        navigate(linkTo);
    }

    const filteredData = drivers.filter((el) => {
        if (inputText === '') {
            return el;
        } else {
            return el.Driver.familyName.toLowerCase().includes(inputText)
                ||
                el.Driver.givenName.toLowerCase().includes(inputText);

        }
    });

    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className="main-driver-container">
            <div className="main-title">
                <h1>Drivers Championship</h1>
            </div>
            <div className="title-search">
                <div>
                    <h3>Drivers Championship Standings - 2013</h3>
                </div>
                <div className="search">
                    <Space direction="vertical">
                        <Search
                            placeholder="Search"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            label="Search"
                            style={{
                                width: 200,
                            }}
                        />
                    </Space>
                </div>
            </div>
            <div className="table-scroll">
                <table className="main-table">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((driver) => {
                            return (
                                <tr key={driver.Driver.driverId}>
                                    <td className="td-driver">{driver.position} </td>
                                    <td onClick={() => handleClickDriverDetails(driver.Driver.driverId)} className="td-driver2">
                                        <Flag country={getAlphaCode(props.flags, driver.Driver.nationality)} size={40} className="flag" />
                                        {driver.Driver.givenName + " " + driver.Driver.familyName}
                                    </td>
                                    <td className="td-driver3">{driver.Constructors[0].name} </td>
                                    <td className="td-driver">{driver.points}  </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>

    )
};