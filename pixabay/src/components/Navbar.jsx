import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1>
          <Link to="/">Pixabay</Link>
        </h1>
        <p>Welcome</p>
      </div>
    </nav>
  );
};

export default Navbar;
