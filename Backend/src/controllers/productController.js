import * as productService from "../services/productService.js";
import { v2 as cloudinary } from "cloudinary";
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      subCategory,
      price,
      sizes,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (image) => image != undefined,
    );
    let imagesUrl = await Promise.all(
      images.map(async (img) => {
        let result = await cloudinary.uploader.upload(img.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    const result = await productService.addProduct({
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
    });
    res.status(201).json({ status: true, message:result.message });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const result = await productService.listProducts();
    res.status(200).json({ status: true, ...result });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await productService.removeProduct(productId);

    res.status(200).json({
      status: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

const singleProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await productService.singleProduct(productId);

    res.status(200).json({
      status: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
