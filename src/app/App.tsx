import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { OrdersPage } from "../screens/ordersPage";
import { HomeNavbar } from "../components/headers/HomeNavbar";
import { ProductsPage } from "../screens/productsPage";
import { UsersPage } from "../screens/userPage";
import HomePage from "../screens/homePage";
import { OtherNavbar } from "../components/headers/OtherNavbar";
import Footer from "../components/footers";

import "../css/App.css";
import "../css/Navbar.css";
import "../css/footer.css";
import { HelpPage } from "../screens/helpPage";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
      <Switch>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UsersPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
