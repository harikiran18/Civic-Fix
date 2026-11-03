
const cloudinary = require("../config/cloudinary");

const {
  createComplaint: createComplaintModel,
  getUserComplaints,
  getComplaintById,
  getAllComplaints,
  getComplaintByIdForAdmin,
  updateComplaintStatus,
} = require("../models/complaintModel");

const VALID_STATUSES = ["Pending", "In Progress", "Resolved"];

const isValidComplaintId = (id) => {
  return /^\d+$/.test(String(id)) &&
    Number.isSafeInteger(Number(id)) &&
    Number(id) > 0;
};

// Create a new complaint
const createComplaint = async (req, res) => {
  try {
    let imageUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "civicfix/complaints",
      });

      imageUrl = result.secure_url;
    }

    const complaintData = {
      user_id: req.user.id,
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      address: req.body.address,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      image_url: imageUrl,
    };

    const complaint = await createComplaintModel(complaintData);

    return res.status(201).json({
      success: true,
      message: "Complaint created successfully.",
      complaint,
    });
  } catch (error) {
    console.error("Create complaint error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get complaints belonging to the logged-in user
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await getUserComplaints(req.user.id);

    return res.status(200).json({
      success: true,
      complaints,
    });
  } catch (error) {
    console.error("Get my complaints error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get one complaint belonging to the logged-in user
const getComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidComplaintId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid complaint ID.",
      });
    }

    const complaint = await getComplaintById(id, req.user.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found.",
      });
    }

    return res.status(200).json({
      success: true,
      complaint,
    });
  } catch (error) {
    console.error("Get complaint error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get all complaints for admin
const getAllComplaintsForAdmin = async (req, res) => {
  try {
    const complaints = await getAllComplaints();

    return res.status(200).json({
      success: true,
      complaints,
    });
  } catch (error) {
    console.error("Get all complaints error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get complaint details for admin
const getComplaintDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidComplaintId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid complaint ID.",
      });
    }

    const complaint = await getComplaintByIdForAdmin(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found.",
      });
    }

    return res.status(200).json({
      success: true,
      complaint,
    });
  } catch (error) {
    console.error("Get admin complaint details error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update complaint status (admin only)
const updateComplaintStatusForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    if (!isValidComplaintId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid complaint ID.",
      });
    }

    if (typeof status !== "string" || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed statuses: Pending, In Progress, Resolved.",
      });
    }

    const complaint = await updateComplaintStatus(id, status);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Complaint status updated successfully.",
      complaint,
    });
  } catch (error) {
    console.error("Update complaint status error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getComplaint,
  getAllComplaintsForAdmin,
  getComplaintDetailsForAdmin,
  updateComplaintStatusForAdmin,
};
