import { useLoaderData } from "react-router-dom";
import AsyncContent from "../../components/UI/AsyncContent";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/AuthContext";
import Button from "../../components/UI/Button";
import { BUTTON_VARIANT } from "../../constans/stylesVariant";
import DeliveryForm from "../../components/forms/DeliveryForm";
import { useForm } from "react-hook-form";
import InfoStatement from "../../components/UI/InfoStatement";
import {
  updateDefaultDeliveryAddress,
  updateDeliveryData,
} from "../../utils/services/deliveryService";
import DeliveryData from "../../components/DeliveryData";
import { PROFILE_STATUS } from "../../constans/profileStatus";

function ProfilePage() {
  const [formVisible, setFormVisible] = useState(false);
  const { deliveryData } = useLoaderData();
  const [deliveryDataList, setDeliveryDataList] = useState(deliveryData);
  const { profile, isLoading, updateUser, reloadProfile } =
    useContext(AuthContext);

  function handleDeliveryForm() {
    setFormVisible((visible) => !visible);
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      label: "",
      street: "",
      phone: "",
      city: "",
      postCode: "",
      deliveryDetails: "",
      asDefault: false,
    },
  });
  const onSubmit = async (formData) => {
    const { asDefault, ...deliveryData } = formData;

    const response = await updateDeliveryData(asDefault, deliveryData, profile);

    if (asDefault) {
      updateUser({
        ...profile,
        defaultDeliveryId: response.id,
      });
    }

    setDeliveryDataList((currrentList) => [response, ...currrentList]);
    reset();
  };

  async function selectDefaultDelivery(id) {
    await updateDefaultDeliveryAddress(id, profile);
    updateUser({
      ...profile,
      defaultDeliveryId: id,
    });
  }

  return (
    <div className="flex flex-wrap mb-10">
      <div className="w-full md:w-3/12 p-5 space-y-5">
        <h3 className="text-2xl font-bold border-b border-b-(--border) mb-10 p-3.75">
          Profile
        </h3>
        <div className="px-3.75 space-y-2">
          {!isLoading ? (
            profile?.status === PROFILE_STATUS.SUCCESS ? (
              <>
                <p>{profile?.name}</p> <p>{profile?.surname}</p>
              </>
            ) : (
              <>
                <p>
                  We couldn't retrieve your profile information. Your account is
                  still signed in.
                </p>
                <p>
                  <Button
                    variant={BUTTON_VARIANT.BUTTON}
                    onClick={reloadProfile}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Reload profile data"}
                  </Button>
                </p>
              </>
            )
          ) : (
            "Loading..."
          )}
        </div>
      </div>
      <div className="w-full md:w-6/12 p-5 space-y-5">
        <div>
          <div className="flex justify-between border-b border-b-(--border) mb-10 p-3.75">
            <h3 className="text-2xl font-bold">Delivery list</h3>
            <Button
              variant={BUTTON_VARIANT.BUTTON}
              onClick={() => handleDeliveryForm()}
              customCSS="mt-auto self-center"
            >
              {formVisible ? "-" : "+"}
            </Button>
          </div>

          {formVisible && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-wrap items-center"
            >
              <DeliveryForm register={register} errors={errors} watch={watch} />
              <div className="w-full text-center">
                <Button variant={BUTTON_VARIANT.BUTTON} type="submit">
                  Create address
                </Button>
              </div>
            </form>
          )}
        </div>
        <AsyncContent resolve={deliveryData}>
          <DeliveryData
            deliveryDataList={deliveryDataList}
            profile={profile}
            onSelect={selectDefaultDelivery}
          />
        </AsyncContent>
      </div>
      <InfoStatement />
    </div>
  );
}

export default ProfilePage;
