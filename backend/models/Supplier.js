const db = require('../config/db');

class Supplier {
  static async create(supplier) {
    const { Name, Contact, Email, Address, Item_Provided } = supplier;
    const [result] = await db.query(
      'INSERT INTO Supplier (Name, Contact, Email, Address, Item_Provided) VALUES (?, ?, ?, ?, ?)',
      [Name, Contact, Email, Address, Item_Provided]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.query('SELECT * FROM Supplier');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM Supplier WHERE Supplier_ID = ?', [id]);
    return rows[0];
  }

  static async update(id, supplier) {
    const { Name, Contact, Email, Address, Item_Provided } = supplier;
    await db.query(
      'UPDATE Supplier SET Name = ?, Contact = ?, Email = ?, Address = ?, Item_Provided = ? WHERE Supplier_ID = ?',
      [Name, Contact, Email, Address, Item_Provided, id]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM Supplier WHERE Supplier_ID = ?', [id]);
  }
}

module.exports = Supplier;
