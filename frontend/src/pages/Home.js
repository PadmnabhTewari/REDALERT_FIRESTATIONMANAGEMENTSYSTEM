import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="hero">
                <h1>Welcome to <span className='RedAlert'>RedAlert</span></h1>
                <p>Efficiently manage fire stations, report incidents, and track resources in real time.</p>
                <Link to="/login" className="cta-button">Get Started</Link>
            </div>

            <section className="features">
                <div className="feature-card">
                    <h2>Real-Time Incident Reporting</h2>
                    <p>Report fire incidents instantly and alert the nearest fire station.</p>
                </div>
                <div className="feature-card">
                    <h2>Vehicle & Staff Management</h2>
                    <p>Track fire trucks and personnel to optimize emergency response.</p>
                </div>
                <div className="feature-card">
                    <h2>Data Analytics & Reports</h2>
                    <p>View detailed reports on incidents and response times.</p>
                </div>
            </section>

            <footer>
                <p>&copy; 2025 Fire Station Management System</p>
            </footer>
        </div>
    );
}

export default Home;
