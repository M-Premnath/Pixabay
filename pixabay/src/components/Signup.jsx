// src/components/Signup.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../firebaseConfig';
import './Auth.css';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigate("/", { replace: true });
      // Store the username in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: email
      });
      console.log("user", user);


      alert("Account created successfully!");
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

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup} className="auth-form">
        <h2>Sign Up</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit">Sign Up</button>
        <center>
        <p>(or)</p>
        </center>
        <button type="button" id='google-btn' onClick={handleGoogleLogin}>
         <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQn8mkUlkOzubmC-ELHPzhZM2LDpJxUKEZOk1-6mt9La2sR-ELq" alt="" />
          Sign up with Google
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
