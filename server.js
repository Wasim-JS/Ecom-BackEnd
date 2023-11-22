import dotenv from 'dotenv'
import { app } from "./src/app.js";
import { connectToDatabase } from './src/DB/db.js';
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

