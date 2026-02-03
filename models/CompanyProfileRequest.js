const mongoose = require("mongoose");

const CompanyProfileRequestSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "CompanyProfileRequest",
  CompanyProfileRequestSchema,
);
