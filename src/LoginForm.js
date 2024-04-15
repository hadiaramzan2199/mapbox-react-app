import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LoginForm.css";
import RegistrationForm from "./RegistrationForm";
import ProjectDetails from "./ProjectDetails";

const LoginForm = ({ onClose, project }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  useEffect(() => {
    // Check if user is already logged in from previous session
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setAuthenticated(true);
      setShowProjectDetails(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "https://sheet.best/api/sheets/d8bf4ee3-4291-45e8-b74f-9b74f55b9d44"
      );
      const userData = response.data;

      const foundUser = userData.find(
        (user) => user.Email === email && user.Password === password
      );

      if (foundUser) {
        // Set user as authenticated and store in local storage
        setAuthenticated(true);
        localStorage.setItem("loggedInUser", email);
        setShowProjectDetails(true); // Display project details upon successful authentication
      } else {
        const isUserRegistered = userData.some((user) => user.Email === email);
        if (isUserRegistered) {
          setErrorMessage("Incorrect password. Please try again.");
        } else {
          setErrorMessage("User is not registered. Please register a new user.");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setErrorMessage("Error fetching user data. Please try again later.");
    }
  };

  const handleLogout = () => {
    // Clear the logged in user from local storage and reset state
    localStorage.removeItem("loggedInUser");
    setAuthenticated(false);
    setShowProjectDetails(false);
  };

  return (
    <div className="login-form">
      <button className="close-button" onClick={(e) => { e.stopPropagation(); onClose(); }}>X</button>
      {authenticated && showProjectDetails ? (
        <div>
          <ProjectDetails project={project} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">Login</button>
          </form>
          <p>
            Not registered?{" "}
            <span onClick={() => setShowRegistrationForm(true)}>
              Create an account
            </span>
          </p>
          {showRegistrationForm && (
            <RegistrationForm onClose={() => setShowRegistrationForm(false)} />
          )}
        </>
      )}
    </div>
  );
};

export default LoginForm;
