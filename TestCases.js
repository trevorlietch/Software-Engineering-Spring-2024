//Storage of test cases

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
    if (password === password.toUpperCase) {
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
    login(xXEdgyUsernameXx, Password123);
    login(PresJoeyB, ChocIceCream1);
    login(XD, aB0);

    // Cases that should fail:
    login(a, a);
    login(NoLowerCase, BOOMER1);
    login(NoUpperCase, boomer1);
    login(NumberHater, NoNumsAllowed);
}

testLogin();
