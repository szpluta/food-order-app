import FormInput from "../UI/FormInput";

function DeliveryForm({ register, errors, watch }) {
  return (
    <div className="w-full p-7 pb-3 md:pb-7 grid grid-cols-2 gap-3">
      <FormInput
        label="Label"
        name="label"
        {...register("label", {
          minLength: { value: 2, message: "Too short" },
        })}
        error={errors.label}
        containerClass="col-span-2"
      />
      <FormInput
        label="Street"
        name="street"
        {...register("street", {
          required: "Street is required",
          minLength: { value: 2, message: "Too short" },
        })}
        error={errors.street}
      />
      <FormInput
        label="Phone"
        name="phone"
        placeholder="+48 000 000 000"
        {...register("phone", {
          required: "Phone is required",
          pattern: {
            value: /^(\+48)?\s?\d{3}\s?\d{3}\s?\d{3}$/,
            message: "Invalid phone format",
          },
        })}
        error={errors.phone}
      />
      <FormInput
        label="Post code"
        placeholder="00-000"
        name="postCode"
        {...register("postCode", {
          required: "Post code is required",
          pattern: {
            value: /^\d{2}-\d{3}$/,
            message: "Invalid post code format",
          },
        })}
        error={errors.postCode}
      />
      <FormInput
        label="City"
        name="city"
        {...register("city", {
          required: "City is required",
          minLength: { value: 2, message: "Too short" },
        })}
        error={errors.city}
      />
      <FormInput
        label="Message"
        name="deliveryDetails"
        type="textarea"
        {...register("deliveryDetails", {
          maxLength: { value: 250, message: "Message is too long" },
        })}
        maxLength="250"
        error={errors.message}
        watcher={watch("deliveryDetails", "")}
        containerClass="col-span-2"
      />
      <FormInput
        label="Set as Default"
        name="asDefault"
        type="checkbox"
        title="Use this address as default"
        required={false}
        {...register("asDefault")}
      />
    </div>
  );
}

export default DeliveryForm;
