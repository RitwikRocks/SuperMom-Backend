import mongoose from "mongoose";

export const dbConnection = async function(){
    try{
        await mongoose.connect(process.env.MONGO_URI,{
        dbName:process.env.MONGO_DB_NAME}
        )
        console.log("Connected to DataBase");
    }catch(error){
        console.log("Ritwik Error Occured in the MongoDB Connection", error);
        process.exit(1)
    }
}

