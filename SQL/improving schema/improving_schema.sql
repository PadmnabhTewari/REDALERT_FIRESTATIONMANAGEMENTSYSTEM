-- FireStation Table (With Status and Location)
CREATE TABLE FireStation (
  Station_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Location VARCHAR(255) NOT NULL UNIQUE, -- ✅ Directly stored here
  Contact_Number VARCHAR(20) NOT NULL UNIQUE,
  Total_Staff INT DEFAULT 0 CHECK (Total_Staff >= 0),
  Total_Vehicles INT DEFAULT 0 CHECK (Total_Vehicles >= 0),
  Status ENUM('Active', 'Inactive') DEFAULT 'Active'
);

CREATE TABLE VehicleModel (
  Model_ID INT AUTO_INCREMENT PRIMARY KEY,
  Type ENUM('Fire Truck', 'Ambulance', 'Rescue Van', 'Water Tanker') NOT NULL,
  Fuel_Capacity INT CHECK (Fuel_Capacity >= 0),
  Water_Capacity INT CHECK (Water_Capacity >= 0) DEFAULT NULL  
);

CREATE TABLE Vehicle (
  Vehicle_ID INT AUTO_INCREMENT PRIMARY KEY,
  Model_ID INT NOT NULL,
  Status ENUM('Available', 'In Use', 'Under Maintenance') NOT NULL,
  Last_Maintenance_Date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (Model_ID) REFERENCES VehicleModel(Model_ID) ON DELETE CASCADE
);
-- FireStationVehicle Table (New: Many-to-Many relationship between FireStations and Vehicles)
CREATE TABLE FireStationVehicle (
  Station_ID INT,
  Vehicle_ID INT,
  PRIMARY KEY (Station_ID, Vehicle_ID),
  FOREIGN KEY (Station_ID) REFERENCES FireStation(Station_ID) ON DELETE CASCADE,
  FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID) ON DELETE CASCADE
);

-- Staff Table (ON DELETE CASCADE instead of SET NULL)
CREATE TABLE Staff (
  Staff_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Designation VARCHAR(255) NOT NULL,
  Contact VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Station_ID INT,
  FOREIGN KEY (Station_ID) REFERENCES FireStation(Station_ID) ON DELETE CASCADE
);

-- StaffShift Table (New: Tracks shift assignments dynamically)
CREATE TABLE StaffShift (
  Shift_ID INT AUTO_INCREMENT PRIMARY KEY, -- ✅ Unique shift entry
  Staff_ID INT,
  Shift ENUM('Morning', 'Evening', 'Night') NOT NULL,
  Shift_Date DATE NOT NULL, -- ✅ Track the date of the shift
  FOREIGN KEY (Staff_ID) REFERENCES Staff(Staff_ID) ON DELETE CASCADE,
  UNIQUE (Staff_ID, Shift, Shift_Date) -- ✅ Prevent duplicate shifts
);

-- Supplier Table (Without Item_Provided, Normalized)
CREATE TABLE Supplier (
  Supplier_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Contact VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Address VARCHAR(255) NOT NULL
);

-- SupplierItems Table (New: Normalized Supplier-Item Relationship)
CREATE TABLE SupplierItems (
  Supplier_ID INT,
  Item_Name VARCHAR(255) NOT NULL,
  PRIMARY KEY (Supplier_ID, Item_Name),
  FOREIGN KEY (Supplier_ID) REFERENCES Supplier(Supplier_ID) ON DELETE CASCADE
);

-- Inventory Table (Same as before)
CREATE TABLE Inventory (
  Inventory_ID INT AUTO_INCREMENT PRIMARY KEY,
  Item_Name VARCHAR(255) NOT NULL,
  Quantity INT NOT NULL,
  Station_ID INT,
  Supplier_ID INT,
  Last_Updated DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (Station_ID) REFERENCES FireStation(Station_ID),
  FOREIGN KEY (Supplier_ID) REFERENCES Supplier(Supplier_ID)
);

-- EquipmentUsage Table (Same as before)
CREATE TABLE EquipmentUsage (
  Usage_ID INT AUTO_INCREMENT PRIMARY KEY,
  Inventory_ID INT,
  Used_Quantity INT NOT NULL,
  Date_Used DATETIME DEFAULT CURRENT_TIMESTAMP,
  Purpose VARCHAR(255) NOT NULL,
  Staff_ID INT,
  FOREIGN KEY (Inventory_ID) REFERENCES Inventory(Inventory_ID),
  FOREIGN KEY (Staff_ID) REFERENCES Staff(Staff_ID)
);

