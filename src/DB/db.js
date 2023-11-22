import mongoose from "mongoose";

 export async function connectToDatabase()
{
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('connection to database is successfull...');
    } catch (error) {

        console.log('ERROR IN DATABASE CONNECTION ',error);
        
    }
}