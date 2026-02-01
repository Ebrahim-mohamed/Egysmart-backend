// src/config/db.js
const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect(
    "mongodb+srv://ebf3112002_db_user:jL7KFE2sLAzPTKqG@egysmart.07lxaua.mongodb.net/?appName=egysmart",
  );
  console.log("MongoDB connected");
};
