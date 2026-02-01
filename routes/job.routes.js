const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

// Create a job
router.post("/", async (req, res) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
    });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create job" });
  }
});

// Get all jobs
router.get("/", async (_, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// Delete a job
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

// Update a job
router.put("/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, description: req.body.description },
      { new: true },
    );
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: "Failed to update job" });
  }
});

module.exports = router;
