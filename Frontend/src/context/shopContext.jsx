import { createContext, useEffect, useState } from "react";
import products from "../constants/products";
import { toast } from "react-toastify";

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (productId, size) => {
    if (!size) {
      toast.error("Please select a size before adding to cart.");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = { [size]: 1 };
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let count = 0;
    for (let productId in cartItems) {
      for (let size in cartItems[productId]) {
        try {
          if (cartItems[productId] && cartItems[productId][size] > 0) {
            count += cartItems[productId][size];
          }
        } catch (error) {
          console.error(
            `Error counting cart items for product ${productId}:`,
            error,
          );
        }
      }
    }
    return count;
  };

  const removeFromCart = (productId, size) => {
    let cartData = structuredClone(cartItems);
    if (cartData[productId] && cartData[productId][size]) {
      cartData[productId][size] -= 1;
      if (cartData[productId][size] <= 0) {
        delete cartData[productId][size];
        if (Object.keys(cartData[productId]).length === 0) {
          delete cartData[productId];
        }
      }
      setCartItems(cartData);
    }
  };

  useEffect(() => {
    console.log("Cart Items Updated:", cartItems);
  }, [cartItems]);

  const value = {
    products,
    currency,
    deliveryFee: delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    removeFromCart,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export { ShopContext, ShopContextProvider };
