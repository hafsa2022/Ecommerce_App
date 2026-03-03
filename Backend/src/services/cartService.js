import * as userRepository from "../repositories/userRepository.js";

// Add products to user cart
const addToCart = async (data) => {
  // console.log(data);
  const userData = await userRepository.findById(data.userId);
  let cartData = await userData.cartData;
  if (cartData[data.productId]) {
    if (cartData[data.productId][data.size]) {
      cartData[data.productId][data.size] += 1;
    } else {
      cartData[data.productId][data.size] = 1;
    }
  } else {
    cartData[data.productId] = {};
    cartData[data.productId][data.size] = 1;
  }
  await userRepository.findByIdAndUpdate(data.userId, cartData);
  return { message: "Added To Cart" };
};

const updateCart = async (data) => {
  const userData = await userRepository.findById(data.userId);
  let cartData = await userData.cartData;
  cartData[data.productId][data.size] = data.quantity;
  await userRepository.findByIdAndUpdate(data.userId, cartData);
  return { message: "Cart Updated" };
};

const getUserCart = async (data) => {
  const userData = await userRepository.findById(data.userId);
  let cartData = await userData.cartData;
  return { cartData };
};

const removeFromCart = async (data) => {
  const user = await userRepository.findById(data.userId);
  let cartData = user.cartData;

  if (!cartData[data.productId] || !cartData[data.productId][data.size]) {
    throw new Error("Product not found in cart");
  }

  cartData[data.productId][data.size] = 0;

  // Remove size if 0
  if (cartData[data.productId][data.size] <= 0) {
    delete cartData[data.productId][data.size];

    // Remove product if empty
    if (Object.keys(cartData[data.productId]).length === 0) {
      delete cartData[data.productId];
    }
  }

  await userRepository.findByIdAndUpdate(data.userId, cartData);

  return { message: "Product Item removed from cart" };
};

export { addToCart, updateCart, getUserCart, removeFromCart };
