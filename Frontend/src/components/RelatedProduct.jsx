import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { ShopContext } from "../context/shopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length === 0) return;

    const related = products.filter(
      (product) =>
        product.category === category && product.subCategory === subCategory,
    );
    setRelatedProducts(related.slice(0, 5));
  }, [category, subCategory, products]);

  return (
    <div className="my-24">
      <div className="text-3xl text-center py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {relatedProducts.map((product, index) => (
          <ProductItem
            key={index}
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
