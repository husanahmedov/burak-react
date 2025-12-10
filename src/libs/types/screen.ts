import { Member } from "./members";
import { Product } from "./products";

/** REACT APP STATE */
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  // ordersPage: OrdersPageState;
}
/** HOME PAGE **/
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}

/** PRODUCTS PAGE **/
export interface ProductsPageState {
  restaurant: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

/** ORDERS PAGE **/
