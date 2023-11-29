import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUserLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            if (response.status === 200) {
                console.log('Login successful');
                handleLogin(); // Update isLoggedIn state in App component
                navigate('/todos'); // navigate to todos page after successful login
            } else {
                console.log('Invalid username or password');
            }
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
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
                <button type="button" onClick={handleUserLogin}>
                    Login
                </button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default Login;