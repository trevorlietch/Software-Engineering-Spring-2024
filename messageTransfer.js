const sqlite3 = require('sqlite3').verbose();
const { MongoClient } = require('mongodb');

// Initialize SQLite database connection
const sqliteDB = new sqlite3.Database('./messages.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database:', './messages.db');
});

// MongoDB Connection URL
const mongoURL = 'mongodb://localhost:27017';
// Database Name
const dbName = 'Wemoo';
// Collection Name
const collectionName = 'Messages';

// Function to transfer data from SQLite to MongoDB
async function transferData() {
  try {
    // Connect to MongoDB
    const mongoClient = new MongoClient(mongoURL);
    await mongoClient.connect();
    console.log('Connected to MongoDB');

    // Get a reference to the MongoDB database
    const db = mongoClient.db(dbName);

    // Get data from SQLite
    sqliteDB.all('SELECT * FROM messages', async (err, rows) => {
      if (err) {
        console.error('Error querying SQLite database:', err.message);
        return;
      }
      
      // Debug statement to log retrieved rows
      console.log('Retrieved rows from SQLite:', rows);

      // Insert data into MongoDB
      const collection = db.collection(collectionName);
      await collection.insertMany(rows);
      console.log('Data transferred successfully.');
      
      // Close SQLite and MongoDB connections
      sqliteDB.close((err) => {
        if (err) {
          console.error('Error closing SQLite connection:', err.message);
        } else {
          console.log('SQLite connection closed.');
        }
      });
      await mongoClient.close();
      console.log('MongoDB connection closed.');
    });
  } catch (error) {
    console.error('Error transferring data:', error);
  }
}

// Run the data transfer function
transferData();