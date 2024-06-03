
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Flag from 'react-flagkit';
import { getAlphaCode } from "../Utils.js";
import { Breadcrumb, Input, Space } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";


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
        console.log("iiiiiiiiiii", response)
        setAllRaces(response.data.MRData.RaceTable.Races);
        setIsLoading(false);
    }

    const filteredData = allRaces.filter((el) => {
        if (inputText === '') {
            return el;
        }
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
            <LoadingOutlined />
        )
    }
    
    return (
        <div className="table-scroll" >
            <div className="search">
            <Breadcrumb />
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
            <table className="main-table">
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
                    {filteredData.map((race) => {                        
                        return (
                            <tr key={race.Results[0].Driver.driverId}>
                                <td className="td-driver">{race.round}</td>
                                <td onClick={() => handleClickGetRaces(race.round)} className="td-driver2"><Flag country={getAlphaCode(props.flags, race.Circuit.Location.country)} size={40} />{race.raceName}</td>
                                <td className="td-driver3">{race.Circuit.circuitName}</td>
                                <td className="td-driver4">{race.date}</td>
                                <td className="td-driver">{race.Results[0].Driver.familyName}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}