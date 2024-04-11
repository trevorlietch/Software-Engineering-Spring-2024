import React, { useState } from 'react';
import './App.css'; // Import CSS for styling

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home'; // Import the Home component

function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [currentSection, setCurrentSection] = useState('login'); // Add state for current section

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentSection(tab); // Update current section when tab changes
  };

  const handleSuccess = () => {
    setCurrentSection('home'); // Set current section to 'home' after successful login/register
  };

  return (
    <div className="app-container">
      <div className="background-image"></div>
      <div className="tabs">
        {/* Conditionally render login/register tabs based on the current section */}
        {currentSection !== 'home' && (
          <>
            <div
              className={`tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => handleTabChange('login')}
            >
              Login
            </div>
            <div
              className={`tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => handleTabChange('register')}
            >
              Register
            </div>
          </>
        )}
      </div>

      {/* Render login/register components if not in home section */}
      {currentSection !== 'home' && (
        <div className="login-register-container">
          {currentSection === 'login' && <Login onSuccess={handleSuccess} />}
          {currentSection === 'register' && <Register onSuccess={handleSuccess} />}
        </div>
      )}

      {/* Conditionally render the home component */}
      {currentSection === 'home' && <Home />}
      
      {/* Container around the Contact Us link */}
      <div className="contact-us-container">
        <div className="contact-us">
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </div>
  );
}

export default App;
