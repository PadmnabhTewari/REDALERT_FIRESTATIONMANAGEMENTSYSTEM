const db = require('../config/db');

class FireStation {
  static async create(station) {
    const { Name, Location, Contact_Number } = station;
    const [result] = await db.query(
      'INSERT INTO FireStation (Name, Location, Contact_Number) VALUES (?, ?, ?)',
      [Name, Location, Contact_Number]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.query('SELECT * FROM FireStation');
    return rows;
  }
}

module.exports = FireStation;