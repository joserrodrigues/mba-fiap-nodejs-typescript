import express from "express"
import manageProductsRoutes from './Routes/ManageProducts'
import mongoose from 'mongoose'

const app = express()

app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded
app.use(express.json())// json

app.use('/manageProducts', manageProductsRoutes);

try {
    mongoose.connect('mongodb+srv://fiapclass:QPc7IoIj5bPEPWKG@cluster0.omroh.mongodb.net/?retryWrites=true&w=majority',
    {  },
    () => {
        console.log("Start Listening");        
        app.listen(80)
    });    
} catch ( error ){
    console.log(error);
}