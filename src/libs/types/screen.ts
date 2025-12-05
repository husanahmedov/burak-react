import { Member } from "./members";
import { Product } from "./products";

/** REACT APP STATE **/
export interface AppRootState {
  homePage: HomePageState;
}

/** HOMEPAGE **/
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}
