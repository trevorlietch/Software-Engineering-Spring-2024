// verifyBuilding.js

// Function to validate if the given latitude and longitude are within valid ranges
function validateCoordinates(lat, lon) {
    const validLatRange = [-90, 90]; // Valid latitude range (-90 to 90 degrees)
    const validLonRange = [-180, 180]; // Valid longitude range (-180 to 180 degrees)
  
    if (validLatRange[0] <= lat && lat <= validLatRange[1] &&
        validLonRange[0] <= lon && lon <= validLonRange[1]) {
      return true; // Coordinates are valid
    } else {
      return false; // Invalid coordinates
    }
  }
  
  // Function to convert degrees to radians
  function degToRad(deg) {
    return deg * (Math.PI / 180);
  }
  
  // Function to calculate the Haversine distance between two points
  function getDistanceInKm(lat1, lon1, lat2, lon2) {
    if (!validateCoordinates(lat1, lon1) || !validateCoordinates(lat2, lon2)) {
      console.error("Error: Invalid coordinates.");
      return null;
    }
  
    const R = 6371; // Earth's radius in kilometers
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }
  
  // Predefined building locations on the OU campus
  const buildings = {
    "Gallogly Hall": { lat: 35.210139322940485, lon: -97.44216405529569 },
    "Devon Energy Hall": { lat: 35.21077714238612, lon: -97.44186756269177 },
    "Dale Hall": { lat: 35.20430303559261, lon: -97.44659815437568 },
    "Bizzell Library": { lat: 35.2080646096516, lon: -97.44581079113341 },
    "Physical Sciences Center": { lat: 35.2093137711059, lon: -97.44724398638695 },
    "Sarkeys Energy Center": { lat: 35.21044421291641, lon: -97.44035827606754 }
  };
  
  // Function to check if the user is at a specific building
  function isUserAtBuilding(userLat, userLon, buildingName) {
    const building = buildings[buildingName];
    if (!building) {
      console.error("Building not found.");
      return false;
    }
    const distance = getDistanceInKm(userLat, userLon, building.lat, building.lon);
    if (distance === null) {
      return false;
    }
    return distance < 0.03; // Checking for distance less than 30 meters
  }
  
  // Exporting the functions for use in other parts of the project
  module.exports = {
    validateCoordinates,
    getDistanceInKm,
    isUserAtBuilding
  };
  