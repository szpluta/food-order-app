import { NavLink } from "react-router-dom";
import { VARIANT_STYLES } from "../../constans/stylesVariant";
import { useContext } from "react";
import { CartContext } from "../../store/CartContext";

function MainNavigationItem({
  route,
  variant,
  badge,
  label,
  customClass = "",
  ...props
}) {
  const { shoppingCart } = useContext(CartContext);

  const cartTotalItems = badge
    ? shoppingCart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <NavLink
      to={route}
      {...props}
      className={({ isActive }) =>
        `p-2 ${VARIANT_STYLES[variant] ?? ""} ${customClass} ${
          isActive ? "text-[var(--accent)]" : ""
        }`
      }
      aria-label={badge ? `${label}, ${cartTotalItems} items in cart` : label}
    >
      {label}
      {badge ? (
        <span
          aria-hidden="true"
          className="text-[10px] w-5 h-4 flex items-center justify-center absolute -bottom-0.5 right-0 bg-[var(--accent)] text-[var(--text-light)] rounded-lg  py-0 "
        >
          {cartTotalItems}
        </span>
      ) : null}
    </NavLink>
  );
}

export default MainNavigationItem;
