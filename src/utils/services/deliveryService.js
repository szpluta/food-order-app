import { redirect } from "react-router-dom";
import { checkSession } from "../auth";
import { supabase } from "../supabase";

export async function getDeliveryData() {
  const { data, error } = await supabase
    .from("Delivery")
    .select()
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function updateDeliveryData(asDefault, deliveryData, profile) {
  const { data, error } = await supabase
    .from("Delivery")
    .insert(deliveryData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  if (asDefault) {
    await supabase
      .from("Profiles")
      .update({ defaultDeliveryId: data.id })
      .eq("id", profile.id);
  }

  return data;
}

export async function updateDefaultDeliveryAddress(id, profile) {
  const { data, error } = await supabase
    .from("Profiles")
    .update({ defaultDeliveryId: id })
    .eq("id", profile.id);

  if (error) {
    throw error;
  }

  return data;
}

export async function deliveryService() {
  const deliveryData = await getDeliveryData();
  const session = await checkSession();

  if (!session) {
    throw redirect("/login");
  }
  return { deliveryData };
}
