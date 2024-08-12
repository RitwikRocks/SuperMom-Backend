import mongoose from 'mongoose';
import validator from 'validator';

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First Name Must Contains Atleast 3 characters"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"First Name Must Contains Atleast 3 characters"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please Provide a Valid Email !"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10, "Phone Number Must Contain MIN 10 digit"],
        maxLength:[13, "Phone Number Must Contain MAX 13 character"]
    },
    message:{
        type:String,
        required:true,
        minLength:[5, "Message Must Contain Atleast 5 character"]
    },
})

export const Message = mongoose.model("Message",messageSchema);