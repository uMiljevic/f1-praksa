import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Flag from 'react-flagkit';
import { getAlphaCode } from "../Utils.js";

export default function TeamDetails(props) {
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
    console.log("details", detailsResponse);
    const resultsResponse = await axios.get(urlTeamResults);
    //console.log('results', resultsResponse.data.MRData.RaceTable.Races[0]);
    // console.log('results', resultsResponse.data);

    setTeamDetails(detailsResponse.data.MRData.StandingsTable.StandingsLists[0]);
    setTeamResults(resultsResponse.data.MRData.RaceTable.Races);
    setIsLoading(false);
  }

  if (isLoading) {
    return (<h1>Loading...</h1>);
  }

  return (
    <div>

      <ul>
        <li>Country: {teamDetails.ConstructorStandings[0].Constructor.nationality}</li>
        <li>Position: {teamDetails.ConstructorStandings[0].position}</li>
        <li>Points: {teamDetails.ConstructorStandings[0].points}</li>
        <li>History: <a href={teamDetails.url} target="_Blanc" >Icon</a></li>
      </ul>



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
            //console.log('teamresult', teamresult);
            return (
              <tr key={teamresult.teamId}>
                <td>{teamresult.round}</td>
                <td><Flag country={getAlphaCode(props.flags, teamresult.Circuit.Location.country)} size={40} />{teamresult.raceName}</td>
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





