import * as orderRepository from "../repositories/orderRepository.js";
import * as userRepository from "../repositories/userRepository.js";
import Stripe from "stripe";

// Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
const placeOrderStripe = async (data, headers) => {
  try {
    const { userId, items, address } = data;
    const { origin } = headers;

    if (!userId || !items?.length || !address) {
      throw new Error("Missing required order data");
    }

    const deliveryCharges = 10;
    const currency = "MAD";

    // 1 Recalcul total côté backend (NE JAMAIS faire confiance au frontend)
    const productsTotal = items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const finalAmount = productsTotal + deliveryCharges;

    // 2 Créer commande en base
    const orderData = {
      userId,
      items,
      amount: finalAmount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = await orderRepository.createOrder(orderData);

    // 3 Préparer Stripe line_items
    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Stripe = centimes
      },
      quantity: item.quantity,
    }));

    // Ajouter frais livraison
    line_items.push({
      price_data: {
        currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    // 4 Créer session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      metadata: {
        orderId: newOrder._id.toString(),
        userId: userId.toString(),
      },
    });

    return { session_url: session.url };
  } catch (error) {
    console.error("Stripe Order Error:", error);
    throw new Error("Failed to create Stripe order");
  }
};

// Verify Stripe
const verifyStripe = async (data) => {
  const { userId, orderId, success } = data;
  if (success === "true") {
    await orderRepository.findByIdAndUpdatePayment(orderId, { payment: true });
    await userRepository.findByIdAndUpdate(userId, { cardData: {} });
    return { status: true };
  } else {
    await orderRepository.findByIdAndDelete(orderId);
    return { status: false };
  }
};

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
  const { orderId, status } = data;
  await orderRepository.findByIdAndUpdate(orderId, status);
  return { message: "Status Updated" };
};

export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  allOrders,
  userOrders,
  updateStatus,
};
