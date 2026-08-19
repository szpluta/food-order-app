import MainNavigationItem from "./UI/MainNavItem";

function MainNav({ items, variant }) {
  return (
    <nav aria-label="Main navigation" className="main-menu px-3 py-5 mb-5">
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
  );
}

export default MainNav;
