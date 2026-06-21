import { CartContextProvider } from "./store/CartContextProvider";
import "./App.css";
import Meals from "./components/meals/Meals";
import Orders from "./components/orders/Orders";
import { useState, useRef } from "react";
import CartButton from "./components/cart/CartButton";
import CartDialog from "./components/cart/CartDialog";
import Header from "./components/Header";
import Button from "./components/UI/Button";
import { BUTTON_VARIANT } from "./constans/buttonVariant";

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
  }

  return (
    <>
      <Header />
      <CartContextProvider>
        <CartDialog openOrdersTab={handlerOpenOrdersTab} cartDialog={modal} />

        <div className="flex gap-5 justify-center w-120 mx-auto border-b border-b-(--border) px-10 py-3 mb-10">
          <CartButton handleOpenCart={handleOpenModal} />
          <div className="text-2xl font-bold">/</div>
          <Button
            disabled={view === VIEW.MEALS}
            active={view === VIEW.MEALS}
            onClick={() => handleViewChange(VIEW.MEALS)}
            variant={BUTTON_VARIANT.TAB}
          >
            MEALS
          </Button>
          <div className="text-2xl font-bold">/</div>
          <Button
            disabled={view === VIEW.ORDERS}
            active={view === VIEW.ORDERS}
            onClick={() => handleViewChange(VIEW.ORDERS)}
            variant={BUTTON_VARIANT.TAB}
          >
            ORDERS
          </Button>
        </div>
        {view === VIEW.MEALS && <Meals />}
        {view === VIEW.ORDERS && <Orders refreshKey={refreshKey} />}
      </CartContextProvider>
    </>
  );
}

export default App;
