import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function TeamDetails() {
  const [teamDetails, setTeamDetails] = useState([]);
  const [teamResults, setTeamResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    getTeamDetails();

  }, []);



  const getTeamDetails = async () => {
    const teamId = params.teamId;
    //console.log(teamId);

    const urlTeamDetails = `http://ergast.com/api/f1/2013/constructors/${teamId}/constructorStandings.json`;
    const urlTeamResults = `http://ergast.com/api/f1/2013/constructors/${teamId}/results.json`;

    const detailsResponse = await axios.get(urlTeamDetails);
    // console.log("details", detailsResponse);
    const resultsResponse = await axios.get(urlTeamResults);
    // console.log('results', resultsResponse.data.MRData.RaceTable.Races[0]);
    // console.log('results', resultsResponse.data);
    
    // setTeamDetails(detailsResponse.data.MRData.StandingsTable.StandingsLists);
    
    setTeamResults(resultsResponse.data.MRData.RaceTable.Races);

    setIsLoading(false);
  }

  if (isLoading) {
    return (<h1>Loading...</h1>);
  }

  return (
    <div>
      <div>
      {teamDetails.map((teamdetail) => {
        console.log("teamDetail", teamdetail);
        return (
          <ul key={teamdetail.Constructor.teamId}>
            <li>Country: {teamdetail.Constructor[0].nationality}</li>
            <li>Position: {teamdetail.Constructor.position}</li>
            <li>Points: {teamdetail.Constructor.points}</li>
            <li>History: {teamdetail.Constructor.url} </li>
          </ul>
        );
      })}
      </div>
      <h2>Formula 1 2013 Results</h2>
      <table>
          <thead>
            <th>Round</th>
            <th>Grand Prix</th>
            <th>{teamResults[0].Results[0].Driver.familyName}</th>
            <th>{teamResults[0].Results[1].Driver.familyName}</th>
            <th>Points</th>
          </thead>
          <tbody>
            {teamResults.map((teamresult) => {
              //console.log('teamresults', teamresults);
                return (
                  
                    <tr key={teamresult.teamId}>
                    <td>{teamresult.round}</td>
                    <td>{teamresult.raceName}</td>
                    <td>{teamresult.Results[0].position}</td>
                    <td>{teamresult.Results[1].position}</td>
                    <td>{parseInt(teamresult.Results[0].points) + parseInt(teamresult.Results[1].points)}</td>
                  </tr>
                  
              );
            })}
          </tbody>
        </table>
        </div>
  );
}





       