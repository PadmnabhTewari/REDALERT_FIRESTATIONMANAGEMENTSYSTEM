const db = require('../config/db');

class Vehicle {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM vehicles');
    return rows;
  }

  static async create(vehicle) {
    const { type, status, stationId } = vehicle;
    const [result] = await db.query('INSERT INTO vehicles (type, status, station_id) VALUES (?, ?, ?)', [type, status, stationId]);
    return result.insertId;
  }
}

module.exports = Vehicle;