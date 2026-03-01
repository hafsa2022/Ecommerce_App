import express from "express";
import * as orderController from "../controllers/orderController.js";
import authUser from "../middlewares/auth.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", adminAuthMiddleware, orderController.allOrders);
orderRouter.post("/status", adminAuthMiddleware, orderController.updateStatus);

// Payment Features
orderRouter.post("/place", authUser, orderController.placeOrder);
orderRouter.post("/stripe", authUser, orderController.placeOrderStripe);

// User Features
orderRouter.post("/userorders", authUser, orderController.userOrders);


export default orderRouter;
