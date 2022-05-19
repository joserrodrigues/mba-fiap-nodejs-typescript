import { Request, Response, NextFunction } from "express";
import TokenInfo from '../Types/TokenInfo'
import jwt from 'jsonwebtoken'
import 'dotenv/config' 

const Auth = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.get('Authorization');
    if(!authHeader){
        response.status(401).json({ errors: ['Without Authentication'] });
        return null;
    }

    const token = authHeader.split(' ')[1];
    let dToken:TokenInfo;
    console.log(token);
    try{
        dToken = jwt.verify(token, process.env.KEY_CRYPT+"") as TokenInfo;
    } catch (err){
        console.log("ERro aqui");
        console.log(err);
        
        response.status(401).json({ errors: ['Bad Token Format'] });
        return null;
    }

    if (!dToken){
        response.status(401).json({ errors: ['Without Authentication'] });
        return null;
    }

    request.userID = dToken.id;
    next();
}

export {
    Auth
}