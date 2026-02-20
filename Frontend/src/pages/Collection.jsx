import React, { useContext, useMemo, useState } from "react";
import { ShopContext } from "../context/shopContext";
import assets from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((cat) => cat !== value)
        : [...prev, value],
    );
  };

  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((subCat) => subCat !== value)
        : [...prev, value],
    );
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.slice();

    if (category.length > 0) {
      filtered = filtered.filter((product) =>
        category.includes(product.category),
      );
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((product) =>
        subCategory.includes(product.subCategory),
      );
    }

    return filtered;
  }, [category, subCategory, products]);

  const sortedProducts = useMemo(() => {

    let filtered = filteredProducts.slice();
    
    switch (sortType) {
      case "low-high":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "high-low":
        return [...filtered].sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  }, [sortType, filteredProducts]);

  const searchedProducts = useMemo(() => {
    if (!showSearch) return sortedProducts;
    return sortedProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, showSearch, sortedProducts]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options*/}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="filter icon"
          />
        </p>
        {/* Category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-ary-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={handleCategoryChange}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={handleCategoryChange}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={handleCategoryChange}
              />
              Kids
            </p>
          </div>
        </div>
        {/* SubCategories Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 my-5 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-ary-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={handleSubCategoryChange}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={handleSubCategoryChange}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={handleSubCategoryChange}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right Sidebar */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select className="border-2 border-gray-300 text-sm px-2" onChange={(e) => setSortType(e.target.value)}>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {searchedProducts.map((product, index) => (
            <ProductItem
              key={index}
              id={product._id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
