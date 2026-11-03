
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Valid Bearer token required.",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Token missing.",
    });
  }

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Server configuration error.",
      });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (
      verified.role !== "citizen" ||
      !Number.isSafeInteger(Number(verified.id)) ||
      Number(verified.id) <= 0
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Citizen privileges required.",
      });
    }

    req.user = verified;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = authMiddleware;
