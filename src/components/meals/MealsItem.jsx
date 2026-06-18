import { useContext } from "react";
import { CartContext } from "../../store/CartContext";

export default function MealsItem({ item, ...props }) {
  const { updateCart } = useContext(CartContext);

  return (
    <li {...props}>
      {item.name}, {item.description}
      <button
        onClick={() =>
          updateCart({ id: item.id, name: item.name, price: item.price })
        }
      >
        Add to Cart
      </button>
    </li>
  );
}
