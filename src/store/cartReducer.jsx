function createNewItem(item) {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: 1,
  };
}

export function cartReducer(state, action) {
  const existingCartItem = state.shoppingCart.find(
    (item) => item.id === action.payload.id,
  );

  switch (action.type) {
    case "UPDATE_ITEM": {
      if (existingCartItem) {
        const updatedCartList = state.shoppingCart
          .map((cartItem) =>
            cartItem.id === action.payload.id
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity + action.payload.quantityFactor,
                }
              : cartItem,
          )
          .filter((item) => item.quantity > 0);

        return {
          ...state,
          shoppingCart: updatedCartList,
        };
      } else {
        return {
          ...state,
          shoppingCart: [...state.shoppingCart, createNewItem(action.payload)],
        };
      }
    }

    case "CLEAR":
      return {
        ...state,
        shoppingCart: [],
      };

    default:
      return state;
  }
}
