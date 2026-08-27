import { redirect } from "react-router-dom";
import { checkSession } from "../../utils/auth";
import { supabase } from "../../utils/supabase";

async function getOrders() {
  const { data, error } = await supabase
    .from("Orders_v2")
    .select()
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export default async function ordersLoader() {
  const session = await checkSession();

  if (!session) {
    throw redirect("/login");
  }

  return {
    orders: getOrders(),
  };
}
