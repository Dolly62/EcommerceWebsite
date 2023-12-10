import React from "react";

const QuantityBtn = () => {
  return (
    <input
      type="number"
      min="1"
      step="1"
      className="rounded-md appearance-none w-1/4 p-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
    />
  );
};

export default QuantityBtn;
