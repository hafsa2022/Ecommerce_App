import Product from "../models/Product.js";

const createProduct = (data) => Product.create(data);

const listProducts = () => Product.find({});

const findByName = (name) => Product.findOne({ name });

const findById = (id) => Product.findById(id);

const deleteById = (id) => Product.findByIdAndDelete(id);

export { createProduct, listProducts, findByName, findById, deleteById };
