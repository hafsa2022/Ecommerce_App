import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";
import { currency } from "../App";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const laodOrdersData = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/order/list`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.status) {
        // console.log(response.data.orders)
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/order/status`,
        { orderId, status: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.status) {
        await laodOrdersData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    laodOrdersData();
  }, [token]);

  return (
    <div className="">
      <h3>Order Page</h3>

      <div className="">
        {orders.length !== 0 &&
          orders.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            >
              <img className="w-12" src={assets.parcel_icon} alt="parcel" />
              <div>
                <div>
                  {order.items.map((item, itemIndex) => {
                    if (itemIndex === order.items.length - 1) {
                      return (
                        <p className="py-0.5" key={itemIndex}>
                          {item.name} x {item.quantity}
                          <span className="ml-2">({item.size})</span>
                        </p>
                      );
                    } else {
                      return (
                        <p className="py-0.5" key={itemIndex}>
                          {item.name} x {item.quantity}
                          <span className="ml-2">({item.size})</span>,
                        </p>
                      );
                    }
                  })}
                </div>
                <p className="mt-3 mb-2 font-medium">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div>
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city +
                      "," +
                      order.address.state +
                      "," +
                      order.address.country +
                      "," +
                      order.address.zipcode}
                  </p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">
                  Items : {order.items.length}
                </p>
                <p className="mt-3">Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]">
                {order.amount} {currency}
              </p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="p-2 font-semibold"
                name=""
                id=""
              >
                <option value="Order placed">Order placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out of delivery">Out of delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
