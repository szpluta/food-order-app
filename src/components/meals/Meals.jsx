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
        <>
          {meals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
              {meals.map((meal) => (
                <MealsItem item={meal} key={meal.id} />
              ))}
            </div>
          ) : (
            <div className="p-5">
              <h3 className="text-2xl font-bold text-center">- No meals -</h3>
            </div>
          )}
        </>
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
