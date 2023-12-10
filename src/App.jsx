import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Product from "./components/Product/Product";
import ProductList from "./components/Product/ProductList";
import SignUp from "./components/Authentication/SignUp";
import SignIn from "./components/Authentication/SignIn";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <SignIn />
        </Route>
        <Route path="/products"> <Product /></Route>
        <Route path="/cart">{isLoggedIn ? <ProductList /> : <SignIn />}</Route>
        <Route path="/">
          <Redirect to="/products" />
          <Product />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
