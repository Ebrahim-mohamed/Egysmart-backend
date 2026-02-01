// models/Testimonial.js
const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema(
  {
    name: String,
    company: String,
    title: String,
    feedback: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Testimonial", TestimonialSchema);
