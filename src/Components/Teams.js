import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = async () => {
    const urlAllteams = "http://ergast.com/api/f1/2013/constructorStandings.json";
    const response = await axios.get(urlAllteams);
    console.log(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    setTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
  }

  const handleGetTeamDetails = (constructorId) => {
    const linkTo = `/teamDetails/${constructorId}`;
    navigate (linkTo);
  };

  return (
    <div className="teams">
      <table className="table">
        <thead>
          <th>Position</th>
          <th>Name</th>
          <th>Details</th>
          <th>Points</th>
        </thead>
        <tbody>
          {teams.map((team, i) => {
            console.log(team);
            return (
              <tr key={i}>
                <td>{team.position}</td>
                <td onClick={() => handleGetTeamDetails(team.Constructor.constructorId)}>{team.Constructor.name}</td>
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