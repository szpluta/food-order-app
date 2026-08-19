import { supabase } from "../../utils/supabase";

async function getOrders() {
  const { data, error } = await supabase
    .from("Orders")
    .select()
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export default function ordersLoader() {
  return {
    orders: getOrders(),
  };
}
