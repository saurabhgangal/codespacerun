// Navbar.tsx
import React, { useState } from 'react';
import './Navbar.css';
import navlogo from './navlogo.jpeg';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="navbar">
      <img src={navlogo} alt="Qure Logo" width={50} height={'auto'} />
      <div>
        <div className={`dropdown ${isDropdownVisible ? 'active' : ''}`}>
          <span className="dropbtn" onClick={toggleDropdown}>
            Products{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
          <div className="dropdown-content">
            <a href="#">
              <p>Chest radiography (CXR)</p>
            </a>
            <p>Posterior-anterior (PA) - TB</p>
            <a href="#">
              <p>Computed tomography (CT) - Lung</p>
            </a>
            <a href="#">
              <p>Cerebrovascular</p>
            </a>
            <a href="#">
              <p>Musculoskeletal Imaging and Intervention</p>
            </a>
            <a href="#">
              <p>Coronary angiogram</p>
            </a>
          </div>
        </div>
        <span>Impact</span>
        <span>Contact Us</span>
        <button>Patient Portal</button>
        <Link to="/doctor">
          <button>Doctor Portal</button>
        </Link>
        <button>Admin portal</button>
        <span>Global</span>
      </div>
    </div>
  );
};

export default Navbar;
