// models/News.js
const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    date: { type: Date, required: true },
    headline: { type: String, required: true },
    details: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("News", NewsSchema);
