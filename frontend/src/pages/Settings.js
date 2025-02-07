import React, { useState } from 'react';
import './Settings.css';

function Settings() {
    // State variables for managing settings
    const [stationName, setStationName] = useState('');
    const [stationContact, setStationContact] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [designation, setDesignation] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = (e, type) => {
        e.preventDefault();
        if (type === "station" && stationName && stationContact) {
            setMessage(`🚒 Fire station "${stationName}" added successfully!`);
            setStationName('');
            setStationContact('');
        } else if (type === "vehicle" && vehicleType) {
            setMessage(`🚗 Vehicle type "${vehicleType}" added successfully!`);
            setVehicleType('');
        } else if (type === "designation" && designation) {
            setMessage(`👨‍🚒 Designation "${designation}" added successfully!`);
            setDesignation('');
        } else {
            setMessage('⚠️ Please fill in all fields.');
        }
    };

    return (
        <div className="settings-container">
            <h1>Settings</h1>

            {message && <p className="success-message">{message}</p>}

            <div className="settings-section">
                <h2>Add New Fire Station</h2>
                <form onSubmit={(e) => handleSubmit(e, "station")}>
                    <label>Station Name:</label>
                    <input type="text" value={stationName} onChange={(e) => setStationName(e.target.value)} required />

                    <label>Station Contact:</label>
                    <input type="text" value={stationContact} onChange={(e) => setStationContact(e.target.value)} required />

                    <button type="submit">Add Station</button>
                </form>
            </div>

            <div className="settings-section">
                <h2>Add Vehicle Type</h2>
                <form onSubmit={(e) => handleSubmit(e, "vehicle")}>
                    <label>Vehicle Type:</label>
                    <input type="text" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required />
                    <button type="submit">Add Vehicle Type</button>
                </form>
            </div>

            <div className="settings-section">
                <h2>Add Staff Designation</h2>
                <form onSubmit={(e) => handleSubmit(e, "designation")}>
                    <label>Designation:</label>
                    <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} required />
                    <button type="submit">Add Designation</button>
                </form>
            </div>
        </div>
    );
}

export default Settings;
