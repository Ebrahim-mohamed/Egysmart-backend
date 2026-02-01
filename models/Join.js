// models/Contact.js
const mongoose = require("mongoose");

const JoinSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    position: String,
    userType: {
      type: String,
      enum: ["intern", "jop"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Join", JoinSchema);
