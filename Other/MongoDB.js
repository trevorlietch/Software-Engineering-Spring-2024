//This is the database file
const { MongoClient } = require('mongodb');

// MongoDB Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'Wemoo';

// Define user data for me as an example
// there will be further tests to make sure username, password, 
// and email are all meeting requirements
const userData = 
{
  "username": "TrevorTheDog",
  "password": "password123",
  "email": "trevorlietch@ou.edu",   
  "major": "Computer Science",
  "year": "Sophomore",
  "date_created": new Date()  // Current date and time
};

// this is just an example for how user information will be stored
// eventually it will be though email conformation
async function insertUser() 
{
  const client = new MongoClient(url);
  try 
  {
    // Connect the client to the server
    await client.connect();
    console.log('Connected to MongoDB');

    // Specify the database to access Wemoo
    const db = client.db(dbName);

    // Insert a single document into the 'user' collection
    const result = await db.collection('user').insertOne(userData);
    console.log('Inserted user:', result.insertedId);
  } 
  catch (error) 
  {
    console.error('Error inserting user:', error);
  } 
  finally 
  {
    // Close the client connection
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Call the insertUser function to insert the user document
insertUser();
