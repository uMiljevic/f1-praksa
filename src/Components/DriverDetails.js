import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Flag from 'react-flagkit';
import { getAlphaCode, getPositionColor } from "../Utils.js"
import { useNavigate } from "react-router-dom";
import { ExportOutlined } from "@ant-design/icons";
import Loader from "./Loader.js";



export default function DriverDetails(props) {
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
        const urlStandings = `https://ergast.com/api/f1/2013/drivers/${driverId}/driverStandings.json`;
        const urlResults = `https://ergast.com/api/f1/2013/drivers/${driverId}/results.json`;

        const responseDetails = await axios.get(urlStandings);
        const responeseResults = await axios.get(urlResults);

        setDriverDetails(responseDetails.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        setDriverResults(responeseResults.data.MRData.RaceTable.Races);

        setIsLoading(false);
    }

    const handleClickGetRaces = (raceId) => {
        const linkTo = `/raceDetails/${raceId}`;
        navigate(linkTo);
    };


    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className="main-table-container">
            <div className="title-container">
                <div className="empty-div"></div>
                <div>
                    <h3>Formula 1 2013 - Results</h3>
                </div>
            </div>
            <div className="details-table">
                <div className="main-detail-menu">
                    <div className="info-container">
                        <div className="img-driver"><img src={`${process.env.PUBLIC_URL}/assets/img/${params.driverId}.jpg`} /></div>
                        <div className="info">
                            <Flag country={getAlphaCode(props.flags, driverDetails.Driver.nationality)} size={50} />
                            <div className="driver-name">
                                <h3>{driverDetails.Driver.givenName} </h3>
                                <h3> {driverDetails.Driver.familyName}</h3>
                            </div>

                        </div>
                    </div>
                    <hr />
                    <table className="details">
                        <tbody>
                            <tr>
                                <td><b>Country: </b></td>
                                <td>{driverDetails.Driver.nationality}</td>
                            </tr>
                            <tr>
                                <td><b>Team: </b></td>
                                <td>{driverDetails.Constructors[0].name}</td>
                            </tr>
                            <tr>
                                <td><b>Birth: </b></td>
                                <td>{driverDetails.Driver.dateOfBirth}</td>
                            </tr>
                            <tr>
                                <td><b>Biography: </b></td>
                                <td><a href={driverDetails.Driver.url} target="_blanc">Read <ExportOutlined /></a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
                                    <tr key={results.driverId}>
                                        <td className="td-driver"> {results.round} </td>
                                        <td className="td-driver2" onClick={() => handleClickGetRaces(results.round)}><Flag country={getAlphaCode(props.flags, results.Circuit.Location.country)} size={40} className="flag" />{results.raceName}</td>
                                        <td> {results.Results[0].Constructor.name} </td>
                                        <td className="td-driver"> {results.Results[0].grid} </td>
                                        <td className="td-driver-race" style={{ backgroundColor: (getPositionColor(results.Results[0].position)) }}> {results.Results[0].position} </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};
