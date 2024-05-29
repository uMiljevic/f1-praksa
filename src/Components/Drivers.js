import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Flag from 'react-flagkit';
import { getAlphaCode } from "../Utils";



export default function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = async (props) => {
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
    if (isLoading) {
        return (<h1>Loading...</h1>);
      }


    return (
        <table className="table">
            <tbody>
                <h3>Drivers Championship Standings - 2013</h3>
                {drivers.map((driver) => {
                    return (
                        <tr key={driver.Driver.driverId}>
                            <td>{driver.position} </td>
                            <td><Flag country = {getAlphaCode(props.flags, driver.Driver.nationality)} size={15} /></td>
                            <td onClick={() => handleClickDriverDetails(driver.Driver.driverId)}>
                            {driver.Driver.givenName + " " + driver.Driver.familyName} </td>
                            <td>{driver.Constructors[0].name} </td>
                            <td>{driver.points}  </td>
                        </tr>
                    );
                })}

            </tbody>
        </table>
    )
};