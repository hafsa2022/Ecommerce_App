import express from "express";
import * as cartController from "../controllers/cartController.js";
import authUser from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.post("/get", authUser, cartController.getUserCart);
cartRouter.post("/add", authUser, cartController.addToCart);
cartRouter.post("/update", authUser, cartController.updateCart);
cartRouter.post("/remove", authUser, cartController.removeFromCart);

export default cartRouter;
