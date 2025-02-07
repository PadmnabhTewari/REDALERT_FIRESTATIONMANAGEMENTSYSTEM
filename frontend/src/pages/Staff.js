import React, { useState } from 'react';
import './Staff.css';

function Staff() {
    const [search, setSearch] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [contact, setContact] = useState('');
    const [staffList, setStaffList] = useState([
        { id: 1, name: "John Doe", role: "Chief Fire Officer", contact: "9876543210" },
        { id: 2, name: "Jane Smith", role: "Firefighter", contact: "8765432109" },
        { id: 3, name: "Mike Johnson", role: "Paramedic", contact: "7654321098" },
    ]);
    const [message, setMessage] = useState('');

    // Filter staff based on search input
    const filteredStaff = staffList.filter(staff =>
        staff.name.toLowerCase().includes(search.toLowerCase()) ||
        staff.role.toLowerCase().includes(search.toLowerCase())
    );

    // Handle adding a new staff member
    const handleAddStaff = (e) => {
        e.preventDefault();
        if (name && role && contact) {
            const newStaff = {
                id: staffList.length + 1,
                name,
                role,
                contact
            };
            setStaffList([...staffList, newStaff]);
            setMessage(`👨‍🚒 Staff member "${name}" added successfully!`);
            setName('');
            setRole('');
            setContact('');
        } else {
            setMessage('⚠️ Please fill in all fields.');
        }
    };

    return (
        <div className="staff-container">
            <h1>Fire Station Staff</h1>

            {message && <p className="success-message">{message}</p>}

            <input
                type="text"
                placeholder="Search by name or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />

            <table className="staff-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStaff.length > 0 ? (
                        filteredStaff.map(staff => (
                            <tr key={staff.id}>
                                <td>{staff.id}</td>
                                <td>{staff.name}</td>
                                <td>{staff.role}</td>
                                <td>{staff.contact}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No staff found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="staff-form">
                <h2>Add New Staff Member</h2>
                <form onSubmit={handleAddStaff}>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                    <label>Role:</label>
                    <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />

                    <label>Contact Number:</label>
                    <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />

                    <button type="submit">Add Staff</button>
                </form>
            </div>
        </div>
    );
}

export default Staff;
