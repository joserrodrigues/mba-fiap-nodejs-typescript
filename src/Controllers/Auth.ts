import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../Models/User";
import {validationResult } from 'express-validator';
import bcrypt from 'bcryptjs'
import TokenInfo from '../Types/TokenInfo'
import jwt from 'jsonwebtoken'
import 'dotenv/config' 


const signUp = (request: Request, response: Response, next: NextFunction) => {
    console.log("User SignUp");

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const userBody = request.body as IUser;

    bcrypt.hash(userBody.password, 12)
    .then((hashedPw:string)=> {
        userBody.password = hashedPw
        return User.create(userBody)    
    })
    .then((user: IUser | null) => {
        response.status(200).json({
            message: "User created successfully",        
            userId: user?._id 
        })
    })
    .catch((err:any) => {
        response.status(500).json({
             errors: ['unknown error']
        })
    })
}


const login = (request: Request, response: Response, next: NextFunction) => {
    console.log("Login User");
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const userBody = request.body as IUser;    
    let loadedUser:IUser;

    User.findOne<IUser>({email: userBody.email}, function (err:any, adventure:IUser) {

    });

    User.findOne({email: userBody.email})
    .then( (user: IUser | null) => {
        if(!user){            
            return false;
        }
        loadedUser = user;
        return bcrypt.compare(userBody.password, user.password);
    })
    .then((isEqual:boolean) => {
        if (!loadedUser){
            response.status(401).json({ errors: ['User not found'] });
            return;
        }
        if(!isEqual){
            response.status(401).json({ errors: ['Wrong Password'] });
            return;
        }

        const tokenInfo: TokenInfo = {
            email: loadedUser.email,
            id: loadedUser._id.toString()
        }

        const token = jwt.sign(tokenInfo,
        process.env.KEY_CRYPT+"", 
        {expiresIn: '1h'});
        response.status(200).json({
            token: token,
            userId: loadedUser._id.toString()
        });        
    })
    .catch(err => {
        return response.status(500).json({ errors: ['Unknown error'] });
    }) 
}

export {
    signUp,
    login
}