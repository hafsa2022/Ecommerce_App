import { createContext, useState } from "react";
import products from "../constants/products";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = " MAD";
  // const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate()

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

  const updateQuantity = (productId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] = quantity;
      }
    }
    setCartItems(cartData);
  };

  const removeFromCart = async (productId, size) => {
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

  const getCartAmount = () => {
    let totalCart = 0;
    for (let productId in cartItems) {
      let productInfo = products.find((product) => product._id === productId);
      for (let size in cartItems[productId]) {
        try {
          if (cartItems[productId][size] > 0) {
            totalCart += cartItems[productId][size] * productInfo.price;
          }
        } catch (error) {
          console.error(`Error counting Total Amount ${productId}:`, error);
        }
      }
    }
    return totalCart
  };

  // useEffect(() => {
  //   console.log("Cart Items Updated:", cartItems);
  // }, [cartItems]);

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
    updateQuantity,
    removeFromCart,
    getCartAmount,
    navigate,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export { ShopContext, ShopContextProvider };
