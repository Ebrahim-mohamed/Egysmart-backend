const jwt = require("jsonwebtoken");

const JWT_SECRET = "EGYSMART_SECRET_KEY";

exports.signToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

exports.verifyToken = (token) => jwt.verify(token, JWT_SECRET);
