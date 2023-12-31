import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SignupPage from "./SignupPage";
import AuthBtn from "../Reusable/AuthBtn";
import {
  useEmailInput,
  usePasswordInput,
} from "../../customHooks/UserInputAuth";
import Alert from "../Reusable/Alert";
import { fixedInputClass } from "../../db/UI";
import { useLoading } from "../../customHooks/Loading";

const SignUp = () => {
  const { userEmail, emailChangeHandler, resetEmail } = useEmailInput();
  const { userPassword, passwordChangeHandler, resetPassword } =
    usePasswordInput();
  const { isLoading, startLoadingHandler, stopLoadingHandler } = useLoading();

  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState(null);

  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    startLoadingHandler();
    let url;
    if (userPassword === userConfirmPassword) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClkK_UAUsQMi-Pv-SJjUEvf8etFuvlnJI";
    } else {
      setErrorAlert("Passwords do not match!");
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        history.replace("/login");
      } else {
        const errorMessage = (errorCode) => {
          switch (errorCode) {
            case "EMAIL_EXISTS":
              return "This Email is already exists.";
            case "OPERATION_NOT_ALLOWED":
              return "You are not allowed to register new user.";
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
              return "Too many attempts. Try again later.";
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
      setUserConfirmPassword("");
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
        <div className="my-5">
          <label htmlFor="confirm-password" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            className={fixedInputClass}
            placeholder="Confirm Password"
            value={userConfirmPassword}
            onChange={(e) => setUserConfirmPassword(e.target.value)}
          />
        </div>
        <AuthBtn name={"Signup"} loading={isLoading} />
      </form>
    </div>
  );
};

export default SignUp;
