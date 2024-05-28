import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function TeamDetails() {
    const [teamDetails, setTeamDetails] = useState([]);
    const [teamResults, setTeamResults] = useState ([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams ();

    useEffect(() => {
        getTeamDetails();

    }, []);



    const getTeamDetails = async () => {
        const teamId = params.teamId;
        console.log(teamId);

        const urlTeamDetails = `http://ergast.com/api/f1/2013/constructors/${teamId}/constructorStandings.json`;
        const urlTeamResults = `http://ergast.com/api/f1/2013/constructors/${teamId}/results.json`;

        const detailsResponse = await axios.get(urlTeamDetails);
        console.log(detailsResponse);
        const resultsResponse = await axios.get(urlTeamResults);
        console.log(resultsResponse);
       
        setTeamResults(detailsResponse.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setTeamDetails(resultsResponse.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setIsLoading(false);
    }
    
    if(isLoading) {
      return (<h1>Loading...</h1>);
    }

    return (
        <div>
            <div>
            <tr>
                <td>Country: {teamDetails[0].Constructor.nationality}</td>
                {/* <td>Position: {teamDetails.Constructor.name}</td>
                <td>Points: {teamDetails.points}</td>
                <td>History: <a href={teamDetails.Constructor.url} target="_blank">history</a></td> */}

            </tr>
            </div>

            <table className="table">
        <thead>
            <th>Round</th>
            <th>Grand Prix</th>
            <th>Vettel</th>
            <th>Veber</th>
            <th>Points</th>
        </thead>
        <tbody>
          {teamDetails.map((teamdetail, i) => {
            console.log(teamdetail);
            return (
              <tr key={i}>
                <td>{teamdetail.position}</td>
                <td>{teamdetail.Constructor.name}</td>
                <td><a href={teamdetail.Constructor.url} target="_blank">Details</a></td>
            <td>{teamdetail.points}</td>
              </tr>
            );
          })}

          {teamResults.map((teamresult, i) => {
            console.log(teamresult);
            return (
              <tr key={i}>
                {/* <td>{teamdetail.position}</td>
                <td>{teamdetail.Constructor.name}</td>
                <td><a href={teamdetail.Constructor.url} target="_blank">Details</a></td>
                <td>{teamdetail.points}</td> */}
              </tr>
            );
          })}
</tbody>
</table>
        </div>

    );
}