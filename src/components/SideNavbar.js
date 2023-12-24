// SideNavbar.js
import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/SideNavbar.css'; // Create a separate CSS file for styling
import Manufacturer from './Manufacturer';
import logo from './images/medixLogo.jpeg';
import Connect from './ConnectButton';
import { MoralisProvider } from 'react-moralis';

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`wrapper ${isOpen ? 'open' : ''}`}>
      {/* Sidebar navigation */}
      <nav id="sidebar">
        <div className="sidebar-header">
          {/* Use the logo as a toggle button */}
          <img
            src={logo}
            alt="Logo"
            className={`logo ${isOpen ? 'toggle-open' : ''}`}
            onClick={toggleNavbar}
          />
        </div>
        <ul className="list-unstyled components">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>

      {/* Page content */}
      <div id="content">
        {/* Top right buttons and Manufacturer component */}
        <div className="top-right-container">
          <div className="top-right-buttons">
            {/* ?\<button className="btn btn-light connect-button">Connect</button> */}
            <MoralisProvider initializeOnMount={false}>
              <Connect/>
            </MoralisProvider>
            <button className="btn btn-light login-signup-button">Login/Signup</button>
          </div>

          {/* Manufacturer component on top right */}
          <div className="manufacturer-container">
            <Manufacturer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
