import * as productService from "../services/productService.js";

const addProduct = async (req, res) => {
  try {
    const result = await productService.addProduct(req.body);
    res.status(201).json({ status: true, ...result });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};
const listProduct = async (req, res) => {};
const removeProduct = async (req, res) => {};
const singleProduct = async (req, res) => {};

export { addProduct, listProduct, removeProduct, singleProduct };
