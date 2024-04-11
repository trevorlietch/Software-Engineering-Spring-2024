// Author: Jaiden
// Task #9

// Login.js
import React, { useState } from 'react';

function Login({ onSuccess }) { // Receive onSuccess as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Logged in with:', email, password);
    // Call onSuccess function passed from the parent component
    onSuccess();
  };

  return (
    <div>
      <h2>Login</h2> {/* Header for the login form */}
      <form onSubmit={handleSubmit}>
        {/* Input field for email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Input field for password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Submit button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
