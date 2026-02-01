const express = require("express");
const { signToken } = require("../utils/jwt");
const admin = require("../config/admin");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== admin.username || password !== admin.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({ role: "admin" });

  res.json({
    token,
    user: { username },
  });
});

module.exports = router;
