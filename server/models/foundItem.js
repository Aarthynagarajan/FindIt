const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  location: String,
  date: String,

  studentName: String,
  registerNo: String,
  department: String,
  year: String,
  phone: String
});

module.exports = mongoose.model("FoundItem", foundItemSchema);
