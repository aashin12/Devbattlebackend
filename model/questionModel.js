const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true
  },
  expected: {
    type: String,
    required: true
  }
});

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true, // Arrays, Strings, etc.
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  problemStatement: {
    type: String,
    required: true
  },
  inputFormat: {
    type: String,
    required: true
  },
  outputFormat: {
    type: String,
    required: true
  },
  examples: {
    type: [String], // Store as an array of example blocks
    required: true
  },
  testCases: {
    type: [testCaseSchema],
    required: true
  }
});

module.exports = mongoose.model('questions', questionSchema);
