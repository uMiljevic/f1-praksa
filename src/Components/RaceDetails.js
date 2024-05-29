import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function RaceDetails() {
    const [raceQualifiers, setRaceQualifiers] = useState([]);
    const [raceResults, setRaceResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        getRaceDetails();
    }, []);

    const getRaceDetails = async () => {
        const raceId = params.raceId;
        console.log("raceId", raceId);
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
        return(
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
            <tr >
                <td>Country: {raceResults.Circuit.Location.country} </td>
                <td>Location: {raceResults.Circuit.Location.locality} </td>
                <td>Date: {raceResults.date} </td>
                <td>Full report: </td>
            </tr>

            <table className="table">
                <tbody>
                    <tr>
                        {raceQualifiers.map((qualifier) => {
                            console.log(qualifier);
                            return (

                                <tr key={qualifier.position}>
                                    <td>Pos: {qualifier.position}</td>
                                    <td>Driver: {qualifier.Driver.familyName} </td>
                                    <td>Team: {qualifier.Constructor.constructorId} </td>
                                    <td>Best Time: {getBestTimes(qualifier)} </td>
                                    <td>  </td>
                                </tr>

                            );
                        })}
                    </tr>
                    <tr>
                        {raceResults.Results.map((result) => {
                            console.log(result);
                            return (

                                <tr key={result.raceName}>
                                    <td>{result.position} </td>
                                    <td>{result.Driver.familyName} </td>
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