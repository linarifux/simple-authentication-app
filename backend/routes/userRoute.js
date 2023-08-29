const express = require('express')
const { createUser, loginUser, logoutUser, getUserProfile, updateUserProfile } = require('../controllers/userController')
const protect = require('../middlewares/authMiddleware')
const router = express.Router()


/// create new user
router.post('/', createUser)

// login user
router.post('/login', loginUser)

// logout user
router.post('/logout', protect, logoutUser)

// view and update user profile
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)


module.exports = router