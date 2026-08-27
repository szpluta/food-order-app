import { useContext, useEffect, useRef, useState } from "react";
import MainNavigationItem from "./UI/MainNavItem";
import { AuthContext } from "../store/AuthContext";
import { NavLink } from "react-router-dom";
import { VARIANT_STYLES } from "../constans/stylesVariant";

function MainNav({ items, variant }) {
  const { session, profile, isLoading, logoutUser } = useContext(AuthContext);
  const [userMenuVisible, setUserMenuVisible] = useState(false);

  const menuRef = useRef(null);

  function handleMenuVisibility() {
    setUserMenuVisible((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-center  px-3 py-5 mb-5">
      <nav aria-label="Main navigation" className="main-menu w-auto">
        <ul className="flex gap-2 justify-center">
          {items.map((item) => (
            <li key={item.route}>
              <MainNavigationItem
                route={item.route}
                customClass={`${item.badge ? "relative pe-6" : ""}`}
                variant={variant}
                label={item.label}
                badge={item.badge}
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="w-auto ms-20">
        {session && !isLoading ? (
          <div ref={menuRef} className="relative">
            <button
              className={`text-[var(--accent)] cursor-pointer `}
              onClick={handleMenuVisibility}
            >
              Hello, {profile?.name} {profile?.surname}{" "}
              <img
                className="ms-1"
                width="10px"
                src="/icons/angle-down-solid.svg"
              />
            </button>
            {userMenuVisible && (
              <div className="absolute left-0 top-[calc(100%+10px)] flex flex-col w-52 text-left text-sm bg-[var(--bg)] border border-[var(--border)] p-3 rounded-md z-3">
                <NavLink className="hover:text-[var(--accent)]" to="/orders">
                  My orders
                </NavLink>
                <hr className="border-[var(--border)] mt-5 mb-2.5" />
                <button
                  className={`text-[var(--text)] hover:text-[var(--accent)] cursor-pointer text-left text-xs`}
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink className={VARIANT_STYLES[variant]} to="/login">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default MainNav;
