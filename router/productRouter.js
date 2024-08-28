import express from 'express';
import {postProduct,getAllProduct, deleteProduct, getProduct} from "../controller/Product/productController.js";
import { isAdminAuthenticated } from '../middleware/auth.js';
import { filterProduct, getCategoryWiseProduct, getCategoryWiseProductOne, searchProduct } from '../controller/Product/filterProductController.js';

const router = express.Router();

router.post("/send",isAdminAuthenticated,postProduct);
router.get("/getall",getAllProduct);
router.get("/getproduct/:id",getProduct);
router.delete("/delete/:id",isAdminAuthenticated,deleteProduct);
router.get("/get-categoryProduct",getCategoryWiseProductOne);
router.get("/search",searchProduct);
router.post("/filter-product",filterProduct);
router.post("/category-product",getCategoryWiseProduct);

export default router;