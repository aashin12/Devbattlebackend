const mongoose = require('mongoose');

const codeSubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'questions'
  },
  language: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  passedTestCases: {
    type: Number,
    required: true
  },
  totalTestCases: {
    type: Number,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('submissions', codeSubmissionSchema);
