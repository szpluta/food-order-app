import { supabase } from "./supabase";

export async function signInWithEmail({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }
  return data;
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("Profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function checkSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }
  return data.session;
}
