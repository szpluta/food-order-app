import { useContext } from "react";
import { CartContext } from "../../store/CartContext";
import { getImageUrl } from "../../utils/services/storageService";
import Button from "../UI/Button";
import { BUTTON_VARIANT } from "../../constans/buttonVariant";
import { currencyFormatter } from "../../utils/currency";

export default function MealsItem({ item, ...props }) {
  const { updateCart } = useContext(CartContext);
  return (
    <li
      className="border border-(--border) p-2 space-y-6 hover:shadow-[var(--shadow)] duration-300 ease-in-out"
      {...props}
    >
      {item.image && <img src={getImageUrl(item.image)} />}
      <h3 className="font-bold text-xl mb-0">{item.name}</h3>
      <h5 className="font-bold text-sm">
        {currencyFormatter.format(item.price)}
      </h5>
      <p>{item.description}</p>

      <div className="mb-2">
        <Button
          variant={BUTTON_VARIANT.BUTTON}
          onClick={() =>
            updateCart({ id: item.id, name: item.name, price: item.price })
          }
        >
          Add to Cart
        </Button>
      </div>
    </li>
  );
}
