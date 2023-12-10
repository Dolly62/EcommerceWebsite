import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { navClassName } from "../../db/UI";
import { authActions } from "../../store/AuthReducer";
import { useHistory } from "react-router-dom";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    history.replace("/login");
  };

  return (
    <> 
      <nav className="fixed z-10 flex w-full items-center text-gray-500 shadow-lg py-4  justify-around h-16 bg-transparent">
      {/* <nav className="fixed z-10 flex flex-col w-full items-center bg-pink-100 justify-around py-2 text-gray-500 shadow-lg h-screen lg:py-4 lg:flex-row lg:justify-around lg:h-16 lg:bg-transparent"> */}
        <h2 className="font-bold text-pink-600 text-2xl cursor-pointer">
          Ecomme
        </h2>

        <ul className=" flex  flex-col justify-between  w-1/4 text-xl lg:flex-row lg:items-center lg:space-x-4 lg:spacy-0">
          <li className={navClassName}>
            <NavLink to="/products">Products</NavLink>
          </li>
          {isLoggedIn && (
            <li className={navClassName}>
              <NavLink to="/cart">Cart</NavLink>
            </li>
          )}
          {!isLoggedIn && <li className={navClassName}>
            <NavLink to="/login">Login</NavLink>
          </li>}
          {!isLoggedIn && <li className={navClassName}>
            <NavLink to="/signup">Signup</NavLink>
          </li>}
          {isLoggedIn && <li className={navClassName}>
            <NavLink to="/logout">
              <button onClick={logoutHandler}>Logout</button>
            </NavLink>
          </li>}
        </ul>
      </nav>
    </>
  );
};

export default Header;
