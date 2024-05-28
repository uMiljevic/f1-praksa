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

    const getRaceDetails = async ()=> {
        const raceId = params.raceId;
        console.log("raceId",raceId);
        const urlQualifiers = `https://ergast.com/api/f1/2013/${raceId}/qualifying.json`;        
        const urlResults = `https://ergast.com/api/f1/2013/${raceId}/results.json`;

        const qualifiersResponse = await axios.get(urlQualifiers);
        console.log("qualify",qualifiersResponse);
        const resultsResponse = await axios.get(urlResults);
        console.log("results",resultsResponse);
      
        setRaceQualifiers(qualifiersResponse.data.MRData.RaceTable.Races[0]);
        setRaceResults(resultsResponse.data.MRData.RaceTable.Races[0]);
        setIsLoading(false);
    };

    if(isLoading) {
        return(
            <h1>Is loading...</h1>
        )
    }

    return (
        <div>
            <div>
                <tr key={raceResults.raceName}>
                    <td>Country: {raceResults.Circuit.Location.country} </td>
                    <td>Location: {raceResults.Circuit.Location.locality} </td>
                    <td>Date: {raceResults.date} </td>
                    <td>Full report: </td>
                </tr>
            </div>
            {/* <table className="table">
                <tbody>
                    <tr>
                    {raceQualifiers.map((qualifier) => {
                        console.log(qualifier);
                        return (
                            <div>
                                <tr key={qualifier.QualifyingResults.Time.position}>
                                    <td>{qualifier.Driver.familyName} </td>
                                    <td>{qualifier.Constructor.constructorId} </td>
                                    <td>{qualifier.FastesLap.Time.time} </td>
                                    <td>  </td>
                                </tr>
                            </div>
                        );
                    })}
                    </tr>
                    <tr>
                    {raceResults.map((result) => {
                        console.log(result);
                        return (
                            <div>
                                <tr key={result.raceName}>
                                    <td>{result.Time.position} </td>
                                    <td>{result.Driver.familyName} </td>
                                    <td>{result.Constructor.constructorId} </td>
                                    <td>{result.Time.time}  </td>
                                    <td>{result.Time.points}  </td>
                                </tr>
                            </div>
                        );
                    })}
                    </tr>
                </tbody>
            </table> */}
        </div>
    );
}