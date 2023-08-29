const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/auth')



// create new user
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already exists!')
    } else {
        const user = await User.create({
            name, email, password
        })
        if (!user) {
            return res.status(400).json({ message: 'Invalid user data' })
        }
        generateToken(res, user._id)
        res.status(201).json({ name, email })
    }
})

// login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && user.comparePassword(password)) {
        generateToken(res, user._id)
        res.status(200).json({
            name: user.name,
            email: user.email
        })
    } else {
        throw new Error('Invalid Email or Password!')
    }
})

// logout user
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        expires: new Date(0),
        httpOnly: true
    })

    res.status(200).json({ message: 'User logged out!' })
})

// view user profile
const getUserProfile = asyncHandler(async (req, res) => {
    const { _id, name, email } = req.user
    res.status(200).json({ _id, name, email })
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.body.password){
            user.password = req.body.password || user.password
        }
        const updatedUser = await user.save()
        if(updatedUser){
            res.status(200)
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email
            })
        }else{
            throw new Error('Invalid Update!')
        }
    }else{
        throw new Error('User not found!')
    }
})


module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}