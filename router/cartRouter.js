import express from 'express';
import { isAdminAuthenticated } from '../middleware/auth.js';
import {addToCart,countAddToCardProduct,addToCartViewProduct,updateAddToCartProduct,deleteAddToCartProduct} from '../controller/Cart/cartController.js';

const router = express.Router();
router.post("/addtocart",isAdminAuthenticated,addToCart);
router.get("/countAddToCartProduct",isAdminAuthenticated,countAddToCardProduct);
router.get("/view-card-product",isAdminAuthenticated,addToCartViewProduct);
router.post("/update-cart-product",isAdminAuthenticated,updateAddToCartProduct);
router.post("/delete-cart-product",isAdminAuthenticated,deleteAddToCartProduct);


export default router;