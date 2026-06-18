import { useForm } from "react-hook-form";
import { supabase } from "../../utils/supabase";
import { useState } from "react";
import { LOADER_STATE } from "../../constans/loaderState";
import LoadingState from "../UI/LoadingState";

export default function CartPaywall({ customer, shoppingCart, clearCart }) {
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
      {status === LOADER_STATE.IDLE && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <input
              type="radio"
              value="onDelivery"
              {...register("paymentMethod")}
            />
            On delivery
          </label>
          <label>
            <input type="radio" value="card" {...register("paymentMethod")} />
            Card
          </label>
          <label>
            <input type="radio" value="blik" {...register("paymentMethod")} />
            BLIK
          </label>
          <label>
            <input type="radio" value="paypal" {...register("paymentMethod")} />
            PayPal
          </label>
          <button>Order & Pay now</button>
        </form>
      )}

      {status === LOADER_STATE.LOADING && <LoadingState />}

      {status === LOADER_STATE.SUCCESS && <div> HUURAAAA</div>}
      {status === LOADER_STATE.ERROR && <div> A HUJ</div>}
    </>
  );
}
