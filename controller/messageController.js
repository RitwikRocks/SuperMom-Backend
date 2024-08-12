import { catchAsyncError } from "../middleware/catchAsyncError.js"
import {Message} from "../models/messageSchema.js"
import ErrorHandler from "../middleware/errorMiddleware.js"

export const sendMessage = catchAsyncError(
    async(req,res,next)=>{
        const {firstName,lastName,email,phone,message} = req.body;
        if(!firstName||!lastName||!email||!phone||!message)
        {
            return next(new ErrorHandler("Please Fill the Full Form !",400))
        }
        await Message.create({firstName,lastName,email,phone,message});
        res.status(200).json({
            success:true,
            message:"Message Sent Successfully"
        })
    }
);

export const getAllMessage = catchAsyncError(async(req,res,next)=>{
    const message=await Message.find();
    res.status(200)
    .json({
        success:true,
        message,
    })
})