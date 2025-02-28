-- Create FireStation table
CREATE TABLE FireStation (
  Station_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Location VARCHAR(255) NOT NULL,
  Contact_Number VARCHAR(255) NOT NULL,
  Total_Staff INT DEFAULT 0,
  Total_Vehicles INT DEFAULT 0
);
/*Functional Dependencies:
• Station ID → Name, Location, Contact Number, Total Staff, Total Vehicles 
Normalization:
• 1NF: Yes, as all attributes are atomic.
• 2NF: Yes, as there are no partial dependencies.
• 3NF: Yes, as there are no transitive dependencies.
• BCNF: Yes, as the left side of every functional dependency is a superkey
*/

-- Create Vehicle table
CREATE TABLE Vehicle (
  Vehicle_ID INT AUTO_INCREMENT PRIMARY KEY,
  Type VARCHAR(255) NOT NULL,
  Model_No VARCHAR(255) NOT NULL,
  Status VARCHAR(255) NOT NULL,
  Water_Capacity INT,
  Station_ID INT,
  Last_Maintenance_Date DATETIME,
  FOREIGN KEY (Station_ID) REFERENCES FireStation(Station_ID)
);
/*
Functional Dependencies:
• Vehicle ID → Type, Model No, Status, Water Capacity, Station ID, Last Maintenance Date
• Station ID → (from FireStation table)
Normalization:
• 1NF: Yes, as all attributes are atomic.
• 2NF: Yes, as there are no partial dependencies.
• 3NF: Yes, as there are no transitive dependencies.
• BCNF: Yes, as the left side of every functional dependency is a superkey
*/

-- Create Supplier table
CREATE TABLE Supplier (
  Supplier_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Contact VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Address VARCHAR(255) NOT NULL,
  Item_Provided VARCHAR(255) NOT NULL
);
/*
Functional Dependencies:
• Supplier ID → Name, Contact, Email, Address, Item Provided
Normalization:
• 1NF: Yes, as all attributes are atomic.
• 2NF: Yes, as there are no partial dependencies.
• 3NF: Yes, as there are no transitive dependencies.
• BCNF: Yes, as the left side of every functional dependency is a superkey.
*/

-- Create Inventory table
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
/*
Functional Dependencies:
• Inventory ID → Item Name, Quantity, Station ID, Supplier ID, Last Updated
• Station ID → (from FireStation table)
• Supplier ID → (from Supplier table)
Normalization:
• 1NF: Yes, as all attributes are atomic.
• 2NF: Yes, as there are no partial dependencies.
• 3NF: Yes, as there are no transitive dependencies.
• BCNF: Yes, as the left side of every functional dependency is a superkey.
*/

-- Create Staff table
CREATE TABLE Staff (
  Staff_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Designation VARCHAR(255) NOT NULL,
  Contact VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Station_ID INT,
  Shift VARCHAR(255) NOT NULL,
  FOREIGN KEY (Station_ID) REFERENCES FireStation(Station_ID)
);

/*
Functional Dependencies:
• Staff ID → Name, Designation, Contact, Email, Station ID, Shift
• Station ID → (from FireStation table)
Normalization:
• 1NF: Yes, as all attributes are atomic.
• 2NF: Yes, as there are no partial dependencies.
• 3NF: Yes, as there are no transitive dependencies.
• BCNF: Yes, as the left side of every functional dependency is a superkey.
*/

-- Create User table
CREATE TABLE User (
  User_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Username VARCHAR(255) UNIQUE NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Contact VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Address VARCHAR(255) NOT NULL
);
/*
Functional Dependencies:
• User ID → Name, Username, Password, Contact, Email, Address
• Username → User ID
Normalization:
• 1NF: Yes, as all attributes are atomic.
• 2NF: Yes, as there are no partial dependencies.
• 3NF: Yes, as there are no transitive dependencies.
• BCNF: Yes, as the left side of every functional dependency is a superkey.
*/

