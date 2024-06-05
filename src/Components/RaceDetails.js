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
        <div className="table-scroll9">
            <div className="tables-titles">
                <h2 >Qualifying Results</h2>            
                <h2 >Race Results</h2>
            </div>
            <div className="tables-position">
                <table className="main-table1">
                    <tr><Flag country={getAlphaCode(props.flags, raceResults.Circuit.Location.country)} size={120} /></tr>
                    <tr>Country: {raceResults.Circuit.Location.country} </tr>
                    <tr>Location: {raceResults.Circuit.Location.locality} </tr>
                    <tr>Date: {raceResults.date} </tr>
                    <tr>Full report: <a href={raceResults.url} target="_Self"><ExportOutlined /></a></tr>
                </table>

                <table className="main-table">
                    <thead>

                        <tr>
                            <th>Pos</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Best Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {raceQualifiers.map((qualifier) => {
                            return (
                                <tr key={qualifier.Driver.driverId}>
                                    <td className="td-driver">{qualifier.position}</td>
                                    <td className="td-driver2" onClick={() => handleGoToDriverDetails(qualifier.Driver.driverId)} ><Flag country={getAlphaCode(props.flags, qualifier.Driver.nationality)} size={40} />{qualifier.Driver.familyName} </td>
                                    <td className="td-driver3">{qualifier.Constructor.name} </td>
                                    <td className="td-driver">{getBestTimes(qualifier)} </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

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
                                    <td className="td-driver2" onClick={() => handleGoToDriverDetails(result.Driver.driverId)}><Flag country={getAlphaCode(props.flags, result.Driver.nationality)} size={40} />{result.Driver.familyName} </td>
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
    );
}