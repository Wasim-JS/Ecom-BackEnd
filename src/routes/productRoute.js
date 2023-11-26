import express from 'express'
import { addReviewController, createProduct, getAllProductController, getFilterProductController, getSingleProduct, updateProductController } from '../controllers/productControllers.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { upload } from '../utiles/handleImageUplods.js';
const router = express.Router()


// create product route
router.post('/create',isLoggedIn,isAdmin,upload.array('image', 3),createProduct)

//get all products route
router.get('/all-products',getAllProductController)

//add reviews to products route
router.post('/add-review',isLoggedIn,addReviewController)

//get filter product route
router.get('/filter-product',getFilterProductController)

// get single product
router.get('/:id',getSingleProduct)

// update product route
router.put('/:id',updateProductController)



export default router;