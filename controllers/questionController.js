const Question = require('../model/questionModel');

// Add a new question
exports.addQuestion = async (req, res) => {
  try {
    const {
      title,
      category,
      difficulty,
      problemStatement,
      inputFormat,
      outputFormat,
      examples,
      testCases
    } = req.body;

    const newQuestion = new Question({
      title,
      category,
      difficulty,
      problemStatement,
      inputFormat,
      outputFormat,
      examples,
      testCases
    });

    await newQuestion.save();
    res.status(201).json({ success: true, message: 'Question added successfully', data: newQuestion });
  } catch (err) {
    console.error('Error adding question:', err.message);
    res.status(500).json({ success: false, message: 'Server error while adding question' });
  }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ success: true, data: questions });
  } catch (err) {
    console.error('Error fetching all questions:', err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching questions' });
  }
};

// Get questions by category (e.g., Arrays, Strings)
exports.getByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const questions = await Question.find({ category });

    if (!questions || questions.length === 0) {
      return res.status(404).json({ success: false, message: 'No questions found for this category' });
    }

    res.status(200).json({ success: true, data: questions });
  } catch (err) {
    console.error('Error fetching category questions:', err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching category questions' });
  }
};

// Get a single question by ID
exports.getQuestionById = async (req, res) => {
    try {
      const { id } = req.params;
      const question = await Question.findById(id);
  
      if (!question) {
        return res.status(404).json({ success: false, message: 'Question not found' });
      }
  
      res.status(200).json({ success: true, data: question });
    } catch (err) {
      console.error('Error fetching question by ID:', err.message);
      res.status(500).json({ success: false, message: 'Server error while fetching question' });
    }
  };
  
  //update the question
  exports.updateQuestion = async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await Question.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Question not found' });
      }
  
      res.status(200).json({ success: true, data: updated, message: 'Question updated successfully' });
    } catch (err) {
      console.error('Error updating question:', err.message);
      res.status(500).json({ success: false, message: 'Server error while updating question' });
    }
  };
  
  // Delete a question by ID
exports.deleteQuestion = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Question.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Question not found' });
      }
  
      res.status(200).json({ success: true, message: 'Question deleted successfully' });
    } catch (err) {
      console.error('Error deleting question:', err.message);
      res.status(500).json({ success: false, message: 'Server error while deleting question' });
    }
  };
  