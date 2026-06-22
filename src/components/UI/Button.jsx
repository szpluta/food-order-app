import { BUTTON_VARIANT } from "../../constans/buttonVariant";

export default function Button({
  children,
  variant = BUTTON_VARIANT.TAB,
  active,
  customCSS,
  ...props
}) {
  let classNames = "cursor-pointer leading-none";

  if (active) {
    classNames += ` text-[var(--accent)] cursor-default`;
  }

  const variants = {
    TAB: "relative text-xl font-light",
    SMALL: "text-[var(--accent)] text-sm font-bold p-1.5",
    BUTTON:
      "text-[var(--accent)] text-sm font-bold border border-[var(--accent)] py-1.5 px-5 rounded-3xl",
    CLOSE: "absolute top-0 right-0 p-2 text-[var(--accent)] text-sm font-bold",
  };

  return (
    <button
      className={`${classNames} ${variants[variant]} ${customCSS}`}
      {...props}
    >
      {children}
    </button>
  );
}
