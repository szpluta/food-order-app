import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";
import AppLogo from "../components/UI/AppLogo";
import { mainNavigationItems } from "../constans/navigationItems";

function AppLayout() {
  return (
    <>
      <AppLogo className="w-70 mx-auto my-3" />
      <MainNav items={mainNavigationItems} />
      <Outlet />
    </>
  );
}

export default AppLayout;
