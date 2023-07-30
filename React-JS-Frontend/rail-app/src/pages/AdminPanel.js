import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppService from "./AppService";
import '../styles/adminPanel.css';
import TrainMasterDetails from "./TrainMasterDetails";
import TimeTableAll from "./TimeTableAll";
const AdminPanel=()=>{
const token = localStorage.getItem("JWT");
const username = localStorage.getItem('username');
const [name, setName] = useState('');
const [pass, setPs] = useState('');
const [trainView, setTrainView] = useState('none');
const [wlc, setWlc] = useState('');
const [tickets, setTickets] = useState([]);
const navg = useNavigate();

function getName()
{
    AppService.getAdmin(username)
    .then((resp)=>{
        setName(resp.data.name);
        setPs(resp.data.password);
        AppService.getTicketbyUserId(username)
        .then(response=>setTickets(response.data));
    })
}
function Clock(){
    const [date, setDate] = useState(new Date());
    function refreshClock() {
      setDate(new Date());
    }
    useEffect(() => {
      const timerId = setInterval(refreshClock, 1000);
      return function cleanup() {
        clearInterval(timerId);
      };
    }, []);
    return (
      <span style={{fontFamily: 'Orbitron', fontSize: '2.2em', color: '#c5091e'}}>
        {date.toLocaleTimeString()}
      </span>
    );
  }
  function showTicket(ticket)
    {
        sessionStorage.setItem('Ticket',JSON.stringify(ticket));
        navg('/final-ticket', {state:ticket});
    }
function cancelTicket(ticket)
    {
        sessionStorage.setItem('Ticket',JSON.stringify(ticket));
        navg('/cancel-ticket');
    }
useEffect(()=>{
    if(token && localStorage.getItem("Role"))
    {
        console.log(localStorage.getItem("Role"))
    axios.get("http://localhost:8089/secure/helloadmin",
    {headers:{
        'Authorization': `KimJongUn ${token}`
        
    }}).then((resp)=>{setWlc(resp.data); getName();});
    }
    else
    {
        navg('/adminLoginPage/22982/login');
    }
},[])
return(
    <div className="bgMain">
    <div className="h3" style={{display: 'inline-block'}}>This is the Admin Panel, Welcome</div>
    <button onClick={()=>{localStorage.clear();
        navg('/adminLoginPage/22982/login');}} className="btn btn-danger" style={{float:'right', marginRight: '60px'}}>Logout
    </button>
    <br/>
    <span><Clock/></span>
    <div>{wlc}</div>
    <br/>
    <div>{name} is currently logged in</div>
    <br/>
    <div><center>Useful Navigation Links</center></div>
    &emsp;<br/>
    <button onClick={()=>setTrainView('master')} className="btn btn-success">Train Details</button>&emsp;&emsp;
    <button onClick={()=>setTrainView('timetable')} className="btn btn-info">Time Table Details</button>&emsp;&emsp;
    <Link to='/adminPanel/update' className="btn btn-warning" state={{userName: username, pswd: pass, name: name}}>Update Profile</Link>&emsp;&emsp;
    <button className={trainView == 'tickets' ? "btn btn-dark" :  "btn btn-primary"} onClick={()=>setTrainView('tickets')}>Show Booked Tickets</button>&emsp;&emsp;
    <Link to='/' className="btn btn-secondary">Homepage</Link>
    <br/><br/>
    <div>{trainView == 'master' ? (
        <>
        <TrainMasterDetails/>
        <br/>
        <button onClick={()=>setTrainView('none')}>Clear</button>
        </>
    ) : trainView == 'timetable' ? (
        <span><TimeTableAll/>
            <br/>
            <button onClick={()=>setTrainView('none')}>Clear</button>
        </span>
    ) : trainView == 'tickets' ?
    (<>
    <div>Here are your Booked Tickets</div>
        {tickets.length ? (<div><center>
            <table cellPadding={5}>
            <thead style={{fontFamily: 'Kalam',fontSize: '23px', backgroundColor: 'indigo', color: 'white', paddingTop: '8px', paddingBottom: '8px'}}>
                <tr>
                    <td style={{padding: '10px'}}><center>Serial Number</center></td>
                    <td style={{padding: '8px'}}><center>PNR Number</center></td>
                    <td style={{padding: '10px'}}><center>Ticket Number</center></td>
                    <td style={{padding: '8px'}}><center>Journey Between</center></td>
                    <td style={{padding: '8px'}}><center>Like to</center></td>
                </tr>
            </thead>
            <tbody>
            {tickets.map((tkt, index)=>(
                <tr style={{border: '1px solid green', backgroundColor: '#d0e789', fontFamily: 'heebo', textAlign: 'center', fontSize:'19px'
                , fontWeight: '500'}}>
                <td style={{padding: '8px'}}>{index+1}</td>
                <td>{tkt.pnr}</td>
                <td>{tkt.ticket_no}</td>
                <td style={{paddingLeft: '30px', paddingRight: '30px'}}>{tkt.train.from_station} to {tkt.train.to_station}</td>
                <td style={{padding: '8px'}}><button className="btn btn-primary" onClick={()=>{showTicket(tkt)}}>View</button>&emsp;
                <button className="btn btn-danger" onClick={()=>{cancelTicket(tkt)}}>Delete</button></td>
                </tr>
            ))}
            </tbody>
            </table>
            </center>
        </div>) : (<span>You haven't booked any tickets</span>)}
        <br/>
        <button onClick={()=>setTrainView('none')}>clear</button>
    </>)
    : null}</div>
    <div>
        
    </div>
    </div>
)
}
export default AdminPanel;