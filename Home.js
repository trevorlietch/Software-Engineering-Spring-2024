// Author: Jaiden
// Task #9

// Home.js
import React from 'react';

function Home() {
  return (
    <div className="home-container">
      {/* Container for the header */}
      <div className="header-container">
        <h2>Welcome to the Home Page</h2>
      </div>

      {/* Container for the display panel */}
      <div className="display-panel-container">
        <a href="/home">Home</a>
      </div>
    </div>
  );
}

export default Home;
