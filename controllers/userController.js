const users = require("../model/userModel");
const jwt = require('jsonwebtoken')
const Submission = require('../model/codeSubmissionModel');

//register
exports.registerController = async (req, res) => {
    //logic
    const { username, email, password } = req.body
    console.log(username, email, password);

    try {
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            res.status(409).json('Already user Exists')
        }
        else {
            const newUser = new users({
                username,
                email,
                password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (error) {
        res.status(500).json(error)
    }

}

//login
exports.loginController = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password);

    try {

        const existingUser = await users.findOne({ email })
        if (existingUser) {
            if (existingUser.password == password) {
                const token = jwt.sign({ userMail: existingUser.email }, 'secretkey')
                res.status(200).json({ existingUser, token })
            }
            else {
                res.status(401).json('Incorrect email or password')
            }
        }
        else {
            res.status(404).json('Incorrect email or password')
        }

    } catch (error) {
        res.status(500).json(error)
    }

}

//google login
exports.googleLoginController = async (req, res) => {
    const { username, email, password } = req.body
    console.log(username, email, password);

    try {
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            const token = jwt.sign({ userMail: existingUser.email }, 'secretkey')
            res.status(200).json({ existingUser, token })
        }
        else{
            const newUser = new users({
                username,
                email,
                password
            })
            await newUser.save()
            const token = jwt.sign({ userMail: newUser.email }, 'secretkey')
            res.status(200).json({ existingUser:newUser, token })
        }

    } catch (error) {
        res.status(500).json(error)
    }

}

// getallusers

exports.getAllUsersWithStats = async (req, res) => {
  try {
    const user = await users.find();

    const usersWithStats = await Promise.all(
      user.map(async (user) => {
        const submissions = await Submission.find({ userId: user._id });

        const submissionsCount = submissions.length;
        const totalPassed = submissions.reduce((acc, s) => acc + (s.passedTestCases || 0), 0);
        const totalTestCases = submissions.reduce((acc, s) => acc + (s.totalTestCases || 0), 0);

        // Calculate score based on % passed
        const score = totalTestCases ? Math.round((totalPassed / totalTestCases) * 100) : 0;

        // Calculate streak
        const dates = new Set(
          submissions.map(sub => new Date(sub.submittedAt).toISOString().split('T')[0])
        );
        let streak = 0;
        const today = new Date();
        for (let i = 0; i < 365; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const formatted = date.toISOString().split("T")[0];
          if (dates.has(formatted)) streak++;
          else break;
        }

        return {
          id: user._id,
          name: user.username,
          email: user.email,
          password: user.password,
          submissions: submissionsCount,
          streak,
          score,
        };
      })
    );

    res.json({ success: true, user: usersWithStats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// delete a user
exports.deleteUserController = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await users.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error });
    }
  };
  
