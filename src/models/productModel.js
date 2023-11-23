import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
      
    name:{
        type:String,
        required:true,
        minLength:[4,'product Name should contain more then 4 letters']
    },
    image:[{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true

            }
        }]
     ,
    description:{
        type:String,
        required:true,
    },

    price:{
        type:Number,
        required:true,
        default:0
    },

    reviews:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },

        rating:{
            type:Number,
        },
        comment:{
            type:String,
        }
         
    }],
    totalRating:{
        type:Number,
        default:0
    },

    totalComments:{
        type:Number,
        default:0
    }

})
const productModel = mongoose.model('product',productSchema)

export default productModel;