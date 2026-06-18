import { createContext } from "react";

export const CartContext = createContext({
  shoppingCart: [],
  totalPrice: 0,
  updateCart: () => {},
  clearCart: () => {},
});
