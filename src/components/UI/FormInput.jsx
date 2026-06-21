export default function FormInput({ name, label, error, ...props }) {
  return (
    <div>
      <fieldset
        className={`border ${!error ? "border-[var(--border)]" : "border-[var(--accent)]"} rounded-md px-3 pb-2 pt-1 `}
      >
        <legend htmlFor={name} className="px-1 text-sm">
          {label} <span className="text-[var(--accent)]">*</span>
        </legend>

        <input name={name} {...props} className="w-full outline-none" />
      </fieldset>

      <p role="alert" className="input-error min-h-5 text-xs pt-1 text-right">
        {error?.message}
      </p>
    </div>
  );
}
