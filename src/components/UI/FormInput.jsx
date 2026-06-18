export default function FormInput({ name, label, error, ...props }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input name={name} {...props} />
      <p role="alert" className="input-error">
        {error?.message}
      </p>
    </div>
  );
}
