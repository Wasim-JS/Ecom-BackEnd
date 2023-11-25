import express from 'express'
import { addReviewController, createProduct, getAllProductController, getFilterProductController, getSingleProduct } from '../controllers/productControllers.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router()

// create product route
router.post('/create',isLoggedIn,isAdmin,createProduct)

//get all products route
router.get('/all-products',getAllProductController)

//add reviews to products route
router.post('/add-review',isLoggedIn,addReviewController)

//get filter product route
router.get('/filter-product',getFilterProductController)

// get single product
router.get('/:id',getSingleProduct)



export default router;