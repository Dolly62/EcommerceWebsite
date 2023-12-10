import { useState } from "react";

export const useEmailInput = (initialValue = "") => {
  const [userEmail, setUserEmail] = useState(initialValue);

  const emailChangeHandler = (e) => setUserEmail(e.target.value);

  const resetEmail = () => {
    setUserEmail("")
  }

  return {
    userEmail,
    emailChangeHandler,
    resetEmail
  };
};

export const usePasswordInput = (initialValue = "") => {
  const [userPassword, setUserPassword] = useState(initialValue);

  const passwordChangeHandler = (e) => setUserPassword(e.target.value);


  const resetPassword = () => {
    setUserPassword("")
  }

  return {
    userPassword,
    passwordChangeHandler,
    resetPassword
  }
};
