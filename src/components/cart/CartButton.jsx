import { useContext } from "react";
import { CartContext } from "../../store/CartContext";

export default function CartButton({ handleOpenCart }) {
  const { shoppingCart, totalPrice } = useContext(CartContext);
  const cartTotalItems = shoppingCart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <button onClick={handleOpenCart}>
      Cart ({totalPrice}, {cartTotalItems})
    </button>
  );
}
