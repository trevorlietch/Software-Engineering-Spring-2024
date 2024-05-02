const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "Wemoo Bot";

//Add emailer 
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wemoo.service@gmail.com',
    pass: 'qwca yphp nyst rprx' // Use the generated application-specific password here
  }
});

// Initialize SQLite database
let db = new sqlite3.Database('./messages.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the messages database.');

  // Create table here
  db.run('CREATE TABLE IF NOT EXISTS messages(user text, message text)', (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});


// Add max user limit
// Maximum number of users in a room
const MAX_USERS_PER_ROOM = 100;

// Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const roomUsers = getRoomUsers(room);
  
    // Add max user limit
    // Check if room has reached its capacity
    if (roomUsers.length >= MAX_USERS_PER_ROOM) {
      socket.emit("message", formatMessage(botName, "Sorry, this room is full. Please try another one."));
      return;
    }

    let mailOptions = {
      from: 'wemoo.service@gmail.com',
      to: username, // assuming you have an email field in your user object
      subject: 'Join the chat',
      text: 'Click on the link to join the chat: http://wemoo.lol'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        return;
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
    const user = userJoin(socket.id, username, room);
  
    socket.join(user.room);
  
    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to Wemoo!"));
  
    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );
  
    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });

  });

let lastMessageTimestamps = {};


  const Filter = require('bad-words');
  const filter = new Filter();

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    // Get the current time
    const now = Date.now();
  
    // Initialize the array for this user if it doesn't exist
    if (!lastMessageTimestamps[user.id]) {
      lastMessageTimestamps[user.id] = [];
    }
  
    // Add the current timestamp to the start of the array
    lastMessageTimestamps[user.id].unshift(now);
  
    // Remove any timestamps older than 10 seconds (10000 milliseconds)
    while (lastMessageTimestamps[user.id].length > 0 && now - lastMessageTimestamps[user.id][lastMessageTimestamps[user.id].length - 1] > 10000) {
      lastMessageTimestamps[user.id].pop();
    }
  
    // If the user has sent more than 5 messages in the last 10 seconds, don't process the message
    if (lastMessageTimestamps[user.id].length > 5) {
      socket.emit("message", formatMessage(botName, "You're sending too many messages. Please wait a moment."));
      return;
    }

    // Filter out bad words
    const cleanMessage = filter.clean(msg);

    // Store message in SQLite database
    db.run(`INSERT INTO messages(user, message) VALUES(?, ?)`, [user.username, cleanMessage], function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    io.to(user.room).emit("message", formatMessage(user.username, cleanMessage));
  });


  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
