const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AppointmentSchema = new Schema({
  parentId: {
    type: String,
    required: true
  },
  babyId: {
    type: String,
    required: true
  },
  babyName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  },
});

module.exports = User = mongoose.model("appointment", AppointmentSchema);
