const express = require("express");
const Testimonial = require("../models/Testimonial");

const router = express.Router();

// Create testimonial
router.post("/", async (req, res) => {
  try {
    const testimonial = await Testimonial.create({
      name: req.body.name,
      company: req.body.company,
      title: req.body.title,
      feedback: req.body.feedback,
    });
    res.json(testimonial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create testimonial" });
  }
});

// Get all testimonials
router.get("/", async (_, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

// Delete testimonial
router.delete("/:id", async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
});

// Update testimonial
router.put("/:id", async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        company: req.body.company,
        title: req.body.title,
        feedback: req.body.feedback,
      },
      { new: true },
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update testimonial" });
  }
});

module.exports = router;
