// routes/news.routes.js
const express = require("express");
const News = require("../models/News");
const upload = require("../middleware/upload");

const router = express.Router();

/**
 * Create news
 * Accepts image file and text fields: headline, details, date
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Log to check incoming data
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const news = await News.create({
      headline: req.body.headline,
      details: req.body.details,
      date: req.body.date,
      image: req.file?.filename,
    });

    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create news" });
  }
});

// Get all news sorted by creation date
router.get("/", async (_, res) => {
  try {
    const allNews = await News.find().sort({ createdAt: -1 });
    res.json(allNews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Delete a news item
router.delete("/:id", async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete news" });
  }
});

// Update a news item
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      headline: req.body.headline,
      details: req.body.details,
      date: req.body.date,
    };
    if (req.file?.filename) updateData.image = req.file.filename;

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      },
    );

    res.json(updatedNews);
  } catch (err) {
    res.status(500).json({ error: "Failed to update news" });
  }
});

module.exports = router;
