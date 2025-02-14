// src/components/Signup.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db, auth, googleProvider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './Auth.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: email
      });
      alert("Account created successfully!");
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Logged in with Google!");
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup} className="auth-form">
        <h2>Sign Up</h2>
        
        <div className="input-group">
          <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <FontAwesomeIcon 
            icon={showPassword ? faEyeSlash : faEye} 
            className="password-toggle" 
            onClick={togglePasswordVisibility} 
          />
        </div>

        <button type="submit">Sign Up</button>

        <center>
          <p>(or)</p>
        </center>

        <button type="button" id='google-btn' onClick={handleGoogleLogin}>
          <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQn8mkUlkOzubmC-ELHPzhZM2LDpJxUKEZOk1-6mt9La2sR-ELq" alt="Google Icon" />
          Sign up with Google
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
