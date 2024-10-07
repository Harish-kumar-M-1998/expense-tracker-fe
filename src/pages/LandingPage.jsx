// src/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Create this file for custom styles

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="container text-center">
        <h1 className="title fade-in">Expense Tracker</h1>
        <p className="description fade-in">
          Keep track of your expenses and manage your budget efficiently.
        </p>
        <div className="buttons fade-in">
          <Link to="/login" className="btn btn-primary mx-2">
            Login
          </Link>
          <Link to="/register" className="btn btn-secondary mx-2">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
