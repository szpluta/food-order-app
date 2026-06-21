import { supabase } from "../supabase";

export function getImageUrl(path) {
  return supabase.storage.from("meals").getPublicUrl(path).data.publicUrl;
}
