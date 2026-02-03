const express = require("express");
const router = express.Router();
const CompanyProfileRequest = require("../models/CompanyProfileRequest");

/**
 * POST /api/company-profile
 * save email
 */
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const record = await CompanyProfileRequest.create({ email });

    res.json({ success: true, record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /api/company-profile
 * for dashboard table
 */
router.get("/", async (req, res) => {
  try {
    const data = await CompanyProfileRequest.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = router;
