import product from "../models/product";
import formatResponse from "../utils/formatRespone";
import slugify from 'slugify';

export const getProducts = async (req, res) => {
    try {
        const products = await product.find().sort({ createdAt: -1 });
        res.json(formatResponse(200, 'Success', products.length, products));
    } catch (error) {
        res.json(formatResponse(500, 'Error', null, null));
    }
}

export const productAdd = async (req, res) => {
    req.body.slug = slugify(req.body.name);
    try {
        const existingProduct = await product.findOne({ slug: req.body.slug });
        if (existingProduct) {
            return res.json(formatResponse(400, 'Error', null, 'Product with this slug already exists'));
        }
        const newProduct = new product(req.body);
        const savedProduct = await newProduct.save();
        res.json(formatResponse(200, 'Success', null, savedProduct));
    } catch (error) {
        res.json(formatResponse(500, 'Error', null, null));
    }
}
