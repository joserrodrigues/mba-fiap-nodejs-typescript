import express from "express"
import {getProducts, getProduct, addProduct, editProduct} from '../Controllers/Product'
import { body } from 'express-validator';


const router = express.Router();

// GET /manageProducts/products
router.get('/products', getProducts)
router.get('/product/:prodID', getProduct);
router.put('/product', [
    body('prodID').trim().isLength({ min: 2 }),
    body('title').trim().isLength({ min: 7 }),
    body('type').trim().isLength({ min: 7 }),
], editProduct);
router.post('/product', [
    body('title').trim().isLength({ min: 7 }),
    body('type').trim().isLength({ min: 7 }),
], addProduct);


export default router