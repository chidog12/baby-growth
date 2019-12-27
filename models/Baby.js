const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BabySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  parentId: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
});

module.exports = User = mongoose.model("baby", BabySchema);
