// src/config/db.js
const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect(
    "mongodb+srv://egysmart:LGLr7fINFRiXdABW@egysmart.ur5kj.mongodb.net/?appName=egysmart",
  );
  console.log("MongoDB connected");
};
