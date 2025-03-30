const db = require('../config/db');

class Vehicle {
  static async create(vehicle) {
    const { Model_ID, Status, Last_Maintenance_Date } = vehicle;
    const [result] = await db.query(
      'INSERT INTO Vehicle (Model_ID, Status, Last_Maintenance_Date) VALUES (?, ?, ?)',
      [Model_ID, Status, Last_Maintenance_Date]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.query(
      `SELECT Vehicle.Vehicle_ID, Vehicle.Status, Vehicle.Last_Maintenance_Date, 
              VehicleModel.Type AS Model_Name
       FROM Vehicle
       JOIN VehicleModel ON Vehicle.Model_ID = VehicleModel.Model_ID`
    );
    return rows;
  }
}

module.exports = Vehicle;