import { useContext } from "react";
import { CartContext } from "../../store/CartContext";
import Button from "../UI/Button";

export default function CartButton({ handleOpenCart }) {
  const { shoppingCart } = useContext(CartContext);
  const cartTotalItems = shoppingCart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <Button onClick={handleOpenCart}>
      CART
      {cartTotalItems > 0 && (
        <span className="text-[10px] w-5 absolute -bottom-0.5 -right-3 bg-[var(--accent)] text-[var(--text-light)] rounded-lg  py-0 ">
          {cartTotalItems}
        </span>
      )}
    </Button>
  );
}
