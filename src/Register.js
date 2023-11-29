import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
      });
      console.log(response.data.message);
      if (response.data.message === 'User created') { // Adjust this condition based on your server response
        alert('You are registered!');
      }
    } catch (error) {
      console.error('Error registering', error);
    }
  };

  return (
    <div className="register-form">
        <h2>Register</h2>
        <form>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="button" onClick={handleRegister}>
                Register
            </button>
        </form>
    </div>
  );
};

export default Register;