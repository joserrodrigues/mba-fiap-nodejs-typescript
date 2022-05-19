import { Request, Response, NextFunction } from "express";
// import { Product } from "../Interfaces/Product";
import {validationResult } from 'express-validator';
import Product, {IProduct} from '../Models/Product';

const getProducts = (request: Request, response: Response, next: NextFunction) => {         
    Product.find()
        .sort({ title: 'asc' })
        .then((products: IProduct[]) => {
            response.status(200).json({
                products: products
            });
        })
        .catch((err: any) => {
            console.log(err);
        });
}


const getProduct = (request: Request, response: Response, next: NextFunction) => {
    
    const prodID = request.params.prodID;

    Product.findById(prodID)
        .then((product: IProduct | null) => {
            response.status(200).json({
                product: product
            });
        })
        .catch(err => {
            console.log(err);
        });            
}

const addProduct = (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }    

    const bodyProduct = request.body as IProduct;
    Product.create(bodyProduct).then((saveProduct: IProduct) => {        
        response.status(200).json({
            codeInfo: {
                id: 1,
                message: "Product create successfully",
            },
            product: saveProduct
        });
    })
    .catch(err => {
        console.log(err);
    })    
}

const editProduct = (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }    

    let updatedProduct:IProduct;
    const bodyProduct = request.body as IProduct;
    Product.findById(bodyProduct._id)
        .then((product: IProduct | null) => {
            if (!product) {
                console.log("Error not found")
                return null;
            } else {
                product.title = bodyProduct.title;
                product.type = bodyProduct.type;
                updatedProduct = product;
                return product.save();
            }
        })
        .then((saveProduct: IProduct | null) => {        
            response.status(200).json({
                codeInfo: {
                    id: 1,
                    message: "Product updated successfully",
                },
                product: saveProduct
            });
        })        
        .catch(err => {
            console.log(err);
        });    
}
const deleteProduct = (request: Request, response: Response, next: NextFunction) => {
    const prodID = request.params.prodID;

    Product.findByIdAndRemove(prodID)
        .then((product: IProduct | null) => {
            response.status(200).json({
                    id: 1,
                    message: "Product removed successfully",
                });
        })
        .catch(err => {
            console.log(err);
        });    
}

export {
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    deleteProduct
}