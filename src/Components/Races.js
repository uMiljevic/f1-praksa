

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Flag from 'react-flagkit';
import { getAlphaCode } from "../Utils.js";
import { Input, Space } from 'antd';


export default function Races(props) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [allRaces, setAllRaces] = useState([]);
    const [inputText, setInputText] = useState("");
    const { Search } = Input;

    useEffect(() => {
        getAllRaces();
    }, []);

    const getAllRaces = async () => {
        const urlAllRaces = "https://ergast.com/api/f1/2013/results/1.json";
        const response = await axios.get(urlAllRaces);
        //console.log(response.data.MRData.RaceTable.Races);
        setAllRaces(response.data.MRData.RaceTable.Races);
        setIsLoading(false);
    }

    const filteredData = allRaces.filter((el) => {
        //if no input the return the original
        if (inputText === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.raceName.toLowerCase().includes(inputText);

        }
    });

    const handleClickGetRaces = (raceId) => {
        const linkTo = `/raceDetails/${raceId}`;
        navigate(linkTo);
    };

    if (isLoading) {
        return (
            <h1>Is loading...</h1>
        )
    }
    //console.log("hhhhhh",filteredData);

    return (
        <div>
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

            <h1>Race calendar 2013</h1>
            <table>
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Circuit</th>
                        <th>Date</th>
                        <th>Winner</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredData.map((race, i) => {
                        //console.log(race);
                        return (
                            <tr key={i}>
                                <td>{race.round}</td>
                                <td onClick={() => handleClickGetRaces(race.round)}><Flag country={getAlphaCode(props.flags, race.Circuit.Location.country)} size={40} />{race.raceName}</td>
                                <td>{race.Circuit.circuitName}</td>
                                <td>{race.date}</td>
                                <td>{race.Results[0].Driver.familyName}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}