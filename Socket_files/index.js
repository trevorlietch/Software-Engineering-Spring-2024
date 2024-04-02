// Importing necessary modules
const express = require('express'); // Fast, unopinionated, minimalist web framework for Node.js
const { createServer } = require('node:http'); // HTTP server and client
const { join } = require('node:path'); // Utilities for working with file and directory paths
const { Server } = require('socket.io'); // Real-time bidirectional event-based communication library
const sqlite3 = require('sqlite3'); // SQLite3 driver
const { open } = require('sqlite'); // SQLite database handler
const { availableParallelism } = require('node:os'); // Provides operating system-related utility methods and properties
const cluster = require('node:cluster'); // Allows you to easily create child processes that all share server ports
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter'); // Adapter for multi-process Socket.IO apps

// Function to display messages
function displayMessage(io, message, id) {
  if (message.length > 20) {
    console.error('Error: Message is too long');
    io.emit('chat message', 'Error: Message is too long', id);
    return;
  }
  console.log(`Message: ${message}, ID: ${id}`); // Log the message and its ID
  io.emit('chat message', message, id); // Emit the message to all connected clients
}

// Check if the current process is primary
if (cluster.isPrimary) {
  const numCPUs = availableParallelism(); // Get the number of logical CPU cores
  for (let i = 0; i < numCPUs; i++) { // Create a worker for each CPU
    cluster.fork({
      PORT: 3000 + i // Set the port for this worker
    });
  }

  return setupPrimary(); // Setup the primary process
}

// Main function
async function main() {
  // Open the SQLite database
  const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database
  });

  // Create the messages table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_offset TEXT UNIQUE,
      content TEXT
    );
  `);

  // Create an Express application
  const app = express();
  // Create an HTTP server
  const server = createServer(app);
  // Create a Socket.IO server
  const io = new Server(server, {
    connectionStateRecovery: {},
    adapter: createAdapter()
  });

  // Define a route handler for the home page
  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

  // Listen for a new connection
  io.on('connection', async (socket) => {
    // Listen for a new chat message
    socket.on('chat message', async (msg, clientOffset, callback) => {
      let result;
      try {
        // Insert the new message into the database
        result = await db.run('INSERT INTO messages (content, client_offset) VALUES (?, ?)', msg, clientOffset);
      } catch (e) {
        if (e.errno === 19 /* SQLITE_CONSTRAINT */ ) {
          callback();
        } else {
          // nothing to do, just let the client retry
        }
        return;
      }
      // Display the new message
      displayMessage(io, msg, result.lastID);
      callback();
    });

    // If the socket hasn't recovered from a disconnection
    if (!socket.recovered) {
      try {
        // Fetch and display all messages with an ID greater than the server offset
        await db.each('SELECT id, content FROM messages WHERE id > ?',
          [socket.handshake.auth.serverOffset || 0],
          (_err, row) => {
            displayMessage(io, row.content, row.id);
          }
        )
      } catch (e) {
        // something went wrong
      }
    }
  });

  // Listen for a new connection
  io.on('connection', (socket) => {
    console.log('a user connected'); // Log that a user has connected
    displayMessage(io, 'a user connected'); // Display that a user has connected
    // Listen for a disconnection
    socket.on('disconnect', () => {
      console.log('user disconnected'); // Log that a user has disconnected
      displayMessage(io, 'a user disconnected'); // Display that a user has disconnected
    });
  });

  // Get the port from the environment variables
  const port = process.env.PORT;

  // Start the HTTP server
  server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
  });
}

// Run the main function
main();
