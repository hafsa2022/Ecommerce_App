import * as productRepository from "../repositories/productRepository.js";

const addProduct = async (data) => {
  const product = await productRepository.createProduct(data);
  return { product };
};
const listProduct = async (req, res) => {};
const removeProduct = async (req, res) => {};
const singleProduct = async (req, res) => {};

export { addProduct, listProduct, removeProduct, singleProduct };