-- Create Admin table
CREATE TABLE Admin (
  Admin_ID INT AUTO_INCREMENT PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Username VARCHAR(255) UNIQUE NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Contact VARCHAR(255) NOT NULL,
  Role VARCHAR(255) NOT NULL
);
/*
Functional Dependencies:
• Admin ID → Name, Username, Password, Contact, Role
• Username → Admin ID
Normalization:
• 1NF: Yes, as all attributes are atomic.
• 2NF: Yes, as there are no partial dependencies.
• 3NF: Yes, as there are no transitive dependencies.
• BCNF: Yes, as the left side of every functional dependency is a superkey.
*/

-- Create Report table
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
  Assigned_Vehicle INT,
  Assigned_Staff INT,
  FOREIGN KEY (User_ID) REFERENCES User(User_ID),
  FOREIGN KEY (Admin_ID) REFERENCES Admin(Admin_ID),
  FOREIGN KEY (Assigned_Vehicle) REFERENCES Vehicle(Vehicle_ID),
  FOREIGN KEY (Assigned_Staff) REFERENCES Staff(Staff_ID)
);
/*Functional Dependencies:
• Report ID → Street Address, City, State, Pincode, Description, Report Date Time, Severity Level,
User ID, Action Taken, Action Date Time, Admin ID, Assigned Vehicle, Assigned Staff
• User ID → (from User table)
• Admin ID → (from Admin table)
• Assigned Vehicle → (from Vehicle table)
• Assigned Staff → (from Staff table)
Normalization:
• 1NF: Yes, as all attributes are atomic.
• 2NF: Yes, as there are no partial dependencies.
• 3NF: Yes, as there are no transitive dependencies.
• BCNF: Yes, as the left side of every functional dependency is a superkey.
*/

-- Create EquipmentUsage table
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
/*
Functional Dependencies:
• Usage ID → Inventory ID, Used Quantity, Date Used, Purpose, Staff ID
• Inventory ID → (from Inventory table)
• Staff ID → (from Staff table)
Normalization:
• 1NF: Yes, as all attributes are atomic.
• 2NF: Yes, as there are no partial dependencies.
• 3NF: Yes, as there are no transitive dependencies.
• BCNF: Yes, as the left side of every functional dependency is a superkey.
*/

-- Create Maintenance table
CREATE TABLE Maintenance (
  Maintenance_ID INT AUTO_INCREMENT PRIMARY KEY,
  Vehicle_ID INT,
  Maintenance_Type VARCHAR(255) NOT NULL,
  Date_Performed DATETIME DEFAULT CURRENT_TIMESTAMP,
  Cost DECIMAL(10, 2) NOT NULL,
  Performed_By VARCHAR(255) NOT NULL,
  FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID)
);
/*
Functional Dependencies:
• Maintenance ID → Vehicle ID, Maintenance Type, Date Performed, Cost, Performed By
• Vehicle ID → (from Vehicle table)
Normalization:
• 1NF: Yes, as all attributes are atomic.
• 2NF: Yes, as there are no partial dependencies.
• 3NF: Yes, as there are no transitive dependencies.
• BCNF: Yes, as the left side of every functional dependency is a superkey.
*/

-- Create FuelLog table
CREATE TABLE FuelLog (
  Fuel_ID INT AUTO_INCREMENT PRIMARY KEY,
  Vehicle_ID INT,
  Date DATETIME DEFAULT CURRENT_TIMESTAMP,
  Fuel_Amount DECIMAL(10, 2) NOT NULL,
  Cost DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID)
);
/*
Functional Dependencies:
• Fuel ID → Vehicle ID, Date, Fuel Amount, Cost
• Vehicle ID → (from Vehicle table)
Normalization:
• 1NF: Yes, as all attributes are atomic.
• 2NF: Yes, as there are no partial dependencies.
• 3NF: Yes, as there are no transitive dependencies.
• BCNF: Yes, as the left side of every functional dependency is a superkey.
*/
