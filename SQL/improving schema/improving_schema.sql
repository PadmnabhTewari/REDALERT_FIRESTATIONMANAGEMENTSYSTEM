-- PincodeMapping Table (must come first as it's referenced by StationLocation)
CREATE TABLE PincodeMapping (
  Pincode INT PRIMARY KEY,
  City VARCHAR(255) NOT NULL,
  State VARCHAR(255) NOT NULL
);

-- StationLocation Table (depends on PincodeMapping)
CREATE TABLE StationLocation (
  Location_ID INT AUTO_INCREMENT PRIMARY KEY,
  Pincode INT NOT NULL,
  Street_Address VARCHAR(255) NOT NULL,
  Landmark VARCHAR(255),
  Latitude DECIMAL(10, 8),
  Longitude DECIMAL(11, 8),
  UNIQUE (Pincode, Street_Address),
  FOREIGN KEY (Pincode) REFERENCES PincodeMapping(Pincode)
);

-- FireStation Table (depends on StationLocation)
CREATE TABLE FireStation (
  Station_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Location_ID INT NOT NULL,
  Contact_Number VARCHAR(20) NOT NULL UNIQUE,
  Status ENUM('Active', 'Inactive', 'Under Renovation') DEFAULT 'Active',
  Establishment_Date DATE,
  Capacity INT,
  Total_Vehicles INT DEFAULT 0,
  Total_Staff INT DEFAULT 0,
  FOREIGN KEY (Location_ID) REFERENCES StationLocation(Location_ID)
);

-- FireStationContact Table (depends on FireStation)
CREATE TABLE FireStationContact (
  Contact_ID INT AUTO_INCREMENT PRIMARY KEY,
  Station_ID INT NOT NULL,
  Contact_Type ENUM('Primary', 'Secondary', 'Emergency', 'Administrative') NOT NULL,
  Contact_Value VARCHAR(50) NOT NULL,
  FOREIGN KEY (Station_ID) REFERENCES FireStation(Station_ID) ON DELETE CASCADE
);

-- VehicleModel Table (independent, comes before Vehicle)
CREATE TABLE VehicleModel (
  Model_ID INT AUTO_INCREMENT PRIMARY KEY,
  Type ENUM('Fire Truck', 'Ambulance', 'Rescue Van', 'Water Tanker') NOT NULL,
  Fuel_Capacity INT CHECK (Fuel_Capacity >= 0),
  Water_Capacity INT CHECK (Water_Capacity >= 0) DEFAULT NULL  
);

-- Vehicle Table (depends on VehicleModel)
CREATE TABLE Vehicle (
  Vehicle_ID INT AUTO_INCREMENT PRIMARY KEY,
  Model_ID INT NOT NULL,
  Status ENUM('Available', 'In Use', 'Under Maintenance') NOT NULL,
  Last_Maintenance_Date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (Model_ID) REFERENCES VehicleModel(Model_ID) ON DELETE CASCADE
);

-- FireStationVehicle Table (depends on both FireStation and Vehicle)
CREATE TABLE FireStationVehicle (
  Station_ID INT,
  Vehicle_ID INT,
  PRIMARY KEY (Station_ID, Vehicle_ID),
  FOREIGN KEY (Station_ID) REFERENCES FireStation(Station_ID) ON DELETE CASCADE,
  FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID) ON DELETE CASCADE
);

-- Staff Table (depends on FireStation)
CREATE TABLE Staff (
  Staff_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Designation VARCHAR(255) NOT NULL,
  Contact VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Station_ID INT,
  FOREIGN KEY (Station_ID) REFERENCES FireStation(Station_ID) ON DELETE CASCADE
);

-- StaffShift Table (depends on Staff)
CREATE TABLE StaffShift (
  Shift_ID INT AUTO_INCREMENT PRIMARY KEY,
  Staff_ID INT,
  Shift ENUM('Morning', 'Evening', 'Night') NOT NULL,
  Shift_Date DATE NOT NULL,
  FOREIGN KEY (Staff_ID) REFERENCES Staff(Staff_ID) ON DELETE CASCADE,
  UNIQUE (Staff_ID, Shift, Shift_Date)
);

