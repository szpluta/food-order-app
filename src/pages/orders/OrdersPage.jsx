import { useLoaderData } from "react-router-dom";
import OrderItem from "../../components/orders/OrderItem";
import AsyncContent from "../../components/UI/AsyncContent";

function OrdersPage() {
  const { orders } = useLoaderData();
  return (
    <AsyncContent resolve={orders}>
      {(orders) =>
        orders.length > 0 ? (
          orders.map((order) => <OrderItem order={order} key={order.id} />)
        ) : (
          <div className="p-5">
            <h3 className="text-2xl font-bold text-center">- No orders - </h3>
          </div>
        )
      }
    </AsyncContent>
  );
}

export default OrdersPage;
