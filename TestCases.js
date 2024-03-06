//Storage of test cases

//Unit: getUser(username)
function getUser(username) {
    // tests if username is a string
    if (typeof username !== 'string') {
      throw new Error('Username must be a string');
    }

    //tests to make sure username is longer than 1 character
    if (username.length <= 1) {
        throw new Error('Username must be longer than 1 character');
    }

    if (username.length > 20) {
        throw new Error('Username must be smaller than 20 characters');
    }
  
    // Returns username if all tests pass
    let result = username + 'is a valid username';
    return { result };
  }

function testGetUser() {
    getUser(123);
}

testGetUser();