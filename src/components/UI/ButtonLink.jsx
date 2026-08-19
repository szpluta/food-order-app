import { Link } from "react-router-dom";
import {
  BUTTON_VARIANT,
  BUTTON_VARIANT_STYLES,
} from "../../constans/stylesVariant";

function ButtonLink({
  children,
  variant = BUTTON_VARIANT.BUTTON,
  customCSS = "",
  ...props
}) {
  let classNames = "cursor-pointer";

  const variants = BUTTON_VARIANT_STYLES;

  return (
    <Link
      className={`${classNames} ${variants[variant]} ${customCSS}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
