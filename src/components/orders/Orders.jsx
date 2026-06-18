import { useEffect, useState } from "react";
import { LOADER_STATE } from "../../constans/loaderState";
import { supabase } from "../../utils/supabase";
import LoadingState from "../UI/LoadingState";
import OrderItem from "./OrderItem";

export default function Orders({ refreshKey }) {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState(LOADER_STATE.IDLE);

  useEffect(() => {
    async function getOrders() {
      setStatus(LOADER_STATE.LOADING);
      try {
        const { data, error } = await supabase
          .from("Orders")
          .select()
          .order("createdAt", { ascending: false });

        if (error) throw error;
        if (data) setOrders(data || []);
        setStatus(LOADER_STATE.SUCCESS);
      } catch (e) {
        console.error(e);
        setStatus(LOADER_STATE.ERROR);
      }
    }
    getOrders();
  }, [refreshKey]);
  return (
    <>
      {status === LOADER_STATE.LOADING && <LoadingState />}
      {status === LOADER_STATE.SUCCESS && (
        <div>
          {orders.length > 0 ? (
            orders.map((order) => <OrderItem order={order} key={order.id} />)
          ) : (
            <p>No orders</p>
          )}
        </div>
      )}

      {status === LOADER_STATE.ERROR && <div> A HUJ</div>}
    </>
  );
}
