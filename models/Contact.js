// models/Contact.js
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String,
    userType: {
      type: String,
      enum: ["client", "supplier"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Contact", ContactSchema);
