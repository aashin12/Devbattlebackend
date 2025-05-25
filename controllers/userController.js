const users = require("../model/userModel");
const jwt = require('jsonwebtoken')

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