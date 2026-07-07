// src/config/db.js
const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/egysmart");
  console.log("MongoDB connected");
};
