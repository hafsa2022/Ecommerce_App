import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import { useParams } from "react-router-dom";
import assets from "../assets/frontend_assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [image, setImage] = useState("");
  const [productData, setProductData] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    let fetchedProduct = productId && products.find((p) => p._id === productId);
    setProductData(fetchedProduct);
    if (fetchedProduct && fetchedProduct.image) {
      setImage(fetchedProduct.image[0]);
    }
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((img, index) => (
              <img
                onClick={() => setImage(img)}
                key={index}
                src={img}
                alt={img.name}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt={image.name} className="w-full h-auto" />
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="text-sm pl-2">(120)</p>
          </div>
          <p className="text-3xl font-medium mt-5">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`border bg-gray-300 px-4 py-2 ${selectedSize === size ? "border-orange-500" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productId, selectedSize)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gra y-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivrey is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description & Reviews Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="px-5 py-3 text-sm border">Description</b>
          <p className="px-5 py-3 text-sm border">Reviews (120)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            illo adipisci laudantium totam quibusdam repudiandae fuga, odit
            error. Voluptatum cumque, distinctio est consequatur nemo quis ut
            voluptate. Distinctio, vero numquam!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            vel temporibus ratione rerum suscipit itaque cupiditate, sapiente
            vitae? Facere culpa repudiandae totam ducimus perspiciatis ab
            praesentium suscipit temporibus quas qui.
          </p>
        </div>
      </div>
      {/* Related Products */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
