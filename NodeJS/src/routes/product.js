import express from 'express'
import { productAdd, getProducts } from '../controllers/product';

const routerProduct = express.Router()

routerProduct.get("/products", getProducts)
routerProduct.post("/products", productAdd)

export default routerProduct;