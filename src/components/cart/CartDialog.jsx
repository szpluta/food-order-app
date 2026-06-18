import { createPortal } from "react-dom";
import { CartContext } from "../../store/CartContext";
import { useContext, useState } from "react";
import CartCheckout from "./CartCheckout";
import { CART_STEP } from "../../constans/cartStep";
import CartPaywall from "./CartPaywall";

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
    console.log(data);
    setCheckoutDraft(data);
  }

  function handleClearCart() {
    clearCart();
    openOrdersTab();
  }

  return createPortal(
    <dialog ref={cartDialog} onClose={handleClose}>
      {totalPrice}
      {cartStep === CART_STEP.CART && (
        <>
          <ul>
            {shoppingCart.map((item) => (
              <li key={item.id}>
                {item.name}, {item.price}, {item.quantity}
                <button onClick={() => updateCart(item, 1)}>+</button>
                <button onClick={() => updateCart(item, -1)}>-</button>
              </li>
            ))}
          </ul>
          <button
            disabled={shoppingCart.length < 1}
            onClick={() => goTo(CART_STEP.CHECKOUT)}
          >
            Checkout
          </button>
        </>
      )}

      {cartStep === CART_STEP.CHECKOUT && (
        <CartCheckout
          prevStep={() => goTo(CART_STEP.CART)}
          nextStep={() => goTo(CART_STEP.PAYWALL)}
          handleBackButton={handleBackButton}
          checkoutDraft={checkoutDraft}
          setCheckoutDraft={(data) => setCheckoutDraft(data)}
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
          clearCart={handleClearCart}
        />
      )}

      <button onClick={handleClose}>X</button>
    </dialog>,
    document.getElementById("modal"),
  );
}
