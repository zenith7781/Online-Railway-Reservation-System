import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/homeStyle.css';
import IRCTC from '../images/irctc.png';
import azadi from "../images/azadi.png";
import Emblem from "../images/emblem.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
const Homepage = () => {
    const locate = useLocation();
    const navigate=useNavigate();
    const [from_station, setFrom_station] = useState('');
    const [to_station, setTo_station] = useState('');
    const [errmsg,setErrmsg] = useState('');
    const [date, setDate] = useState(new Date());
    const locations = ['Howrah', 'Sealdah', 'New Delhi', 'Bangalore'];
    var fdt = "";
    var isgood = true;
    
    const ErrorMsg = () =>{
        if(from_station=='' || to_station=='' || (date.getFullYear()==2021))
        {
            console.log("Input fields cannot be empty");
            setErrmsg("Input fields cannot be empty");
            isgood = false;
        }
        else if(from_station==to_station)
        {
            console.log("Source and destination cannot be the same");
            setErrmsg("Source and destination cannot be the same");
            isgood = false;
        }
        else if(!locations.includes(from_station) || !locations.includes(to_station))
        {
            console.log("Either Source or Destination or both not in our list");
            setErrmsg("Either Source or Destination or both not in our list");
            isgood = false;
        }
        else if((Math.ceil(Math.abs(date-(new Date())))/(1000 * 60 * 60 * 24)>10) || Math.floor(((new Date())-date)/(1000 * 60 * 60 * 24))>0)
        {
            console.log(((new Date())-date)/(1000 * 60 * 60 * 24))
            console.log("Booking available for upcoming 10 days only");
            setErrmsg("Booking available for upcoming 10 days only");
            isgood = false;
        }
        else
        {
            console.log("All good to go now");
            setErrmsg(null);
        }
    }
    const submitter = () => {
        console.log("From Station: ", from_station);
        console.log("To Station: ", to_station);
        console.log("Date: ", date);
        console.log("Formatted Date: ", fdt);
        ErrorMsg();
        if(isgood==true)
        {
            navigate('/book-ticket/trainDetails',{state:{From: from_station, To: to_station, dated: fdt}})
        }
    }
    const resetter =()=>{
        setDate(new Date());
        setFrom_station('');
        setTo_station('');
        setErrmsg(null);
    }
    useEffect(() => {
        let month = "0";
        month = month + (date.getMonth() + 1);
        let dateeee="0";
        dateeee = dateeee + date.getDate();
        fdt = date.getFullYear() + "-" + month.slice(-2) + "-" + dateeee.slice(-2);
        console.log("F Date: ", fdt);
        console.log(locate);
        if(locate.state)
    {setFrom_station(locate.state.src);setTo_station(locate.state.dest)}
    }, [date,errmsg])
    return (
        <>
            <Navbar/>
            <div className="backg">
                <div className='irctc'>
                    <h2>Powered By <span><img src={IRCTC} height="90" /></span></h2>
                </div>
                <div className="searchbox">
                    <span id='sh'>Search Here</span>
                    <span style={{ float: 'right' }}><img src={azadi} alt="75" height="75" /></span>
                    <div>
                        <form>
                            <br/>
                            <div>Enter Source Station</div>
                            <datalist id='places'>
                                {locations.map((place) => (
                                    <option value={place} />
                                ))}
                            </datalist>
                            <input type='text' id='ip1' list='places' style={{borderBottom:'2px solid indigo',backgroundColor:'whitesmoke'}} 
                            value={from_station} required placeholder="From Station" onChange={e => setFrom_station(e.target.value)}/>
                            <span style={{ float: "right", marginTop: "42px", marginRight:"22px" }}>
                                <img src={Emblem} height='160' alt="Emblem" />
                            </span>
                            <div style={{ paddingLeft: "80px", color: "#13590a" }}>
                            <i className="bi bi-arrow-down-up">
                            </i>
                            </div>
                            <div>Enter Destination Station</div>
                            <input type='text' id='ip2' list='places' value={to_station} style={{borderBottom:'2px solid indigo',backgroundColor:'whitesmoke'}}
                            required placeholder="To Station" onChange={e => setTo_station(e.target.value)}/>
                            
                            <br /><p/><p/>
                            <div>Select Date</div>
                           <input type='date' id='ip3' required style={{borderBottom:'2px solid indigo',backgroundColor:'whitesmoke'}}
                           placeholder="yyyy-mm-dd" min="2023-01-01" max="2023-12-31" onChange={e => setDate(e.target.valueAsDate)} />
                            <br /><br /><p />
                            <input type='button' value='Search' className="btn btn-warning" onClick={submitter} />
                            &emsp;&emsp;&emsp;
                            <input type="reset" value='Reset' className='btn btn-danger' onClick={resetter}/>
                        </form>
                        <div className="errormsg">{errmsg}</div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}
export default Homepage;