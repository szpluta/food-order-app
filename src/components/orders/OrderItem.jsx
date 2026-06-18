export default function OrderItem({ order }) {
  return (
    <>
      <div key={`order-${order.id}`}>
        <h3>Order #: {order.id}</h3>
      </div>{" "}
      <div>{order.totalPrice}</div>
      <ul>
        {order.items.map((item) => (
          <li key={`item-${item.productId}`}>
            {item.name}, {item.quantity}, {item.priceAtPurchase} (
            {item.quantity * item.priceAtPurchase})
          </li>
        ))}
      </ul>
    </>
  );
}
