import { Outlet } from "react-router-dom";
import { CartContextProvider } from "../store/CartContextProvider";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <>
      <CartContextProvider>
        <Outlet />
      </CartContextProvider>
      <Footer />
    </>
  );
}

export default RootLayout;
