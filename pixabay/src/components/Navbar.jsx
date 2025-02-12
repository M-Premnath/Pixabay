// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signOut } from "firebase/auth";
import './Navbar.css';
const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error("Logout Error: ", error);
    });
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Pixabay App</h1>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        {user ? (
          <>
            <li className="navbar-user">Welcome, {user.email}</li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
