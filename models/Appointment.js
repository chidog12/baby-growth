const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AppointmentSchema = new Schema({
  parentId: {
    type: String,
    required: true
  },
  BabyId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  done: {
    type: Boolean,
    required: true
  },
});

module.exports = User = mongoose.model("appointment", AppointmentSchema);
