function DeliveryData({
  deliveryDataList,
  profile,
  onSelect,
  selectable = false,
  selectedAddress,
}) {
  return (
    <>
      {deliveryDataList.length > 0
        ? deliveryDataList.map((item) => (
            <div
              key={item.id}
              className={`relative border mb-10 p-4.5 rounded-3xl ${(selectedAddress || profile?.defaultDeliveryId) === item.id ? "border-(--accent)" : "border-(--border)"}`}
              onClick={() => (selectable ? onSelect(item.id) : undefined)}
            >
              {!selectable &&
                (profile?.defaultDeliveryId === item.id ? (
                  <span className="absolute top-3 right-3 text-xxs text-white bg-(--accent) border border-(--accent) rounded-3xl px-2 py-0.5 w-24 text-center ">
                    Default
                  </span>
                ) : (
                  <button
                    className="absolute top-3 right-3 text-xxs text-(--text) border border-(--border) rounded-3xl px-2 py-0.5 w-24 text-center cursor-pointer"
                    onClick={() => onSelect(item.id)}
                  >
                    Set as Default
                  </button>
                ))}
              <h3 className="mb-3 text-lg font-bold max-w-[calc(100%-60px)]">
                {item.label}
              </h3>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="mb-2 text-sm text-(--accent)">Street:</p>
                  <p>{item.street}</p>
                </div>
                <div>
                  <p className="mb-2 text-sm text-(--accent)">City:</p>
                  <p>{item.city}</p>
                </div>
                <div>
                  <p className="mb-2 text-sm text-(--accent)">Phone:</p>
                  <p>{item.phone}</p>
                </div>
                <div>
                  <p className="mb-2 text-sm text-(--accent)">
                    Delivery details:
                  </p>
                  <p>{item.deliveryDetails}</p>
                </div>
              </div>
            </div>
          ))
        : "---- no saved addresses ----"}
    </>
  );
}

export default DeliveryData;
