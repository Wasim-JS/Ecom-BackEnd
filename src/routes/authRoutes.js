import express from 'express'
import { changeUserPasswordController, forgotPasswordController, getUserDataController, loginController, logoutController, registerController, updateUserProfileController } from '../controllers/authControllers.js'
import { isLoggedIn } from '../middleware/isLoggedIn.js'

const router = express.Router()

//user register route
router.post('/register',registerController)

//user login route
router.post('/login',loginController)

// user logout route
router.get('/logout',logoutController)

// user forgot password route
router.post('/forgot-password',forgotPasswordController)

// get user data route
router.get('/me',isLoggedIn,getUserDataController)

//update user profile
router.put('/update-profile',isLoggedIn,updateUserProfileController)

//change user password
router.put('/change-password',isLoggedIn,changeUserPasswordController)

export default router