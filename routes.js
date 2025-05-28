//import the express
const express = require('express')
//import userController
const userController = require('./controllers/userController')
const questionController = require('./controllers/questionController')
const codeSubmissionController = require('./controllers/codeSubmissionController');

//instance
const route = new express.Router()



// User routes
route.post('/users/register', userController.registerController);
route.post('/users/login', userController.loginController);
route.post('/users/google-login', userController.googleLoginController);
route.get('/users/getuser',userController.getAllUsersWithStats)
route.delete('/users/delete/:id', userController.deleteUserController);

// Question routes
route.post('/questions/add', questionController.addQuestion);
route.get('/questions/all', questionController.getAllQuestions);
route.get('/questions/category/:category', questionController.getByCategory);
route.get('/get-question/:id', questionController.getQuestionById);
route.put('/questions/update/:id', questionController.updateQuestion);
route.delete('/questions/delete/:id', questionController.deleteQuestion);

// Code submission routes
route.post('/submissions/save', codeSubmissionController.saveCodeSubmission);
route.get('/submissions/user/:userId', codeSubmissionController.getUserSubmissions);
route.delete('/submissions/delete/:submissionId', codeSubmissionController.deleteSubmission);

//routes export
module.exports = route

