import express from "express"
import {getProducts} from '../Controllers/Product'

const router = express.Router();

// GET /manageProducts/products
router.get('/products', getProducts)

export default router