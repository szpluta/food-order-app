import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import MealsItem from "./MealsItem";
import { LOADER_STATE } from "../../constans/loaderState";
import LoadingState from "../UI/LoadingState";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [status, setStatus] = useState(LOADER_STATE.IDLE);

  useEffect(() => {
    async function getMeals() {
      setStatus(LOADER_STATE.LOADING);
      try {
        const { data, error } = await supabase.from("Meals").select();

        if (error) throw error;
        if (data) setMeals(data || []);
        setStatus(LOADER_STATE.SUCCESS);
      } catch (e) {
        console.error(e);
        setStatus(LOADER_STATE.ERROR);
      }
    }
    getMeals();
  }, []);
  return (
    <>
      {status === LOADER_STATE.LOADING && <LoadingState />}
      {status === LOADER_STATE.SUCCESS && (
        <ul>
          {meals.map((meal) => (
            <MealsItem item={meal} key={meal.id} />
          ))}
        </ul>
      )}

      {status === LOADER_STATE.ERROR && <div> A HUJ</div>}
    </>
  );
}
