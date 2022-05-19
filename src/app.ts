import express from "express"
import manageProductsRoutes from './Routes/ManageProducts'
import manageLogin from './Routes/ManageLogin'
import mongoose from 'mongoose'
import 'dotenv/config' 
import {} from './Types/global'

const app = express()

app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded
app.use(express.json())// json

app.use('/manageProducts', manageProductsRoutes);
app.use('/auth', manageLogin);

try {
    mongoose.connect(process.env.DB_CONNECTION+"",
    {  },
    () => {
        console.log("Start Listening");        
        app.listen(process.env.PORT)
    });    
} catch ( error ){
    console.log(error);
}