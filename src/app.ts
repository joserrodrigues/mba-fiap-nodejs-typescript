import express from "express"
import manageProductsRoutes from './Routes/ManageProducts'

const app = express()

app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded
app.use(express.json())// json

app.use('/manageProducts', manageProductsRoutes);

app.listen(80)