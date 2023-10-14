import express from 'express';
const router = express.Router();
import {addCategory,getCat,getSubCat,getCategory,subcategories} from '../Controllers/categoryController.js';
import {addProduct } from '../Controllers/productController.js'

router.post('/addCat',addCategory);
router.get('/getCat',getCat);
router.get('/getSubCat',getSubCat);
router.post('/addProduct',addProduct);
router.get("/getCategory", getCategory);
router.get("/subcategories", subcategories);


export default router;