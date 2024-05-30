import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Flag from 'react-flagkit';
import { getAlphaCode } from "../Utils.js";
import { Input, Space } from 'antd';



export default function Drivers(props) {
    const [drivers, setDrivers] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { Search } = Input;
    const [inputText, setInputText] = useState ("")


    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = async () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json";
        const response = await axios.get(url);        
        console.log(response.data.MRData.StandingsTable.StandingsLists[0]);
        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setIsLoading(false);
    }

    const handleClickDriverDetails = (driverId) => {
        console.log("driver id", driverId);
        const linkTo = `/driverDetails/${driverId}`;
        navigate(linkTo); 
    }

    const filteredData = drivers.filter((el) => {
        if (inputText === '') {
            return el;
        } else {
            return el.Driver.familyName.toLowerCase().includes(inputText);

        }
    });

    if (isLoading) {
        return (<h1>Loading...</h1>);
    }

    // console.log("a", filteredData);
    return (
        <div>
            <div className="search">
                <Space direction="vertical">
                    <Search
                        placeholder="Search"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        label = "Search"
                        style={{
                            width: 200,
                        }}
                    />
                </Space>
            </div>
            <table className="main-table">
                <tbody>
                    <h3>Drivers Championship Standings - 2013</h3>
                    {filteredData.map((driver) => {
                        return (
                            <tr key={driver.Driver.driverId}>
                                <td>{driver.position} </td>
                                <td onClick={() => handleClickDriverDetails(driver.Driver.driverId)}>
                                    <Flag country={getAlphaCode(props.flags, driver.Driver.nationality)} size={40} />
                                    {driver.Driver.givenName + " " + driver.Driver.familyName} </td>
                                <td>{driver.Constructors[0].name} </td>
                                <td>{driver.points}  </td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>

    )
};