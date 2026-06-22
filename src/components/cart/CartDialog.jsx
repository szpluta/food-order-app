import { createPortal } from "react-dom";
import { CartContext } from "../../store/CartContext";
import { useContext, useState } from "react";
import CartCheckout from "./CartCheckout";
import { CART_STEP } from "../../constans/cartStep";
import CartPaywall from "./CartPaywall";
import Button from "../UI/Button";
import { BUTTON_VARIANT } from "../../constans/buttonVariant";
import { currencyFormatter } from "../../utils/currency";

export default function CartDialog({ cartDialog, openOrdersTab }) {
  const { shoppingCart, updateCart, totalPrice, clearCart } =
    useContext(CartContext);
  const [cartStep, setCartStep] = useState(CART_STEP.CART);
  const [checkoutDraft, setCheckoutDraft] = useState(null);

  function goTo(step) {
    setCartStep(step);
  }

  function handleClose() {
    goTo(CART_STEP.CART);
    cartDialog.current.close();
  }

  function handleBackButton(data) {
    setCheckoutDraft(data);
  }

  function handleClearCart() {
    clearCart();
    openOrdersTab();
  }

  return createPortal(
    <dialog
      ref={cartDialog}
      onClose={handleClose}
      className="m-auto w-240 pt-3 shadow-[var(--shadow)]"
    >
      <Button variant={BUTTON_VARIANT.CLOSE} onClick={handleClose}>
        X
      </Button>
      {cartStep === CART_STEP.CART && (
        <>
          {shoppingCart.length > 0 && (
            <>
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
                {shoppingCart.map((item) => (
                  <li className="flex gap-3.75" key={item.id}>
                    <div className="w-6/12">{item.name}</div>
                    <div className="flex gap-3.75 justify-center w-30 items-center">
                      <Button
                        variant={BUTTON_VARIANT.SMALL}
                        onClick={() => updateCart(item, -1)}
                      >
                        -
                      </Button>
                      <span className="w-4 text-center">{item.quantity}</span>
                      <Button
                        variant={BUTTON_VARIANT.SMALL}
                        onClick={() => updateCart(item, 1)}
                      >
                        +
                      </Button>
                    </div>
                    <div className="text-right w-30 ms-auto">
                      {currencyFormatter.format(item.price)}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-x-7 py-3.75 px-7 border-t border-t-(--border) justify-end">
                <div className="font-bold text-[var(--text-h)] flex items-start gap-3.75">
                  Total Price:
                  <span className="text-2xl text-[var(--accent)]">
                    {currencyFormatter.format(totalPrice)}
                  </span>
                </div>
                <Button
                  variant={BUTTON_VARIANT.BUTTON}
                  disabled={shoppingCart.length < 1}
                  onClick={() => goTo(CART_STEP.CHECKOUT)}
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
          {shoppingCart.length === 0 && (
            <div className="text-center p-5 pb-8 space-y-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                width="48"
                className="text-[var(--notice)]"
              >
                <path
                  fill="currentColor"
                  d="M288 0c6.6 0 12.9 2.7 17.4 7.5l144 152 .5 .5 78.1 0c17.7 0 32 14.3 32 32 0 14.5-9.6 26.7-22.8 30.7L491.1 429.9c-6.5 29.3-32.5 50.1-62.5 50.1l-281.3 0c-30 0-56-20.8-62.5-50.1l-46-207.2c-13.2-3.9-22.8-16.2-22.8-30.7 0-17.7 14.3-32 32-32l78.1 0 .5-.5 144-152C275.1 2.7 281.4 0 288 0zm0 58.9L192.2 160 383.8 160 288 58.9zM208 264c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112zm80-24c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm128 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112z"
                />
              </svg>
              <h4 className="text-xl font-bold">
                Your cart is <span className="text-[var(--accent)]">empty</span>
                . Add some meals to get started.
              </h4>
              <p></p>
            </div>
          )}
        </>
      )}

      {cartStep === CART_STEP.CHECKOUT && (
        <CartCheckout
          prevStep={() => goTo(CART_STEP.CART)}
          nextStep={() => goTo(CART_STEP.PAYWALL)}
          handleBackButton={handleBackButton}
          checkoutDraft={checkoutDraft}
          setCheckoutDraft={(data) => setCheckoutDraft(data)}
          totalPrice={currencyFormatter.format(totalPrice)}
        />
      )}

      {cartStep === CART_STEP.PAYWALL && (
        <CartPaywall
          customer={{
            fullName: checkoutDraft.fullName,
            city: checkoutDraft.city,
          }}
          totalPrice={totalPrice}
          shoppingCart={shoppingCart}
          prevStep={() => goTo(CART_STEP.CHECKOUT)}
          clearCart={handleClearCart}
        />
      )}
    </dialog>,
    document.getElementById("modal"),
  );
}
