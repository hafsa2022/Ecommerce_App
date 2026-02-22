import express from "express";
import * as productController from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/add", productController.addProduct);
productRouter.post("/remove", productController.removeProduct);
productRouter.get("/sigle", productController.singleProduct);
productRouter.get("/list", productController.listProduct);

export default productRouter;
