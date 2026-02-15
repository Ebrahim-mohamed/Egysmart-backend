const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

/**
 * @route   POST /api/contacts
 * @desc    Create new contact (from website form)
 */
router.post("/", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   GET /api/contacts
 * @desc    Get all contacts (unseen first, then seen) — dashboard
 */
router.get("/", async (req, res) => {
  try {
    // Sort: unseen (seen: false) first, then seen (seen: true), both groups by newest first
    const contacts = await Contact.find().sort({ seen: 1, createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PATCH /api/contacts/:id/seen
 * @desc    Mark a contact message as seen
 */
router.patch("/:id/seen", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { seen: true },
      { new: true },
    );
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   DELETE /api/contacts/:id
 * @desc    Delete contact
 */
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(404).json({ message: "Contact not found" });
  }
});

module.exports = router;
