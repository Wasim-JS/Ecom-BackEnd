import Joi from "joi";
import controllerErrorHandler from "../utiles/ControllerErrorHandler.js";
import CustomError from "../utiles/CustomError.js";
import productModel from "../models/productModel.js";
import { FilterQuery } from "../utiles/FilterQuery.js";
import { uploadImageToCloud } from "../utiles/handleImageUplods.js";

// create product route
export const createProduct = controllerErrorHandler(async (req,res,next)=>{
 
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number(),
        totalRating: Joi.number(),
        totalComments: Joi.number()
    })
    const {error} = schema.validate(req.body);

    if(error) return next(error)


    const images = req.files;

   const uploadPromises = images.map((image) => uploadImageToCloud(image.path));

   let cloudinaryResponses = await Promise.all(uploadPromises).catch((error) => {
    console.error('Error during Cloudinary upload:', error);
    return new CustomError(400,"Error during Cloudinary upload")
   });

  const imagesResult = cloudinaryResponses.map(response => ({
    public_id:response.public_id,
    url:response.secure_url
  }))

  req.body.image = [...imagesResult]

    const product = await productModel.create(req.body)

    res.status(201).json({
        success:true,
        message:"product created successfully...",
        product

    })

})

// get all products
export const getAllProductController = controllerErrorHandler(async (req,res,next)=>{

     const products = await productModel.find().populate({ path: 'reviews.user',
     select: 'name email',
     options: { strictPopulate: false}})

     res.status(200).json({
      success:true,
      totalProducts:products.length,
      products

  })

})


// add review route
export const addReviewController = controllerErrorHandler(async (req,res,next)=>{

const {productId,rating,comment} = req.body


      const product = await productModel.findById({_id:productId})

      if(!product) return next(new CustomError(400,"product not found"))

      const findReview = product.reviews.findIndex(review=> review.user.toString() === req.user._id.toString())

      if(findReview === -1)
      {
        let userComment= {
          user:req.user._id,
          rating,
          comment
        }


        product.reviews.push(userComment)
        await product.save({validateBeforeSave:false})
  
        res.status(200).json({
          success:true,
          message:"review added successfully....",
          product
          
    
      })
  
      }else{
         
        product.reviews[findReview].rating = rating;
        product.reviews[findReview].comment =comment;

        await product.save({validateBeforeSave:false})
  
        res.status(200).json({
          success:true,
          message:"review updated successfully....",
          product
          
    
      })

      }
})


// get product after filtering
export const getFilterProductController = controllerErrorHandler(async (req,res,next)=>{

  let recordsPerPage = 1
  let search = new FilterQuery(req.query,productModel).searchByKeyWord().searchByAmount().setLimit(recordsPerPage)
  let product = await search.query
       
       res.status(200).json({
        success:true,
        totalProducts:product.length,
        product
        
  
    }) 


})


// get single product
export const getSingleProduct = controllerErrorHandler(async (req,res,next)=>{


    const product = await productModel.findById(req.params.id).populate({ path: 'reviews.user',
    select: 'name email',
    options: { strictPopulate: false}})

    if(!product) return next(new CustomError(400,"product not found"))


    res.status(200).json({
      success:true,
      product

  })
})

// update a product
export const updateProductController = controllerErrorHandler(async (req,res,next)=>{

  const {id} = req.params

  const product = await productModel.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
   
  res.status(200).json({
    success:true,
    message:"product updated successfully...",
    product

})

})
