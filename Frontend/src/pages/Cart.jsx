import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { ShopContext } from "../context/shopContext";
import Title from "../components/Title";
import assets from "../assets/frontend_assets/assets";

const Cart = () => {
  const { products, currency, cartItems, removeFromCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    let data = [];
    for (let productId in cartItems) {
      for (let size in cartItems[productId]) {
        let product = products.find((p) => p._id === productId);
        if (cartItems[productId][size] > 0) {
          data.push({
            ...product,
            size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }
    setCartData(data);
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div>
        {cartData.length === 0 && (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
        {cartData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] gap-4 items-center"
          >
            <div className="flex items-start gap-6">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-16 sm:w-20"
              />
              <div>
                <p className="text-sm sm:text-lg font-medium">{item.name}</p>
                <div className="flex items-center gap-5 mt-2">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                </div>
              </div>
            </div>
            <input className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" type="number" min={1} defaultValue={item.quantity} />
            <img onClick={() => removeFromCart(item._id, item.size)} className="w-4 mr-4 sm:w-5 cursor-pointer" src={assets.bin_icon} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
