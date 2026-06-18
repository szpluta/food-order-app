import { CartContextProvider } from "./store/CartContextProvider";
import "./App.css";
import Cart from "./components/cart/Cart";
import Meals from "./components/meals/Meals";
import Orders from "./components/orders/Orders";
import { useState, useRef } from "react";
import CartButton from "./components/cart/CartButton";
import CartDialog from "./components/cart/CartDialog";

const VIEW = {
  MEALS: "MEALS",
  ORDERS: "ORDERS",
};

function App() {
  const [view, setView] = useState(VIEW.MEALS);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleViewChange(view) {
    setView(view);
  }

  const modal = useRef();

  function handleOpenModal() {
    modal.current.showModal();
  }

  function handlerOpenOrdersTab() {
    handleViewChange(VIEW.ORDERS);
    setRefreshKey((k) => k + 1);
    modal.current.close();
  }

  return (
    <CartContextProvider>
      <CartButton handleOpenCart={handleOpenModal} />
      <CartDialog openOrdersTab={handlerOpenOrdersTab} cartDialog={modal} />
      <button
        disabled={view === VIEW.MEALS}
        onClick={() => handleViewChange(VIEW.MEALS)}
      >
        Meals
      </button>
      |
      <button
        disabled={view === VIEW.ORDERS}
        onClick={() => handleViewChange(VIEW.ORDERS)}
      >
        Orders
      </button>
      {view === VIEW.MEALS && <Meals />}
      {view === VIEW.ORDERS && <Orders refreshKey={refreshKey} />}
    </CartContextProvider>
  );
}

export default App;
