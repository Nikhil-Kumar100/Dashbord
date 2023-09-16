import React,{useEffect, useState} from "react";
import "./signup.css"; // Import the CSS file
import {useNavigate} from 'react-router-dom';
const SignUp = ()=>{
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");

    const navigate = useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })
    
    const collectdata= async()=>{
        console.warn(name,password,email);
        let result =await fetch('http://localhost:5000/register',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            },

        });
        result=await result.json();
        localStorage.setItem("user",JSON.stringify(result.result));

        localStorage.setItem("token",JSON.stringify(result.auth));
        console.warn(result);
        if(result){
            navigate("/")
        }
        

    }

return(
    <div className="container">
    <div className="form">
      <h1>Register</h1>
    <div>
        <hi>
            <input className="inputBox" type="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" />
            <br></br><input className="inputBox" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
            <br></br> <input className="inputBox" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
            <br></br><button onClick={collectdata} className="appButton" type="button">SignUp</button>
        </hi>
    </div>
    </div></div>
)
}
export default SignUp;