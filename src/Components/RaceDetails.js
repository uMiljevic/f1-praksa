import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Flag from 'react-flagkit';
import { ExportOutlined } from "@ant-design/icons";
import { getAlphaCode, getPositionColor } from "../Utils.js"
import { useNavigate } from "react-router-dom";

export default function RaceDetails(props) {
    const [raceQualifiers, setRaceQualifiers] = useState([]);
    const [raceResults, setRaceResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
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
            <h1>Is loading...</h1>
        )
    }

    return (
        <div className="table-scroll">
            <ul >
                <li><Flag country={getAlphaCode(props.flags, raceResults.Circuit.Location.country)} size={40} /></li>
                <li>Country: {raceResults.Circuit.Location.country} </li>
                <li>Location: {raceResults.Circuit.Location.locality} </li>
                <li>Date: {raceResults.date} </li>
                <li>Full report: <a href={raceResults.url} target="_Self"><ExportOutlined /></a></li>
            </ul>

            <table className="main-table">
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
                        {raceQualifiers.map((qualifier, i) => {                            
                            return (
                                <tr key={i}>
                                    <td className="td-driver">{qualifier.position}</td>
                                    <td onClick={() => handleGoToDriverDetails(qualifier.Driver.driverId)} className="td-driver2"><Flag country={getAlphaCode(props.flags, qualifier.Driver.nationality)} size={40} />{qualifier.Driver.familyName} </td>
                                    <td className="td-driver3">{qualifier.Constructor.constructorId} </td>
                                    <td className="td-driver">{getBestTimes(qualifier)} </td>
                                </tr>
                            );
                        })}                    
                </tbody>
            </table>

            <table className="main-table">
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
                    {raceResults.Results.map((result, i) => {                        
                        return (
                            <tr key={i}>
                                <td className="td-driver" >{result.position} </td>
                                <td className="td-driver2" onClick={() => handleGoToDriverDetails(result.Driver.driverId)}><Flag country={getAlphaCode(props.flags, result.Driver.nationality)} size={40} />{result.Driver.familyName} </td>
                                <td className="td-driver3">{result.Constructor.constructorId} </td>
                                <td className="td-driver4">{result.Time ? result.Time.time : ""}  </td>
                                <td className="td-driver-race" style={{ backgroundColor: (getPositionColor(result.position)) }}>{result.points}  </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}