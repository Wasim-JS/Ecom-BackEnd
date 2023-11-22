import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const registerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:[true,"please provide the password"],
    },
    sercretQuestion:{
        type:String,
        required:[true,"please provide a secret answer"],
    },
    role:{
        type:String,
        default:"customer"
    }
})

registerSchema.pre('save',async function(next){

    if(!this.isModified('password')) next()
      this.password = await bcrypt.hash(this.password,10)

})

// Method to Compare Password
registerSchema.methods.camparePassword = async function(password){
     
    return await bcrypt.compare(password,this.password)
}

// Method to Create Token
registerSchema.methods.createToken = function(){
     
    return jwt.sign({id:this._id},process.env.TOKEN_SECRET,{expiresIn:process.env.TOKEN_EXPRIES})
}

// Creating Register Model
const registerModel = mongoose.model('User',registerSchema)

export default registerModel;