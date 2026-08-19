import {
  BUTTON_VARIANT,
  BUTTON_VARIANT_STYLES,
} from "../../constans/stylesVariant";

function Button({
  children,
  variant = BUTTON_VARIANT.BUTTON,
  customCSS = "",
  ...props
}) {
  let classNames = "cursor-pointer leading-none";

  const variants = BUTTON_VARIANT_STYLES;

  return (
    <button
      className={`${classNames} ${variants[variant]} ${customCSS}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
