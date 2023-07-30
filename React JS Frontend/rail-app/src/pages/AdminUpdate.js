import React, { useEffect, useState } from "react";
import AppService from "./AppService";
import Navbar from "./Navbar";
import Footer from './Footer';
export default function AdminUpdate(){
    const adminUserName = localStorage.getItem('username');
    const [name, setName] = useState('');
    const [oldname, setOLN] = useState('');
    const [oldps, setOps] = useState('');
    const [nameError, setNE] = useState('');
    const [message, setMsg] = useState('');
    const [pswdError, setPE] = useState('');
    const [nonew, setNN] = useState('');
    var allok = false, nochange = false;
    const [password, setPd] = useState('');
    const information = {adminUserName, name, password}
    const updateData=()=>{
        AppService.updtAdmin(adminUserName, information)
                  .then(rsp=>{
                    console.log(rsp);
                    setMsg("Successfully Updated. Go to profile to see changes");
                  }).catch(()=>console.error());
    }
    function checkIfValid(env){
        env.preventDefault();
        if(name == '')
        {
            setNE("Please Enter your Name");
            setNN('');
            allok=false;
        }
        if(password == '')
        {
            setPE("Password Cannot be Empty");
            setNN('');
            allok=false;
        }
        else if(password.length < 8)
        {
            setPE("Password should be atleast 8 characters");
            allok = false;
        }
        if(name === oldname && password === oldps)
        {
            setNN("Nothing New To Be Updated");
            setNE('');setPE('');
            nochange=true;
        }
        if(name!='' && password.length > 7 && nochange == false)
        {
            allok=true;
        }
        if(allok)
        {
            updateData();
        }
    }
    useEffect(()=>{
        AppService.getAdmin(adminUserName)
    .then((resp)=>{
        setName(resp.data.name);
        setOLN(resp.data.name);
        setOps(resp.data.password);
        setPd(resp.data.password);})
    },[])
    return(
        <div>
            <Navbar/>
            <div>
                <h3>Update Your Profile</h3>
                <form onSubmit={e=>checkIfValid(e)}>
                    <table cellPadding={6}>
                        <tr>
                            <td>Your Name:</td>
                            <td><input type='text' value={name} onChange={e=>setName(e.target.value)}/></td>
                            <td>{nameError}</td>
                        </tr>
                        <tr>
                            <td>Your Password:</td>
                            <td><input type='text' value={password} onChange={e=>setPd(e.target.value)}/></td>
                            <td>{pswdError}</td>
                        </tr>
                        <br/>
                        <tr><td>{nonew}</td></tr>
                        <tr>
                            <td><input type='submit' className="btn btn-primary btn-large" value="Update"/></td>
                        </tr>
                    </table>
                </form>
                <span>{message}</span>
            </div>
            <Footer/>
        </div>
    )
}