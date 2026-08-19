import { createContext } from "react";
import { SHOPPING_CART_DATA } from "../constans/shoppingCart";

export const CartContext = createContext({
  shoppingCart: [],
  totalPrice: 0,
  updateCart: () => {},
  clearCart: () => {},
  checkoutData: SHOPPING_CART_DATA,
  updateCheckoutData: () => {},
});
