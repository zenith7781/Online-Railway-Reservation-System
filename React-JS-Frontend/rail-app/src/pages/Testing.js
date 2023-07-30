import React, { useEffect, useState } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
const Testing=()=>{
    const [a,setA] = useState([1,2,3,4,5,9,0]);
    const [b,setB]=useState('');
    const [cc,setCc]=useState('');
    const [onn, setOnn] = useState(false);
    const [innercls, setInn] = useState({
        marginTop: '2px',
        marginRight: '2px',
        marginLeft: '2px',
        height: '26px',
        width: '26px',
        transition: '0.4s',
        borderRadius: '50%',
        backgroundColor: 'whitesmoke'
      });
    const [outercls, setOut] = useState({
        width: '60px',
        height: '30px',
        display: 'inline-block',
        backgroundColor: 'grey',
        borderRadius: '20px',
        transition: '0.4s',
        marginLeft: '40px'
    });
    function add_to_list(value)
    {
        setA([...a,value])
    }
    const popoverClickRootClose = (
        <Popover id="popover-trigger-click-root-close" title="Popover bottom">
          <strong>Holy guacamole!</strong> Check this info.
        </Popover>
    );
    function remove_using_index(ind)
    {
        setA([...a.slice(0,ind),...a.slice(ind+1)])
    }
    function changing()
    {
       setOnn(!onn);
        if(!onn){
         setInn({
            marginTop: '2px',
            marginRight: '2px',
            marginLeft: '2px',
            height: '26px',
            width: '26px',
            transition: '0.4s',
            borderRadius: '50%',
            backgroundColor: 'whitesmoke',
            transform: 'translateX(30px)'
          });
        setOut({
            width: '60px',
            height: '30px',
            display: 'inline-block',
            borderRadius: '20px',
            transition: '0.4s',
            backgroundColor: '#a40acb',
            marginLeft: '40px'
        });
        }
      else{
      setInn({
        marginTop: '2px',
        marginRight: '2px',
        marginLeft: '2px',
        height: '26px',
        width: '26px',
        transition: '0.4s',
        borderRadius: '50%',
        backgroundColor: 'whitesmoke'
      });

      setOut({
        width: '60px',
        height: '30px',
        display: 'inline-block',
        borderRadius: '20px',
        transition: '0.4s',
        backgroundColor: 'grey',
        marginLeft:'40px'
    });
    }
    }
    useEffect(()=>{
        console.log(a);
        console.log(innercls);
    },[innercls]);
    return(
        <>
        <h2>Demo to add elements</h2>
        <br/>
        <div style={{margin:'25px'}}>
                <button className="btn btn-primary" onClick={()=>add_to_list(1)}>Add 1</button>&emsp;&emsp;
                <button className="btn btn-primary" onClick={()=>add_to_list(2)}>Add 2</button>&emsp;&emsp;
                <button className="btn btn-primary" onClick={()=>add_to_list(4)}>Add 4</button>&emsp;&emsp;
                <button className="btn btn-primary" onClick={()=>add_to_list(6)}>Add 6</button>
        </div>
        <div style={{margin:'25px'}}>
                <button className="btn btn-warning" onClick={()=>remove_using_index(0)}>remove 1st</button>&emsp;&emsp;
                <button className="btn btn-warning" onClick={()=>remove_using_index(1)}>remove 2nd</button>&emsp;&emsp;
                <button className="btn btn-warning" onClick={()=>remove_using_index(2)}>remove 3rd</button>&emsp;&emsp;
                <button className="btn btn-warning" onClick={()=>remove_using_index(3)}>remove 4th</button>
        </div>
        <br/><br/>
        <table>
            <tr>
                {a.map((val)=>(
                    <td>{val}</td>
                ))}                
            </tr>
        </table>
        <OverlayTrigger
      trigger="click"
      rootClose
      placement="bottom"
      overlay={popoverClickRootClose}
    >
      <Button>Click w/rootClose</Button>
    </OverlayTrigger>
    <div>
        <select name="dataSSH" onChange={e=>{setB(e.target.value);setCc(e.target.value)}}>
            <option value="">-select-</option>
            <option value="MS Dhoni">MS Dhoni</option>
            <option value="Virat Kohli">Virat Kohli</option>
            <option value="Sunil Chettri">Sunil Chettri</option>
            <option value="Lionel Messi">Lionel Messi</option>
            <option value="Christiano Ronaldo">Ronaldo</option>
            <option value="Others">Others</option>
        </select>
        <br/><br/>
        {cc=="Others"?<input type="text" onChange={e=>setB(e.target.value)}/>:null}
        <br/><br/>
        {b}
        <div style={outercls} onClick={changing}>
          <div style={innercls}>
        </div>
        </div>&emsp;&emsp;
        <span>The switch is {onn?"on":"off"}.</span>
    </div>
        </>
    )
}
export default Testing;