import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>RedAlert Dashboard</h1>
                <p>Welcome, Admin! Manage fire stations, reports, and resources efficiently.</p>
            </header>

            <section className="dashboard-grid">
                <Link to="/report" className="dashboard-card">
                    <h2>Fire Reports</h2>
                    <p>View and manage reported fire incidents.</p>
                </Link>
                <Link to="/vehicles" className="dashboard-card">
                    <h2>Vehicles</h2>
                    <p>Track fire trucks and emergency vehicles.</p>
                </Link>
                <Link to="/staff" className="dashboard-card">
                    <h2>Staff</h2>
                    <p>Manage firefighter personnel details.</p>
                </Link>
                <Link to="/reports" className="dashboard-card">
                    <h2>Incident Reports</h2>
                    <p>View analytics and reports on fire incidents.</p>
                </Link>
                <Link to="/settings" className="dashboard-card">
                    <h2>Settings</h2>
                    <p>Configure fire stations and user permissions.</p>
                </Link>
            </section>

            <section className="recent-activity">
                <h2>Recent Activity</h2>
                <ul>
                    <li>🔥 New fire incident reported in Downtown - <span>5 mins ago</span></li>
                    <li>🚒 Vehicle #102 dispatched to Main Street - <span>10 mins ago</span></li>
                    <li>👨‍🚒 New firefighter added to Station #3 - <span>1 hour ago</span></li>
                    <li>📊 Monthly report generated - <span>Yesterday</span></li>
                </ul>
            </section>

            <footer>
                <p>&copy; 2025 Fire Station Management System</p>
            </footer>
        </div>
    );
}

export default Dashboard;
