const CodeSubmission = require('../model/codeSubmissionModel');

// Save a code submission
exports.saveCodeSubmission = async (req, res) => {
  try {
    const { userId, questionId, language, code, passedTestCases, totalTestCases } = req.body;

    // if (passedTestCases < totalTestCases) {
    //   return res.status(400).json({ success: false, message: "Not all test cases passed. Code will not be saved." });
    // }

    const newSubmission = new CodeSubmission({
      userId,
      questionId,
      language,
      code,
      passedTestCases,
      totalTestCases
    });

    await newSubmission.save();
    res.status(201).json({ success: true, message: 'Code submitted and saved successfully', data: newSubmission });

  } catch (err) {
    console.error("Error saving submission:", err.message);
    res.status(500).json({ success: false, message: "Server error while saving submission" });
  }
};

// Get all submissions for a user
exports.getUserSubmissions = async (req, res) => {
  try {
    const { userId } = req.params;

    const submissions = await CodeSubmission.find({ userId }).populate("questionId");

    res.status(200).json({ success: true, data: submissions });
  } catch (err) {
    console.error("Error fetching submissions:", err.message);
    res.status(500).json({ success: false, message: "Server error while fetching submissions" });
  }
};

// Delete a specific code submission by its ID
exports.deleteSubmission = async (req, res) => {
    try {
      const { submissionId } = req.params;
  
      const deletedSubmission = await CodeSubmission.findByIdAndDelete(submissionId);
  
      if (!deletedSubmission) {
        return res.status(404).json({ success: false, message: "Submission not found" });
      }
  
      res.status(200).json({ success: true, message: "Submission deleted successfully" });
    } catch (err) {
      console.error("Error deleting submission:", err.message);
      res.status(500).json({ success: false, message: "Server error while deleting submission" });
    }
  };
  