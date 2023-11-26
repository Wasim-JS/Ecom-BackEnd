import dotenv from 'dotenv'
import { app } from "./src/app.js";
import { connectToDatabase } from './src/DB/db.js';
import cloudinary from 'cloudinary';
dotenv.config();




//connection to DataBase
connectToDatabase().then(()=>{
    const port = process.env.PORT || 5000
    app.listen(port,()=>{
        console.log(`server is running at port ${port}`);
    })
}).catch(()=>{
    console.log('ERROR IN DB CONNECTION');
})


// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  });
