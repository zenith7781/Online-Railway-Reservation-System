import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import '../styles/BookingForm.css'
import ps1 from "../images/phead1.png";
import ps2 from "../images/phead2.png";
import ps3 from "../images/phead3.png";
import ps4 from "../images/phead4.png";
import azadi from "../images/azadi.png";
import hrcn from "../images/hrcentre.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppService from "./AppService";
const BookingForm=()=>{
    const navigate = useNavigate();
    const [count, setCount]=useState(1);
    const {train_id, train_class, date, seats} = useParams();
    const [train,setTrain] = useState({});

    const [pass_id, setPass_id]=useState(1); 
    const [pass_name, setPass_name] = useState('');
    const [pass_age, setPass_age] = useState(0);
    const [pass_gender, setPass_gender] = useState('');
    const [pass_address, setPass_address] = useState('');
    const [pass_credit_no, setPass_credit_no] = useState(0);
    const [pass_bank_name, setPass_bank_name] = useState('');
    const pass_train_class = train_class;
    const [pass_mobile, setPass_mobile] = useState(0);
    const [pass_seat_no, setPass_seat_no] = useState(1);
    const passenger = {pass_id, pass_name, pass_age, pass_address, pass_gender, pass_credit_no, pass_bank_name, pass_train_class, pass_mobile, pass_seat_no};

    const [pnr, setPnr] = useState('');
    const [ticket_no, setTicket_no] = useState(0);
    const [time,setTime] = useState('');
    const [baseFare, setBaseFare] = useState(0);
    const [fare, setFare] = useState(0);
    const [ff2, setFF]=useState(0);
    const user_id = localStorage.getItem('username');
    const [passengers, setPassengers] = useState([]);
    const bookedTicket = {pnr, ticket_no, date, time, fare, train, train_class, user_id, passengers};
    const [allok, setAllOk]=useState(false);

    const [ermsg, setErmsg]=useState('');
    var allgood=false;

    //console.log(train_id, train_class, date);
    const isloggedin=()=>{
        if(!localStorage.getItem('JWT'))
        {
            navigate('/login', {state:{trn_id:train_id, trn_class:train_class, trn_date: date, trn_seats: seats}});
        }
        else{
            AppService.gettheTrain(train_id, date)
            .then((response)=>{
                setTrain(response.data);
                setBaseFare(response.data.base_fare);
                setFF(response.data.base_fare);
            }).catch((error)=>{console.log("Error getting Train",error)});
        }
    }
    const savePassenger=(ev)=>{
        //ev.preventDefault();
        console.log()
        validate();
        console.log("Passngr",passenger,"All good ",allgood);
        if(allgood)
        {
        setCount(count+1);
        setPass_id(pass_id+1);
        AppService.savePassenger(passenger)
        .then(()=>{
            AppService.getAllPass()
            .then((resp)=>{
                setPassengers(resp.data);
            })
            .catch((err)=>{
                console.log("Retrieving Error",err);
            });
            setPass_name(''); setPass_age(''); setPass_gender(''); setPass_address(''); setPass_mobile(0);
            setAllOk(false);
        }
        ).catch((error)=>console.log("Saving Error",error));
        }
    }

    const handleDelete=(id)=>{
        AppService.removeOnepassenger(id)
        .then(()=>{
            AppService.getAllPass().then((resp)=>{
                setPassengers(resp.data);
                setCount(count-1);
            }).catch(()=>console.error());

            setAllOk(false);
        }).catch((eror)=>console.log("Error deleting passenger",eror));
        //console.log("Seats after deletion",pass_seat_no);
    }
    const resetPass=()=>{
        AppService.removeAll().then((resp)=>{
            console.log(resp.data);
            setPassengers([]);
            setCount(1);
            setPass_bank_name('');
            setPass_credit_no('');
            setPass_id(1);
            setPass_name('');
            setPass_mobile(0);
        }).catch(()=>console.error());
    }
    const saveDetails=()=>
    {
        console.log("Total Passengers",passengers.length);
        if(passengers.length > 0)
        {
        if(train_class === "AC1")
        {
            setFare(Math.ceil(baseFare*1.6*(passengers.length)));
        }
        else if(train_class === "AC2")
        {
            setFare(Math.ceil(baseFare*1.4*(passengers.length)));
        }
        else if(train_class === "AC3")
        {
            setFare(Math.ceil(baseFare*1.2*(passengers.length)));
        }
        else
        {
            setFare(Math.ceil(baseFare*1*(passengers.length)));
        }
        var temp_pass=JSON.parse(JSON.stringify(passengers));
        var ind=0;
        for(let x in temp_pass)
        {
            console.log(temp_pass)
            console.log(x);
            console.log(train.seat_nos[train_class]);
            temp_pass[x].pass_seat_no=train.seat_nos[train_class][ind];
            ind++;
        }
        setPassengers(temp_pass);
        AppService.getPnrTicketNo().then((res)=>{
            setPnr(res.data.pnr);
            setTicket_no(res.data.ticketNumber);
            setTime(new Date().toLocaleTimeString("en-US"));
            setAllOk(true);
        }).catch((err)=>console.log("Error fetching pnr",err));
        }
        else{
            window.alert("Add one Passenger atleast");
        }
        console.log("All good ?",allok);
    }
    function validate()
    {
        if(pass_credit_no==0 || pass_address.length==0 || pass_bank_name.length==0 || pass_age==0 || pass_gender.length==0 || pass_mobile==0 || pass_name.length==0)
        {
            setErmsg("Please enter all the fields");
            allgood=false;
        }
        else if(pass_credit_no.toString().length!=16)
        {
            setErmsg("Invalid Credit Card Number");
            allgood=false;
        }
        else
        {
            setErmsg('');
            allgood=true; 
        }
    }
    const bookTheTicket=()=>{
        console.log(passengers);
        console.log(bookedTicket);
        resetPass();
        setAllOk(false);
        sessionStorage.setItem('Ticket',JSON.stringify(bookedTicket));
        navigate('/payment/payfare', {state:fare})
    }
    useEffect(()=>{
        isloggedin();
        console.log(passengers);
        console.log("Available Seats",pass_seat_no);
    },[pass_seat_no]);
    return(
        <>
        <div className="FormPage">
        <Navbar/>
        <div className="formdesign">
        <h3 className="h33s">
            <img src={ps1} height="63"/>&emsp;
            <img src={ps2} height="57"/>&emsp;&nbsp;
            <font color="indigo">Fill Up the Passenger Details</font>
            &emsp;&nbsp;<img src={ps3} height="57"/>
            &emsp;<img src={ps4} height="60" style={{marginTop:'-5px'}}/></h3>
            <p/>
            <div className="row" style={{marginBottom: '23px'}}>
                <img src={hrcn} height="15"/>
            </div>
        {train.train_name?(
        <div style={{fontFamily:"'Signika Negative', sans-serif", fontSize:'18px'}}>
            <span>&emsp;&nbsp;Train No: &nbsp;{train_id}</span>
            <span style={{float:'right',marginRight: '57px'}}>Train Name: &nbsp;{train.train_name}</span>
            <br/>
            <span>&emsp;&nbsp;Train Class: &nbsp;{train_class}</span>
            <br/>
            <span>&emsp;&nbsp;Journey Date: &nbsp;{date.slice(-2)+"-"+date.slice(-5,-3)+"-"+date.slice(0,4)}</span>
            <span style={{float:'right',marginRight: '57px'}}>Base Fare: &nbsp;&#8377; {ff2}</span>
        </div>
        ):null}
        <hr style={{borderTop: '3px solid purple'}}/>
        <div>
            <datalist id='Banks'>
                <option value="State Bank Of India"/><option value="ICICI Bank"/><option value="Axis Bank"/>
                <option value="Punjab National Bank"/><option value="Bank of Baroda"/><option value="UCO Bank"/>
                <option value="HDFC Bank"/><option value="Kotak Mahindra Bank"/><option value="Allahabad Bank"/>
            </datalist>
            <span style={{fontSize: '20px',color: 'maroon', fontFamily:'Ubuntu'}}>For Refund related purpose, in case of ticket cancellation, please</span> 
            <br/><p/><span style={{fontSize:'17px'}}>Enter your Card Number:</span>
            &emsp;
            <input type="number" 
            required value={pass_credit_no} onChange={e=>setPass_credit_no(e.target.valueAsNumber)}></input>
            &emsp;&emsp;<span style={{fontSize:'17px'}}>and</span>&emsp;&emsp;
            <label><span style={{fontSize:'17px'}}>Bank Name:&emsp;</span></label>
            <input type="text" list="Banks" required placeholder="Enter Bank Name"
            value={pass_bank_name} onChange={e=>setPass_bank_name(e.target.value)}></input>
        </div>
        <hr style={{borderTop: '3px solid red'}}/>
        {count<=6?(
        <div>
            <div style={{fontFamily: 'Josefin Sans', fontSize:'20px'}}>Passenger {count}: (Maximum 6 passengers per booking)</div>
            <div style={{float:'right',display:'inline-block',marginRight:'28px'}}><img src={azadi}/></div>
            <p/>
            <table style={{fontSize:'17px'}}>
            <tbody>
                <tr>
                   <td><label>Enter Passenger Name:</label></td>&emsp;
                   <td><input type="text" required value={pass_name} placeholder="Enter Passenger name" onChange={e=>setPass_name(e.target.value)}/></td>
                </tr>
                <tr>
                   <td><label>Enter Passenger Age:</label></td>&emsp;
                   <td><input type="number" required value={pass_age} placeholder="Enter Passenger Age" onChange={e=>setPass_age(e.target.valueAsNumber)}/></td>
                </tr>
                <tr>
                   <td><label>Enter Passenger Gender:</label></td>&emsp;
                   <td>
                    <select id="genderSelect" onChange={e=>setPass_gender(e.target.value)}>
                        <option value="">--select--</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                   </td>
                </tr>
                <tr>
                   <td><label>Enter Passenger Address:</label></td>&emsp;
                   <td><textarea style={{backgroundColor:'#d7f7e0'}} rows="4" cols="50" value={pass_address} onChange={e=>setPass_address(e.target.value)}/></td>
                </tr>
                <tr>
                   <td><label>Enter Passenger Phone:</label></td>&emsp;
                   <td><input type="number" required value={pass_mobile} onChange={e=>setPass_mobile(e.target.valueAsNumber)}/></td>
                </tr>
            </tbody>
            </table>
            <p/>
            {ermsg.length? (<div style={{color:'#fa2077'}}>{ermsg}</div>):null}
            <input type="submit" className="btn btn-success" style={{borderRadius:'18px'}} onClick={(e)=>{savePassenger(e)}} value="Save Passenger"/>
        </div>
        ):null}
        <br/>
        {passengers.length ? (
            <div>
                <div className="row">
                {passengers.slice(0,3).map((pass, index)=>(
                    <div className="col passengerEach" style={{backgroundColor: '#f9e0fb'}}>
                    <div style={{fontSize:'19px',fontWeight:'500'}}>Passenger {index+1}</div>
                    <div>{pass.pass_name}</div>
                    <div>{pass.pass_age}</div>
                    <div>{pass.pass_gender}</div>
                    <div>{pass.pass_address}</div>
                    <div>{pass.pass_phone}</div>
                    <br/>
                    <button className="btn btn-danger" onClick={()=>{handleDelete(pass.pass_id)}}>Delete</button>
                    </div>
                ))}
                </div>
                <div className="row">
                {passengers.slice(3,6).map((pass, index)=>(
                    <div className="col passengerEach"
                    style={{backgroundColor:'#e0fbc8', marginTop:'14px', borderColor:'forestgreen'}}>
                    <div style={{fontSize:'19px',fontWeight:'500'}}>Passenger {index+4}</div>
                    <div>{pass.pass_name}</div>
                    <div>{pass.pass_age}</div>
                    <div>{pass.pass_gender}</div>
                    <div>{pass.pass_address}</div>
                    <div>{pass.pass_phone}</div>
                    <br/>
                    <button className="btn btn-danger" onClick={()=>{handleDelete(pass.pass_id)}}>Delete</button>
                    </div>
                ))}
                </div>
            </div>
        ):null}
        <br/>
        {allok?(<button className="btn btn-primary" onClick={bookTheTicket}>Book Ticket</button>):
        (<button className="btn btn-warning" onClick={saveDetails}>Save All Details</button>)}&emsp;&emsp;
        <Link className="btn btn-dark" to='/book-ticket/trainDetails' state={{From: train.from_station, To: train.to_station, dated: date}}>Go Back</Link>
        </div>
        <br/><br/>
        <Footer/>
        </div>
        </>
    )
}
export default BookingForm;