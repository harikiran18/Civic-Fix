const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createComplaint,
  getMyComplaints,
  getComplaint,
} = require("../controllers/complaintController");

// Get logged-in user's complaints
router.get(
  "/my",
  authMiddleware,
  getMyComplaints
);

// Get single complaint
router.get(
  "/:id",
  authMiddleware,
  getComplaint
);

// Create complaint
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createComplaint
);

module.exports = router;