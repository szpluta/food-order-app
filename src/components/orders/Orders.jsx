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
            <div className="p-5">
              <h3 className="text-2xl font-bold text-center">- No orders - </h3>
            </div>
          )}
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
            Loading interupted, please try again later
          </h4>
        </div>
      )}
    </>
  );
}
