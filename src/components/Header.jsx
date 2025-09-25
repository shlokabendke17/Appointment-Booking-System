import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import './Header.css';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isLoggedIn, login, logout } = useAuth(); // Use the hook to get the state and functions

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="main-header">
      <nav className="navbar">
        <Link to="/" className="logo">Your Logo</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li className="dropdown">
            <a href="#" onClick={toggleDropdown}>Products</a>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/appointments">Appointments</Link></li>
                <li><Link to="/meetings">Meetings</Link></li>
                <li><Link to="/scheduling">Scheduling</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/contact">Contact</Link></li>
          {/* CONDITIONAL RENDERING FOR LOGIN/LOGOUT BUTTONS */}
          {!isLoggedIn ? (
            <>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/login" className="login-button">Sign In</Link></li>
            </>
          ) : (
            <li><button onClick={logout} className="logout-button">Logout</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;