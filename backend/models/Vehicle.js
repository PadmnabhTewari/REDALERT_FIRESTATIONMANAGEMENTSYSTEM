const db = require('../config/db');

class Vehicle {
  static async create(vehicle) {
    const { Type, Model_No, Status, Water_Capacity, Station_ID } = vehicle;
    const [result] = await db.query(
      'INSERT INTO Vehicle (Type, Model_No, Status, Water_Capacity, Station_ID) VALUES (?, ?, ?, ?, ?)',
      [Type, Model_No, Status, Water_Capacity, Station_ID]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.query('SELECT * FROM Vehicle');
    return rows;
  }
}

module.exports = Vehicle;