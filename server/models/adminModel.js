
const pool = require("../config/db");

const Admin = {
  async findByEmail(email) {
    const result = await pool.query(
      `SELECT *
       FROM admins
       WHERE LOWER(email) = LOWER($1)
       LIMIT 1`,
      [email.trim()]
    );

    return result.rows[0] || null;
  },

  async findById(id) {
    const result = await pool.query(
      `SELECT id, name, email, created_at
       FROM admins
       WHERE id = $1`,
      [id]
    );

    return result.rows[0] || null;
  },

  async create(name, email, password) {
    const normalizedEmail = email.trim().toLowerCase();

    const result = await pool.query(
      `INSERT INTO admins (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name.trim(), normalizedEmail, password]
    );

    return result.rows[0];
  },
};

module.exports = Admin;