-- Supplier Table (independent)
CREATE TABLE Supplier (
  Supplier_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Contact_Phone VARCHAR(20) NOT NULL,
  Email VARCHAR(255),
  Address VARCHAR(255)
);

-- Item Table (independent)
CREATE TABLE Item (
  Item_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Category VARCHAR(100)
);

-- SupplierItem Table (depends on both Supplier and Item)
CREATE TABLE SupplierItem (
  Supplier_ID INT,
  Item_ID INT,
  Price DECIMAL(10,2),
  PRIMARY KEY (Supplier_ID, Item_ID),
  FOREIGN KEY (Supplier_ID) REFERENCES Supplier(Supplier_ID) ON DELETE CASCADE,
  FOREIGN KEY (Item_ID) REFERENCES Item(Item_ID) ON DELETE CASCADE
);

-- Inventory Table (depends on FireStation and Supplier)
-- CREATE TABLE Inventory (
--   Inventory_ID INT AUTO_INCREMENT PRIMARY KEY,
--   Item_Name VARCHAR(255) NOT NULL,
--   Quantity INT NOT NULL,
--   Station_ID INT,
--   Supplier_ID INT,
--   Last_Updated DATETIME DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (Station_ID) REFERENCES FireStation(Station_ID),
--   FOREIGN KEY (Supplier_ID) REFERENCES Supplier(Supplier_ID)
-- );

-- EquipmentUsage Table (depends on Inventory and Staff)
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

-- User Table (independent)
CREATE TABLE User (
  User_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Username VARCHAR(255) UNIQUE NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Contact VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Address VARCHAR(255) NOT NULL
);

-- Admin Table (independent)
CREATE TABLE Admin (
  Admin_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Username VARCHAR(255) UNIQUE NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Contact VARCHAR(255) NOT NULL,
  Role VARCHAR(255) NOT NULL
);

-- ReportLocation Table (independent)
CREATE TABLE ReportLocation (
  Pincode INT PRIMARY KEY,
  City VARCHAR(255),
  State VARCHAR(255)
);

-- Report Table (depends on User and Admin)
CREATE TABLE Report (
  Report_ID INT AUTO_INCREMENT PRIMARY KEY,
  Street_Address VARCHAR(255) NOT NULL,
  Pincode INT NOT NULL,
  Description TEXT NOT NULL,
  Report_Date_Time DATETIME DEFAULT CURRENT_TIMESTAMP,
  Severity_Level ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL,
  User_ID INT,
  Action_Taken TEXT,
  Action_Date_Time DATETIME,
  Admin_ID INT,
  Status ENUM('Pending', 'In Progress', 'Resolved') DEFAULT 'Pending',
  FOREIGN KEY (User_ID) REFERENCES User(User_ID),
  FOREIGN KEY (Admin_ID) REFERENCES Admin(Admin_ID)
);

-- ReportVehicle Table (depends on Report and Vehicle)
CREATE TABLE ReportVehicle (
  Report_ID INT,
  Vehicle_ID INT,
  PRIMARY KEY (Report_ID, Vehicle_ID),
  FOREIGN KEY (Report_ID) REFERENCES Report(Report_ID) ON DELETE CASCADE,
  FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID) ON DELETE CASCADE
);

-- ReportStaff Table (depends on Report and Staff)
CREATE TABLE ReportStaff (
  Report_ID INT,
  Staff_ID INT,
  PRIMARY KEY (Report_ID, Staff_ID),
  FOREIGN KEY (Report_ID) REFERENCES Report(Report_ID) ON DELETE CASCADE,
  FOREIGN KEY (Staff_ID) REFERENCES Staff(Staff_ID) ON DELETE CASCADE
);

-- Maintenance Table (depends on Vehicle)
CREATE TABLE Maintenance (
  Maintenance_ID INT AUTO_INCREMENT PRIMARY KEY,
  Vehicle_ID INT,
  Maintenance_Type VARCHAR(255) NOT NULL,
  Date_Performed DATETIME DEFAULT CURRENT_TIMESTAMP,
  Cost DECIMAL(10, 2) NOT NULL,
  Performed_By VARCHAR(255) NOT NULL,
  FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID)
);

