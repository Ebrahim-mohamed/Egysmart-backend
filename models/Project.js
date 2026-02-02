// backend/models/Project.ts
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    client: { type: String, required: true },
    image: { type: String, required: true },
    serviceKind: {
      type: String,
      enum: ["Turnkey Projects", "Protective Coating", "Concrete Flooring"],
      required: true,
    },
    budget: { type: Number, required: true },
    status: {
      type: String,
      enum: ["planned", "in-progress", "completed"],
      required: true,
    },
    duration: { type: String, required: true },
    bua: { type: Number, required: true },
    scopeOfWork: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
