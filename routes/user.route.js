const express = require("express")
const UserModel = require("../models/user.model")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


userRouter.post("/signup", async (req, res) => {
    const { email, password } = req.body
    try {
        const users = await UserModel.findOne({ email })
        if (users) {
            res.status(400).send({
                message: "user already exist, please login"
            })
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                const newUser = { email, password: hash }
                const user = new UserModel(newUser)
                await user.save()
                res.status(200).send({
                    message: "successfully registered!!",
                })
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, "zoro")
                    res.status(200).send({
                        message: "successfully logged in!!",
                        token
                    })
                } else {
                    res.send({
                        message: "wrong credentials"
                    })
                }
            })
        } else {
            res.status(404).send({
                message: "user not found, please register"
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
})


module.exports = userRouter