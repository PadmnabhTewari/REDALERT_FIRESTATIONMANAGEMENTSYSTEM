const db = require('../config/db');

class Staff {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM staff');
    return rows;
  }

  static async create(staff) {
    const { name, role, stationId } = staff;
    const [result] = await db.query('INSERT INTO staff (name, role, station_id) VALUES (?, ?, ?)', [name, role, stationId]);
    return result.insertId;
  }
}

module.exports = Staff;