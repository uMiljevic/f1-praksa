import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Flag from 'react-flagkit';
import { ExportOutlined } from "@ant-design/icons";
import { getAlphaCode, getPositionColor } from "../Utils.js"
import { useNavigate } from "react-router-dom";
import Loader from "./Loader.js";

export default function RaceDetails(props) {
    const [raceQualifiers, setRaceQualifiers] = useState([]);
    const [raceResults, setRaceResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getRaceDetails();
    }, []);

    const getRaceDetails = async () => {
        const raceId = params.raceId;
        const urlQualifiers = `https://ergast.com/api/f1/2013/${raceId}/qualifying.json`;
        const urlResults = `https://ergast.com/api/f1/2013/${raceId}/results.json`;
        const qualifiersResponse = await axios.get(urlQualifiers);
        const resultsResponse = await axios.get(urlResults);

        setRaceQualifiers(qualifiersResponse.data.MRData.RaceTable.Races[0].QualifyingResults);
        setRaceResults(resultsResponse.data.MRData.RaceTable.Races[0]);
        setIsLoading(false);
    };

    const getBestTimes = (qualifier) => {
        const bestTime = [qualifier.Q1, qualifier.Q2, qualifier.Q3];
        const sortBestTime = bestTime.sort();
        return (
            sortBestTime[0]
        )
    }

    const handleGoToDriverDetails = (driverId) => {
        const linkTo = `/driverDetails/${driverId}`;
        navigate(linkTo);
    }

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div className="main-table-container">
            <div className="title">
                <h1 >Qualifying Results</h1>
                <h1 >Race Results</h1>
            </div>
            <div className="details-table">
                <div className="main-detail-menu">
                    <div className="info-container">
                        <div className="info-races">
                            <Flag country={getAlphaCode(props.flags, raceResults.Circuit.Location.country)} size={200} />
                            <div className="driver-name">
                                <h3> {raceResults.raceName}</h3>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <table className="details">
                        <tr>
                            <td className="details-data">Country: </td>
                            <td>{raceResults.Circuit.Location.country}</td>
                        </tr>
                        <tr>
                            <td className="details-data">Location: </td>
                            <td>{raceResults.Circuit.Location.locality}</td>
                        </tr>
                        <tr>
                            <td className="details-data">Date: </td>
                            <td>{raceResults.date}</td>
                        </tr>
                        <tr>
                            <td className="details-data">Full report: </td>
                            <td><a href={raceResults.url} target="_Self">Wiki <ExportOutlined /></a></td>
                        </tr>
                    </table>
                </div>
                <div className="table-scroll-race">
                    <table className="main-table">
                        <thead>
                            <th>Pos</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Best Time</th>
                        </thead>
                        <tbody>
                            {raceQualifiers.map((qualifier) => {
                                return (
                                    <tr key={qualifier.Driver.driverId}>
                                        <td className="td-driver">{qualifier.position}</td>
                                        <td className="td-driver2" onClick={() => handleGoToDriverDetails(qualifier.Driver.driverId)} ><Flag country={getAlphaCode(props.flags, qualifier.Driver.nationality)} size={40} className="flag" />{qualifier.Driver.familyName} </td>
                                        <td className="td-driver3">{qualifier.Constructor.name} </td>
                                        <td className="td-driver">{getBestTimes(qualifier)} </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="table-scroll-race">
                    <table className="main-table">
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Driver</th>
                                <th>Team</th>
                                <th>Result</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {raceResults.Results.map((result) => {
                                return (
                                    <tr key={result.Driver.driverId}>
                                        <td className="td-driver" >{result.position} </td>
                                        <td className="td-driver2" onClick={() => handleGoToDriverDetails(result.Driver.driverId)}><Flag country={getAlphaCode(props.flags, result.Driver.nationality)} size={40} className="flag" />{result.Driver.familyName} </td>
                                        <td className="td-driver3">{result.Constructor.name} </td>
                                        <td className="td-driver4">{result.Time ? result.Time.time : ""}  </td>
                                        <td className="td-driver-race" style={{ backgroundColor: (getPositionColor(result.position)) }}>{result.points}  </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}