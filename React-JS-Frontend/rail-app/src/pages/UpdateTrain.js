import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppService from "./AppService";
const UpdateTrain=()=>{
    const locate = useLocation();
    const nav=useNavigate();
    const [train, setTrain] = useState(locate.state);
    const [allDone, setAld] = useState(true);
    const oldTrainNo = train.train_id; // required for updating a train object where train number has changed
    const [train_id, setTrainNo] = useState(train.train_id);
    const [train_name, setTrainName] = useState(train.train_name);
    const [from_station, setFrom] = useState(train.from_station);
    const [to_station, setTo] = useState(train.to_station);
    const [departure, setDeparture] = useState(train.departure);
    const [arrival, setArrival] = useState(train.arrival);
    const [duration, setDur] = useState(train.duration);
    const [base_fare, setFare] = useState(train.base_fare);
    const [runs_on, setRunDays] = useState(train.runs_on);
    const [total_Seat_sleeper, setSL] = useState(train.total_Seat_sleeper);
    const [total_Seat_ac3, setAC3] = useState(train.total_Seat_ac3);
    const [total_Seat_ac2, setAC2] = useState(train.total_Seat_ac2);
    const [total_Seat_ac1, setAC1] = useState(train.total_Seat_ac1);
    const [sunday,SetSun] = useState(runs_on.includes("Sunday"));
    const [tuesday, setTues] = useState(runs_on.includes("Tuesday"));
    const [monday, setMon] = useState(runs_on.includes("Monday"));
    const [wednesday, setWed] = useState(runs_on.includes("Wednesday"));
    const [thursday, setThur] = useState(runs_on.includes("Thursday"));
    const [friday, setFri] = useState(runs_on.includes("Friday"));
    const [saturday, setSat] = useState(runs_on.includes("Saturday"));
    const seat_nos = null;
    const [updateMessage, setUpdt] = useState('');
    function setRunningDays(RunDay,checked)
    {
        if(!checked)
        {
            let ind = runs_on.indexOf(RunDay);
            setRunDays([...runs_on.slice(0,ind),...runs_on.slice(ind+1)])
        }
        else
        {
            setRunDays([...runs_on,RunDay]);
        }
    }
    useEffect(()=>{
        if(!locate.state.train_id)
        {
            nav('/adminPanel');
        }
    },[])
    return(
        <div style={{padding: '50px'}}>
        <h3>Here are the requested Details</h3>
        <button onClick={()=>{setAld(false)}}>Edit</button>
        <br/>
        <table cellPadding={4}>
            <tbody>
                <tr>
                    <td>Train Number :</td>
                    <td>{allDone ? (<span>{train_id}</span>) : (<input type='number' value={train_id} style={{width:'70px'}}
                    onChange={e=>setTrainNo(e.target.valueAsNumber)} />)}</td>
                </tr>
                <tr>
                    <td>Train Name</td>
                    <td>{allDone ? (<span>{train_name}</span>) : (<input type='text' value={train_name} style={{width:'330px'}} 
                    onChange={e=>setTrainName(e.target.value)} />)}</td>
                </tr>
                <tr>
                    <td>Source</td>
                    <td>{allDone ? (<span>{from_station}</span>) : (<input type='text' value={from_station}
                    onChange={e=>setFrom(e.target.value)} />)}</td>
                </tr>
                <tr>
                    <td>Destination</td>
                    <td>{allDone ? (<span>{to_station}</span>) : (<input type='text' value={to_station}
                    onChange={e=>setTo(e.target.value)} />)}</td>
                </tr>
                <tr>
                    <td>Departure</td>
                    <td>{allDone ? (<span>{departure}</span>) : (<input type='text' value={departure}
                    onChange={e=>setDeparture(e.target.value)} />)}</td>
                </tr>
                <tr>
                    <td>Arrival</td>
                    <td>{allDone ? (<span>{arrival}</span>) : (<input type='text' value={arrival}
                    onChange={e=>setArrival(e.target.value)} />)}</td>
                </tr>
                <tr>
                    <td>Duration</td>
                    <td>{allDone ? (<span>{duration}</span>) : (<input type='text' value={duration}
                    onChange={e=>setDur(e.target.value)} />)}</td>
                </tr>
                <tr>
                    <td>Base Fare</td>
                    <td>{allDone ? (<span>{base_fare}</span>) : (<input type='number' value={base_fare}
                    onChange={e=>setFare(e.target.valueAsNumber)} />)}</td>
                </tr>
                <tr>
                    <td>Run Days</td>
                    <td>{allDone ? (<span>{runs_on.map((day)=>(<>{day}&emsp;</>))}</span>) : 
                    <span>
                        <input type="checkbox" defaultChecked={sunday} value="Sunday" onChange={() => {SetSun(!sunday);setRunningDays("Sunday",!sunday)}} />&nbsp;Sunday
                        &emsp;&emsp;
                        <input type="checkbox" defaultChecked={monday} value="Monday" onChange={() => {setMon(!monday);setRunningDays("Monday",!monday)}} />&nbsp;Monday
                        <br/>
                        <input type="checkbox" defaultChecked={tuesday} value="Tuesday" onChange={() => {setTues(!tuesday);setRunningDays("Tuesday",!tuesday)}} />&nbsp;Tuesday
                        &emsp;&emsp;
                        <input type="checkbox" defaultChecked={wednesday} value="Wednesday" onChange={() => {setWed(!wednesday);setRunningDays("Wednesday",!wednesday)}} />&nbsp;Wednesday
                        <br/>
                        <input type="checkbox" defaultChecked={thursday} value="Thursday" onChange={() => {setThur(!thursday);setRunningDays("Thursday",!thursday)}} />&nbsp;Thursday
                        &emsp; &emsp;
                        <input type="checkbox" defaultChecked={friday} value="Friday" onChange={() => {setFri(!friday);setRunningDays("Friday",!friday)}} />&nbsp;Friday
                        <br/>
                        <input type="checkbox" defaultChecked={saturday} value="Saturday" onChange={() => {setSat(!saturday);setRunningDays("Saturday",!saturday)}} />&nbsp;Saturday
                    </span>}</td>
                </tr>
                <tr>
                    <td>Total Sleeper Seats</td>
                    <td>{allDone ? (<span>{total_Seat_sleeper}</span>) : (<input type='number' value={total_Seat_sleeper}
                    onChange={e=>setSL(e.target.valueAsNumber)} />)}</td>
                </tr>
                <tr>
                    <td>Total 1st AC Seats</td>
                    <td>{allDone ? (<span>{total_Seat_ac1}</span>) : (<input type='number' value={total_Seat_ac1}
                    onChange={e=>setAC1(e.target.valueAsNumber)} />)}</td>
                </tr>
                <tr>
                    <td>Total 2nd AC Seats</td>
                    <td>{allDone ? (<span>{total_Seat_ac2}</span>) : (<input type='number' value={total_Seat_ac2}
                    onChange={e=>setAC2(e.target.valueAsNumber)} />)}</td>
                </tr>
                <tr>
                    <td>Total 3rd AC Seats</td>
                    <td>{allDone ? (<span>{total_Seat_ac3}</span>) : (<input type='number' value={total_Seat_ac3}
                    onChange={e=>setAC3(e.target.valueAsNumber)} />)}</td>
                </tr>
            </tbody>
            <tr>{allDone ? <td className="btn btn-primary" onClick={()=>{
                AppService.updateTrain(oldTrainNo, train).then(()=>{
                console.log(train); setUpdt("Updated at "+new Date().toLocaleTimeString('en-IN'));})
                .catch(err=>console.log('Error in Updating',err));
            }}>Update</td> : 
            <td className="btn btn-primary" onClick={()=>{
                setAld(true);
                setTrain({train_id, train_name, from_station, to_station, departure, arrival, duration, base_fare, runs_on, 
                total_Seat_sleeper,total_Seat_ac3, total_Seat_ac2, total_Seat_ac1, seat_nos});
            }
            }>Done</td>}
            <td><Link className="btn btn-outline-dark" to='/adminPanel'>Dashboard</Link></td>
            </tr>
        </table>
        <br/>
        {updateMessage}
        </div>
    )
}
export default UpdateTrain;