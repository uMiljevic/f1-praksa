import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Flag from 'react-flagkit';
import { ExportOutlined } from "@ant-design/icons";
import { getAlphaCode } from "../Utils.js";

export default function RaceDetails(props) {
    const [raceQualifiers, setRaceQualifiers] = useState([]);
    const [raceResults, setRaceResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        getRaceDetails();
    }, []);

    const getRaceDetails = async () => {
        const raceId = params.raceId;
        //console.log("raceId", raceId);
        const urlQualifiers = `https://ergast.com/api/f1/2013/${raceId}/qualifying.json`;
        const urlResults = `https://ergast.com/api/f1/2013/${raceId}/results.json`;

        const qualifiersResponse = await axios.get(urlQualifiers);
        console.log("qualify", qualifiersResponse);
        const resultsResponse = await axios.get(urlResults);
        //console.log("results",resultsResponse);

        setRaceQualifiers(qualifiersResponse.data.MRData.RaceTable.Races[0].QualifyingResults);
        setRaceResults(resultsResponse.data.MRData.RaceTable.Races[0]);
        setIsLoading(false);
    };

    const getBestTimes = (qualifier) => {
        const bestTime = [qualifier.Q1, qualifier.Q2, qualifier.Q3];
        const sortBestTime = bestTime.sort();
        return (
            `${sortBestTime[0]}`
        )
    }

    if (isLoading) {
        return (
            <h1>Is loading...</h1>
        )
    }

    return (
        <>
            <ul >
                <li><Flag country={getAlphaCode(props.flags, raceResults.Circuit.Location.country)} size={40} /></li>
                <li>Country: {raceResults.Circuit.Location.country} </li>
                <li>Location: {raceResults.Circuit.Location.locality} </li>
                <li>Date: {raceResults.date} </li>
                <li>Full report: <a href={raceResults.url} target="_Blanc"><ExportOutlined /></a></li>
            </ul>

            <table className="table1">
                <thead>
                <h3>Qualifying Results</h3>
                    <tr>
                        <th>Pos</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Best Time</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {raceQualifiers.map((qualifier) => {
                            console.log("rrrrrr",qualifier);
                            return (

                                <tr key={qualifier.position}>
                                    <td>{qualifier.position}</td>
                                    <td><Flag country={getAlphaCode(props.flags, qualifier.Constructor.nationality)} size={40} />{qualifier.Driver.familyName} </td>
                                    <td>{qualifier.Constructor.constructorId} </td>
                                    <td>{getBestTimes(qualifier)} </td>
                                    
                                </tr>

                            );
                        })}
                    </tr>
                </tbody>
            </table>

            <table>
                <thead>
                    <h3>Race Results</h3>
                    <tr>
                        <th>Pos</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Result</th>
                        <th>Points</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {raceResults.Results.map((result) => {
                            //console.log(result);
                            return (

                                <tr key={result.raceName}>
                                    <td>{result.position} </td>
                                    <td><Flag country={getAlphaCode(props.flags, result.Driver.familyName)} size={40} />{result.Driver.familyName} </td>
                                    <td>{result.Constructor.constructorId} </td>
                                    <td>{result.Time ? result.Time.time : ""}  </td>
                                    <td>{result.points}  </td>
                                </tr>

                            );
                        })}
                    </tr>
                </tbody>
            </table>


        </>
    );
}