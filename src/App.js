// Author: Jaiden
// Task #9

import React, { useState } from 'react';
import './App.css'; // Import CSS for styling

import Login from './components/Login'; // Import the Login component
import Register from './components/Register'; // Import the Register component
import Home from './components/Home'; // Import the Home component

function App() {
  const [activeTab, setActiveTab] = useState('login'); // State variable to track active tab
  const [currentSection, setCurrentSection] = useState('login'); // State variable to track current section

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab); // Set the active tab
    setCurrentSection(tab); // Update current section when tab changes
  };

  // Function to handle successful login/register
  const handleSuccess = () => {
    setCurrentSection('home'); // Set current section to 'home' after successful login/register
  };

  return (
    <div className="app-container">
      <div className="background-image"></div> {/* Background image */}
      <div className="tabs">
        {/* Conditionally render login/register tabs based on the current section */}
        {currentSection !== 'home' && (
          <>
            <div
              className={`tab ${activeTab === 'login' ? 'active' : ''}`} // Apply 'active' class to the active tab
              onClick={() => handleTabChange('login')} // Handle click event to switch to the 'login' tab
            >
              Login
            </div>
            <div
              className={`tab ${activeTab === 'register' ? 'active' : ''}`} // Apply 'active' class to the active tab
              onClick={() => handleTabChange('register')} // Handle click event to switch to the 'register' tab
            >
              Register
            </div>
          </>
        )}
      </div>

      {/* Render login/register components if not in home section */}
      {currentSection !== 'home' && (
        <div className="login-register-container">
          {currentSection === 'login' && <Login onSuccess={handleSuccess} />} {/* Render Login component if current section is 'login' */}
          {currentSection === 'register' && <Register onSuccess={handleSuccess} />} {/* Render Register component if current section is 'register' */}
        </div>
      )}

      {/* Conditionally render the home component */}
      {currentSection === 'home' && <Home />} {/* Render Home component if current section is 'home' */}
      
      {/* Container around the Contact Us link */}
      <div className="contact-us-container">
        <div className="contact-us">
          <a href="/contact">Contact Us</a> {/* Link to the contact page (Currently returns to login page) */}
        </div>
      </div>
    </div>
  );
}

export default App;