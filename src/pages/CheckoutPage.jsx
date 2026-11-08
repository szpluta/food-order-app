import { useForm } from "react-hook-form";
import Button from "../components/UI/Button";
import {
  BUTTON_VARIANT,
  BUTTON_VARIANT_STYLES,
} from "../constans/stylesVariant";
import { useContext, useState } from "react";
import { CartContext } from "../store/CartContext";
import { paymentMethods } from "../constans/paymentMethods";
import RadioButton from "../components/UI/RadioButton";
import { useLoaderData, useNavigate } from "react-router-dom";
import { currencyFormatter } from "../utils/currency";
import DeliveryForm from "../components/forms/DeliveryForm";
import InfoStatement from "../components/UI/InfoStatement";
import AsyncContent from "../components/UI/AsyncContent";
import DeliveryData from "../components/DeliveryData";
import { AuthContext } from "../store/AuthContext";
import { DELIVERY_VIEW } from "../constans/deliveryState";

function CheckoutPage() {
  const { profile } = useContext(AuthContext);
  const navigate = useNavigate();
  const { updateCheckoutData, totalPrice, checkoutData } =
    useContext(CartContext);

  const { deliveryData } = useLoaderData();

  const [selectedAddressID, setSelectedAddressID] = useState(null);
  const [deliveryAddressView, setDeliveryAddressView] = useState(
    DELIVERY_VIEW.SELECT,
  );

  const activeAddressID = selectedAddressID ?? profile?.defaultDeliveryId;

  const currentDeliveryData =
    deliveryAddressView === DELIVERY_VIEW.CHANGE
      ? [...deliveryData].sort(
          (a, b) =>
            Number(b.id === activeAddressID) - Number(a.id === activeAddressID),
        )
      : deliveryData.filter((item) => activeAddressID === item.id);

  function handleAddressView(view) {
    setDeliveryAddressView(view);
  }

  function handeSelectedDeliveryAddress(id) {
    setSelectedAddressID(id);
  }

  function handleTabKeyDown(event) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();

      const nextView =
        deliveryAddressView === DELIVERY_VIEW.NEW
          ? DELIVERY_VIEW.SELECT
          : DELIVERY_VIEW.NEW;

      handleAddressView(nextView);

      document
        .getElementById(
          nextView === DELIVERY_VIEW.NEW
            ? "new-address-tab"
            : "select-address-tab",
        )
        ?.focus();
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();

      const nextView =
        event.key === "Home" ? DELIVERY_VIEW.SELECT : DELIVERY_VIEW.NEW;

      handleAddressView(nextView);

      document
        .getElementById(
          nextView === DELIVERY_VIEW.NEW
            ? "new-address-tab"
            : "select-address-tab",
        )
        ?.focus();
    }
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      street: null,
      phone: null,
      city: null,
      postCode: null,
      paymentMethod: checkoutData.paymentMethod,
    },
  });
  const onSubmit = (data) => {
    const selectedAddressData = deliveryData.find(
      (address) => address.id === activeAddressID,
    );
    updateCheckoutData({
      street:
        deliveryAddressView === DELIVERY_VIEW.NEW
          ? data.street
          : selectedAddressData.street,
      phone:
        deliveryAddressView === DELIVERY_VIEW.NEW
          ? data.phone
          : selectedAddressData.phone,
      city:
        deliveryAddressView === DELIVERY_VIEW.NEW
          ? data.city
          : selectedAddressData.city,
      postCode:
        deliveryAddressView === DELIVERY_VIEW.NEW
          ? data.postCode
          : selectedAddressData.postCode,
      createNew: deliveryAddressView === DELIVERY_VIEW.NEW ? true : false,
      label: deliveryAddressView === DELIVERY_VIEW.NEW ? data.label : null,
      paymentMethod: data.paymentMethod,
    });
    navigate("/cart/summary");
  };
  return (
    <>
      <div className="py-3.75 px-7 border-b border-b-(--border) text-center">
        <div className="font-bold text-(--text-h)">Order address</div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap items-top"
      >
        <div
          className="w-full md:w-9/12 flex flex-wrap items-center justify-center my-3 px-5"
          role="tablist"
          aria-label="Delivery address options"
        >
          <Button
            id="select-address-tab"
            role="tab"
            type="button"
            aria-selected={deliveryAddressView !== DELIVERY_VIEW.NEW}
            aria-controls="select-address-panel"
            tabIndex={deliveryAddressView !== DELIVERY_VIEW.NEW ? 0 : -1}
            onClick={() => handleAddressView(DELIVERY_VIEW.SELECT)}
            onKeyDown={handleTabKeyDown}
            className={`inline-block mt-auto self-center cursor-pointer ${BUTTON_VARIANT_STYLES.BUTTON} rounded-e-none ${deliveryAddressView !== DELIVERY_VIEW.NEW ? BUTTON_VARIANT_STYLES.BUTTON_ACTIVE : ""}`}
          >
            Select address
          </Button>

          <Button
            id="new-address-tab"
            role="tab"
            type="button"
            aria-selected={deliveryAddressView === DELIVERY_VIEW.NEW}
            aria-controls="new-address-panel"
            tabIndex={deliveryAddressView === DELIVERY_VIEW.NEW ? 0 : -1}
            onClick={() => handleAddressView(DELIVERY_VIEW.NEW)}
            onKeyDown={handleTabKeyDown}
            className={`inline-block mt-auto self-center cursor-pointer ${BUTTON_VARIANT_STYLES.BUTTON} rounded-s-none ${deliveryAddressView === DELIVERY_VIEW.NEW ? BUTTON_VARIANT_STYLES.BUTTON_ACTIVE : ""}`}
          >
            Add new address
          </Button>
        </div>
        {deliveryAddressView !== DELIVERY_VIEW.NEW ? (
          <div className="w-full md:w-9/12 p-5">
            <Button
              type="button"
              onClick={() =>
                handleAddressView(
                  deliveryAddressView === DELIVERY_VIEW.CHANGE
                    ? DELIVERY_VIEW.SELECT
                    : DELIVERY_VIEW.CHANGE,
                )
              }
              className={`inline-block mt-auto self-center cursor-pointer ${BUTTON_VARIANT_STYLES.BUTTON} ${deliveryAddressView === DELIVERY_VIEW.NEW ? BUTTON_VARIANT_STYLES.BUTTON_ACTIVE : ""}`}
            >
              {deliveryAddressView === DELIVERY_VIEW.SELECT
                ? "Choose different address"
                : "Cancel"}
            </Button>
            <AsyncContent resolve={deliveryData}>
              <DeliveryData
                deliveryDataList={currentDeliveryData}
                profile={profile}
                selectable
                onSelect={handeSelectedDeliveryAddress}
                selectedAddress={activeAddressID}
              />
            </AsyncContent>
          </div>
        ) : (
          <div className="w-full md:w-6/12 p-5 space-y-5 mx-auto">
            <DeliveryForm register={register} errors={errors} watch={watch} />
          </div>
        )}
        <InfoStatement />
        <div className="w-full py-3.75 px-7 border-b border-b-(--border) text-center">
          <div className="font-bold text-(--text-h)">Payment Method</div>
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
          <div className="font-bold text-(--text-h) flex items-start gap-3.75 md:ms-auto text-center">
            Total Price:
            <span className="text-2xl text-(--accent)">
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
