const pool = require("../config/db");

const createComplaint = async (complaintData) => {
  const {
    user_id,
    title,
    category,
    description,
    address,
    latitude,
    longitude,
    image_url,
  } = complaintData;

  const query = `
    INSERT INTO complaints
    (
      user_id,
      title,
      category,
      description,
      address,
      latitude,
      longitude,
      image_url
    )
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;

  const values = [
    user_id,
    title,
    category,
    description,
    address,
    latitude,
    longitude,
    image_url,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getUserComplaints = async (userId) => {
  const query = `
    SELECT *
    FROM complaints
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
};

const getComplaintById = async (complaintId, userId) => {
  const query = `
    SELECT *
    FROM complaints
    WHERE id = $1
      AND user_id = $2;
  `;

  const result = await pool.query(query, [complaintId, userId]);

  return result.rows[0];
};

const getAllComplaints = async () => {
  const query = `
    SELECT *
    FROM complaints
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(query);

  return result.rows;
};

const getComplaintByIdForAdmin = async (complaintId) => {
  const query = `
    SELECT *
    FROM complaints
    WHERE id = $1;
  `;

  const result = await pool.query(query, [complaintId]);

  return result.rows[0];
};

const updateComplaintStatus = async (complaintId, status) => {
  const query = `
    UPDATE complaints
    SET status = $1
    WHERE id = $2
    RETURNING *;
  `;

  const result = await pool.query(query, [status, complaintId]);

  return result.rows[0];
};

module.exports = {
  createComplaint,
  getUserComplaints,
  getComplaintById,
  getAllComplaints,
  getComplaintByIdForAdmin,
  updateComplaintStatus,
};