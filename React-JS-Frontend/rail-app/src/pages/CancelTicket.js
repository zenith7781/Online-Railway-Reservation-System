import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppService from "./AppService";
import Navbar from './Navbar';
import Footer from './Footer';
const CancelTicket=()=>{
    const ticket=JSON.parse(sessionStorage.getItem("Ticket"));
    const [msg,setMsg] = useState('');
    const [res1,setRes1] = useState('');
    const [reason,setRes2] = useState('');
    const [errrrr, setErr] = useState('');
    const cancelTheTicket=()=>{
        if(reason == '')
        {setErr('Provide a reason to cancel ticket !!!')}
        else{
        AppService.cancelTicket(ticket.pnr).then((resp)=>{
            console.log("Ticket is cancelled");
            setMsg(resp.data);
            sessionStorage.clear();
        })
        }
    }
    // useEffect(()=>{
    //     getSeats();
    // },[])
    return(
        <div  className="bckgCT">
        <Navbar/>
        <div>{ticket ? 
        <div className="col-lg-5" style={{margin: 'auto', border: '2px solid firebrick', borderRadius:'10px', marginTop:'36px', padding:'16px', backgroundColor:'#fafaeb'}}>
            <h4 style={{paddingBottom:'8px', fontFamily:'Comic Sans MS'}}><center>Cancel Your Ticket</center></h4>
            <div style={{paddingTop: '15px', paddingBottom: '15px', marginLeft:'-16px', paddingLeft: '11px', backgroundColor: '#fce7cf',
            borderLeft:'5px solid #f06a22', marginRight: '-16px', fontWeight:'600', fontSize: '16px'}}>
               <i class="bi bi-info-circle"></i>&nbsp; Your Ticket with <span style={{color:'#f00530'}}>PNR {ticket.pnr}</span> and <span style={{color:'#f00530'}}>ticket number {ticket.ticket_no}</span> will be cancelled</div>
            <br/>
            <div style={{fontSize: '19px', fontFamily: 'Lucida Sans'}}>Please State the reason below</div>
            <br/>
            <div>
                <input type='radio' checked={res1==="Changed Travel Planning"} onClick={()=>{setErr(''); setRes1('Changed Travel Planning'); setRes2('Changed Travel Planning')}}/>&emsp;Changed Travel Planning<br/>
                <input type='radio' checked={res1==="Will Be Unavailable"} onClick={()=>{setErr(''); setRes1('Will Be Unavailable'); setRes2('Will Be Unavailable')}}/>&emsp;I Will Be Unavailable<br/>
                <input type='radio' checked={res1==="Train is rescheduled"} onClick={()=>{setErr(''); setRes1('Train is rescheduled'); setRes2('Train is rescheduled')}}/>&emsp;Train is Rescheduled<br/>
                <input type='radio' checked={res1==="others"} onClick={()=>{setErr(''); setRes1('others'); setRes2('')}}/>&emsp;Another Reason...<br/>
                {res1 === 'others' ? <div style={{paddingTop: '14px'}}>
                    <textarea rows={2} cols={78} color='aqua' onChange={e=>{setErr(''); setRes2(e.target.value)}} style={{borderRadius:'8px'}}/>
                </div>:null}
            </div>
            <p style={{color: 'purple', fontWeight: '500'}}>{errrrr}</p>
            {/* <button class='btn btn-secondary' onClick={()=>console.log(reason)}>Show Response</button> */}
            <br/>
            <Link className="btn btn-primary" to='/profile'>Never Mind</Link>&emsp;&emsp;
            <button className="btn btn-danger" onClick={cancelTheTicket}>Cancel Ticket</button>
        </div>
        :<h3>Requested Ticket does not exist</h3>}
        </div>
        <br/>
        <center><div>{msg}</div><Link className="btn btn-dark" to='/profile'>Back To Profile</Link></center>
        <br/>
        <Footer/>
        </div>
    )
}
export default CancelTicket;