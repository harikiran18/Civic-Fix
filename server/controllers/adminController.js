
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const adminController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        !email.trim() ||
        !password
      ) {
        return res.status(400).json({
          message: "Email and password are required.",
        });
      }

      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not configured.");
        return res.status(500).json({
          message: "Server configuration error.",
        });
      }

      const normalizedEmail = email.trim().toLowerCase();

      const admin = await Admin.findByEmail(normalizedEmail);

      if (!admin) {
        return res.status(401).json({
          message: "Invalid email or password.",
        });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        admin.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid email or password.",
        });
      }

      const token = jwt.sign(
        {
          id: admin.id,
          email: admin.email,
          role: "admin",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({
        message: "Admin login successful.",
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
      });
    } catch (error) {
      console.error("Admin Login Error:", error);

      return res.status(500).json({
        message: "Internal server error.",
      });
    }
  },
};

module.exports = adminController;
