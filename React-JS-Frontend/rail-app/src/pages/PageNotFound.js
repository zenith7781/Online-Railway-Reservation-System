import React from "react";
import { Link } from "react-router-dom";
const PageNotFound=()=>{
    return(
    <div>
        <center>
            <br/>
            <div style={{padding: '22px', border: '2px solid maroon', borderRadius: '5px', display: 'inline-block', margin: 'auto'}}>
            <h1 style={{color: '#556b2f', fontFamily: 'Segoie UI'}}>Sorry, The Page you're looking for doesn't exist ☹️</h1>
            <br/>
            <Link className="btn btn-warning btn-lg" to="/" style={{backgroundColor: 'purple', color: 'whitesmoke'}}>Back To Home</Link>
            </div>
        </center>
    </div>
    )
}
export default PageNotFound;