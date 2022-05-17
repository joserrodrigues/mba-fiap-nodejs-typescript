import { Request, Response, NextFunction } from "express";
import { Product } from "../Models/Product";


const getProducts = (request: Request, response: Response, next: NextFunction) => {
    const products: Product[] = []
    products.push({
        title: 'Maquina de Lavar',
        type: 'Eletroméstico'
    })    
    
    response.status(200).json(products)
}

export {
    getProducts
}