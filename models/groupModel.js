const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
  {
    name: String,
    createdBy: String,
    members: [{
      email: String,
      name: String,
      amount: Number
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Groups", groupSchema);
