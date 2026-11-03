
const pool = require("../config/db");

// CREATE USER
const createUser = async (name, email, password) => {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email;
  `;

  const values = [
    name.trim(),
    email.trim().toLowerCase(),
    password,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

// FIND USER BY EMAIL
const findUserByEmail = async (email) => {
  const query = `
    SELECT id, name, email, password
    FROM users
    WHERE LOWER(email) = LOWER($1)
    LIMIT 1;
  `;

  const result = await pool.query(query, [email.trim()]);

  return result.rows[0] || null;
};

// FIND USER BY ID (PROFILE)
const findUserById = async (id) => {
  const query = `
    SELECT id, name, email, created_at
    FROM users
    WHERE id = $1;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0] || null;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
