import mongoose from 'mongoose';

const addToCartSchema = new mongoose.Schema(
    {
        productId : {
            ref : 'product',
            type : String,
       },
       quantity : Number,
       userId : String,
      },{
        timestamps : true
    }
)

export const addToCartModel = mongoose.model("addToCart",addToCartSchema);