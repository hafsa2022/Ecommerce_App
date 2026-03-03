import { createContext, useState, useEffect, useCallback } from "react";
// import products from "../constants/products";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = " MAD";
  // const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  // const [token, setToken] = useState("");
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });
  const navigate = useNavigate();

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
    if (token) {
      try {
        const response = await axios.post(
          "/cart/add",
          {
            productId,
            size,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.data.status) {
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
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

  const updateQuantity = async (productId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] = quantity;
      }
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          "/cart/update",
          {
            productId,
            size,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        // if (response.data.status) {
        //   toast.success(response.data.message);
        // }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  // const removeFromCart = async (productId, size) => {
  //   let cartData = structuredClone(cartItems);
  //   if (cartData[productId] && cartData[productId][size]) {
  //     cartData[productId][size] -= 1;
  //     if (cartData[productId][size] <= 0) {
  //       delete cartData[productId][size];
  //       if (Object.keys(cartData[productId]).length === 0) {
  //         delete cartData[productId];
  //       }
  //     }
  //     setCartItems(cartData);
  //   }
  // };
  // const removeFromCart = async (productId, size) => {
  //   // Optimistic UI update
  //   setCartItems((prevCart) => {
  //     const cartData = structuredClone(prevCart);

  //     if (!cartData[productId] || !cartData[productId][size]) {
  //       return prevCart;
  //     }

  //     cartData[productId][size] -= 1;

  //     if (cartData[productId][size] <= 0) {
  //       delete cartData[productId][size];

  //       if (Object.keys(cartData[productId]).length === 0) {
  //         delete cartData[productId];
  //       }
  //     }

  //     return cartData;
  //   });

  //   // Send request to backend
  //   // try {
  //   //   await axios.post(
  //   //     `/cart/remove`,
  //   //     { productId, size },
  //   //     {
  //   //       headers: {
  //   //         Authorization: `Bearer ${token}`,
  //   //       },
  //   //     },
  //   //   );
  //   // } catch (error) {
  //   //   console.error(error);
  //   //   toast.error(error.response?.data?.message || error.message);
  //   // }
  // };

  const removeFromCart = async (productId, size) => {
    setCartItems((prevCart) => {
      const cartData = structuredClone(prevCart);

      if (!cartData[productId]) return prevCart;

      delete cartData[productId][size];

      if (Object.keys(cartData[productId]).length === 0) {
        delete cartData[productId];
      }

      return cartData;
    });

    // call backend
    try {
      await axios.post(
        `/cart/remove`,
        { productId, size },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };
  const getCartAmount = () => {
    let totalCart = 0;
    for (let productId in cartItems) {
      let productInfo = products.find((product) => product._id === productId);
      for (let size in cartItems[productId]) {
        try {
          if (cartItems[productId][size] > 0) {
            totalCart += cartItems[productId][size] * productInfo?.price;
          }
        } catch (error) {
          console.error(`Error counting Total Amount ${productId}:`, error);
        }
      }
    }
    return totalCart;
  };

  // const getUserCart = async () => {
  //   if (token) {
  //     try {
  //       const response = await axios.post(
  //        "/cart/get",
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         },
  //       );
  //       if (response.data.status) {
  //         setCartItems(response.data.cartData);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       toast.error(error.message);
  //     }
  //   }
  // };

  // const getUserCart = useCallback(async () => {
  //   if (!token) return;

  //   try {
  //     const { data } = await axios.post(
  //       `/cart/get`,
  //       {},
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       },
  //     );

  //     if (data.status) {
  //       setCartItems(data.cartData);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error.response?.data?.message || error.message);
  //   }
  // }, [token]);

  // const getProductsData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `/product/list`,
  //     );

  //     if (response.data.status) {
  //       setProducts(response.data.products);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error.response?.data?.message || error.message);
  //   }
  // };

  // Charger les produits UNE seule fois au montage
  const getProductsData = useCallback(async () => {
    try {
      const { data } = await axios.get(`/product/list`);

      if (data.status) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  }, []);

  // useEffect(() => {
  //   getProductsData();
  // }, []);

  // useEffect(() => {
  //   if (!token && localStorage.getItem("token")) {
  //     setToken(localStorage.getItem("token"));
  //     getUserCart();
  //   }
  // }, []);

  // useEffect(() => {
  //   const initializeShop = async () => {
  //     try {
  //       const requests = [
  //         axios.get(`/product/list`),
  //       ];

  //       if (token) {
  //         requests.push(
  //           axios.post(
  //             `/cart/get`,
  //             {},
  //             {
  //               headers: { Authorization: `Bearer ${token}` },
  //             },
  //           ),
  //         );
  //       }

  //       const responses = await Promise.all(requests);

  //       // Products
  //       const productsResponse = responses[0];
  //       if (productsResponse.data.status) {
  //         setProducts(productsResponse.data.products);
  //       }

  //       // Cart (if exists)
  //       if (token && responses[1]?.data?.status) {
  //         setCartItems(responses[1].data.cartData);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       toast.error(error.response?.data?.message || error.message);
  //     }
  //   };

  //   initializeShop();
  // }, [token]);
  useEffect(() => {
    const initializeShop = async () => {
      try {
        // 1 Charger produits (toujours)
        const productsResponse = await axios.get("/product/list");

        if (productsResponse.data.status) {
          setProducts(productsResponse.data.products);
        }

        // 2 Charger panier seulement si token
        if (token) {
          try {
            const cartResponse = await axios.post(
              "/cart/get",
              {},
              {
                headers: { Authorization: `Bearer ${token}` },
              },
            );

            if (cartResponse.data.status) {
              setCartItems(cartResponse.data.cartData);
            }
          } catch (cartError) {
            console.error(cartError);
            toast.error(cartError.message);
            // 🔥 Token expiré
            // if (cartError.response?.status === 401) {
            //   localStorage.removeItem("token");
            //   setToken(null);
            //   navigate("/auth");
            // }
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load products");
      }
    };

    initializeShop();
  }, [token]);

  const value = {
    products,
    currency,
    deliveryFee: delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    removeFromCart,
    getCartAmount,
    getProductsData,
    token,
    setToken,
    navigate,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export { ShopContext, ShopContextProvider };
