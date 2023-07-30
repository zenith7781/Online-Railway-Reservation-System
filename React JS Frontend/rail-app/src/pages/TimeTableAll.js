import React, { useEffect, useState } from "react";
import AppService from "./AppService";
const TimeTableAll=()=>{
    const [fulTT, setFulTT] = useState([]);
    const [len, maxLen] = useState(0);
    useEffect(()=>{
        AppService.FullTimeTable().then((resp)=>{
            setFulTT(resp.data);
            console.log(resp.data);
            AppService.fetchAllTrains().then((respo)=>{maxLen(respo.data.length);console.log(respo.data)});
        }).catch(err=>console.log("Issues getting Timetable",err));
    },[])
    return(
        <div style={{border:'2px', padding:'15px'}}>
            <center><h4>Train Time Table</h4></center>
            <table cellPadding={4} style={{border: '2px solid purple'}}>
                <thead>
                    <tr style={{borderBottom:'2px solid purple', fontWeight:'600'}}>
                        <td style={{width:'200px',textAlign:'center', borderRight: '2px solid purple'}}>Date</td>
                        <td colSpan={len}><center>Trains</center></td>
                    </tr>
                </thead>
                <tbody>
            {fulTT.map((timetable)=>(
                <tr>
                    <td>{timetable.date_string.slice(-2)+"-"+timetable.date_string.slice(-5,-3)+"-"
                    +timetable.date_string.slice(0,4)}</td>
                    {timetable.trains.map((train)=>(
                        <td style={{width:'200px',border:'2px solid purple',textAlign:'center'}}>{train.train_id}<br/>{train.train_name}</td>
                    ))}
                </tr>
            ))}
            </tbody>
            </table>
        </div>
    )
}
export default TimeTableAll;