import express from "express"
import manageProductsRoutes from './Routes/ManageProducts'

const app = express()

app.use('/manageProducts', manageProductsRoutes);

app.listen(80)