import express from 'express'
import { loginController, logoutController, registerController } from '../controllers/authControllers.js'

const router = express.Router()

//user register route
router.post('/register',registerController)

//user login route
router.post('/login',loginController)

// user logout route
router.get('/logout',logoutController)

export default router