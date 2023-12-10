import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const ToggleBtn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const toggleBtnHandler = () => {
    if (!isLoggedIn) {
      history.push("/signup");
    } else {
      history.push("/login");
    }
  };

  return (
    <button onClick={toggleBtnHandler}>
      {isLoggedIn ? "Haven't an account" : "Have an account"}
    </button>
  );
};

export default ToggleBtn;
