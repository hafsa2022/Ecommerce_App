import express from "express";
import * as productController from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import adminLogin from "../middlewares/adminAuthMiddleware.js";
const productRouter = express.Router();

productRouter.post(
  "/add",
  adminLogin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  productController.addProduct,
);
productRouter.delete("/:id", adminLogin, productController.removeProduct);
productRouter.get("/single/:id", productController.singleProduct);
productRouter.get("/list", productController.listProducts);

export default productRouter;
