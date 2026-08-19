import { useLoaderData } from "react-router-dom";
import MealsItem from "../../components/meals/MealsItem";
import AsyncContent from "../../components/UI/AsyncContent";

function MealsPage() {
  const { meals } = useLoaderData();

  return (
    <AsyncContent resolve={meals}>
      {(meals) =>
        meals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
            {meals.map((meal) => (
              <MealsItem item={meal} key={meal.id} />
            ))}
          </div>
        ) : (
          <div className="p-5">
            <h3 className="text-2xl font-bold text-center">- No meals -</h3>
          </div>
        )
      }
    </AsyncContent>
  );
}

export default MealsPage;
