const db = require('../config/db');

class Staff {
  static async create(staff) {
    const { Name, Designation, Contact, Email, Station_ID, Shift } = staff;
    const [result] = await db.query(
      'INSERT INTO Staff (Name, Designation, Contact, Email, Station_ID, Shift) VALUES (?, ?, ?, ?, ?, ?)',
      [Name, Designation, Contact, Email, Station_ID, Shift]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.query('SELECT * FROM Staff');
    return rows;
  }
}

module.exports = Staff;