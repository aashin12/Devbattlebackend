//import dotenv file
require('dotenv').config() //load the environment variables

//import express library
const express = require('express')

//import cors
const cors = require('cors')

//import route
const route = require('./routes')

//import db connection file
require('./databaseconnection')

//create the server using express()

const bookstoreServer = express()

//server using cors
bookstoreServer.use(cors())
//middleware to parse the json data
bookstoreServer.use(express.json())
bookstoreServer.use(route)


//create port
PORT = 4000|| process.env.PORT

bookstoreServer.listen(PORT,()=>{
    console.log(`server running successfully at port ${PORT}`);
    
})