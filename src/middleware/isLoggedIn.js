import registerModel from "../models/registerModel.js";
import controllerErrorHandler from "../utiles/ControllerErrorHandler.js"
import CustomError from "../utiles/CustomError.js";
import jwt from 'jsonwebtoken'

export const isLoggedIn = controllerErrorHandler(async (req,res,next) =>{

    const { token } = req.cookies

    if(!token) return next(new CustomError(401,'UnAuthorized Access'))
     
    const { id } = jwt.verify(token,process.env.TOKEN_SECRET)

    let user = await registerModel.findById({_id:id})

    req.user = user;
    next();


});