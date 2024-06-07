import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Flag from 'react-flagkit';
import { getAlphaCode, getPositionColor } from "../Utils.js";
import { useNavigate } from "react-router-dom";
import { ExportOutlined } from "@ant-design/icons";
import Loader from "./Loader.js";


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

    const urlTeamDetails = `https://ergast.com/api/f1/2013/constructors/${teamId}/constructorStandings.json`;
    const urlTeamResults = `https://ergast.com/api/f1/2013/constructors/${teamId}/results.json`;

    const detailsResponse = await axios.get(urlTeamDetails);
    const resultsResponse = await axios.get(urlTeamResults);

    setTeamDetails(detailsResponse.data.MRData.StandingsTable.StandingsLists[0]);
    setTeamResults(resultsResponse.data.MRData.RaceTable.Races);
    setIsLoading(false);
  }

  const handleGoToRaceDetails = (raceId) => {
    const linkTo = `/raceDetails/${raceId}`;
    navigate(linkTo);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="main-table-container">
      <div className="title">
        <h1>Formula 1 2013 Results</h1>
      </div>
      <div className="details-table">
        <div className="main-detail-menu">
          <div className="info-team-container">
            <div className="img-team">
              <img className="img123" src={`${process.env.PUBLIC_URL}/assets/img/${params.teamId}.png`} />
            </div>
            <div className="info-team">
              <Flag country={getAlphaCode(props.flags, teamDetails.ConstructorStandings[0].Constructor.nationality)} size={40} />
              <div className="team-name">
                <h3>{teamDetails.ConstructorStandings[0].Constructor.name}</h3>
              </div>
            </div>
          </div>

          <hr />

          <table className="details">
            <tr>
              <td><b>Country:</b></td>
              <td>{teamDetails.ConstructorStandings[0].Constructor.nationality}</td>
            </tr>
            <tr>
              <td><b>Position:</b></td>
              <td>{teamDetails.ConstructorStandings[0].position}</td>
            </tr>
            <tr>
              <td><b>Points:</b></td>
              <td>{teamDetails.ConstructorStandings[0].points}</td>
            </tr>
            <tr>
              <td><b>History:</b></td>
              <td><a href={teamDetails.ConstructorStandings[0].Constructor.url} target="_blank" >Read <ExportOutlined /></a></td>
            </tr>
          </table>
        </div>

        <div className="table-scroll">
          <table className="main-table" >
            <thead>
              <tr>
                <th>Round</th>
                <th>Grand Prix</th>
                <th>{teamResults[0].Results[0].Driver.familyName}</th>
                <th>{teamResults[0].Results[1].Driver.familyName}</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {teamResults.map((teamresult) => {
                return (
                  <tr key={teamresult.teamId}>
                    <td className="td-driver">{teamresult.round}</td>
                    <td className="td-driver2" onClick={() => handleGoToRaceDetails(teamresult.round)}><Flag country={getAlphaCode(props.flags, teamresult.Circuit.Location.country)} size={40} className="flag" />{teamresult.raceName}</td>
                    <td className="td-driver3" style={{ backgroundColor: (getPositionColor(teamresult.Results[0].position)) }}>{teamresult.Results[0].position}</td>
                    <td className="td-driver" style={{ backgroundColor: (getPositionColor(teamresult.Results[1].position)) }}>{teamresult.Results[1].position}</td>
                    <td className="td-driver-race">{parseInt(teamresult.Results[0].points) + parseInt(teamresult.Results[1].points)}</td>
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





