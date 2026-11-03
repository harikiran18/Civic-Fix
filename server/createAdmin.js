
const bcrypt = require("bcryptjs");
const pool = require("./config/db");
require("dotenv").config();

async function createAdmin() {
  try {
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
    }

    if (ADMIN_PASSWORD.length < 8) {
      throw new Error("Admin password must be at least 8 characters.");
    }

    const name = (ADMIN_NAME || "CivicFix Admin").trim();
    const email = ADMIN_EMAIL.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    const result = await pool.query(
      `INSERT INTO admins (name, email, password)
       VALUES ($1, $2, $3)
       ON CONFLICT (email)
       DO UPDATE SET
         name = EXCLUDED.name,
         password = EXCLUDED.password
       RETURNING id, name, email`,
      [name, email, hashedPassword]
    );

    console.log("Admin account created or updated successfully.");
    console.log("Admin email:", result.rows[0].email);
  } catch (error) {
    console.error("Admin Setup Error:", error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

createAdmin();
