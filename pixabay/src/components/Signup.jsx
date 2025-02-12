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
  const [username, setUsername] = useState('');
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
        username: username,
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
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required 
        />
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
        <button type="button"  onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
