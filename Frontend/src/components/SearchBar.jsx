import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import assets from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const location = useLocation();
  if (location.pathname === "/collection") {
    return showSearch ? (
      <div className="border-t border-b bg-gray-50 text-center">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none bg-inherit text-sm "
            placeholder="Search products..."
          />
          <img src={assets.search_icon} alt="search" className="w-4" />
        </div>
        <img
          src={assets.cross_icon}
          alt="close"
          className="inline w-3 cursor-pointer"
          onClick={() => setShowSearch(false)}
        />
      </div>
    ) : null;
  } else {
    return;
  }
};

export default SearchBar;
