import React, { useState } from "react";
import "./RegistrationForm.css";
import LoginForm from "./LoginForm";
import axios from "axios";

const RegistrationForm = ({ onClose }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(username, email, password);
    const data={
        Username: username,
        Email: email,
        Password: password,
    }
    axios.post('https://sheet.best/api/sheets/d8bf4ee3-4291-45e8-b74f-9b74f55b9d44',data).then(response=>{
    //   console.log(response);
      setUsername('');
      setEmail('');
      setPassword('');
    })

    // Close the registration form
    onClose();
  };

  return (
    <div className="registration-form">
      <button className="close-button" onClick={(e) => { e.stopPropagation(); onClose(); }}>X</button>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <span onClick={() => setShowLoginForm(true)}>Login</span></p>
      {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
    </div>
  );
};

export default RegistrationForm;
