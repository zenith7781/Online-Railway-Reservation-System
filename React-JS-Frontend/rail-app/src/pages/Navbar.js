import React, { useEffect, useState } from "react";
import "../styles/navStyle.css";
import Logo from "../images/railLogo.png";
import Train from "../images/trainsil.png";
import { Link } from "react-router-dom";
const Navbar = () => {
    const [user ,setUser]=useState(localStorage.getItem('username'));
    useEffect(()=>{
        // eat 5 star do nothing
    },[user]);
    return (
        <div>
            <div className="nav1">
                <Link to='/'><span className="navicon"><img src={Logo} height="95" alt="Train Logo" /></span></Link>
                <span className="navtext"><b>
                    {user != null? 
                    (
                      <>
                      <span className="txts" onClick={()=>{localStorage.clear(); setUser(null); window.location.href = "http://localhost:3000"}}>
                        Logout</span>&emsp;&nbsp;
                      <Link to='/profile'style={{ textDecoration: "none" }}>
                      <span className="txts">Profile</span>
                      </Link>
                      </>
                    ):(
                        <>
                        <Link to="/login" style={{ textDecoration: "none" }}>
                        <span className="txts">Login</span></Link>&emsp;
                        <Link to='/signup'style={{ textDecoration: "none" }}>
                        <span className="txts">Signup</span></Link>
                        </>
                    )}&emsp;
                    <Link to="/about" style={{ textDecoration: "none" }}>
                        <span className="txts">About</span>
                    </Link>&emsp;
                    <Link to="/contact" style={{ textDecoration: "none" }}>
                    <span className="txts">Contact Us</span>
                    </Link>
                </b></span>
                <span className="name">
                    Rail Yatra&nbsp;&nbsp;<span className='dess'>ᬕᬢᬶ</span>
                    &emsp;&emsp;&nbsp;
                    <span><img src={Train} height="50" alt="Train"/></span>
                </span>
            </div>
        </div>
    );
}
export default Navbar;