import { useState, useContext } from "react";
import assets from "../assets/frontend_assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/shopContext";

const Navbar = () => {
  const {setShowSearch , getCartCount} = useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-36" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink className="flex flex-col items-center gap-1" to="/">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/collection">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/about">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/contact">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          alt="Search Icon"
          className="w-5 cursor-pointer"
          onClick={() => setShowSearch(prev => !prev)}
        />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            alt="Profile Icon"
            className="w-5 cursor-pointer"
          />
          <div className="group-hover:block hidden absolute right-0 pt-4 dropdown bg-white">
            <div className="flex flex-col gap-2 w-40 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="px-4 py-2 hover:text-black cursor-pointer">
                My Profile
              </p>
              <p className="px-4 py-2 hover:text-black cursor-pointer">
                Orders
              </p>
              <p className="px-4 py-2 hover:text-black cursor-pointer">
                Logout
              </p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            alt="Cart Icon"
            className="w-5 cursor-pointer"
          />
          <p className="absolute right-[-5px] bottom-[-5px] bg-black text-white text-center leading-4 w-4 rounded-full aspect-square text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="Menu Icon"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600 ">
          <div className="flex items-center gap-4 p-3">
            <img
              src={assets.dropdown_icon}
              alt="Dropdown Icon"
              className="h-4 rotate-180"
            />
            <p className="text-sm" onClick={() => setVisible(false)}>
              Back
            </p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b-2 border-gray-200"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b-2 border-gray-200"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b-2 border-gray-200"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b-2 border-gray-200"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
