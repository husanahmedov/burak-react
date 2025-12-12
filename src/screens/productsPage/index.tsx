import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Container } from "@mui/material";
import path from "path";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import "../../css/products.css";

import { Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct, setProducts, setRestaurant } from "./slices";
import { Product } from "../../libs/types/products";
import { Member } from "../../libs/types/members";
import { CartItem } from "../../libs/types/search";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductsPageProps) {
  const { onAdd } = props;
  const products = useRouteMatch();
  return (
    <div className="products-page">
      <Switch>
        <Route path={`${products.path}/:productId`}>
          <ChosenProduct onAdd={onAdd} />
        </Route>
        <Route path={`${products.path}`}>
          <Products onAdd={onAdd} />
        </Route>
      </Switch>
    </div>
  );
}
