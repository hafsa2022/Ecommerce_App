import Product from "../models/Product.js";

const createProduct = (data) => Product.create(data);

const findByName = (name) => Product.findOne({ name });

const findById = (id) => Product.findById(id);

export { createProduct, findByName, findById };