-- User Table (Same as before)
CREATE TABLE User (
  User_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Username VARCHAR(255) UNIQUE NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Contact VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Address VARCHAR(255) NOT NULL
);

-- Admin Table (Same as before)
CREATE TABLE Admin (
  Admin_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Username VARCHAR(255) UNIQUE NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Contact VARCHAR(255) NOT NULL,
  Role VARCHAR(255) NOT NULL
);

-- Report Table (Updated: Removed Assigned_Vehicle and Assigned_Staff)
CREATE TABLE Report (
  Report_ID INT AUTO_INCREMENT PRIMARY KEY,
  Street_Address VARCHAR(255) NOT NULL,
  City VARCHAR(255) NOT NULL,
  State VARCHAR(255) NOT NULL,
  Pincode VARCHAR(255) NOT NULL,
  Description TEXT NOT NULL,
  Report_Date_Time DATETIME DEFAULT CURRENT_TIMESTAMP,
  Severity_Level VARCHAR(255) NOT NULL,
  User_ID INT,
  Action_Taken TEXT,
  Action_Date_Time DATETIME,
  Admin_ID INT,
  FOREIGN KEY (User_ID) REFERENCES User(User_ID),
  FOREIGN KEY (Admin_ID) REFERENCES Admin(Admin_ID)
);

-- ReportVehicle Table (New: Many-to-Many relationship between Reports and Vehicles)
CREATE TABLE ReportVehicle (
  Report_ID INT,
  Vehicle_ID INT,
  PRIMARY KEY (Report_ID, Vehicle_ID),
  FOREIGN KEY (Report_ID) REFERENCES Report(Report_ID) ON DELETE CASCADE,
  FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID) ON DELETE CASCADE
);

-- ReportStaff Table (New: Many-to-Many relationship between Reports and Staff)
CREATE TABLE ReportStaff (
  Report_ID INT,
  Staff_ID INT,
  PRIMARY KEY (Report_ID, Staff_ID),
  FOREIGN KEY (Report_ID) REFERENCES Report(Report_ID) ON DELETE CASCADE,
  FOREIGN KEY (Staff_ID) REFERENCES Staff(Staff_ID) ON DELETE CASCADE
);

-- Maintenance Table (Same as before)
CREATE TABLE Maintenance (
  Maintenance_ID INT AUTO_INCREMENT PRIMARY KEY,
  Vehicle_ID INT,
  Maintenance_Type VARCHAR(255) NOT NULL,
  Date_Performed DATETIME DEFAULT CURRENT_TIMESTAMP,
  Cost DECIMAL(10, 2) NOT NULL,
  Performed_By VARCHAR(255) NOT NULL,
  FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID)
);

-- FuelLog Table (Same as before)
CREATE TABLE FuelLog (
  Fuel_ID INT AUTO_INCREMENT PRIMARY KEY,
  Vehicle_ID INT,
  Date DATETIME DEFAULT CURRENT_TIMESTAMP,
  Fuel_Amount DECIMAL(10, 2) NOT NULL,
  Cost DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID)
);

-- Triggers to update Total_Staff and Total_Vehicles dynamically
DELIMITER //

CREATE TRIGGER after_staff_insert
AFTER INSERT ON Staff
FOR EACH ROW
BEGIN
  UPDATE FireStation
  SET Total_Staff = (SELECT COUNT(*) FROM Staff WHERE Station_ID = NEW.Station_ID)
  WHERE Station_ID = NEW.Station_ID;
END//

CREATE TRIGGER after_vehicle_insert
AFTER INSERT ON FireStationVehicle
FOR EACH ROW
BEGIN
  UPDATE FireStation
  SET Total_Vehicles = (SELECT COUNT(*) FROM FireStationVehicle WHERE Station_ID = NEW.Station_ID)
  WHERE Station_ID = NEW.Station_ID;
END//

CREATE TRIGGER after_staff_delete
AFTER DELETE ON Staff
FOR EACH ROW
BEGIN
  UPDATE FireStation
  SET Total_Staff = (SELECT COUNT(*) FROM Staff WHERE Station_ID = OLD.Station_ID)
  WHERE Station_ID = OLD.Station_ID;
END//

CREATE TRIGGER after_vehicle_delete
AFTER DELETE ON FireStationVehicle
FOR EACH ROW
BEGIN
  UPDATE FireStation
  SET Total_Vehicles = (SELECT COUNT(*) FROM FireStationVehicle WHERE Station_ID = OLD.Station_ID)
  WHERE Station_ID = OLD.Station_ID;
END//

DELIMITER ;