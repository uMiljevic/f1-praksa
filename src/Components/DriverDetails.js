import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Drivers() {
    const [driverDetails, setDriverDetails] = useState([]);
    const [driverResults, setDriverResults] = useState([]);
    const params = useParams();

    useEffect(() => {
        getDriverDetails();
    }, []);


    const getDriverDetails = async () => {
        const driverId = params.driverId;
        const urlStandings = `http://ergast.com/api/f1/2013/drivers/${driverId}/driverStandings.json`;
        const urlResults = `http://ergast.com/api/f1/2013/drivers/${driverId}/results.json`;

        const responseDetails = await axios.get(urlStandings);
        const responeseResults = await axios.get(urlResults);

        console.log(responseDetails);
        setDriverDetails(responseDetails.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setDriverResults(responeseResults.data.MRData.RaceTable.Races);

    }

    // console.log(responeseResults);
    return (
        <div>
            {driverDetails.map((detail) => {
                return (
                    <ul key={detail.Driver.driverId}>
                        <li>Country: {detail.Driver.nationality} </li>
                        <li>Team: {detail.Constructors[0].name} </li>
                        <li>Birth: {detail.Driver.dateOfBirth} </li>
                        <li>Biography: </li>
                    </ul>

                );
            })}

            <table className="table">
                <tbody>
                    {driverResults.map((results) => {
                        return (
                            <div>
                                <tr key={results.driverId}>
                                    <td> {results.round} </td>
                                    <td> {results.raceName} </td>
                                    <td> {results.Results[0].Constructor.name} </td>
                                    <td> {results.Results[0].grid} </td>
                                    <td> {results.Results[0].position} </td>
                                </tr>
                            </div>
                        );
                    })}
                </tbody>

            </table>
        </div>
    )
};