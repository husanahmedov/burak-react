import { createSelector } from "reselect";
import { AppRootState } from "../../libs/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveRestaurant = createSelector(
  selectProductsPage,
  (productsPage) => productsPage.restaurant
);

export const retrieveProducts = createSelector(
  selectProductsPage,
  (productsPage) => productsPage.products
);

export const retrieveChosenProduct = createSelector(
  selectProductsPage,
  (productsPage) => productsPage.chosenProduct
);
