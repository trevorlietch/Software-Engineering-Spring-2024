const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//MINI GAME FUNCTION HERE -----------------------------------------------------------------------

let spaceBarPressed = false

function normalize(val, max, min) { 
  if(max - min === 0) return 0; // or 0, it's up to you
  return (val - min) / (max - min); 
}

//------------------------------------------------------------------------------------------
// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// const socket = io();

// // // Extract the uuid from the URL path
// // const uuid = window.location.pathname.split('/')[2];

// // // Use the uuid to join the chat room
// // socket.emit('joinRoom', {username: uuid, room: 'Gallogly Hall' });
const socket = io();

// Get UUID from URL
const uuid = window.location.pathname.split('/').pop();

// Emit 'joinRoom' event with UUID and room
socket.emit('joinRoom', { uuid: uuid, room: 'Gallogly Hall' });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});

//MINI GAME STUFF ---------------------------------------------------------

socket.on("test", () => {
  socket.emit('testreturn')
})

socket.on('updateCounter', (counterValue,max) => {
  // Update the counter value on the client side

  //document.getElementById('counter-value').innerText = counterValue;
  barText = document.getElementById('bar-text')

  if (counterValue < (max*0.2)){
    barText.innerText = "RED TEAM IS WINNING!!!"
    barText.style.color = "red";
  } 
  else if (counterValue > (max - max*0.2)){
    barText.innerText = "BLUE TEAM IS WINNING!!!"
    barText.style.color = "blue";
  }
  else {
    barText.innerText = "";
  }

  val = normalize(counterValue,max,0)

  // Set the width of the team bars
  document.getElementById('blue-team-bar').style.width = (val*100) + '%'
  document.getElementById('red-team-bar').style.width = (100 - val*100) + '%'
});

socket.on("teamcount", ({red,blue}) => {
  socket.emit('teamtestreturn')
  document.getElementById('blue-team-count').innerText = blue;
  document.getElementById('red-team-count').innerText = red;
})

/*
document.getElementById('increment-btn').addEventListener('click', () => {
  socket.emit('buttonClick');
});*/

document.addEventListener('keydown', (event) => {
  // Check if the pressed key is the space bar and it's not already pressed
  if (event.key === ' ' && !spaceBarPressed) {
    spaceBarPressed = true; // Set the flag to true
    // Emit a custom event to the server to indicate that the space bar was pressed
    socket.emit('buttonClick');
  }
});

// Add event listener for keyup event on the document
document.addEventListener('keyup', (event) => {
  // Check if the released key is the space bar
  if (event.key === ' ') {
    spaceBarPressed = false; // Set the flag to false when space bar is released
  }
});

//---------------------------------------------------------

//Add user count for room
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
  document.getElementById('user-count').innerText = users.length;
});


// // Send users and room info
// io.to(user.room).emit("roomUsers", {
//   room: user.room,
//   users: getRoomUsers(user.room),
// });
