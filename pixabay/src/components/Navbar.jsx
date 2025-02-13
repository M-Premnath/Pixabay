// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signOut } from "firebase/auth";
import './Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error("Logout Error: ", error);
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Pixabay Clone Premdev</h1>
      <div className="navbar-menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FontAwesomeIcon icon={faTimes} />: <FontAwesomeIcon icon={faBars} />}
      </div>
      <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
        {user ? (
          <>
            <li className="navbar-user">Welcome, {user.email}</li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" onClick={toggleMobileMenu}>Login</Link></li>
            <li><Link to="/signup" onClick={toggleMobileMenu}>Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
