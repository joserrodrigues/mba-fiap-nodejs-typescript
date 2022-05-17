import { Request, Response, NextFunction } from "express";
import { Product } from "../Models/Product";
import {validationResult } from 'express-validator';

let allProducts:Product[] = []

const getProducts = (request: Request, response: Response, next: NextFunction) => {         
    response.status(200).json(allProducts)
}


const getProduct = (request: Request, response: Response, next: NextFunction) => {
    
    const prodID = request.params.prodID;
    const product:Product = allProducts.filter(productArray => productArray.prodID === prodID)[0];
    
    response.status(200).json(product)
}

const addProduct = (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }    

    const product = request.body as Product;
    
    product.prodID = new Date().getTime().toString();
    allProducts.push(product)    
    response.status(200).json(product)
}

const editProduct = (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }    

    const product = request.body as Product;
    let newAllProducts = allProducts.filter(productArray => productArray.prodID !== product.prodID)
    
    allProducts = [...newAllProducts, product];
    console.log(product);
    
    response.status(200).json(product)
}

export {
    getProducts,
    getProduct,
    addProduct,
    editProduct
}