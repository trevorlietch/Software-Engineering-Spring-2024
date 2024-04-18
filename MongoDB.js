//This is the database file
const { MongoClient } = require('mongodb');

// MongoDB Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'Wemoo';

// Define user data for me as an example
// there will be further tests to make sure username, password, 
// and email are all meeting requirements
// these are the documents withing the User collection
const userData = 
{
  "userID": "000001",
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

const chatRoomDataBizzell = {
  "building": "Bizzell",
  "chatRoomID": "bizzell1",
  "location": "35.20805, -97.44589"
};

// Define chat room data for Dale Hall
const chatRoomDataDaleHall = {
  "building": "Dale Hall",
  "chatRoomID": "dale1",
  "location": "35.20429, -97.44664"
};

// data for Gallogly Hall
const chatRoomDataGalloglyHall = {
  "building": "Gallogly Hall",
  "chatRoomID": "gallogly1",
  "location": "35.21018, -97.44226"
};

// data for Devon Energy Hall
const chatRoomDataDevonEnergyHall = {
  "building": "Devon Energy Hall",
  "chatRoomID": "devon1",
  "location": "35.21076, -97.44180"
};

// data for Physical Science Center
const chatRoomDataPhysicalScienceCenter = {
  "building": "Physical Science Center",
  "chatRoomID": "physicalscience1",
  "location": "35.20931, -97.44727"
};

// data for Sarkeys Energy Center
const chatRoomDataSarkeysEnergyCenter = {
  "building": "SarkeysEnergyCenter",
  "chatRoomID": "sarkeysenergy1",
  "location": ""
}

async function insertChatRooms() {
  const client = new MongoClient(url);
  try 
  {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);

    const resultBizzell = await db.collection('Chat Rooms').insertOne(chatRoomDataBizzell);
    console.log('Inserted chat room at Bizzell:', resultBizzell.insertedId);

    const resultDaleHall = await db.collection('Chat Rooms').insertOne(chatRoomDataDaleHall);
    console.log('Inserted chat room at Dale Hall:', resultDaleHall.insertedId);

    const resultGallogly = await db.collection('Chat Rooms').insertOne(chatRoomDataGalloglyHall);
    console.log('Inserted chat room at Gallagly Hall:', resultGallogly.insertedId);

    const resultDevon = await db.collection('Chat Rooms').insertOne(chatRoomDataDevonEnergyHall);
    console.log('Inserted chat room at Devon Energy:', resultDevon.insertedId);

    const resultPhysicalScienceCenter = await db.collection('Chat Rooms').insertOne(chatRoomDataPhysicalScienceCenter);
    console.log('Inserted chat room at Physical Science Center:', resultPhysicalScienceCenter.insertedId);

    const resultSarkeysEnergy = await db.collection('Chat Rooms').insertOne(chatRoomDataSarkeysEnergyCenter);
    console.log('Inserted chat room at Sarkeys Energy:', resultSarkeysEnergy.insertedId);
  } 
  catch (error) 
  {
    console.error('Error inserting chat rooms:', error);
  } 
  finally 
  {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Call the insertChatRooms function
insertChatRooms();