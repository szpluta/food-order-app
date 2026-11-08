function FormInput({
  name,
  label,
  error,
  containerClass,
  type = "text",
  watcher,
  maxLength,
  title = "",
  required = true,
  ...props
}) {
  let fieldElement;

  switch (true) {
    case type === "textarea":
      fieldElement = (
        <textarea
          name={name}
          {...props}
          className="w-full outline-none"
          maxLength={maxLength}
        />
      );
      break;

    case type === "checkbox":
      fieldElement = (
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <span className="relative">
            <input
              id={name}
              name={name}
              type="checkbox"
              className="peer sr-only"
              {...props}
            />

            <span
              className="w-5 h-5
              flex items-center justify-center  
              rounded border
              leading-none
              border-[var(--border)]
              text-transparent
              transition-all
              peer-checked:bg-(--accent)
              peer-checked:border-(--accent)
              peer-checked:text-white"
            >
              ✓
            </span>
          </span>

          <span className="text-sm">{title}</span>
        </label>
      );
      break;

    default:
      fieldElement = (
        <input
          name={name}
          {...props}
          type={type}
          className="w-full outline-none"
        />
      );
      break;
  }

  return (
    <div className={containerClass}>
      <fieldset
        className={`border ${!error ? "border-[var(--border)]" : "border-(--accent)"} rounded-md px-3 pb-2 pt-1 `}
      >
        <legend htmlFor={name} className="px-1 text-sm">
          {label}{" "}
          <span className="text-(--accent)"> {required ? "*" : ""}</span>
        </legend>
        {fieldElement}
      </fieldset>

      {maxLength && (
        <div className="min-h-4">
          <p className="text-xs text-right">
            {watcher.length} / {maxLength}
          </p>
        </div>
      )}

      <p role="alert" className="input-error min-h-5 text-xs pt-1 text-right">
        {error?.message}
      </p>
    </div>
  );
}

export default FormInput;
