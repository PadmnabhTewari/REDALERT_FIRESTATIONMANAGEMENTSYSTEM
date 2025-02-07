import React, { useState } from 'react';
import './Vehicles.css';

function Vehicles() {
    const [search, setSearch] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [status, setStatus] = useState('Available');
    const [waterCapacity, setWaterCapacity] = useState('');
    const [vehicles, setVehicles] = useState([
        { id: 1, number: "FIRE-101", type: "Fire Truck", status: "Available", waterCapacity: "5000L" },
        { id: 2, number: "FIRE-102", type: "Water Tanker", status: "In Use", waterCapacity: "8000L" },
        { id: 3, number: "FIRE-103", type: "Rescue Van", status: "Maintenance", waterCapacity: "N/A" },
    ]);
    const [message, setMessage] = useState('');

    // Filter vehicles based on search input
    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.number.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.type.toLowerCase().includes(search.toLowerCase())
    );

    // Handle adding a new vehicle
    const handleAddVehicle = (e) => {
        e.preventDefault();
        if (vehicleNumber && vehicleType && status) {
            const newVehicle = {
                id: vehicles.length + 1,
                number: vehicleNumber,
                type: vehicleType,
                status,
                waterCapacity: waterCapacity || "N/A"
            };
            setVehicles([...vehicles, newVehicle]);
            setMessage(`🚒 Vehicle "${vehicleNumber}" added successfully!`);
            setVehicleNumber('');
            setVehicleType('');
            setStatus('Available');
            setWaterCapacity('');
        } else {
            setMessage('⚠️ Please fill in all required fields.');
        }
    };

    return (
        <div className="vehicles-container">
            <h1>Emergency Vehicles</h1>

            {message && <p className="success-message">{message}</p>}

            <input
                type="text"
                placeholder="Search by vehicle number or type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />

            <table className="vehicles-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vehicle Number</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Water Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVehicles.length > 0 ? (
                        filteredVehicles.map(vehicle => (
                            <tr key={vehicle.id}>
                                <td>{vehicle.id}</td>
                                <td>{vehicle.number}</td>
                                <td>{vehicle.type}</td>
                                <td className={`status-${vehicle.status.toLowerCase().replace(" ", "-")}`}>
                                    {vehicle.status}
                                </td>
                                <td>{vehicle.waterCapacity}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No vehicles found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="vehicles-form">
                <h2>Add New Vehicle</h2>
                <form onSubmit={handleAddVehicle}>
                    <label>Vehicle Number:</label>
                    <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required />

                    <label>Vehicle Type:</label>
                    <input type="text" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required />

                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Available">Available</option>
                        <option value="In Use">In Use</option>
                        <option value="Maintenance">Maintenance</option>
                    </select>

                    <label>Water Capacity (L):</label>
                    <input type="text" value={waterCapacity} onChange={(e) => setWaterCapacity(e.target.value)} />

                    <button type="submit">Add Vehicle</button>
                </form>
            </div>
        </div>
    );
}

export default Vehicles;
