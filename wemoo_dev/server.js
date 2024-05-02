const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
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

  // Create table for users
  db.run('CREATE TABLE IF NOT EXISTS users(uuid text, email text)', (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

//Mini game team variables ---------------------------------------------------------------------------------

const SCORE_MAX = 50
let counterValue = Math.round(SCORE_MAX/2); // Initial counter value

const teams = {
  BLUE : 0,
  RED : 1
}

let bluePlayers = 0; //
let redPlayers = 0;


function determineTeam(){
  if(redPlayers < bluePlayers){
    return teams.RED; 
  }
  else {
    return teams.BLUE
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function logTeamCount(team){
  if(team == teams.BLUE){
    console.log("Blue team count:",bluePlayers);
  }
  else{
    console.log("Red team count: ",redPlayers);
  }
}
//--------------------------------------------------------------------------------------------------------------

//Add email for new index.html
app.post('/sendmail', (req, res) => {
  let uniqueId = uuidv4();
  let uniqueUrl = `http://wemoo.lol/chat/${uniqueId}`;

  let mailOptions = {
    from: 'wemoo.service@gmail.com',
    to: req.body.email,
    subject: 'Join the chat',
    text: `Click on the link to join the chat: ${uniqueUrl}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log('Email sent: ' + info.response);

      // Insert the UUID and email into the database
      db.run(`INSERT INTO users(uuid, email) VALUES(?, ?)`, [uniqueId, req.body.email], function(err) {
        if (err) {
          return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });

      res.send('Email sent: ' + info.response);
    }
  });
});

//Add emailer 
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wemoo.service@gmail.com',
    pass: 'qwca yphp nyst rprx' // Use the generated application-specific password here
  }
});

app.get('/chat/:uuid', (req, res) => {
  // Extract the uuid from the URL
  const uuid = req.params.uuid;

  // Serve the chat.html file
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});


// Add max user limit
// Maximum number of users in a room
const MAX_USERS_PER_ROOM = 100;

// Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({uuid, room }) => {
    console.log(`User ${uuid} connected to room ${room}`)

    const roomUsers = getRoomUsers(room);
  
    // Add max user limit
    // Check if room has reached its capacity
    if (roomUsers.length >= MAX_USERS_PER_ROOM) {
      socket.emit("message", formatMessage(botName, "Sorry, this room is full. Please try another one."));
      return;
    }


    let email;
    db.get(`SELECT email FROM users WHERE uuid = ?`, [uuid], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      if (!row) {
        console.error(`No user found with uuid: ${uuid}`);
        return;
      }
      email = row.email;
      console.log(`Email found: ${email}`);

      // Rest of your code...
      const user = userJoin(socket.id, email, room);
      socket.join(user.room);
      console.log("Users in room: ", getRoomUsers(user.room));
      // ...
    
  
    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to Wemoo!"));

    //MINI GAME STUFF ----------------------------------------------------------------------------------------------------

    //Determine user team for minigame

  
    //socket.emit("test");

    user.team = determineTeam();

    if (user.team == teams.BLUE) {
      socket.emit("message", formatMessage(botName, "You've joined 🔵Blue Team🔵"));
      bluePlayers++;

      logTeamCount(teams.BLUE);

    }
    else if(user.team == teams.RED){
      socket.emit("message", formatMessage(botName, "You've joined 🔴Red Team🔴"));
      redPlayers++;

      logTeamCount(teams.RED);
    }
  
    //Update client with correct team player counts:
    socket.emit("teamcount", {
      red: redPlayers,
      blue: bluePlayers,  
    })

    //Update everyone else with the correct team player counts:
    socket.broadcast
    .to(user.room)
    .emit( 
      "teamcount", {
      red: redPlayers,
      blue: bluePlayers,
    });

    socket.emit("updateCounter",counterValue,SCORE_MAX); //update users counter val

    //---------------------------------------------------------------------------------------------------------------------
      
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
    console.log(`User ${uuid} connected to room ${room} sucess`)

  });

  });
  
let lastMessageTimestamps = {};


  const Filter = require('bad-words');
  const filter = new Filter();

  //MINI GAME TEST CODE ------------------------------------------------------------------------------

  socket.on('testreturn', ()=> {
    //console.log("testreturn received from client");
  });

  socket.on('teamtestreturn', ()=> {
    //console.log("TEAM testreturn received from client");
  });
  
  socket.on('buttonClick', () => {

    const user = getCurrentUser(socket.id);

    if(user.team == teams.BLUE){
      counterValue ++;
      console.log("Blue Player plus, counter val: ", counterValue);
    }
    else if (user.team == teams.RED){
      counterValue --;
      console.log("Red Player minus, counter val: ", counterValue);
    }

    counterValue = clamp(counterValue,0,SCORE_MAX); //Clamp the score between vals
    //console.log(counterValue);

    io.to(user.room).emit("updateCounter",counterValue,SCORE_MAX);
  })

  //--------------------------------------------------------------------------------------------------------
  
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
      //MINI GAME CODE -----------------------------------------------------------------------

      if(user.team == teams.BLUE){
        bluePlayers--; 

        console.log("BLUE PLAYER DISCONNECT")
        logTeamCount(teams.BLUE);
      }
      else if(user.team == teams.RED){

        redPlayers--;

        console.log("RED PLAYER DISCONNECT")
        logTeamCount(teams.RED);
      }

      socket.broadcast
      .to(user.room)
      .emit(
        "teamcount", {
        red: redPlayers,
        blue: bluePlayers,
      });
      //--------------------------------------------------------------------------------------
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
