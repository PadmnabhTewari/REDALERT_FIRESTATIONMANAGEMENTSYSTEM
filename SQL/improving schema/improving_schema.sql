-- FireStation Table (Added Status ENUM)
CREATE TABLE FireStation (
  Station_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Contact_Number VARCHAR(20) NOT NULL UNIQUE,
  Total_Staff INT DEFAULT 0 CHECK (Total_Staff >= 0),
  Total_Vehicles INT DEFAULT 0 CHECK (Total_Vehicles >= 0),
  Status ENUM('Active', 'Inactive') DEFAULT 'Active' -- New status field
);

-- Vehicle Table (ON DELETE CASCADE instead of SET NULL)
CREATE TABLE Vehicle (
  Vehicle_ID INT AUTO_INCREMENT PRIMARY KEY,
  Type VARCHAR(255) NOT NULL,
  Model_No VARCHAR(255) NOT NULL,
  Status ENUM('Available', 'In Use', 'Under Maintenance') NOT NULL,
  Station_ID INT,
  Last_Maintenance_Date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (Station_ID) REFERENCES FireStation(Station_ID) ON DELETE CASCADE -- Updated
);

-- Staff Table (ON DELETE CASCADE instead of SET NULL)
CREATE TABLE Staff (
  Staff_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Designation VARCHAR(255) NOT NULL,
  Contact VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Station_ID INT,
  Shift VARCHAR(255) NOT NULL,
  FOREIGN KEY (Station_ID) REFERENCES FireStation(Station_ID) ON DELETE CASCADE -- Updated
);
