import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
  let navigate = useNavigate();

  const handleSubmit = async (e)=> {
    const {name,email,password} = credentials;
    e.preventDefault();
    const resposne = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({name, email, password})
    });
    const json = await resposne.json()
    console.log(json);

    if(json.success){
        // redirect and save auth token
        localStorage.setItem('token', json.authToken);
        navigate("/");
        props.showAlert("Account Created Successfully", "success")
    }
    else{
        props.showAlert("Invalid Details", "danger")
    }
}
  
  const onChanging = (e)=> {
    setCredentials({...credentials, [e.target.name]: e.target.value} )
  }

  return (
    <div>
      <h2 className='my-5'>SignUp</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">User Name</label>
            <input type="text" className="form-control" name="name" id="name" onChange={onChanging} required />
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" id="email" onChange={onChanging} required />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' id="password" onChange={onChanging} required minLength={5}/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChanging} required minLength={5}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
