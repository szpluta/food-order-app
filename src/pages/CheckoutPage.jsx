import { useForm } from "react-hook-form";
import FormInput from "../components/UI/FormInput";
import Button from "../components/UI/Button";
import { BUTTON_VARIANT } from "../constans/stylesVariant";
import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { paymentMethods } from "../constans/paymentMethods";
import RadioButton from "../components/UI/RadioButton";
import { useNavigate } from "react-router-dom";
import { currencyFormatter } from "../utils/currency";

function CheckoutPage() {
  const navigate = useNavigate("");
  const { updateCheckoutData, totalPrice, checkoutData } =
    useContext(CartContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: checkoutData.fullName ?? "",
      street: checkoutData.street ?? "",
      email: checkoutData.email ?? "",
      phone: checkoutData.phone ?? "",
      city: checkoutData.city ?? "",
      postCode: checkoutData.postCode ?? "",
      paymentMethod: checkoutData.paymentMethod,
    },
  });
  const onSubmit = (data) => {
    updateCheckoutData(data);
    navigate("/cart/summary");
  };
  return (
    <>
      <div className="py-3.75 px-7 border-b border-b-(--border) text-center">
        <div className="font-bold text-[var(--text-h)]">Order address</div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap items-center"
      >
        <div className="w-full md:w-8/12 p-7 pb-3 md:pb-7 columns-1 md:columns-2 gap-x-12 gap-y-7">
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
        </div>

        <div className="w-full md:w-4/12 p-7 pt-0  md:pt-7 text-center text-sm text-[var(--text-h)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="16px"
          >
            <path
              fill="currentColor"
              d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM224 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-8 64l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
            />
          </svg>
          <p>
            This is only a
            <strong className="text-[var(--accent)]">demo app</strong>,
            therefore only Full name and City is Posted in Orders DB. The rest
            of form is required but it’s ignored in further steps.
          </p>
        </div>

        <div className="w-full py-3.75 px-7 border-b border-b-(--border) text-center">
          <div className="font-bold text-[var(--text-h)]">Payment Method</div>
        </div>

        <div className="w-full p-7 flex flex-wrap justify-center gap-3.75">
          {paymentMethods.map((payment) => (
            <RadioButton
              key={payment.id}
              payment={payment}
              {...register("paymentMethod")}
            ></RadioButton>
          ))}
        </div>

        <div className="flex flex-wrap w-full gap-x-7 gap-y-3 py-3.75 px-7 border-t border-t-(--border) justify-center md:justify-end">
          <div className="font-bold text-[var(--text-h)] flex items-start gap-3.75 md:ms-auto text-center">
            Total Price:
            <span className="text-2xl text-[var(--accent)]">
              {currencyFormatter.format(totalPrice)}
            </span>
          </div>
          <Button variant={BUTTON_VARIANT.BUTTON} type="submit">
            To summary
          </Button>
        </div>
      </form>
    </>
  );
}

export default CheckoutPage;
