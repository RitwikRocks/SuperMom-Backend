import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import {Product} from "../../models/productSchema.js";
import ErrorHandler from "../../middleware/errorMiddleware.js";
import cloudinary from 'cloudinary';

export const postProduct = catchAsyncError(async(req,res,next)=>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Product Image Required", 400));
      }
    
      const {productImage} = req.files;
      const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedFormats.includes(productImage.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
      }
    const {email,name,category,price,description} = req.body;
    if(!email || !name || !category ||!price ||!description){
        return next(new ErrorHandler("Please Provide Full Details of Product",400));
    };

    const cloudinaryResponse = await cloudinary.uploader.upload(
        productImage.tempFilePath
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error on Products:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(
          new ErrorHandler("Failed To Upload Product Image To Cloudinary", 500)
        );
      }

      const product = await Product.create({
        email,
        name,
        category,
        productImage:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        },
        price,
        description,
      })

      res.status(200)
      .json({
        success:true,
        message:"New Product Registered!",
        product,
      })

});

export const getAllProduct = catchAsyncError(async(req,res,next)=>{
    const products = await Product.find();
    res.status(200)
    .json({
        success:true,
        products,
    })
})

export const deleteProduct = catchAsyncError(async(req,res,next)=>{
  const {id} = req.params;
  let product = await Product.findById(id);
  if(!product){
    return next(new ErrorHandler("Product not Found !",404));
  }
  await product.deleteOne();
  res.status(200)
  .json({
    success:true,
    message:"Product Deleted Successfully !",
  })
})

export const getProduct = catchAsyncError(async(req,res,next)=>{
  const {id} = req.params;
  let product = await Product.findById(id);
  if(!product){
    return next(new ErrorHandler("Product not Found !",404));
  }
  res.status(200)
  .json({
    success:true,
    product,
  })
})

