

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Races() {
    const navigate = useNavigate();
    const [allRaces, setAllRaces] = useState([]);

    useEffect(() => {
        getAllRaces();
    }, []);

    const getAllRaces = async () => {
        const urlAllRaces = "https://ergast.com/api/f1/2013/results/1.json";
        const response = await axios.get(urlAllRaces);
        //console.log(response.data.MRData.RaceTable.Races);
        setAllRaces(response.data.MRData.RaceTable.Races);
    }

    const handleClickGetRaces = (raceId) => {
        const linkTo = `/raceDetails/${raceId}`;
        navigate(linkTo);
    };

    return (
        <div>
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
                    {allRaces.map((race) => {
                        console.log(race);
                        return (
                            <tr >
                                <td>{race.round}</td>
                                <td onClick={() => handleClickGetRaces(race.round)}>{race.raceName}</td>
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