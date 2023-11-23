import registerModel from '../models/registerModel.js'
import controllerErrorHandler from '../utiles/ControllerErrorHandler.js';
import CustomError from '../utiles/CustomError.js';
import Joi from 'joi'

// user register controller
export const registerController = controllerErrorHandler(async(req,res,next) =>{

    const {name,phone,place,email,password,sercretQuestion} = req.body;
    if(!name || !phone ||!place ||!email ||!password || !sercretQuestion) return next(new CustomError(400,"All Fields are Requried.."))

    const schema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        place: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        sercretQuestion: Joi.string().required()
    })
    const {error} = schema.validate(req.body);
    if(error) return next(error)
     
        const userExists = await registerModel.findOne({email})
          
        if(userExists) return next(new CustomError(400,"email already taken"))

        let user = new registerModel({name,phone,place,email,password,sercretQuestion})
        await user.save()
        return res.status(200).json({
            success:true,
            message:"user created successfully....."
        })
    
    
});

// user login controller
export const loginController = controllerErrorHandler(async (req,res,next) => {

    const {email,password} = req.body
    if(!email || !password) return next(new CustomError(400,"Invalid credentials"))
       
    // Checking that the email is the registred email or not
    const user = await registerModel.findOne({email})
    if(!user) return next(new CustomError(400,"Invalid credentials"))

    // Comparing the passwords
    const isPasswordMatch = await user.camparePassword(password)
    if(!isPasswordMatch) return next(new CustomError(400,"Invalid credentials"))
     let token = user.createToken()
    return res.cookie("token",token,{maxAge:5*24*60*60*1000,httpOnly:true,secure:true}).status(200).json({
        success:true,
        message:"Login Successfull..",
    })

});

// user logout controller
export const logoutController = controllerErrorHandler((req,res,next) =>{

    return res.cookie("token",'',{maxAge: new Date(1),httpOnly:true,secure:true}).status(200).json({
        success:true,
        message:"Logout Successfull..",
    })

})

// user forgot password controller
export const forgotPasswordController = controllerErrorHandler(async (req,res,next) =>{
 
    const {sercretQuestion,email,newPassword} = req.body;
    
    let user = await registerModel.findOne({email})
    if(!user) return next(new CustomError(400,"This is not a Registered Email"))
     
    if(user.sercretQuestion !== sercretQuestion) return next(new CustomError(400,"Wrong Answer"))
     
    user.password = newPassword;
    await user.save()

    return res.status(200).json({
        success:true,
        message:"Password Changed Successfully....."
    })
})