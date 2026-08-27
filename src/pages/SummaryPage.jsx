import { useContext, useState } from "react";
import { CartContext } from "../store/CartContext";
import { LOADER_STATE } from "../constans/loaderState";
import LoadingState from "../components/UI/LoadingState";
import { supabase } from "../utils/supabase";
import Button from "../components/UI/Button";
import { currencyFormatter } from "../utils/currency";
import { paymentMethodLabels } from "../constans/paymentMethods";

function SummaryPage() {
  const [status, setStatus] = useState(LOADER_STATE.IDLE);
  const { checkoutData, shoppingCart, clearCart, totalPrice } =
    useContext(CartContext);

  const onSubmit = async () => {
    setStatus(LOADER_STATE.LOADING);

    try {
      const { error } = await supabase.functions.invoke("calc-order-total", {
        body: {
          orderVersion: "v2",
          fullName: checkoutData.fullName,
          city: checkoutData.city,
          paymentMethod: checkoutData.paymentMethod,
          items: shoppingCart.map((item) => ({
            productId: item.id,
            name: item.name,
            priceAtPurchase: item.price,
            quantity: item.quantity,
          })),
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
      <div className="py-3.75 px-7 border-b border-b-(--border) text-center mb-4">
        <div className="font-bold text-[var(--text-h)]">Finalize Order</div>
      </div>
      {status === LOADER_STATE.IDLE && (
        <div className="flex flex-wrap">
          <div className="w-full md:w-4/12 text-center md:text-left p-5 space-y-5">
            <div>
              <h3 className="font-bold text-[var(--text-h)]">Delivery:</h3>
              <address>
                <p>{checkoutData.fullName}</p>
                <p>{checkoutData.street}</p>
                <p>{checkoutData.email}</p>
                <p>{checkoutData.phone}</p>
                <p>{checkoutData.postCode}</p>
                <p>{checkoutData.city}</p>
              </address>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-h)]">
                Payment method:
              </h3>
              <p>{paymentMethodLabels[checkoutData.paymentMethod]}</p>
            </div>
          </div>

          {shoppingCart.length > 0 ? (
            <div className="w-full md:w-8/12">
              <div className="flex gap-3.75 py-3.75 px-7 border-b border-b-(--border)">
                <div className="font-bold text-[var(--text-h)] w-6/12">
                  Name
                </div>
                <div className="font-bold text-[var(--text-h)] text-center w-30">
                  Quantity
                </div>
                <div className="font-bold text-[var(--text-h)] text-right w-30 ms-auto">
                  Price
                </div>
              </div>
              <ul className="px-7 py-5 space-y-5">
                {shoppingCart.map((cartItem) => (
                  <li key={`cartItem-${cartItem.id}`} className="flex gap-3.75">
                    <div className="w-6/12">{cartItem.name}</div>
                    <div className="flex gap-3.75 justify-center w-30">
                      <span className="w-4 text-center">
                        {cartItem.quantity}
                      </span>
                    </div>
                    <div className="text-right w-30 ms-auto ">
                      {currencyFormatter.format(
                        cartItem.quantity * cartItem.price,
                      )}

                      {cartItem.quantity > 1 && (
                        <div className="text-xs">
                          ({cartItem.quantity} *{" "}
                          {currencyFormatter.format(cartItem.price)})
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="w-full font-bold text-[var(--text-h)] border-t border-t-(--border) flex items-start justify-end p-5 gap-3.75 mt-5">
                Total Price:
                <span className="text-2xl text-[var(--accent)]">
                  {currencyFormatter.format(totalPrice)}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-5">
              <h3 className="text-2xl font-bold text-center">
                - Cart is empty -
              </h3>
            </div>
          )}
          <div className="w-full text-center">
            <Button onClick={onSubmit}>Place the Order</Button>
          </div>
        </div>
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
            Payment interrupted, please try again later
          </h4>
        </div>
      )}
    </>
  );
}

export default SummaryPage;
