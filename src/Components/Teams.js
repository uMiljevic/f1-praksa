import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Flag from 'react-flagkit';
import { getAlphaCode } from "../Utils.js";
import { Input, Space } from 'antd';
import { ExportOutlined, LoadingOutlined } from "@ant-design/icons";



export default function App(props) {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const { Search } = Input;

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = async () => {
    const urlAllteams = "http://ergast.com/api/f1/2013/constructorStandings.json";
    const response = await axios.get(urlAllteams);
    //console.log(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    setTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
    setIsLoading(false);
  }

  const filteredData = teams.filter((el) => {
    //if no input the return the original
    if (inputText === '') {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.Constructor.constructorId.toLowerCase().includes(inputText);

    }
  });

  const handleGetTeamDetails = (constructorId) => {
    //console.log("constructorId", constructorId);
    const linkTo = `/teamDetails/${constructorId}`;
    navigate(linkTo);
  };

  if (isLoading) {
    return <LoadingOutlined />;
  }

  //console.log(props);

  return (

    <div className="main-team-container">
      <div className="search">
        {/* <input type="text" placeholder="Search" /> */}
        <Space direction="vertical">
          <Search
            placeholder="Search"
            onChange={(e) => setInputText(e.target.value)}
            style={{
              width: 200,
            }}
          />
        </Space>
      </div>

      <h1>Constructors Championship</h1>
      <div className="table-scroll">
        <table className="main-table">
          <thead >
            <th  colSpan={4}>Constructors Championship Standings - 2013</th>
          </thead>
          <tbody>
            {filteredData.map((team)=> {
              //console.log('team', team);
              return (
                <tr key={team.teamId}>
                  <td className="td-teams">{team.position}</td>
                  <td className="td-teams2" onClick={() => handleGetTeamDetails(team.Constructor.constructorId)}>
                    <Flag country={getAlphaCode(props.flags, team.Constructor.nationality)} size={40} />{team.Constructor.name}</td>
                  <td className="td-teams3"><a href={team.Constructor.url} target="_blank" >Details<ExportOutlined /></a></td>
                  <td className="td-teams-points">{team.points}</td>
                </tr>
              );
            })};
          </tbody>
        </table>
      </div>
</div>
  );
}