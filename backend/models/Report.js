const db = require('../config/db');

class Report {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM reports');
    return rows;
  }

  static async create(report) {
    const { title, description, userId } = report;
    const [result] = await db.query('INSERT INTO reports (title, description, user_id) VALUES (?, ?, ?)', [title, description, userId]);
    return result.insertId;
  }
}

module.exports = Report;