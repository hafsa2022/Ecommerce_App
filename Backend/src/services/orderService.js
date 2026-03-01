import * as orderRepository from "../repositories/orderRepository.js";
import * as userRepository from "../repositories/userRepository.js";
// Placing Orders using COD Method
const placeOrder = async (data) => {
  const { userId, items, amount, address } = data;
  const orderData = {
    userId,
    items, //products
    amount,
    address,
    paymentMethod: "COD",
    payment: false,
    date: Date.now(),
  };
  await orderRepository.createOrder(orderData);
  await userRepository.findByIdAndUpdate(userId, { cardData: {} });
  return { message: "Order Placed" };
};

// Placing Orders using Stripe Method
const placeOrderStripe = async (data) => {};

// All Orders data forAdmin Panel
const allOrders = async () => {
  const orders = await orderRepository.allOrders();
  return { orders };
};

// All orders data for User Frontend
const userOrders = async (data) => {
  const { userId } = data;
  const orders = await orderRepository.userOrdersByUserId(userId);
  return { orders };
};

// Update Order status from Admin Panel
const updateStatus = async (data) => {
  const { orderId, status} = data;
  await orderRepository.findByIdAndUpdate(orderId, status)
  return {message:"Status Updated"}

};

export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus };
