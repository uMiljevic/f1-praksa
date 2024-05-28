import { useEffect, useState } from "react";
import axios from "axios";

export default function Drivers(){
    const [drivers, setDrivers] = useState([]);

    useEffect(()=>{
        getDrivers();
    }, []);

    const getDrivers = async () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json";
        const response = await axios.get(url);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0]);
        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    };


    return(
        <table className = "table">
        <tbody>
        {drivers.map((driver) => {
            return (
                <tr key = {driver.Driver.driverId}>
                    <td>{driver.position} </td>
                    <td>{driver.Driver.givenName + " " + driver.Driver.familyName} </td>
                    <td>{driver.Constructors [0].name} </td>
                    <td>{driver.points}  </td>
                </tr>
            );
        })};

        </tbody>
    </table>
    );
}