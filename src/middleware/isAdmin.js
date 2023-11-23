import controllerErrorHandler from "../utiles/ControllerErrorHandler.js"
import CustomError from "../utiles/CustomError.js";

export const isAdmin = controllerErrorHandler(async (req,res,next) =>{

     if(req.user.role !== "admin") return next(new CustomError(401,"You don't have Access to this resource"))
    
     next();

});