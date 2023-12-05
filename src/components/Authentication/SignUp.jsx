import React from "react";

const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

const SignUp = () => {
  return (
    <form className="mt-8 space-y-6">
      <div className="my-5">
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          id="email-address"
          name="email"
          type="email"
          required
          className={fixedInputClass + customClass}
          placeholder="Email address"
        />
      </div>
      <div className="my-5">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className={fixedInputClass + customClass}
          placeholder="Password"
        />
      </div>
      <div className="my-5">
        <label htmlFor="confirm-password" className="sr-only">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          required
          className={fixedInputClass + customClass}
          placeholder="Confirm Password"
        />
      </div>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
      >
        Submit
      </button>
    </form>
  );
};

export default SignUp;
