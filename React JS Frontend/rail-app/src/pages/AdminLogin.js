import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
const AdminLogin=()=>{

    const goto=useNavigate();
    const [username, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [invalid_uid, setInvUid] = useState('');
    const [inv_pswd, setInvPswd] = useState('');
    const [fl, setFl]=useState('');
    let allgood = true;
    const request={username, password};
    function validate(event)
    {
        event.preventDefault();
        if(username=="")
        {
            setInvUid("Username is empty");
            allgood=false;
        }
        else if(username.includes('@'))
        {
            setInvUid("Invalid Username, Use Alphanumeric Only");
            allgood=false;
        }
        else
        {
            setInvUid('')
        }
        if(password=="")
        {
            setInvPswd("Password is Empty");
            allgood=false;
        }
        else if(password===username)
        {
            setInvPswd("Username and Password cannot be same");
            allgood=false;
        }
        else
        {
            setInvPswd('')
        }
        console.log(allgood)
        if(allgood)
        {
            login();
        }

    }
    const login=()=>{
        console.log("You will be logged in soon");
        axios.post("http://localhost:8089/secure/authenticate",request)
        .then((response)=>{
            if(response.data.jwt_token)
            {
                var token=response.data.jwt_token;
                localStorage.setItem("JWT",token);
                localStorage.setItem('username',username);
                localStorage.setItem("Role","ADMIN");
                console.log(token)
                window.alert("Logged In Successfully");
                goto('/adminPanel');
            }
        }).catch((error)=>{console.log(error); setFl("Invalid Credentials. Please try again")});
    }

    return(
        <>
        <Navbar/>
        <div style={{minHeight:'525px', backgroundColor: '#ebeafb'}}>
        <br/>
        <h1 style={{fontFamily: 'Fira Sans'}}><center>Admin Login Page</center></h1>
        {/* <div style={{float: 'left', marginTop: '30px', marginLeft: '20px'}}>
        <iframe style={{backgroundPosition: 'cover', height: '310px', backgroundSize: '100% 100%'}} height="400" width="480" src={GIF1} allowFullScreen/>
        </div> */}
        <div>
        <center>
        <form style={{width: '444px'}} onSubmit={e=>validate(e)}>
            <br/>
            <label>Admin User ID: </label>&emsp;
            <input type="text" onChange={e=>setUserId(e.target.value)}/>&emsp;
            <div style={{fontSize: 'medium', color: 'red'}}>{invalid_uid}</div>
            <br/><br/>
            <label>Password: </label>&emsp;&emsp;&emsp;
            <input type="password" onChange={e=>setPassword(e.target.value)}/>&emsp;
            <div style={{fontSize: 'medium', color: 'red'}}>{inv_pswd}</div>
            <br/>
            <input type="submit" className="btn btn-warning" value="Log In"/>
            <div>{fl}</div>
        </form>
        </center>
        </div>
        {/* <div style={{float: 'right', marginTop: '30px', marginRight: '15px'}}>
        <iframe style={{backgroundPosition: 'cover', height: '310px', backgroundSize: '100% 100%'}} height="400" width="480" src={GIF1} allowFullScreen/>
        </div> */}
        <br/><br/><br/>
        <div style={{backgroundColor: 'green', marginLeft:'25px', padding:'8px', marginRight: '25px', textAlign:'center', 
        color: 'whitesmoke', fontFamily: 'comic sans ms', fontWeight:'500', fontSize: '19px', borderRadius: '18px', cursor: 'pointer'}} 
        onClick={()=>goto('/')}>
            Click Here to go back to the Home Page
        </div>
        <br/><br/>
        </div>
        <Footer/>
        </>
    )
}
export default AdminLogin;