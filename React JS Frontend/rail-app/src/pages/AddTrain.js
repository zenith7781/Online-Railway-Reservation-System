import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppService from "./AppService";
const AddTrain=()=>{
    const nav=useNavigate();
    const [errmsg, setErrmsg] = useState('');
    const [success, setSuc] = useState('');
    const [allDone, setAld] = useState(false);
    const [train_id, setTrainNo] = useState(0);
    const [train_name, setTrainName] = useState('');
    const [from_station, setFrom] = useState('');
    const [to_station, setTo] = useState('');
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [duration, setDur] = useState('');
    const [base_fare, setFare] = useState(0.0);
    const [runs_on, setRunDays] = useState([]);
    const [total_Seat_sleeper, setSL] = useState(0);
    const [total_Seat_ac3, setAC3] = useState(0);
    const [total_Seat_ac2, setAC2] = useState(0);
    const [total_Seat_ac1, setAC1] = useState(0);
    const [sunday,SetSun] = useState(false);
    const [tuesday, setTues] = useState(false);
    const [monday, setMon] = useState(false);
    const [wednesday, setWed] = useState(false);
    const [thursday, setThur] = useState(false);
    const [friday, setFri] = useState(false);
    const [saturday, setSat] = useState(false);
    const seat_nos = null;
    const train = {train_id, train_name, from_station, to_station, departure, arrival, duration, base_fare, runs_on, 
        total_Seat_sleeper,total_Seat_ac3, total_Seat_ac2, total_Seat_ac1, seat_nos};
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

    return(
        <>
        <h3>Add All the Details</h3>
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
                    <td>Running Days</td>
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
            <tr>{allDone ? <><td className="btn btn-primary" onClick={()=>{
                console.log(train);
                AppService.addNewTrain(train).then((res)=>{
                console.log(res);
                setSuc('Train Number ',res.data.train_id, " added successfully !!");
            }).catch(()=>{setErrmsg("Duplicate Train Number or Invalid Details")});
            }}>Add Train</td>&emsp;
            <td className="btn btn-dark" onClick={()=>setAld(false)}>Edit</td> </>: 
            <td className="btn btn-primary" onClick={()=>{
                if(train_id==0 || train_id<=9999 || train_id>99999 || train_name=='' || from_station=='' || to_station=='' || 
                departure=='' || arrival=='' || duration=='' || base_fare<=500 ||  runs_on.length==0 )
                {setErrmsg("Invalid Details Entered")}
                else if(total_Seat_ac1 <=0 && total_Seat_sleeper <=0 && total_Seat_ac2<=0 && total_Seat_ac3<=0)
                {setErrmsg("Seats of all 4 classes cannot be zero")}
                else{
                setErrmsg('')
                setAld(true);
                }
            }
            }>Save Details</td>}
            </tr>
        </table>
        <br/>
        <span style={{fontWeight: '600', color: '#cc0066'}}>{success!=''? (<span style={{color:'green'}}>{success}</span>) :  errmsg}</span>
        </>
    )
}
export default AddTrain;