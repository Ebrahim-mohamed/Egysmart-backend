// models/Join.js
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
      required: true,
    },
    internStatus: {
      type: String,
      enum: ["graduate", "undergraduate"],
      required: function () {
        return this.userType === "intern"; // ensures backend validation
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Join", JoinSchema);
