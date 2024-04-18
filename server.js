const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// MongoDB Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'Wemoo';

// Create an Express route for registration
app.post('/register', async (req, res) => {
  // Extract registration data from the request body
  const { email, password } = req.body;

  // Connect to MongoDB
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    // Specify the database to access Wemoo
    const db = client.db(dbName);

    // Insert user data into the 'users' collection
    const result = await db.collection('users').insertOne({ email, password });
    console.log('User registered:', result.insertedId);

    // Send a success response
    res.status(200).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    // Send an error response
    res.status(500).send('An error occurred while registering user');
  } finally {
    // Close the MongoDB connection
    await client.close();
    console.log('Disconnected from MongoDB');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});