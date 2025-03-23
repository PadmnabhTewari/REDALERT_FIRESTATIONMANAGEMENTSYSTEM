const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fireStationRoutes = require("./routes/fireStationRoutes");
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const staffRoutes = require("./routes/staffRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes"); // ✅ Add this
const supplierRoutes = require('./routes/supplierRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');





dotenv.config();
const app = express();

app.use(cors({ origin: "*" })); 
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/fire-stations", fireStationRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/inventory', inventoryRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
