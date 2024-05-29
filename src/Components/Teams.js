import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Flag from 'react-flagkit';
import { getAlphaCode } from "../Utils.js";

export default function App(props) {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = async () => {
    const urlAllteams = "http://ergast.com/api/f1/2013/constructorStandings.json";
    const response = await axios.get(urlAllteams);
    console.log(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    setTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    setIsLoading(false);
  }

  const handleGetTeamDetails = (constructorId) => {
    const linkTo = `/teamDetails/${constructorId}`;
    navigate (linkTo);
  };

  

  if (isLoading) {
    return (<h1>Loading...</h1>);
  }

console.log(props);

  return (
    <div className="teams">
      <h2>Constructors Championship Standings - 2013</h2>
      <table className="table">
        <thead>
          <th>Position</th>
          <th>Name</th>
          <th>Details</th>
          <th>Points</th>
        </thead>
        <tbody>
          {teams.map((team, i) => {
            console.log('team',team);
            return (
              <tr key={i}>
                <td>{team.position}</td>
                <td onClick={() => handleGetTeamDetails(team.Constructor.constructorId)}>
                  <Flag country={getAlphaCode(props.flags, team.Constructor.nationality)} size={40} />{team.Constructor.name}</td>
                <td><a href={team.Constructor.url} target="_blank">Details</a></td>
                <td>{team.points}</td>
              </tr>
            );
          })};
        </tbody>
      </table>


    </div>
  );
}