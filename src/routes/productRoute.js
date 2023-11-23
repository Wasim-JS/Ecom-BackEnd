import express from 'express'
import { createProduct } from '../controllers/productControllers.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router()

// create product route
router.post('/create',isLoggedIn,isAdmin,createProduct)


export default router;