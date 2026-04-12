const express = require("express");
const Project = require("../models/Project");
const upload = require("../middleware/upload");
const router = express.Router();

// Create Project
router.post("/", upload.array("images", 20), async (req, res) => {
  try {
    const filenames = req.files?.map((f) => f.filename) ?? [];
    const project = await Project.create({
      ...req.body,
      images: filenames,
    });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Get all Projects
router.get("/", async (_, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Get only important Projects (used by the homepage slider)
router.get("/important", async (_, res) => {
  try {
    const projects = await Project.find({ important: true }).sort({
      createdAt: -1,
    });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch important projects" });
  }
});

// Toggle important flag
router.patch("/:id/important", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    project.important = !project.important;
    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to toggle important" });
  }
});

// Update Project
router.put("/:id", upload.array("images", 20), async (req, res) => {
  try {
    const newFilenames = req.files?.map((f) => f.filename) ?? [];

    // If new images were uploaded replace all; otherwise keep existing
    const updateData = {
      ...req.body,
      ...(newFilenames.length > 0 ? { images: newFilenames } : {}),
    };

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update project" });
  }
});

// Delete Project
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;