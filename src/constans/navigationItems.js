export const homeNavigationItems = [
  { route: "/meals", label: "Meals" },
  { route: "/cart", label: "Cart", badge: true },
  { route: "/orders", label: "Orders" },
];

export const mainNavigationItems = [
  { route: "/", label: "Home" },
  ...homeNavigationItems,
];
