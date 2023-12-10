import React, { useState } from "react";
import AuthBtn from "../Reusable/AuthBtn";
import { fixedInputClass } from "../../db/UI";
import SignupPage from "./SignupPage";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthReducer";
import { useHistory } from "react-router-dom";
import Alert from "../Reusable/Alert";
import {
  useEmailInput,
  usePasswordInput,
} from "../../customHooks/UserInputAuth";
import { useLoading } from "../../customHooks/Loading";

const SignIn = () => {
  const { userEmail, emailChangeHandler, resetEmail } = useEmailInput();
  const { userPassword, passwordChangeHandler, resetPassword } =
    usePasswordInput();
  const { isLoading, startLoadingHandler, stopLoadingHandler } = useLoading();

  const [errorAlert, setErrorAlert] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    startLoadingHandler();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClkK_UAUsQMi-Pv-SJjUEvf8etFuvlnJI",
        {
          method: "POST",
          body: JSON.stringify({
            email: userEmail,
            password: userPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("email", data.email);

        dispatch(
          authActions.login({
            token: localStorage.getItem("token"),
            email: localStorage.getItem("email"),
          })
        );
        history.replace("/products");
      } else {
        const errorMessage = (errorCode) => {
          switch (errorCode) {
            case "EMAIL_NOT_FOUND":
              return "There is no user record corresponding to this email.";
            case "INVALID_PASSWORD":
              return "The password is invalid.";

            case "USER_DISABLED":
              return "The user account has been disabled.";
            case "INVALID_LOGIN_CREDENTIALS":
              return "The password is incorrect! Please enter the correct password.";
            default:
              return "Authentication failed!";
          }
        };
        setErrorAlert(errorMessage(data.error.message));
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setErrorAlert(null);
        stopLoadingHandler();
      }, 2000);
      resetEmail();
      resetPassword();
    }
  };

  return (
    <div className="p-8 relative top-20 z-0 ">
      <SignupPage />
      {errorAlert && <Alert message={errorAlert} />}
      <form className="mt-8 space-y-6" onSubmit={submitHandler}>
        <div className="my-5">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            className={fixedInputClass}
            placeholder="Email address"
            value={userEmail}
            onChange={emailChangeHandler}
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
            className={fixedInputClass}
            placeholder="Password"
            value={userPassword}
            onChange={passwordChangeHandler}
          />
        </div>
        <AuthBtn name={"Login"} loading={isLoading} />
      </form>
    </div>
  );
};

export default SignIn;
