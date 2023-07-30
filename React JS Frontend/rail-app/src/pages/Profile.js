import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppService from "./AppService";
import Thomas from "../images/thomas1.jpg";
import Percy from "../images/percy1.webp";
import Navbar from "./Navbar";
import Footer from './Footer';
import "../styles/ProfileStyle.css";
const Profile=()=>{
    const username = localStorage.getItem('username');
    const jwt_token=localStorage.getItem("JWT");
    const [tickets, setTickets]=useState([]);
    const [user_data, setUserData] = useState({});
    const redirect = useNavigate();
    const isloggedin = ()=>{
        if(!username)
        {
            redirect('/login');
        }
        else if(localStorage.getItem('Role')=="ADMIN")
        {
            redirect('/adminPanel');
        }
        else
        {
            AppService.getuser(username)
            .then((resp)=>{setUserData(resp.data)})
            .catch((error)=>{console.log(error)});

            AppService.getTicketbyUserId(username).then((resp)=>{
                setTickets(resp.data);
            }).catch(err=>console.log("Error fetching tickets",err));
        }
    }
    const gotoupdt=()=>{
        redirect('/update')
    }
    const logout=()=>{
        localStorage.clear()
        redirect('/')
    }
    function showTicket(ticket)
    {
        sessionStorage.setItem('Ticket',JSON.stringify(ticket));
        redirect('/final-ticket', {state:ticket});
    }
    function cancelTicket(ticket)
    {
        sessionStorage.setItem('Ticket',JSON.stringify(ticket));
        redirect('/cancel-ticket');
    }
    useEffect(()=>{
        isloggedin();
    },[username]);
    return(
        <>
        <Navbar/>
        <div class="main1"><div style={{fontFamily: 'Roberto Mono', fontWeight: '600', fontSize: '34px', display:'inline-block'}}>Welcome to your profile {user_data.email?(<span>{user_data.name},</span>):null}</div>
        <div style={{display:'inline-block', float: 'right'}}>
            <span>
                <button className="btn btn-info" onClick={gotoupdt}>Update Profile</button>&emsp;&emsp;
                <button className="btn btn-outline-dark" onClick={()=>{redirect('/')}}>Home</button>&emsp;&emsp;
                <button className="btn btn-danger" onClick={logout}>Logout</button>
            </span>
        </div><br/><br/>
        <div>
        <div id="box11">{user_data.user_id?(
            <table>
                <tbody>
                    <tr>
                        <td>Your Name:</td>
                        <td style={{paddingLeft:'27px', fontFamily: 'Signika'}}>{user_data.name}</td>
                    </tr>
                    <tr>
                        <td>Your Unique ID:</td>
                        <td style={{paddingLeft:'27px',fontWeight:'600', fontFamily: 'comic sans ms', color: '#653410'}}>{user_data.user_id}</td>
                    </tr>
                    <tr>
                        <td>Your Email ID:</td>
                        <td style={{paddingLeft:'27px', fontFamily: 'Signika'}}>{user_data.email}</td>
                    </tr>
                    <tr>
                        <td>Your Mobile:</td>
                        <td style={{paddingLeft:'27px', fontFamily: 'Signika'}}>{user_data.phone}</td>
                    </tr>
                </tbody>
            </table>):null
        }
        </div>
        &emsp;
        <div style={{display: 'inline-block', marginLeft:'200px'}}>
            <img src={Thomas} height='303'></img>
            &emsp;&nbsp;
            <img src={Percy} height='303'></img>
        </div>
        </div>
        <br/><br/><br/>
        <div className="box12">Below are your booked tickets</div>
        <br/>
        <div style={{backgroundColor: '#d1fcda', paddingTop:'20px', paddingBottom:'20px'}}><center>
            <table cellPadding={8} style={{textAlign:'center',border: '2px solid #125f23'}}>
            <thead style={{fontSize: '19px'}}>
                <tr style={{paddingTop:'4px', paddingBottom: '4px', backgroundColor:'seagreen', color: 'whitesmoke', fontFamily: 'Fira Sans'}}>
                    <td className="col-1">Sl No</td>
                    <td className="col-3">PNR Number</td>
                    <td className="col-3">Ticket Number</td>
                    <td className="col-3">Journey Between</td>
                    <td className="col-3">Like to</td>
                </tr>
            </thead>
            <tbody style={{fontSize:'19px', fontFamily:'Josefin Sans'}}>
            {tickets.map((tkt, index)=>(
                <tr>
                <td style={{paddingTop:'10px', paddingBottom:'10px', borderLeft: '2px solid #125f23', borderRight: '2px solid #125f23', verticalAlign:'middle'}}>{index+1}</td>
                <td style={{paddingBottom:'10px', borderRight: '2px solid #125f23'}}>{tkt.pnr}</td>
                <td style={{paddingBottom:'10px', borderRight: '2px solid #125f23'}}>{tkt.ticket_no}</td>
                <td style={{paddingBottom:'10px', borderRight: '2px solid #125f23'}}>{tkt.train.from_station} to {tkt.train.to_station}</td>
                <td style={{paddingBottom:'10px', fontFamily:'arial'}}><button className="btn btn-info btn-sm" onClick={()=>{showTicket(tkt)}}>View</button>&emsp;
                <button className="btn btn-danger btn-sm" onClick={()=>{cancelTicket(tkt)}}>Delete</button></td>
                </tr>
            ))}
            </tbody>
            </table>
            </center>
        </div>
        </div>
        <Footer/>
        </>
    )
}
export default Profile;