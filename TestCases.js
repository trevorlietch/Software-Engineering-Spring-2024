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