import { createContext } from "react";
import products from "../constants/products";

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;

  const value = {
    products,
    currency,
    deliveryFee: delivery_fee,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export { ShopContext, ShopContextProvider };
