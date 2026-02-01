const express = require("express");
const Logo = require("../models/Logo");
const upload = require("../middleware/upload"); // multer
const router = express.Router();

/**
 * ✅ ADD LOGO
 * POST /api/logos
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Logo image is required" });
    }

    const logo = await Logo.create({
      image: req.file.filename,
    });

    res.json(logo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add logo" });
  }
});

/**
 * ✅ GET ALL LOGOS (FOR FRONTEND)
 * GET /api/logos
 */
router.get("/", async (req, res) => {
  try {
    const logos = await Logo.find().sort({ createdAt: -1 });
    res.json(logos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch logos" });
  }
});

/**
 * ✅ DELETE LOGO
 * DELETE /api/logos/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    await Logo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete logo" });
  }
});

module.exports = router;
