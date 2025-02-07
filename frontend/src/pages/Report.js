import React, { useState } from 'react';
import './Report.css';

function Report() {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (street && city && state && pincode && description && contact) {
            setSubmitted(true);
        }
    };

    return (
        <div className="report-container">
            <h1>Report a Fire Incident</h1>

            {submitted ? (
                <p className="success-message">🔥 Fire report submitted successfully! Authorities will respond shortly.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>Street Address:</label>
                    <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required />

                    <label>City:</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />

                    <label>State:</label>
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} required />

                    <label>Pincode:</label>
                    <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} required />

                    <label>Incident Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

                    <label>Contact Number:</label>
                    <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} required />

                    <button type="submit">Submit Report</button>
                </form>
            )}
        </div>
    );
}

export default Report;
