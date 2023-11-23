import Joi from "joi";
import controllerErrorHandler from "../utiles/ControllerErrorHandler.js";
// import CustomError from "../utiles/CustomError.js";
import productModel from "../models/productModel.js";


export const createProduct = controllerErrorHandler(async (req,res,next)=>{

    let images = Joi.object().keys({
        public_id: Joi.string().required(),
        url: Joi.string().required(),
      })

      let review = Joi.object().keys({
        user: Joi.string().required(),
        rating: Joi.number(),
        comment: Joi.string(),
      })
      
    const schema = Joi.object({
        name: Joi.string().required(),
        image: images,
        description: Joi.string().required(),
        price: Joi.number().required(),
        reviews: review,
        totalRating: Joi.number(),
        totalComments: Joi.number()
    })
    const {error} = schema.validate(req.body);

    if(error) return next(error)

    const product = await productModel.create(req.body)

    res.status(201).json({
        success:true,
        message:"product created successfully...",
        product

    })

})