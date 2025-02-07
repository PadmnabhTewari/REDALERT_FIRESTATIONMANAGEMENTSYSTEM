import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import Vehicles from './pages/Vehicles';
import Staff from './pages/Staff';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import './App.css';

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/report">Report Fire</Link></li>
                    <li><Link to="/vehicles">Vehicles</Link></li>
                    <li><Link to="/staff">Staff</Link></li>
                    <li><Link to="/reports">Reports</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/report" element={<Report />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Router>
    );
}

export default App;
