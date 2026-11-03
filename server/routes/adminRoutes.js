const express = require("express");
const adminController = require("../controllers/adminController");
const complaintController = require("../controllers/complaintController");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

const router = express.Router();

router.post("/login", adminController.login);

router.get(
  "/complaints",
  adminAuthMiddleware,
  complaintController.getAllComplaintsForAdmin
);

router.get(
  "/complaints/:id",
  adminAuthMiddleware,
  complaintController.getComplaintDetailsForAdmin
);

router.put(
  "/complaints/:id/status",
  adminAuthMiddleware,
  complaintController.updateComplaintStatusForAdmin
);

module.exports = router;