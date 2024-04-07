import product from "../models/product";
import formatResponse from "../utils/formatRespone";
import slugify from "slugify";

export const getProducts = async (req, res) => {
  try {
    const products = await product.find().sort({ createdAt: -1 });
    res.json(formatResponse(200, "Success", products.length, products));
  } catch (error) {
    res.json(formatResponse(500, "Error", null, null));
  }
};

export const productAdd = async (req, res) => {
  req.body.slug = slugify(req.body.name);
  try {
    const updatedProduct = await product.findOneAndUpdate(
      { slug: req.body.slug },
      req.body,
      { new: true, upsert: true }
    );
    res.json(formatResponse(200, "Success", null, updatedProduct));
  } catch (error) {
    res.json(formatResponse(500, "Error", null, null));
  }
};

export const productDelete = async (req, res) => {
  try {
    const deletedProduct = await product.findOneAndDelete({ _id: req.params._id });
    res.json(formatResponse(200, "Success", null, deletedProduct));
  } catch (error) {
    res.json(formatResponse(500, "Error", null, null));
  }
};
