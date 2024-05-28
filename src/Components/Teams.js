import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

export default function App() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams();

  }, []);


  const getTeams = async () => {
    const urlAllteams = "http://ergast.com/api/f1/2013/constructorStandings.json";
    const response = await axios.get(urlAllteams);
    console.log(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    setTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);

  }

  //console.log(teams);


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
                <td>{team.Constructor.name}</td>
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