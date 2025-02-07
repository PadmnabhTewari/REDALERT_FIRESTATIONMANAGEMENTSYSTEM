import React, { useState } from 'react';
import './Reports.css';

function Reports() {
    const [search, setSearch] = useState('');
    
    // Sample fire reports data
    const reports = [
        { id: 1, location: "Downtown", description: "Building fire", date: "2025-02-01", status: "Resolved" },
        { id: 2, location: "Main Street", description: "Vehicle fire", date: "2025-02-05", status: "Pending" },
        { id: 3, location: "West Park", description: "Forest fire", date: "2025-02-07", status: "In Progress" },
        { id: 4, location: "City Mall", description: "Electrical fire", date: "2025-02-10", status: "Resolved" },
    ];

    // Filter reports based on search input
    const filteredReports = reports.filter(report => 
        report.location.toLowerCase().includes(search.toLowerCase()) || 
        report.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="reports-container">
            <h1>Fire Incident Reports</h1>

            <input 
                type="text" 
                placeholder="Search by location or description..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />

            <table className="reports-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports.length > 0 ? (
                        filteredReports.map(report => (
                            <tr key={report.id}>
                                <td>{report.id}</td>
                                <td>{report.location}</td>
                                <td>{report.description}</td>
                                <td>{report.date}</td>
                                <td className={`status-${report.status.toLowerCase().replace(" ", "-")}`}>
                                    {report.status}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No reports found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button className="export-button">Export Reports</button>
        </div>
    );
}

export default Reports;
