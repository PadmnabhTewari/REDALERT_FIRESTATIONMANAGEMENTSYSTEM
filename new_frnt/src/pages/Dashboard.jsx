import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Total Fire Stations</h2>
          <p className="text-3xl">10</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Total Vehicles</h2>
          <p className="text-3xl">25</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Total Staff</h2>
          <p className="text-3xl">50</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;