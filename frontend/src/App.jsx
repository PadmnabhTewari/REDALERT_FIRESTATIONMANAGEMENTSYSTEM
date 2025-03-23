import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import FireStations from './pages/FireStations';
import Vehicles from './pages/Vehicles';
import Staff from './pages/Staff';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Inventory from './pages/Inventory';
import Maintenance from './pages/Maintenance';
import Supplier from './pages/Suppliers';


const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/fire-stations" element={<FireStations />}/>
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/reports" element={<Reports />} /> 
              <Route path="/login" element={<Login />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/suppliers" element={<Supplier />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;