import { supabase } from "../../utils/supabase";

async function getMeals() {
  const { data, error } = await supabase.from("Meals").select();

  if (error) throw error;

  return data ?? [];
}

export default function mealsLoader() {
  return {
    meals: getMeals(),
  };
}
