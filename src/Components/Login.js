import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();

    const handleSubmit = async (e)=> {

        e.preventDefault();
        const resposne = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await resposne.json()
        console.log(json);


        if(json.success){
            // redirect and save auth token
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged in Successfully", "success");
            navigate("/");
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChanging = (e)=> {
        setCredentials({...credentials, [e.target.name]: e.target.value} )
      }


  return (
    <>
      <h2 className='my-5'>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" value={credentials.email} name="email" id="email" onChange={onChanging}/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} name='password' id="password" onChange={onChanging}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Login
