import { useReducer } from "react";
import { CartContext } from "./CartContext";
import { cartReducer } from "./cartReducer";

export function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    shoppingCart: [],
  });

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
  };

  return <CartContext value={contextValue}>{children}</CartContext>;
}
