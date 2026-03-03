import React, { useContext, useState, useMemo, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import Title from "../components/Title";
import axios from "../api/axiosInstance";

const Orders = () => {
  const { token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const loadOrdersData = async () => {
    if (!token) {
      return null;
    }
    const response = await axios.post(
      `/order/user-orders`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (response.data.status) {
      let allOrdersItem = [];
      response.data.orders.map((order) => {
        order.items.map((item) => {
          item["status"] = order.status;
          item["payment"] = order.payment;
          item["paymentMethod"] = order.paymentMethod;
          item["date"] = order.date;
          allOrdersItem.push(item);
        });
      });
      setOrders(allOrdersItem);
    }
  };

  useEffect(() => {
    loadOrdersData();
  }, []);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orders?.length === 0 && (
          <p className="text-center text-gray-500">
            Your Orders not added yet!
          </p>
        )}
        {orders?.length != 0 &&
          orders?.map((order, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20"
                  src={order.image[0]}
                  alt={order.name}
                />
                <div>
                  <p className="sm:text-base font-medium">{order.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gary-700">
                    <p className="text-lg">
                      {order.price}
                      {currency}
                    </p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Size: {order.size}</p>
                  </div>
                  <p className="mt-1">
                    Date:{" "}
                    <span className="text-gray-400">
                      {" "}
                      {new Date(order.date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-1">
                    Payment:{" "}
                    <span className="text-gray-400">
                      {" "}
                      {order.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{order.status}</p>
                </div>
                <button
                  onClick={loadOrdersData}
                  className="border px-4 py-2 text-sm font-medium rounded-sm"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
