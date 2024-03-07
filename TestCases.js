//Storage of test cases

// Get UserInput function
const readline = require('readline');

// Function to get user input
function getUserInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('Enter a username: ', (userInput) => {
      rl.close();
      resolve(userInput);
    });
  });
}

// getInput function for testing
function getInput(userInput) {
  // implementation to check if userInput is a valid English alphanumeric key
  // Return true if valid, false otherwise
  // This is just a placeholder implementation for the sake of the example
  const isValid = /^[a-zA-Z0-9]+$/.test(userInput);
  return isValid;
}

// Function to perform tests and print results
async function runTests() {
  // Test Case 1
  const result1 = getInput('Programming123');
  console.log(`Test Case 1: ${result1 ? 'Pass' : 'Fail'}`);

  // Test Case 2
  const result2 = getInput('Programming@123');
  console.log(`Test Case 2: ${result2 ? 'Pass' : 'Fail'}`);

  // Test Case 3 (Custom Username)
  const customUsername = await getUserInput();
  const result3 = getInput(customUsername);
  console.log(`Test Case 3 (${customUsername}): ${result3 ? 'Pass' : 'Fail'}`);
}

// Run the tests
runTests();


//GetLocation Testing

COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Rep", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo {Democratic Rep}", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland {Republic}", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar, {Burma}", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russian Federation", "Rwanda", "St Kitts & Nevis", "St Lucia", "Saint Vincent & the Grenadines", "Samoa", "San Marino", "Sao Tome & Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

class Location {
    constructor(lat,lon,country){
        this.latitude = lat 
        this.longitude = lon
        this.country = country
    }
}

function getLocation(lat,lon,country){



    newLocation = new Location(0,0,"none");

    if(lat < -90 || lat > 90){
       return 'Error: Invalid latitude value'
    }

    if(lon < -180 || lon > 180){
        return 'Error: Invalid longitude value'
    }
    if(!COUNTRIES.includes(country)){
        return 'Error: Country does not exist'
    }

    newLocation.country = country 
    newLocation.lat = lat 
    newLocation.lon = lon 

    return newLocation
}

function testLocation(){
    //pass

    results = []

    results.push(getLocation(80.234,110.05607,"Andorra"))
    results.push(getLocation(-30,0.0001,"Austria"))
    
    //fail

    results.push(getLocation(-80000, 100000, "your moms house lol"))
    results.push(getLocation(0, 0, "US"))

    console.log(results)
}

testLocation()
//Unit: getUser(username)
function getUser(username) 
{
    // Test 1
    // tests if username is a string
    if (typeof username !== 'string') 
    {
      return 'Error: Username must be a string';
    }

    //Test 2
    //tests to make sure username is longer than 1 character
    if (username.length <= 1) 
    {
        return 'Error: Username must be longer than 1 character';
    }

    //Test 3
    //tests to make sure username is shorter than 21 characters
    if (username.length > 20) 
    {
        return 'Error: Username must be smaller than 20 characters';
    }
  
    //Test 4
    // Returns username if all tests pass
    let result = username + ' is a valid username';
    return { result };
  }

function testGetUser() 
{
    let result = getUser(123);
    //test 1
    if(result == 'Error: Username must be a string') 
    {
        console.log('getUser Test 1 failed');
    }
    else
    {
        console.log('getUser Test 1 passed');
    }

    //test 2
    result = getUser('a');
    if(result == 'Error: Username must be longer than 1 character') 
    {
        console.log('getUser Test 2 failed');
    }
    else
    {
        console.log('getUser Test 2 passed');
    }

    //test 3
    //name below is 21 characters
    result = getUser('abcdefghijklmnopqrstu'); 
    if(result == 'Error: Username must be smaller than 20 characters') 
    {
        console.log('getUser Test 3 failed');
    }
    else
    {
        console.log('getUser Test 3 passed');
    }

    //test 4 (passes)
    result = getUser('TrevorLietch');
    if(result == 'TrevorLietch is a valid username') 
    {
        console.log('getUser Test 4 passed');
    }
    else
    {
        console.log('getUser Test 4 failed');
    }
}

testGetUser();

// Unit: login(username, password)
function login(username, password) {
    // Test if username and password are strings.
    if (typeof username !== 'string' || typeof password !== 'string') {
        throw new Error('Username and password must be strings.');
    }

    // Test if username meets the length requirements.
    if (username.length <= 1 || username.length > 20) {
        throw new Error('Username must be longer than 1 character but shorter than 20 characters.');
    }

    // Test if password meets the length requirements.
    if (password.length < 3 || password.length > 20) {
        throw new Error('Password must be at least 3 characters long but shorter than 20 characters.');
    }

    // Test if password includes at least 1 lowercase letter.
    if (password === password.toUpperCase()) {
        throw new Error('Password must include at least 1 lowercase letter.');
    }

    // Test if password includes at least 1 uppercase letter.
    if (password === password.toLowerCase()) {
        throw new Error('Password must include at least 1 uppercase letter.');
    }

    // Test if password includes at least 1 number.
    if (/\d/.test(password) == false) {
        throw new Error('Password must include at least 1 number.');
    }

    // If all tests pass, return a message indicating the inputs are valid.
    let result = username + ' and ' + password + ' are valid inputs.';
    return { result };
}

// Test the login(username, password) Unit.
function testLogin() {
    // Cases that should pass:
    login('xXEdgyUsernameXx', 'Password123');
    login('PresJoeyB', 'ChocIceCream1');
    login('XD', 'aB0');

    // Cases that should fail:
    login('a', 'a');
    login('NoLowerCase', 'BOOMER1');
    login('NoUpperCase', 'boomer1');
    login('NumberHater', 'NoNumsAllowed');
}

testLogin();
