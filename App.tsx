import React, { useEffect, useState } from "react";
import "./styles/App.scss";
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Provider as ReduxProvider, useSelector } from 'react-redux'

import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Footer from './components/Footer'
import Category from "./pages/Category/Category";
import Details from "./pages/Details/Details";
import Checkout from './pages/checkout/Checkout';
import Profile from "./pages/profile";
import { Cart } from "./components/Cart";
import Login from "./pages/Login/Login";
import Api from "./helper/Api";
import { loadCategories } from "./actions/categoriesAction";
import { useDispatch } from "react-redux";
import PrivateRouter from "./components/PrivateRouter";
import Register from "./pages/register";
const routes = [
  { path: "/the-loai/:cat?", name: "Category", Component: Category },
  { path: "/chi-tiet/:slug", name: "ProductDetails", Component: Details },
  { path: "/thanh-toan", name: "Check Out", Component: Checkout },
  { path: "/dang-nhap", name: "Login", Component: Login },
  { path: "/dang-ky", name: "Login", Component: Register },
  { path: "/thong-tin-ca-nhan", private: true, name: "Login", Component: Profile },
  { path: "/", name: "Home", Component: Home },
];
function App() {

  let dispatch = useDispatch();

  useEffect(() => {
    Api('categories').get()
      .then((res: any) => {
        dispatch(loadCategories(res));
      })
  }, [])


  return (
    <Router>
      <Cart />
      <Header />
      <Switch>
        {routes.map((e: any) => {
          return e.private ? <PrivateRouter key={e.path} path={e.path} component={e.Component} />
            : <Route key={e.path} path={e.path}>
              <e.Component />
            </Route>
        })}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
