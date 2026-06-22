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
import Footer from "./components/Footer";

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
    <div className="container">
      <Header />
      <CartContextProvider>
        <CartDialog openOrdersTab={handlerOpenOrdersTab} cartDialog={modal} />

        <nav className="flex flex-wrap gap-5 justify-center w-full max-w-120 mx-auto border-b border-b-(--border) px-10 py-3 mt-5 mb-10">
          <CartButton handleOpenCart={handleOpenModal} />
          <div className="hidden sm:block mx-4 h-6 w-0.75 bg-[var(--text-h)] -skew-x-14" />
          <Button
            disabled={view === VIEW.MEALS}
            active={view === VIEW.MEALS}
            onClick={() => handleViewChange(VIEW.MEALS)}
            variant={BUTTON_VARIANT.TAB}
          >
            MEALS
          </Button>
          <div className="hidden sm:block mx-4 h-6 w-0.75 bg-[var(--text-h)] -skew-x-14" />
          <Button
            disabled={view === VIEW.ORDERS}
            active={view === VIEW.ORDERS}
            onClick={() => handleViewChange(VIEW.ORDERS)}
            variant={BUTTON_VARIANT.TAB}
          >
            ORDERS
          </Button>
        </nav>
        {view === VIEW.MEALS && <Meals />}
        {view === VIEW.ORDERS && <Orders refreshKey={refreshKey} />}
      </CartContextProvider>
      <Footer />
    </div>
  );
}

export default App;
