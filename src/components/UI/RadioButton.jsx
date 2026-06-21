export default function RadioButton({ payment, ...props }) {
  return (
    <label
      className="cursor-pointer w-full sm:w-[calc(50%-12px)] lg:w-[calc(33%-7px)]"
      key={payment.id}
    >
      <input
        type="radio"
        className="hidden peer"
        {...props}
        value={payment.paymentMethod}
      />
      <div
        className="h-full p-5 justify-center flex items-center gap-3.75 border border-(--border)
              peer-checked:border-[var(--accent)]"
      >
        <img className="h-8" src={payment.icon} />

        {payment.label}
      </div>
    </label>
  );
}
