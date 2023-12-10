import React from "react";
import EcommerceLogo from "../../assets/onlineShop.png";

const SignupPage = () => {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img alt="Image" className="h-14 w-14" src={EcommerceLogo} />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Welcome!
      </h2>
    </div>
  );
};

export default SignupPage;
