
// Function to validate coordinates
// The function should return true if the coordinates are valid, and false if they are invalid
// Test cases are provided below
// Authors: @camilgosmanov

// we need a new feature

// Validate coordinates
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

// Function to convert degree to radian
function degToRad(deg) {
    return deg * (Math.PI/180);
  }
  
  // Function to calculate distance between two points on Earth's surface
  //Uses Haversine formula to calculate the distance between two points on the Earth's surface
  function getDistanceInKm(lat1, lon1, lat2, lon2) {

    if (!validateCoordinates(lat1, lon1) || !validateCoordinates(lat2, lon2)) {
       console.log("Error: Invalid coordinates. Latitude must be between -90 and 90 degrees, and longitude must be between -180 and 180 degrees.");
        return null;
  }

    const R = 6371; // Radius of the Earth in km
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
  
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  }
  
  // Function to determine if two locations match based on a radius
  function matchLocation(l1, l2, radius) {
    
    const distance = getDistanceInKm(l1.lat, l1.lon, l2.lat, l2.lon);
    console.log(`Location 1: ${l1.name}, Location 2: ${l2.name}, Radius: ${radius} km, Distance: ${distance} km`);
    if(distance === null){
      return false;
    }
    return distance < radius;
  }

   // Function to determine if two locations match based on a radius
   function matchLocationCoords() {
    let lat1 = prompt("Enter the latitude for the first location:");
    let lon1 = prompt("Enter the longitude for the first location:");

    // Prompt the user to enter the latitude and longitude for the second location
    let lat2 = prompt("Enter the latitude for the second location:");
    let lon2 = prompt("Enter the longitude for the second location:");

    // Prompt the user to enter the radius
    let radius = prompt("Enter the radius:");
    const distance = getDistanceInKm(lat1, lon1, lat2, lon2);
    console.log(`Location 1: ${l1.name}, Location 2: ${l2.name}, Radius: ${radius} km`);
    return distance <= radius;
  }
  
  // Example usage:
  const location1 = { lat: 40.7128, lon: -74.0060,name:"NYC" }; // New York
  const location2 = { lat: 39.9526, lon: -75.1652,name:"Philadelphia" }; // Philadelphia
  const radius = 150; // Radius in km

  
  console.log(matchLocation(location1, location2, radius)); // Should print: true


  const location3 = { lat: 35.222, lon: 97.4390 ,name:"Norman"}; // Norman
  const location4 = { lat: 35.48, lon: 97.5,name:"OKC" }; // OKC
  const radius2 = 29; // Radius in km

  console.log(matchLocation(location3, location4, radius2)); // Should print: false

  const radius3 = 30; // Radius in km
  
  console.log(matchLocation(location3, location4, radius3)); // Should print: true

  //matchLocationCoords();
  
  let locationA = { lat: 40.7128, lon: -74.0060, name: "NYC" };
  let locationB = { lat: 40.7128, lon: -74.0060, name: "NYC" };
  let radius4 = 10; // Arbitrary radius
  let result = matchLocation(locationA, locationB, radius4);
  // Expected: result should be true (within the specified radius)
  console.log(result);

  radius4 = 0; // Arbitrary radius

  result = matchLocation(locationA, locationB, radius4);
  // Expected: result should be true (within the specified radius)
  console.log(result);
  
  locationA = { lat: 90, lon: 0, name: "North Pole" };
  locationB = { lat: 90, lon: 180, name: "North Pole" };
  radius4 = 10; // Arbitrary radius
  result = matchLocation(locationA, locationB, radius4);
  // Expected: result should be true (within the specified radius)
  console.log(result);

  locationA = { lat: 40, lon: 200, name: "invalid point 1" };
  locationB = { lat: 40, lon: 201, name: "invalid point 2" };
  radius4 = 1000; // Arbitrary radius
  result = matchLocation(locationA, locationB, radius4);
  // Expected: result should be true (within the specified radius)
  console.log(result);
  
