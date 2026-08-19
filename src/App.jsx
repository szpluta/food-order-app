import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import MealsPage from "./pages/meals/MealsPage.jsx";
import OrdersPage from "./pages/orders/OrdersPage.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import SummaryPage from "./pages/SummaryPage.jsx";
import mealsLoader from "./pages/meals/mealsLoader.js";
import ordersLoader from "./pages/orders/ordersLoader.js";
import Changelog from "./pages/Changelog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: "cart",
            element: <CartPage />,
          },
          {
            path: "cart/checkout",
            element: <CheckoutPage />,
          },
          {
            path: "cart/summary",
            element: <SummaryPage />,
          },
          {
            path: "meals",
            element: <MealsPage />,
            loader: mealsLoader,
          },
          {
            path: "orders",
            element: <OrdersPage />,
            loader: ordersLoader,
          },
          {
            path: "/changelog",
            element: <Changelog />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
