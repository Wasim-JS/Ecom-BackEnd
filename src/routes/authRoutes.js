import express from 'express'
import { forgotPasswordController, getUserDataController, loginController, logoutController, registerController } from '../controllers/authControllers.js'
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

export default router