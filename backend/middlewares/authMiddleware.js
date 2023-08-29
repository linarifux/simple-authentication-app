const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')


const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req?.cookies?.jwt
    if (!token) {
        throw new Error('No Token!')
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.userId)
        next()
    } catch (error) {
        throw new Error('Invalid Token!')
    }
})

module.exports = protect