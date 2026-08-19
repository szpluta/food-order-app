import { useReducer } from "react";
import { CartContext } from "./CartContext";
import { cartReducer } from "./cartReducer";
import { SHOPPING_CART_DATA } from "../constans/shoppingCart";

export function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    shoppingCart: [],
    checkoutData: SHOPPING_CART_DATA,
  });

  function handleCheckoutData(data) {
    cartDispatch({
      type: "UPDATE_CHECKOUT_DATA",
      payload: data,
    });
  }

  function handleCartUpdate(item, quantityFactor = 1) {
    cartDispatch({
      type: "UPDATE_ITEM",
      payload: { ...item, quantityFactor },
    });
  }

  function handleCartClear() {
    cartDispatch({
      type: "CLEAR",
      payload: [],
    });
  }
  const totalPrice = cartState.shoppingCart.reduce((total, item) => {
    return total + (item.price || 0) * (item.quantity || 0);
  }, 0);

  const contextValue = {
    shoppingCart: cartState.shoppingCart,
    updateCart: handleCartUpdate,
    totalPrice,
    clearCart: handleCartClear,
    checkoutData: cartState.checkoutData,
    updateCheckoutData: handleCheckoutData,
  };

  return <CartContext value={contextValue}>{children}</CartContext>;
}
