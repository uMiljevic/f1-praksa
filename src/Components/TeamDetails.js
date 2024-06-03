import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Flag from 'react-flagkit';
import { getAlphaCode, getPositionColor } from "../Utils.js";
import { useNavigate } from "react-router-dom";
import { ExportOutlined, LoadingOutlined } from "@ant-design/icons";


export default function TeamDetails(props) {
  const [teamDetails, setTeamDetails] = useState([]);
  const [teamResults, setTeamResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    getTeamDetails();

  }, []);



  const getTeamDetails = async () => {
    const teamId = params.teamId;
    //console.log(teamId);

    const urlTeamDetails = `http://ergast.com/api/f1/2013/constructors/${teamId}/constructorStandings.json`;
    const urlTeamResults = `http://ergast.com/api/f1/2013/constructors/${teamId}/results.json`;

    const detailsResponse = await axios.get(urlTeamDetails);
    //console.log("details", detailsResponse);
    const resultsResponse = await axios.get(urlTeamResults);
    //console.log('results', resultsResponse.data.MRData.RaceTable.Races[0]);
    // console.log('results', resultsResponse.data);

    setTeamDetails(detailsResponse.data.MRData.StandingsTable.StandingsLists[0]);
    setTeamResults(resultsResponse.data.MRData.RaceTable.Races);
    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingOutlined />;
  }

  return (
    <div>
      <div className="main-team-container">
        <div className="main-team-detail-menu">
          <img id="nameimg" src={`${process.env.PUBLIC_URL}/assets/img/${params.teamId}.png`} />
          <div className="name">
            <p><Flag country={getAlphaCode(props.flags, teamDetails.ConstructorStandings[0].Constructor.nationality)} size={40} /></p>
            <p id="constructorname">{teamDetails.ConstructorStandings[0].Constructor.name}</p>
          </div>
        </div>

        <table className="team-details">
          
          <tr>Country: {teamDetails.ConstructorStandings[0].Constructor.nationality}</tr>
          <tr>Position: {teamDetails.ConstructorStandings[0].position}</tr>
          <tr>Points: {teamDetails.ConstructorStandings[0].points}</tr>
          <tr>History: <a href={teamDetails.ConstructorStandings[0].Constructor.url} target="_blank" ><ExportOutlined /></a></tr>
        </table>
      </div>



      <h3 class="formularesults">Formula 1 2013 Results</h3>
      <div className="table-scroll">

        <table className="main-table" >
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
                  <td className="td-teams">{teamresult.round}</td>
                  <td className="td-teams2"><Flag country={getAlphaCode(props.flags, teamresult.Circuit.Location.country)} size={40} />{teamresult.raceName}</td>
                  <td className="td-teams3" style={{ backgroundColor: (getPositionColor(teamresult.Results[0].position)) }}>{teamresult.Results[0].position}</td>
                  <td className="td-teams4" style={{ backgroundColor: (getPositionColor(teamresult.Results[1].position)) }}>{teamresult.Results[1].position}</td>
                  <td className="td-teams-points">{parseInt(teamresult.Results[0].points) + parseInt(teamresult.Results[1].points)}</td>
                </tr>

              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}





