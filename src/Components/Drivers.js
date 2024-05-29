import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Flag from 'react-flagkit';



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

    // const getFlags = (filter, size) => {
    //     const flagData = props.flags.filter(flags =>
    //         flags.en_short_name.toLowerCase() === filter.toLowerCase() ||
    //         flags.nationality.toLowerCase() === filter.toLowerCase()
    //     );

    //     // const alpha2Code = flagData.lenght == 1 ? flagData[0].alpha_2_code : (filter == "UK" ? "GB" : filter);
    //     // return (
    //     //     console.log(getFlags())
    // //     // );
    // }

    const handleClickDriverDetails = (driverId) => {
        console.log("driver id", driverId);
        const linkTo = `/driverDetails/${driverId}`;
        navigate(linkTo);
    }

    return (
        <table className="table">
            <tbody>
                <h3>Drivers Championship Standings - 2013</h3>
                {drivers.map((driver) => {
                    return (
                        <tr key={driver.Driver.driverId}>
                            <td>{driver.position} </td>
                            {/* <td>{getFlags(driver.Driver.nationality)}</td> */}
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