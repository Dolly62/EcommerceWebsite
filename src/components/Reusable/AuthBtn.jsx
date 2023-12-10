import React from "react";

const AuthBtn = (props) => {
  return (
    <button
      type="submit"
      disabled={props.loading}
      className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white mt-10 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        props.loading
          ? "bg-gray-400 cursor-not-allowed"
          : " bg-green-400 hover:bg-green-500  focus:ring-green-500"
      }`}
    >
      {props.loading ? "Loading.." : props.name}
    </button>
  );
};

export default AuthBtn;
