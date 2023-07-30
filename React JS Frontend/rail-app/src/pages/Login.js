import axios from "axios";
import '../styles/loginStyle.css';
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
const Login=()=>{
    const gotopage = useNavigate();
    const bk_req=useLocation();
    const [username, setUsername]=useState('');
    const [user_errorMsg, setUser_errorMsg]=useState('');
    const [pas_err, setPass_err] = useState('');
    const [password,setPassword] = useState('');
    const request={username, password};
    var token='', userErr=false, passErr=false, allgood=false;
    const LoginHandler=(event)=>{
        event.preventDefault();
        validator();
        if(allgood)
        {
            axios.post('http://localhost:8089/secure/authenticate',request)
            .then((response)=>{
                if(response.data.jwt_token)
                { token = response.data.jwt_token}
                else{
                    window.alert("Invalid Credentials");
                }
                console.log("JWT",token);
                localStorage.setItem("JWT",token);
                localStorage.setItem("username",username);
                window.alert("Successfully Logged In !!")
                if(bk_req.state)
                {
                    gotopage(`/book-ticket/fillForm/${bk_req.state.trn_id}/${bk_req.state.trn_class}/${bk_req.state.trn_date}/${bk_req.state.trn_seats}`)
                }
                else
                {
                    gotopage('/')
                }
            }).catch((error)=>{console.log("Error Logging In",error); 
            window.alert("Invalid Credentials")
        })
        }
    }
    function validator()
    {
        if(username.length===0)
        {
            setUser_errorMsg("Please enter your Email");
            userErr=false;
        }
        else if (!/\S+@\S+\.\S+/.test(username)) 
        { setUser_errorMsg("Invalid Email id"); userErr=false;}
        else
        {
            setUser_errorMsg('');
            userErr=true; 
        }
        if(password.length===0)
        {
            setPass_err("Please enter your Password");
            passErr=false;
        }
        else
        {
            setPass_err('');
            passErr=true; 
        }
        if(userErr===true && passErr===true)
        { allgood=true; }
    }
    return(
        <div style={{backgroundColor:'cornsilk'}}>
        <Navbar/>
        <div className="box2">
        <br/><br/><br/>
        <div id='box1'>
        <br/>
        <center><span style={{fontFamily:'Algerian', fontSize:'29px'}}>Login Here</span></center>
        <br/>
        <div style={{marginLeft:'38px'}}>
        <div style={{fontSize:'19px'}}>Enter Your Email</div>
        <input type="text" style={{width:'249px', backgroundColor:'lavender', borderBottom:'2px solid brown'}} required onChange={e=>setUsername(e.target.value)} />
        <div style={{color:'#f31144', fontSize:'14px'}}>{user_errorMsg}</div>
        <br/><p/>
        <div style={{fontSize:'19px'}}>Enter The Password</div>
        <input type="password" style={{width:'249px', backgroundColor:'lavender', borderBottom:'2px solid brown'}} required onChange={e=>setPassword(e.target.value)} />
        <div style={{color:'#f31144', fontSize:'14px'}}>{pas_err}</div>
        <br/><p/>
        <button className="btn btn-info" onClick={LoginHandler}>Login</button>
        </div>
        <br/>
        </div>
        <br/><br/>
        </div>
        <Footer/>
        </div>
    )
}
export default Login;