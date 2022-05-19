
import express from "express"
import { body } from 'express-validator';

import User, { IUser } from '../Models/User'
import { signUp, login } from "../Controllers/Auth";

const router = express.Router();

// GET /auth/signup
router.put('/signup',[
    body('email').isEmail()
    .withMessage('Please enter a valid email')
    .custom((value, { req }) => {
        return User.findOne({ email: value })
                .then((userDoc: IUser | null) => {
                    if (userDoc) {
                        return Promise.reject('E-Mail address already exists!');
                    }
                });
    })
    .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().not().isEmpty(),
], signUp);

router.post('/login', [
    body('email').trim().isLength({ min: 7 }),
    body('password').trim().not().isEmpty()
], login);


export default router