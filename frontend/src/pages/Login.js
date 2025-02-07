import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin123' && role === 'admin') {
            navigate('/dashboard');
        } else if (username === 'user' && password === 'user123' && role === 'user') {
            navigate('/dashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />

                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                <label>Login as:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                {error && <p className="error">{error}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
