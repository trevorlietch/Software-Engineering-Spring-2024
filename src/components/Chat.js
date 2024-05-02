// Chat.js
import React from 'react';

function Chat() {
  return (
    <div>
      <div className="chat-history">
        {/* Display chat history */}
      </div>
      <input type="text" placeholder="Type a message..." />
      <button>Send</button>
    </div>
  );
}

export default Chat;