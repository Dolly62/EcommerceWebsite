import React, { useState } from "react";
import { data } from "../../db/data";
import AddCartBtn from "./AddCartBtn";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../store/ProductReducer";

const Product = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.authentication.email);
  const [alert, setAlert] = useState(null);

  const addItemHandler = async (item) => {
    const emailId = email.replace(/[@.]/g, "");
    const productItem = {
      img: item.img,
      title: item.title,
      newPrice: item.newPrice,
      quantity: 1,
    };
    try {
      const response = await fetch(
        `https://ecommerce-web-aaa3a-default-rtdb.firebaseio.com/products/${emailId}.json`,
        {
          method: "POST",
          body: JSON.stringify(productItem),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        dispatch(
          productActions.addProduct({
            name: data.name,
            img: item.img,
            title: item.title,
            newPrice: item.newPrice,
            quantity: 1,
          })
        );

        setAlert({ message: "Successfully Added!", type: "success" });
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      setAlert({ message: error.message, type: "error" });
    } finally {
      setTimeout(() => setAlert(null), 2000);
    }
  };
  return (
    <>
      <div className="relative top-20 z-0 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-8">
        {data.map((item) => (
          <div
            key={item.id}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden"
          >
            <img
              className="p-8 w-4/5 mx-auto "
              src={item.img}
              alt="product image"
            />
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-5 space-x-7">
                <span className="text-xl font-bold text-gray-900">
                  <del className="text-gray-500 mr-2">Rs.{item.prevPrice}</del>
                  {item.newPrice}
                </span>

                <div className="flex items-center space-x-1 rtl:space-x-reverse text-yellow-400">
                  {item.star}
                  {item.star}
                  {item.star}
                  {item.star}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                  5.0
                </span>
              </div>
              <div className="flex items-center justify-between">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  View Cart
                </button>
                <AddCartBtn onAddItem={() => addItemHandler(item)} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {alert && (
        <div className="alert-toast fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm">
          <label
            className={`close cursor-pointer flex items-start justify-between w-full p-2 ${
              alert.type === "error" ? "bg-red-200" : "bg-green-500"
            } h-[45px] rounded shadow-lg text-white`}
            title="close"
          >
            {alert.message}
          </label>
        </div>
      )}
    </>
  );
};

export default Product;
