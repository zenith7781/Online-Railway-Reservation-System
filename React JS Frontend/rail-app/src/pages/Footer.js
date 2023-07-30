import React from "react";
import "../styles/footStyle.css";
const Footer =()=>{
    return(
        <>
        <div class="bcg">
            <div className="span1">
            <span>
            <i class="bi bi-c-square"></i>&emsp;
            CopyRight Reserved
            2023 RailYatra.co.in
            </span>&emsp;&emsp;
            <span style={{marginLeft: '73px'}}>
                Compatible with:&emsp;
                <i class="bi bi-browser-chrome"></i>&emsp;
                <i class="bi bi-browser-edge"></i>&emsp;
                <i class="bi bi-browser-firefox"></i>&emsp;
                <i class="bi bi-browser-safari"></i>&emsp;
            </span>
            <span style={{marginLeft: '73px'}}>
                Connect with us on:&emsp;
                <i class="bi bi-facebook"/>&emsp;
                <i class="bi bi-google"/>&emsp;
                <i class="bi bi-twitter"/>&emsp;
                <i class="bi bi-instagram"/>&emsp;
                <i class="bi bi-youtube"/>&emsp;
            </span>
            <div>
            <span><i class="bi bi-pin-map-fill"></i>&emsp;
            Bank of Baroda Building, 16, Parliament Street, New Delhi 110001
            </span>
            <span style={{marginLeft: '420px'}}>
            <i class="bi bi-telephone-inbound-fill"></i>&emsp;
                033-4597154
            </span>
            </div>
            </div>
        </div>
        </>   
    )
}
export default Footer;