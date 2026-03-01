import * as cartService from "../services/cartService.js";

// Add products to user cart
const addToCart = async (req, res) => {
  try {
    const result = await cartService.addToCart(req.body);
    res.status(200).json({ status: true, message: result.message });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

// Update user cart
const updateCart = async (req, res) => {
  try {
    const result = await cartService.updateCart(req.body);
    res.status(200).json({ status: true, message: result.message });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

// Get user cart data
const getUserCart = async (req, res) => {
  try {
    const result = await cartService.getUserCart(req.body);
    res.status(200).json({ status: true, ...result });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

// Remove Item completely From Cart
const removeFromCart = async (req, res) => {
  try {
    const result = await cartService.removeFromCart(req.body);
    res.status(200).json({ status: true, message: result.message });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
export { addToCart, updateCart, getUserCart, removeFromCart };
