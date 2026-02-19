import React from "react";

const NewsletterBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 10% off
      </p>
      <p className="text-gray-400 mt-3 ">
        Get the latest updates and offers delivered straight to your inbox.
      </p>
      <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full sm:flex-1 px-4 py-2 outline-none"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-sm px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
