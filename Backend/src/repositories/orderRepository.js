import Order from "../models/Order.js";

const createOrder = (data) => Order.create(data);

const userOrdersByUserId = (userId) => Order.find({ userId });

const allOrders = () => Order.find({});

const findByIdAndUpdate = (id, status) =>
  Order.findByIdAndUpdate(id, { status });

const findByIdAndUpdatePayment = (id, payment) =>
  Order.findByIdAndUpdate(id, payment);
const findByIdAndDelete = (id) => findByIdAndDelete(id);

export {
  createOrder,
  userOrdersByUserId,
  allOrders,
  findByIdAndUpdate,
  findByIdAndUpdatePayment,
  findByIdAndDelete,
};
