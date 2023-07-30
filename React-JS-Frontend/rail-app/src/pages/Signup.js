import React, { useState } from "react";
import Navbar from "./Navbar";
import '../styles/signupStyle.css';
import AppService from "./AppService";
import Footer from "./Footer";
const Signup=()=>{
    const [name,SetName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [phone,setPhone] = useState('');
    const [cnfp,setCnfp] = useState('')
    const user_data = {email,password,phone,name} 
    var is_all_good=false, name_ok=false, email_ok=false,pass_ok=false, ph_ok=false, cnfp_ok=false;
    const [nameerr,SetNameerr] = useState('');
    const [emailerr,setEmailerr] = useState('');
    const [paserr,setPaserr] = useState('');
    const [phoneerr,setPhoneerr] = useState('');
    const [cnfperr,setCnfperr] = useState();
    const errormsg = {nameerr,paserr,cnfperr,phoneerr,emailerr};
    function validate() {
        if (user_data.name.length === 0) { SetNameerr("Name is required"); name_ok=false;}
        else{SetNameerr(''); name_ok=true;}

        if (user_data.email.length === 0) { setEmailerr("Email is required"); email_ok=false;}
        else if (!/\S+@\S+\.\S+/.test(user_data.email)) { setEmailerr("Invalid Email id"); email_ok=false;}
        else{setEmailerr(''); email_ok=true;}

        if (user_data.password.length === 0) 
        { setPaserr("Password is Required"); pass_ok=false;}
        else if (user_data.password.length < 5 || user_data.password.length > 12) 
        { setPaserr("Password should be between 5 to 12 characters"); pass_ok=false;}
        else{console.log(user_data.password.length); setPaserr(''); pass_ok=true;}

        if (user_data.password !== cnfp) { setCnfperr("Password Entered and Confirm password doesn't match"); cnfp_ok=false;}
        else{setCnfperr(''); cnfp_ok=true;}

        if (user_data.phone==='') { setPhoneerr("Phone Number is required"); ph_ok=false;}
        else if(phone < 1000000000 || phone > 9999999999){setPhoneerr("Phone Number should be of 10 digits"); ph_ok=false;}
        else{setPhoneerr(''); ph_ok=true;}

        if(is_all_good===false && name_ok===true && email_ok===true && pass_ok===true && ph_ok===true && cnfp_ok===true)
        {is_all_good=true;}
     }
    const signupfunc=(ev)=>{
        ev.preventDefault();
        validate();
        console.log(errormsg);
        if(is_all_good)
        {
            console.log("Let the Sign Up begin...");
            console.log(user_data);
          AppService.postuser(user_data).then((resp)=>{
            console.log(resp.data);
            console.log("User Added Successfully")
          }).catch((error)=>{window.alert("Email Id already exists");console.log("Error Signing up",error)});
        }
    }
    return(
        <>
            <Navbar/>
            <div className="sign1">
                <div>
                    <center><h3><span style={{paddingRight:'7px', paddingLeft:'6px', borderRadius: '4px', backgroundColor: '#D8EBF7'}}>Signup Page</span></h3></center>
                    <br/><br/>
                    <form className="tab1"><table cellPadding={7}><tbody>
                        <br/>
                        <tr>
                        <td><label>Enter Name:&emsp;</label></td>
                        <td><input type="text" required placeholder="Enter Your Name" onChange={e=>SetName(e.target.value)}/>
                        {nameerr? <p>{nameerr}</p>:null}</td>
                        <br/><br/>
                        </tr><tr>
                        <td><label>Enter Email:&emsp;</label></td>
                        <td><input type="text" required placeholder="Enter Your email" onChange={e=>setEmail(e.target.value)}/>
                        {(emailerr)?<p>{emailerr}</p>:null}</td>
                        <br/><br/><br/></tr><tr>
                        <td><label>Enter Phone Number:&emsp;</label></td>
                        <td><input type="number" maxLength="10" required placeholder="Enter Your Mobile no." onChange={e=>setPhone(e.target.valueAsNumber)}/>
                        {phoneerr?<p>{phoneerr}</p>:null}</td>
                        <br/><br/></tr><tr>
                        <td><label>Enter Password:&emsp;</label></td>
                        <td><input type="password" required placeholder="Set Password" onChange={e=>setPassword(e.target.value)}/>
                        {paserr?<p>{paserr}</p>:null}</td>
                        <br/><br/><br/></tr><tr>
                        <td><label>Confirm Password:&emsp;</label></td>
                        <td><input type="password" required placeholder="Confirm Password" onChange={e=>setCnfp(e.target.value)}/>
                        {cnfperr?<p>{cnfperr}</p>:null}</td></tr>
                        <br/>
                        <button style={{marginTop:'16px'}} type='button' className="btn btn-warning" onClick={signupfunc}>Sign Up</button>
                        </tbody></table>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    )
}
export default Signup;