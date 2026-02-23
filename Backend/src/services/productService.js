import * as productRepository from "../repositories/productRepository.js";

const addProduct = async (data) => {
  // console.log(data);
  const product = await productRepository.createProduct(data);
  return { product, message: "Product Added successfully" };
};
const listProducts = async () => {
  const products = await productRepository.listProducts();
  return { products };
};
const removeProduct = async (productId) => {
  const product = await productRepository.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  await productRepository.deleteById(productId);

  return { message: "Product deleted successfully" };
};
const singleProduct = async (productId) => {
  const product = await productRepository.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  return { product };
};

export { addProduct, listProducts, removeProduct, singleProduct };
