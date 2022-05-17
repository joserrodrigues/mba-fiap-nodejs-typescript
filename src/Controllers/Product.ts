import { Request, Response, NextFunction } from "express";
import { Product } from "../Models/Product";
import {validationResult } from 'express-validator';

const getProducts = (request: Request, response: Response, next: NextFunction) => {
    const products: Product[] = []
    products.push({
        infoID: "1",
        title: 'Maquina de Lavar',
        type: 'Eletroméstico'
    })    
    
    response.status(200).json(products)
}


const getProduct = (request: Request, response: Response, next: NextFunction) => {
    
    const prodID = request.params.prodID;
    const product:Product = {
        infoID: prodID,
        title: 'Maquina de Lavar',
        type: 'Eletroméstico'
    } 
    response.status(200).json(product)
}

const addProduct = (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }    

    const product = request.body as Product;
    
    console.log(product);
    
    response.status(200).json(product)
}

export {
    getProducts,
    getProduct,
    addProduct
}