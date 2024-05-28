import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = async () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json";
        const response = await axios.get(url);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0]);
        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    }

    const handleClickDriverDetails = (driverId) => {
        console.log("driver id", driverId);
        const linkTo = `/driverDetails/${driverId}`;
        navigate(linkTo);
    }


    return (
        <table className="table">
            <tbody>
                {drivers.map((driver) => {
                    return (
                        <tr key={driver.Driver.driverId}>
                            <td>{driver.position} </td>
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