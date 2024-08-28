import mongoose from "mongoose";
import validator from "validator";

const productSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please Provide a Valid Email !"]
    },
    name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
    },
    productImage:{ 
        public_id:String,
        url:String,
    },
    price: {
        type:String,
        required:true,
    },
    description:{
        type:String,
    } 
})

export const Product = mongoose.model("Product",productSchema);