// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Connect from './ConnectButton';
import { MoralisProvider } from 'react-moralis';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#2c3e50', color: '#ecf0f1' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: '#3498db', fontSize: '24px', fontWeight: 'bold' }}>
          Medix
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ color: '#e74c3c' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/" style={{ color: '#3498db' }}>
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: '#3498db' }}
              >
                Manufacturer
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/addMedicine" style={{ color: '#2ecc71' }}>
                    Add Medicine
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/viewOrder" style={{ color: '#e67e22' }}>
                    View Orders
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/registorVendor" style={{ color: '#3498db' }}>
                    Register Vendor
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: '#3498db' }}
              >
                Vendor
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/orderMedicine" style={{ color: '#e74c3c' }}>
                    Order Medicine
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item disabled" aria-disabled="true" to="#" style={{ color: '#bdc3c7' }}>
                    Request Medicine
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item disabled" aria-disabled="true" to="#" style={{ color: '#bdc3c7' }}>
                    Deliver Medicine
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/supplyChain" style={{ color: '#3498db' }}>
                SupplyChain
              </Link>
            </li>
          </ul>
          <div className="d-flex" role="search">
            <MoralisProvider initializeOnMount={false}>
              <Connect />
            </MoralisProvider>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
