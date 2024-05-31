import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Flag from 'react-flagkit';
import { ExportOutlined } from "@ant-design/icons";
import { getAlphaCode } from "../Utils.js"
import { useNavigate } from "react-router-dom";


export default function Drivers(props) {
    const [driverDetails, setDriverDetails] = useState([]);
    const [driverResults, setDriverResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();


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
        setDriverDetails(responseDetails.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        setDriverResults(responeseResults.data.MRData.RaceTable.Races);

        setIsLoading(false);
    }

    const handleClickGetRaces = (raceId) => {
        const linkTo = `/raceDetails/${raceId}`;
        navigate(linkTo);
    };


    if (isLoading) {
        return (<h1>Loading...</h1>);
    }
    return (
        <div className="main-driver-container">
            <div className="main-detail-menu">
                <div className="info">
                    <div><img src={`${process.env.PUBLIC_URL}/assets/img/${params.driverId}.jpg`} /></div>
                    <div><Flag country={getAlphaCode(props.flags, driverDetails.Driver.nationality)} size={50} /></div>
                    <h3>{driverDetails.Driver.givenName + " " + driverDetails.Driver.familyName}</h3>
                </div>
                <ul className="details">
                    <li>Country: {driverDetails.Driver.nationality} </li>
                    <li>Team: {driverDetails.Constructors[0].name} </li>
                    <li>Birth: {driverDetails.Driver.dateOfBirth} </li>
                    <li><a href={driverDetails.Driver.url} target="_Blanc">Biography <ExportOutlined /></a> </li>
                </ul>
            </div>
            <h3>Formula 1 2013 Results</h3>
            <div className="table-scroll">
                <table className="main-table">
                    <thead>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>Team</th>
                            <th>Grid</th>
                            <th>Race</th>
                        </tr>
                    </thead>
                    <tbody>
                        {driverResults.map((results) => {
                            return (
                                <div>
                                    <tr key={results.driverId}>
                                        <td className="td-driver"> {results.round} </td>
                                        <td className="td-driver2" onClick={() => handleClickGetRaces(results.round)}><Flag country={getAlphaCode(props.flags, results.Circuit.Location.country)} size={40} className="flag" />{results.raceName}</td>
                                        <td className="td-driver3"> {results.Results[0].Constructor.name} </td>
                                        <td className="td-driver"> {results.Results[0].grid} </td>
                                        <td className="td-driver-race"> {results.Results[0].position} </td>
                                    </tr>
                                </div>
                            );
                        })}
                    </tbody>
                </table>

            </div>

        </div>
    )
};
