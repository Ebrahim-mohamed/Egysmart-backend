const express = require("express");
const Project = require("../models/Project");
const upload = require("../middleware/upload"); // multer middleware
const router = express.Router();

// Create Project
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      image: req.file?.filename,
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
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(req.file ? { image: req.file.filename } : {}),
      },
      { new: true },
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
