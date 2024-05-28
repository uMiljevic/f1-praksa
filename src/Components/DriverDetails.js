import { useEffect, useState } from "react";
import axios from "axios";

export default function Drivers() {
    const [driverDetails, setDriverDetails] = useState([]);

    useEffect(() => {
        getDriverDetails();
    }, []);

    const getDriverDetails = async () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json";
        const response = await axios.get(url);
        // console.log(response.data.MRData.StandingsTable.StandingsLists[0]);
        setDriverDetails(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    };


    return (
        <div>
            <div>
                <tr key={detail.Driver.driverId}>
                    <td>{detail.Driver.nationality} </td>
                    <td>{detail.Constructors[0].name} </td>
                    <td>{detail.Driver.dateOfBirth} </td>
                    <td>Biography:  </td>
                </tr>
            </div>
            <table className="table">
                <tbody>
                    {driverDetails.map((detail) => {
                        console.log(detail);
                        return (
                            <div>
                                <tr key={detail.Driver.driverId}>
                                    <td>{detail.Driver.nationality} </td>
                                    <td>{detail.Constructors[0].name} </td>
                                    <td>{detail.Driver.dateOfBirth} </td>
                                    <td>Biography:  </td>
                                </tr>
                            </div>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}