-- FuelLog Table (depends on Vehicle)
CREATE TABLE FuelLog (
  Fuel_ID INT AUTO_INCREMENT PRIMARY KEY,
  Vehicle_ID INT,
  Date DATETIME DEFAULT CURRENT_TIMESTAMP,
  Fuel_Amount DECIMAL(10, 2) NOT NULL,
  Cost DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID)
);

DELIMITER //

-- Create new trigger for staff insert
CREATE TRIGGER after_staff_insert
AFTER INSERT ON Staff
FOR EACH ROW
BEGIN
  UPDATE FireStation
  SET Total_Staff = (SELECT COUNT(*) FROM Staff WHERE Station_ID = NEW.Station_ID)
  WHERE Station_ID = NEW.Station_ID;
END//

-- Create new trigger for staff delete
CREATE TRIGGER after_staff_delete
AFTER DELETE ON Staff
FOR EACH ROW
BEGIN
  UPDATE FireStation
  SET Total_Staff = (SELECT COUNT(*) FROM Staff WHERE Station_ID = OLD.Station_ID)
  WHERE Station_ID = OLD.Station_ID;
END//

-- Create new trigger for staff update
CREATE TRIGGER after_staff_update
AFTER UPDATE ON Staff
FOR EACH ROW
BEGIN
  -- Update old station counts
  UPDATE FireStation
  SET Total_Staff = (SELECT COUNT(*) FROM Staff WHERE Station_ID = OLD.Station_ID)
  WHERE Station_ID = OLD.Station_ID;

  -- Update new station counts
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


CREATE TRIGGER after_vehicle_delete
AFTER DELETE ON FireStationVehicle
FOR EACH ROW
BEGIN
  UPDATE FireStation
  SET Total_Vehicles = (SELECT COUNT(*) FROM FireStationVehicle WHERE Station_ID = OLD.Station_ID)
  WHERE Station_ID = OLD.Station_ID;
END//

CREATE TRIGGER after_maintenance_insert
AFTER INSERT ON Maintenance
FOR EACH ROW
BEGIN
  UPDATE Vehicle
  SET Last_Maintenance_Date = NEW.Date_Performed
  WHERE Vehicle_ID = NEW.Vehicle_ID;
END//

CREATE TRIGGER prevent_duplicate_shift
BEFORE INSERT ON StaffShift
FOR EACH ROW
BEGIN
  IF EXISTS (
    SELECT 1 FROM StaffShift 
    WHERE Staff_ID = NEW.Staff_ID AND Shift_Date = NEW.Shift_Date
  ) THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Staff member is already assigned to a shift on this date';
  END IF;
END//

DELIMITER ;

DELIMITER //

CREATE TRIGGER insert_report_location
BEFORE INSERT ON Report
FOR EACH ROW
BEGIN
  -- Declare variables at the beginning of the block
  DECLARE v_city VARCHAR(255);
  DECLARE v_state VARCHAR(255);
  
  -- Check if Pincode exists in ReportLocation
  IF NOT EXISTS (SELECT 1 FROM ReportLocation WHERE Pincode = NEW.Pincode) THEN
    -- Try to get city/state from PincodeMapping
    SELECT City, State INTO v_city, v_state 
    FROM PincodeMapping 
    WHERE Pincode = NEW.Pincode
    LIMIT 1;
    
    -- If found in PincodeMapping, use those values
    IF v_city IS NOT NULL AND v_state IS NOT NULL THEN
      INSERT INTO ReportLocation (Pincode, City, State)
      VALUES (NEW.Pincode, v_city, v_state);
    ELSE
      -- If not found, insert with NULL values (or default values)
      INSERT INTO ReportLocation (Pincode, City, State)
      VALUES (NEW.Pincode, NULL, NULL);
    END IF;
  END IF;
END//

DELIMITER ;

-- this is a dummuy comment
