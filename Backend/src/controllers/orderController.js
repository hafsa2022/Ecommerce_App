import * as orderService from "../services/orderService.js";

// Placing Orders using COD Method
const placeOrder = async (req, res) => {
  try {
    const result = await orderService.placeOrder(req.body);
    res.status(200).json({ status: true, message: result.message });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

// Placing Orders using Stripe Method
const placeOrderStripe = async (req, res) => {
  try {
    const result = await orderService.placeOrderStripe(req.body, req.headers);
    res.status(200).json({ status: true, session_url: result.session_url });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

// Verify Stripe
const verifyStripe = async (req, res) => {
  try {
    const result = await orderService.verifyStripe(req.body, req.headers);
    res.status(200).json(result);
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

// All Orders data forAdmin Panel
const allOrders = async (req, res) => {
  try {
    const result = await orderService.allOrders();
    res.status(200).json({ status: true, ...result });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

// All orders data for User Frontend
const userOrders = async (req, res) => {
  try {
    const result = await orderService.userOrders(req.body);
    res.status(200).json({ status: true, ...result });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

// Update Order status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const result = await orderService.updateStatus(req.body);
    res.status(200).json({ status: true, ...result });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  allOrders,
  userOrders,
  updateStatus,
};
