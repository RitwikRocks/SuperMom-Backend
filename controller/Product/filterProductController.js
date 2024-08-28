import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import ErrorHandler from "../../middleware/errorMiddleware.js";
import { Product } from "../../models/productSchema.js";


export const filterProduct = catchAsyncError(async(req,res,next)=>{
    try{
        const categoryList = req?.body?.category || []

        const product = await Product.find({
            category :  {
                "$in" : categoryList
            }
        })

        res.json({
            data : product,
            message : "product",
            error : false,
            success : true
        })
 }catch(err){
    
    return next(new ErrorHandler("Filter Product Error",404));
 }
})

export const getCategoryWiseProduct = catchAsyncError(async(req,res,next)=>{
    try{
        const { category } = req?.body || req?.query
        const product = await Product.find({ category })
        console.log(req.body);
        res.status(200).
        json({
            data : product,
            message : "Product",
            success : true,
            error : false
        })
    }catch(err){
        return next(new ErrorHandler("Get Category Wise Product Error",404));
    }
})

export const getCategoryWiseProductOne = catchAsyncError(async(req,res,next)=>{
    try{
        const productCategory = await Product.distinct("category")

        console.log("category",productCategory)

        //array to store one product from each category
        const productByCategory = []

        for(const category of productCategory){
            const product = await Product.findOne({category })

            if(product){
                productByCategory.push(product)
            }
        }


        res.status(200).json({
            message : "category product",
            data : productByCategory,
            success : true,
            error : false
        })


    }catch(err){
        return next(new ErrorHandler("Get Category Wise Product One Error",404));
    }
})

export const searchProduct = catchAsyncError(async(req,res,next)=>{
        try{
            const query = req.query.q 
    
            const regex = new RegExp(query,'i','g')
    
            const product = await productModel.find({
                "$or" : [
                    {
                        productName : regex
                    },
                    {
                        category : regex
                    }
                ]
            })
    
    
            res.status(200).
            json({
                data  : product ,
                message : "Search Product list",
                error : false,
                success : true
            })
        }catch(err){
            return next(new ErrorHandler("Get Category Wise Product One Error",404));
        }
    }
)