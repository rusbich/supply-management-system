const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create(username, password, role = 'cashier') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await db.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, role]
    );
    return rows[0];
  }

  static async findByUsername(username) {
    const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    return rows[0];
  }
}

module.exports = User;