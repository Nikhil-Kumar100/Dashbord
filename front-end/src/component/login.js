import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Login=()=>{
    const [email,setEmail] =React.useState('');
    const [password,setPassword]=React.useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })
    const HandelLogin= async()=>{
        console.warn('email, user',{email,password});
        let result= await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json',
              
            },
        });

        result=await result.json();
        console.warn(result);
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate('/');
        }
        else{
            alert("Pls Enter Currect user and password");
        }
    }
    return(
        <div className="container">
        <div className="form">
          <h1>Login</h1>
        <div className="login">
            <input type="text" className="inputBox" placeholder="Enter Email Id" 
            onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
          <br></br>  <input type="password" className="inputBox" placeholder="Enter Password"
            onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
          <br></br>  <button onClick={HandelLogin}className="appButton" type="button" >Login</button>
        </div>
        </div></div>
    )
}

export default Login;