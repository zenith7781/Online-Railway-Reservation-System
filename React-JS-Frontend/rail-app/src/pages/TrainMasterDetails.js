import React, { useEffect, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AppService from "./AppService";
const TrainMasterDetails=()=>{
    const [trains, setTrains] = useState([]);
    const [theTrain, setTheTrain] = useState({})
    const [show, setShow] = useState(-1);
    const goto = useNavigate();
    const Confirmation=(
            <Popover id="open-close" title="Are You Sure?">
                <Popover.Header>
                <h6>Are You Sure?</h6>
                </Popover.Header>
                <button style={{backgroundColor:'red', color: 'white', padding: '8px', borderRadius: '5px'}} 
                onClick={()=>{
                    setShow(-1);
                    AppService.deleteTrainByNo(theTrain.train_id).then((resp)=>{
                        console.log("Deleted Train",theTrain);
                        console.log(resp.data);
                    })
                    
                }}>
                    Yes
                </button>&emsp;&emsp;
                <button style={{backgroundColor:'indigo', color: 'white', padding: '8px', borderRadius: '5px'}} onClick={()=>{
                    setShow(-1);
                    console.log("Not Deleted Train",theTrain); 
                }}>
                    No
                </button>
            </Popover>
    );
    useEffect(()=>{
        AppService.fetchAllTrains().then(res=>setTrains(res.data));
    })
    return(
        <>
        <br/>
        <a className="btn btn-success" style={{marginLeft: '38px'}} href="/addNewTrain">Add New Train</a>
        <center>
        <br/>
        <table style={{border: '2px solid indigo'}} cellPadding={3}>
            <thead>
                <tr style={{fontWeight:'700', textAlign:'center', borderBottom: '2px solid maroon'}}>
                    <td>Serial No</td>
                    <td>Train Number</td>
                    <td>Train Name</td>
                    <td>Source</td>
                    <td>Destination</td>
                    <td>Departure</td>
                    <td>Arrival</td>
                    <td>Duration</td>
                    <td>Base Fare</td>
                    <td>Runs On</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {trains.map((train, ind)=>(
                    <tr>
                        <td><center>{ind+1}</center></td>
                        <td><center>{train.train_id}</center></td>
                        <td style={{width:'210px', paddingRight: '12px'}}>{train.train_name}</td>
                        <td>{train.from_station}</td>
                        <td>{train.to_station}</td>
                        <td>{train.departure}</td>
                        <td>{train.arrival}</td>
                        <td>{train.duration}</td>
                        <td>{train.base_fare}</td>
                        <td style={{width:'300px'}}>{train.runs_on.map((day)=>(<span>{day}&nbsp;</span>))}</td>
                        <td><button className="btn btn-primary" onClick={()=>goto('/updateTrain', {state:train})}>Modify</button>&emsp;
                        <OverlayTrigger id='toggle-click' trigger={['click']} show={show==ind} rootClose placement="bottom" overlay={Confirmation}>
                        <button className="btn" style={{backgroundColor: '#a82faf', color:'whitesmoke'}} onClick={()=>{setTheTrain(train);
                        setShow(ind);}}>
                            Delete</button>
                        </OverlayTrigger>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </center>
        </>
    )
}
export default TrainMasterDetails;