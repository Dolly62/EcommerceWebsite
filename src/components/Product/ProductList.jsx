import React from "react";
import QuantityBtn from "./QuantityBtn";
import { useSelector } from "react-redux";

const ProductList = () => {
  const products = useSelector((state) => state.products.productItems);
  return (
  
      <div className="m-2">
        <table className="table-auto relative top-20 z-0 w-full">
          <thead className="bg-slate-400">
            <tr className="text-white text-lg">
              <th>Product details</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className=" bg-pink-100 ">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="my-6 p-10">
                  <td className="flex gap-6">
                    <img
                      className="w-1/4 rounded-md bg-transparent"
                      src={product.img}
                      alt="Image"
                    />
                    <div className="flex flex-col justify-around">
                      <h3 className="font-bold text-xl">{product.title}</h3>
                      <button className="text-gray-500 hover:text-black">Remove</button>
                    </div>
                  </td>
                  <td>
                    <QuantityBtn />
                  </td>
                  <td>{product.newPrice}</td>
                  <td>Rs.240</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No products</td>
              </tr>
            )}
          </tbody>
        </table>
       </div>
  );
};

export default ProductList;
