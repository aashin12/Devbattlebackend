//import the express
const express = require('express')
//import userController
const userController = require('./controllers/userController')

//instance
const route = new express.Router()




//path for register
route.post('/register',userController.registerController)
//path to login
route.post('/login',userController.loginController)
//path for google login
route.post('/google-login',userController.googleLoginController)

//routes export
module.exports = route

