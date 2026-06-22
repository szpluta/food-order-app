import { paymentMethodLabels } from "../../constans/paymentMethods";
import { currencyFormatter } from "../../utils/currency";

export default function OrderItem({ order }) {
  return (
    <>
      <div key={`order-${order.id}`} className="flex flex-wrap mb-10">
        <div className="w-full py-3.75 px-7 border-b border-b-(--border) mb-10">
          <h3 className="text-2xl font-bold">
            Order <span className="text-[var(--accent)]">#</span>
            {order.id}
          </h3>
        </div>

        <div className="w-full md:w-4/12 text-center md:text-left p-5 span-y-5">
          <div>
            <div className="font-bold text-[var(--text-h)]">Contact:</div>
            <p>{order.fullName}</p>
            <p>{order.city}</p>
          </div>
          <div>
            <div className="font-bold text-[var(--text-h)]">
              Payment method:
            </div>
            <p>{paymentMethodLabels[order.paymentMethod]}</p>
          </div>
        </div>
        <div className="w-full md:w-8/12">
          <div className="flex gap-3.75 py-3.75 px-7 border-b border-b-(--border)">
            <div className="font-bold text-[var(--text-h)] w-6/12">Name</div>
            <div className="font-bold text-[var(--text-h)] text-center w-30">
              Quantity
            </div>
            <div className="font-bold text-[var(--text-h)] text-right w-30 ms-auto">
              Price
            </div>
          </div>
          <ul className="px-7 py-5 space-y-5">
            {order.items.map((item) => (
              <li className="flex gap-3.75" key={item.productId}>
                <div className="w-6/12">{item.name}</div>
                <div className="flex gap-3.75 justify-center w-30">
                  <span className="w-4 text-center">{item.quantity}</span>
                </div>
                <div className="text-right w-30 ms-auto ">
                  {currencyFormatter.format(
                    item.quantity * item.priceAtPurchase,
                  )}

                  {item.quantity > 1 && (
                    <div className="text-xs">
                      ({item.quantity} *{" "}
                      {currencyFormatter.format(item.priceAtPurchase)})
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full font-bold text-[var(--text-h)] border-t border-t-(--border) flex items-start justify-end p-5 gap-3.75 mt-5">
          Total Price:
          <span className="text-2xl text-[var(--accent)]">
            {currencyFormatter.format(order.totalPrice)}
          </span>
        </div>
      </div>
    </>
  );
}
