import { useEffect, useState } from "react";
import axios from "axios";

export default function Drivers(){
    const [drivers, setDrivers] = useState([]);

    useEffect(()=>{
        getDrivers();
    }, []);

    const getDrivers = async () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json";
        const response = await axios.get(url);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0]);
        setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    };


    return(
        <div>
            <h1>Drivers</h1>
            <ul>
                {drivers.map(function(item){
                    return(
                        <li>{item.position}</li>
                    );
                })}
            </ul>
        </div>
    );
}