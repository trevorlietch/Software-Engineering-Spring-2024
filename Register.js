import React, { useState } from 'react';

function Register({ onSuccess }) { // Receive onSuccess as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic here
    console.log('Registered with:', email, password);
    // Call onSuccess function passed from the parent component
    onSuccess();
  };

  return (
    <div>
      <h2>Register</h2> {/* Header for the registration form */}
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
