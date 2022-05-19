import express from "express"
import {getProducts, getProduct, addProduct, editProduct} from '../Controllers/Product'
import { body } from 'express-validator';
import { Auth } from '../Middlewares/Auth'


const router = express.Router();

// GET /manageProducts/products
router.get('/products', Auth, getProducts)
router.get('/product/:prodID', Auth, getProduct);
router.put('/product', [
    body('_id').trim().isLength({ min: 2 }),
    body('title').trim().isLength({ min: 7 }),
    body('type').trim().isLength({ min: 7 }),
], editProduct);
router.post('/product', Auth,  [
    body('title').trim().isLength({ min: 7 }),
    body('type').trim().isLength({ min: 7 }),
], addProduct);


export default router