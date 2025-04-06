import React, { useState, useEffect } from "react";
import "../style/Auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginSignup = ({ type }) => {
  const [formData, setFormData] = useState({ email: "", password: "", fullName: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [darkOverlay, setDarkOverlay] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [passwordValid, setPasswordValid] = useState({ minLength: false, uppercase: false, number: false, specialChar: false });

  useEffect(() => {
    setTimeout(() => setDarkOverlay(true), 100);
    setTimeout(() => setShowForm(true), 500);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    setPasswordValid({
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    });
  };

  return (
    <div className="auth-container">
      <div className={`auth-overlay ${darkOverlay ? "dark" : ""}`}></div>
      {showForm && (
        <div className="auth-box visible">
          <h2>{type === "login" ? "Login" : "Sign Up"}</h2>
          <p>{type === "login" ? "Welcome back, please login to continue." : "Join us to get started!"}</p>
          <form>
            {type === "signup" && (
              <div className="input-container">
                <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} value={formData.fullName} required />
              </div>
            )}

            <div className="input-container">
              <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
            </div>

            <div className="input-container">
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} value={formData.password} required />
              <span className="password-toggle" onClick={togglePasswordVisibility}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
            </div>

            {type === "signup" && formData.password && (
              <div className="password-checklist">
                <ul>
                  {Object.entries(passwordValid).map(([key, valid]) => (
                    <li key={key}><input type="checkbox" checked={valid} disabled /> {key.replace(/([A-Z])/g, ' $1')}</li>
                  ))}
                </ul>
              </div>
            )}

            <button type="submit">{type === "login" ? "Login" : "Sign Up"}</button>
          </form>

          <div className="separator">or</div>
          <button className="google-btn"><span className="google-icon">G</span> Continue with Google</button>

          <div className="switch-auth">{type === "login" ? "Don't have an account? " : "Already a user? "} <a href={type === "login" ? "/signup" : "/login"}>{type === "login" ? "Sign Up" : "Login"}</a></div>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
