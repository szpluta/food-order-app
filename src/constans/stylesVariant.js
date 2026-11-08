export const BUTTON_VARIANT = {
  BUTTON: "BUTTON",
  SMALL: "SMALL",
};

export const BUTTON_VARIANT_STYLES = {
  SMALL: "text-(--accent) text-sm font-bold p-1.5",
  BUTTON: `
  relative
  overflow-hidden
  py-1.5
  px-5
  rounded-3xl
  border
  border-(--accent)
  text-(--accent)
  text-sm
  font-bold

  border border-(--accent)
  rounded-3xl
  px-5 py-1.5
  text-sm font-bold
  text-(--accent)

  bg-[linear-gradient(105deg,var(--accent)_0%,var(--accent)_85%,transparent_85%)]
  bg-[length:0%_100%]
  bg-no-repeat
  bg-left
  transition-[background-size,color]
  duration-500
  ease-out
  
  hover:bg-[length:120%_100%]
  hover:text-[var(--text-light)]

  disabled:opacity-50
  disabled:cursor-not-allowed
  disabled:bg-none
  disabled:hover:text-(--accent)
`,
  BUTTON_ACTIVE: `text-[var(--text-light)] bg-[length:120%_100%]`,
};

export const LINK_VARIANT = {
  TILE: "TILE",
};

export const VARIANT_STYLES = {
  DEFAULT: "",
  TILE: "py-3 px-4 justify-center flex items-center gap-3.75 border border-(--border) rounded-md hover:border-(--accent)",
};
