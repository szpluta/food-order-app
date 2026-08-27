import { Outlet } from "react-router-dom";
import { CartContextProvider } from "../store/CartContextProvider";
import Footer from "../components/Footer";
import { AuthContextProvider } from "../store/AuthContextProvider";

function RootLayout() {
  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <Outlet />
        </CartContextProvider>
      </AuthContextProvider>
      <Footer />
    </>
  );
}

export default RootLayout;
