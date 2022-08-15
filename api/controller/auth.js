const Router = require('express').Router()
const bcrypt = require("bcrypt");
const User = require('../models/User')
const { createError } = require('../until/errors')


const register = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(404).json('User not found')
        }
        const checkPassword = await bcrypt.compare(req.body.password, user.password)
        if (!checkPassword) {
            res.status(400).json('Wrong username or password')
        }
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

module.exports = { login, register }