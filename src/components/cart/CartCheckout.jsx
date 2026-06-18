import { useForm, useWatch } from "react-hook-form";
import FormInput from "../UI/FormInput";
import { useEffect } from "react";

export default function CartCheckout({
  prevStep,
  nextStep,
  checkoutDraft,
  setCheckoutDraft,
}) {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });
  const onSubmit = (data) => {
    setCheckoutDraft(data);
    nextStep();
  };
  const values = useWatch({ control });

  function handleBackButton() {
    setCheckoutDraft(values);
    prevStep();
  }

  useEffect(() => {
    if (checkoutDraft) {
      reset(checkoutDraft);
    }
  }, [checkoutDraft, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="First name"
          name="fullName"
          {...register("fullName", {
            required: "First name is required",
            minLength: { value: 2, message: "Too short" },
          })}
          error={errors.fullName}
        />
        <FormInput
          label="E-mail"
          name="email"
          {...register("email", {
            required: "E-mail is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid e-mail format",
            },
          })}
          error={errors.email}
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
          error={errors.phone}
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
        <button onClick={handleBackButton} type="button">
          Back to cart
        </button>
        <button type="submit">To payment</button>
      </form>
    </>
  );
}
