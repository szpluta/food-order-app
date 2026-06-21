import { useForm } from "react-hook-form";
import { supabase } from "../../utils/supabase";
import { useState } from "react";
import { LOADER_STATE } from "../../constans/loaderState";
import LoadingState from "../UI/LoadingState";
import RadioButton from "../UI/RadioButton";
import { paymentMethods } from "../../constans/paymentMethods";
import Button from "../UI/Button";
import { BUTTON_VARIANT } from "../../constans/buttonVariant";

export default function CartPaywall({
  customer,
  shoppingCart,
  clearCart,
  totalPrice,
  prevStep,
}) {
  const [status, setStatus] = useState(LOADER_STATE.IDLE);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      paymentMethod: "onDelivery",
    },
  });

  const onSubmit = async (submitData) => {
    setStatus(LOADER_STATE.LOADING);

    try {
      const { error } = await supabase.functions.invoke("calc-order-total", {
        body: {
          ...customer,
          items: shoppingCart.map((item) => ({
            productId: item.id,
            name: item.name,
            priceAtPurchase: item.price,
            quantity: item.quantity,
          })),
          ...submitData,
        },
      });

      if (error) throw error;
      clearCart();
      setStatus(LOADER_STATE.SUCCESS);
    } catch (e) {
      console.error(e);
      setStatus(LOADER_STATE.ERROR);
    }
  };

  return (
    <>
      <div className="py-3.75 px-7 border-b border-b-(--border) text-center">
        <div className="font-bold text-[var(--text-h)]">Finalize Order</div>
      </div>
      {status === LOADER_STATE.IDLE && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-7 flex flex-wrap justify-center gap-3.75">
            {paymentMethods.map((payment) => (
              <RadioButton
                payment={payment}
                {...register("paymentMethod")}
              ></RadioButton>
            ))}
          </div>

          <div className="flex gap-x-7 py-3.75 px-7 border-t border-t-(--border) justify-end">
            <Button variant={BUTTON_VARIANT.BUTTON} onClick={prevStep}>
              Back to Checkout
            </Button>
            <div className="font-bold text-[var(--text-h)] flex items-start gap-3.75 ms-auto">
              Total Price:
              <span className="text-2xl text-[var(--accent)]">
                {totalPrice}
              </span>
            </div>
            <Button variant={BUTTON_VARIANT.BUTTON} type="submit">
              Confirm order
            </Button>
          </div>
        </form>
      )}

      {status === LOADER_STATE.LOADING && <LoadingState />}

      {status === LOADER_STATE.SUCCESS && (
        <div className="p-7 space-y-3 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="48"
            className="text-[var(--success)]"
          >
            <path
              fill="currentColor"
              d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zM374 145.7c-10.7-7.8-25.7-5.4-33.5 5.3L221.1 315.2 169 263.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72c5 5 11.8 7.5 18.8 7s13.4-4.1 17.5-9.8L379.3 179.2c7.8-10.7 5.4-25.7-5.3-33.5z"
            />
          </svg>
          <h4 className="text-2xl font-bold">Order confirmed!</h4>
          <p>We're preparing your meal.</p>
        </div>
      )}
      {status === LOADER_STATE.ERROR && (
        <div className="p-7 space-y-3 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="48"
            className="text-[var(--notice)]"
          >
            <path
              fill="currentColor"
              d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zm0-192a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.6 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"
            />
          </svg>
          <h4 className="text-2xl font-bold">
            Payment interupted, please try again later
          </h4>
        </div>
      )}
    </>
  );
}
