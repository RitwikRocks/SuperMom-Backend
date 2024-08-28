import {addToCartModel} from '../../models/cartProductSchema.js';
import { catchAsyncError } from '../../middleware/catchAsyncError.js';
import ErrorHandler from '../../middleware/errorMiddleware.js';


export const addToCart = catchAsyncError(async(req,res,next)=>{
    try{
        const { productId } = req?.body
        const currentUser = req.userId

        const isProductAvailable = await addToCartModel.findOne({ productId })

        console.log("isProductAvailabl   ",isProductAvailable)

        if(isProductAvailable){
            return res.json({
                message : "Already exits in Add to cart",
                success : false,
                error : true
            })
        }

        const payload  = {
            productId : productId,
            quantity : 1,
            userId : currentUser,
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()


        return res.status(200)
        .json({
            data : saveProduct,
            message : "Product Added in Cart",
            success : true,
            error : false
        })
        

    }catch(err){
       return next(new ErrorHandler("add to card Error",404));
    }
});

export const addToCartViewProduct = catchAsyncError(async(req,res,next)=>{
    try{
        const currentUser = req.userId

        const allProduct = await addToCartModel.find({
            userId : currentUser
        }).populate("productId")

        res.json.status(200)
        .json({
            data : allProduct,
            success : true,
            error : false
        })

    }catch(err){
        return next(new ErrorHandler("add to card View Product Error",404));
    }
});

export const countAddToCardProduct = catchAsyncError(async(req,res,next)=>{
    try{
        const userId = req.userId

        const count = await addToCartModel.countDocuments({
            userId : userId
        })

        res.status(200)
        .json({
            data : {
                count : count
            },
            message : "ok",
            error : false,
            success : true
        })
    }catch(error){
        return next(new ErrorHandler("Count add to card Product Error",404));
    }
});

export const deleteAddToCartProduct = catchAsyncError(async(req,res,next)=>{
    try{
        const currentUserId = req.userId 
        const addToCartProductId = req.body._id

        const deleteProduct = await addToCartModel.deleteOne({ _id : addToCartProductId})

        res.status(200).
        json({
            message : "Product Deleted From Cart",
            error : false,
            success : true,
            data : deleteProduct
        })

    }catch(err){
        return next(new ErrorHandler("Delete add to card Product Error",404));
    }
});

export const updateAddToCartProduct = catchAsyncError(async(req,res,next)=>{
    try{
        const currentUserId = req.userId 
        const addToCartProductId = req?.body?._id

        const qty = req.body.quantity

        const updateProduct = await addToCartModel.updateOne({_id : addToCartProductId},{
            ...(qty && {quantity : qty})
        })

        res.status(200)
        .json({
            message : "Product Updated",
            data : updateProduct,
            error : false,
            success : true
        })

    }catch(err){
        return next(new ErrorHandler("Update add to card Product Error",404));
    }
});