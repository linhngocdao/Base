import express from 'express'
import {productAdd, getProducts, productDelete} from '../controllers/product';

const routerProduct = express.Router()

routerProduct.get("/products", getProducts)
routerProduct.post("/products", productAdd)
routerProduct.delete("/products/:_id", productDelete)

export default routerProduct;