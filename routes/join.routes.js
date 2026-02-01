const express = require("express");
const Join = require("../models/Join");

const router = express.Router();

/**
 * @route   POST /api/contacts
 * @desc    Create new contact (from website form)
 */
router.post("/", async (req, res) => {
  try {
    const join = await Join.create(req.body);
    res.status(201).json(join);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   GET /api/contacts
 * @desc    Get all contacts (dashboard)
 */
router.get("/", async (req, res) => {
  try {
    const joins = await Join.find().sort({ createdAt: -1 });
    res.json(joins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   DELETE /api/contacts/:id
 * @desc    Delete contact
 */
router.delete("/:id", async (req, res) => {
  try {
    await Join.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(404).json({ message: "join not found" });
  }
});

module.exports = router;
