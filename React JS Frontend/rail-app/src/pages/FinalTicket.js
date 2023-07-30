import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/TicketStyle.css';
import IRL from "../images/rail2Logo.png";
import Stamp from "../images/conf.png";
import IRCTC from "../images/irctc.png";
import Azad from "../images/azadi.png";
import Bholu from "../images/Bholu.png";
import trainD from "../images/trainDrawing.jpg";
import Ind from "../images/iin.png";
import AppService from "./AppService";
import Footer from "./Footer";
import Navbar from "./Navbar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const FinalTicket=()=>{
 const moveto = useNavigate();
 const ticket = JSON.parse(sessionStorage.getItem('Ticket'));
 
 const SaveAsPdf=()=>{
    console.log("Printing");
    const element = document.getElementById("TicketToPrint")
    const r2pdf = new jsPDF();
    var height = r2pdf.internal.pageSize.getHeight();
    var width = r2pdf.internal.pageSize.getWidth();
    // r2pdf.html(element).then(()=>r2pdf.save('ticket.pdf'));
   html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 2, 0, width-3, height+1);
    pdf.save("ticket.pdf");  
  });
;
 }
 useEffect(()=>{
    if(!ticket)
    {moveto('/');}
    else{
    AppService.getTicketbyPNR(ticket.pnr).then((resp)=>{
        //console.log("Response",resp.data);
        if(!resp.data.pnr)
        {
            moveto('/');
        }
    }).catch(error=>console.log("Some issues fetching ticket",error));
    }
 },[])
 return(
    <>
    {ticket? (<div><Navbar/>
        <div className="Back1">
            <br/><br/>
            <div className="first" id="TicketToPrint">
                <br/>
                <div className="row eticket">
                    <div className="col-9" style={{paddingTop:'18px'}}>
                    &emsp;E-Ticket
                    </div>
                    <div className="col">&emsp;<img src={IRL} height="75"></img></div>
                </div>
                <div className="row" style={{textAlign:'center', paddingTop:'8px'}}>
                    <div className="col" style={{fontFamily:'Merriweather Sans', fontSize:'19px', fontWeight:'500'}}>Happy Journey</div>
                    <div className="col" style={{fontFamily: 'Tiro Devanagari Hindi', fontSize:'25px', fontWeight:'600'}}>शुभ यात्रा</div>
                    <div className="col" style={{fontFamily:'Noto Serif Bengali', fontSize:'23px'}}>শুভ যাত্রা</div>
                </div>
                <hr style={{borderTop: '4px solid brown', marginTop:'5px'}}/>
                <div style={{ margin:'8px',paddingRight:'17px'}}>
                    <div className="pnrTkt">
                        &emsp;PNR Number: <span style={{color:'#091271', fontSize:'20px'}}>{ticket.pnr}</span>
                        <br/>&emsp;Ticket Number:&nbsp; <span style={{color:'#091271', fontSize:'20px'}}>{ticket.ticket_no}</span>
                    </div>
                </div>
                <div style={{marginTop:'33px', fontSize:'17px'}}>Journey From:<br/>
                <span style={{fontFamily:'Josefin Sans', fontSize:'21px'}}>{ticket.train.from_station}</span>
                &emsp;&emsp; <span style={{fontSize:'20px'}}>To</span>&emsp;&emsp; <span style={{fontFamily:'Josefin Sans', fontSize:'21px'}}>{ticket.train.to_station}</span>
                </div>
                <br/>
                <div style={{fontSize:'18px'}}>Train Number and Name:</div>
                <div style={{fontSize:'19px', fontFamily:'Comic Sans MS', fontWeight:'600', color:'#90402d'}}>{ticket.train.train_id}, {ticket.train.train_name}</div>
                <br/>
                <div style={{fontSize:'19px'}}>Journey Date: <span style={{fontWeight:'600', fontSize:'19px', fontFamily:'Arial'}}>
                {ticket.date.slice(-2)+"-"+ticket.date.slice(-5,-3)+"-"+ticket.date.slice(0,4)}</span></div>
                <div style={{fontSize:'17px'}}>Passenger Details:</div><p/>
                <div><center>
                    <table className="table1">
                    <thead>
                       <tr>
                            <td className="header1">Serial No.</td>
                            <td className="header1">Passenger Name</td>
                            <td className="header1">Passenger Age</td>
                            <td className="header1">Gender</td>
                            <td className="header1">Seat Number</td>
                            <td className="header1">Train Class</td>
                        </tr>
                    </thead>
                    <tbody>
                        {ticket.passengers.map((pass, index)=>(
                            <tr>
                                <td><center>{index+1}</center></td>
                                <td><center>{pass.pass_name}</center></td>
                                <td><center>{pass.pass_age}</center></td>
                                <td><center>{pass.pass_gender}</center></td>
                                <td><center>{pass.pass_seat_no}</center></td>
                                <td><center>{pass.pass_train_class}</center></td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                    </center>
                    <p/>
                    <div style={{fontSize:'18px',display:'inline-block'}}>Total Amount Paid: <span style={{color:'#f70a6b',fontFamily:'Signika', fontWeight:'500', fontSize:'22px'}}>&#8377;{Math.ceil(ticket.fare)}</span></div>
                    <div style={{float:'right',marginTop:'6px',marginRight:'13px', fontSize:'17px', fontFamily:'Merriweather Sans'}}>
                    Train Departs at {ticket.train.departure}</div>
                    <br/>
                    <br/>
                    <div style={{fontFamily:'arial', fontSize:'20px', display:'inline-block'}}>Ticket Booked on: {ticket.time}</div>
                    <div style={{float: 'right', fontSize:'17px',marginRight:'13px'}}>Booking Website:&nbsp;
                    <span style={{fontSize:'18px', fontFamily:'lucida sans'}}>www.railyatra.co.in</span></div>
                    <br/>
                    <div className="row">
                        <div className="col-5" style={{height:'160px',verticalAlign:'middle', marginTop:'90px', textAlign:'center'}}>
                            <span style={{fontFamily: "'Libre Barcode 39 Text',cursive", fontSize:'52px'}}>{ticket.ticket_no}</span>
                        </div>
                        <div className="col" style={{textAlign:'right', marginRight:'45px'}}>
                            <br/>
                            <img src={Stamp} height='155' style={{marginTop:'16px'}}/>
                        </div>
                    </div>
                    <hr style={{borderTop:'4px solid indigo'}}/>
                    <div className="row" style={{textAlign:'center', marginBottom:'-10px'}}>
                        <div className="col" style={{marginRight:'-10px'}}>
                            <img src={IRCTC} height='100'/>
                        </div>
                        <div className="col" style={{marginTop:'35px'}}>
                            <img src={Ind} height='45'/>
                        </div>
                        <div className="col" style={{marginTop:'15px', marginLeft:'7px'}}>
                            <img src={Azad} height='80'/>
                        </div>
                        <div className="col" style={{marginTop:'-10px'}}>
                            <img src={Bholu} height='130'/>
                        </div>
                    </div>
                    <hr style={{borderTop:'4px solid black'}}/>
                    <div className="row" style={{textAlign: 'center', height:'30px'}}>
                    <div className="col-3 lastleft"/>
                    <div className="col-6 psghelp">Passenger Helpline Number: 139</div>
                    <div className="col-3 lastright"/>
                    </div>
                </div>
            </div><br/><br/><center>
            <button className="btn btn-primary" onClick={()=>{sessionStorage.clear();moveto('/')}}>Continue Searching</button>
            &emsp;&emsp;
            <button className="btn btn-danger" onClick={SaveAsPdf}>Save As PDF</button>
            </center><br/>
        </div><Footer/>
    </div>)
    :moveto('/')}
    </>
 )
}
export default FinalTicket;