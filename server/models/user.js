const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registerNo: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);
