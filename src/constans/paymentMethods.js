export const paymentMethodLabels = {
  onDelivery: "Cash on delivery",
  card: "Credit Card",
  paypal: "PayPal",
  blik: "BLIK",
};

export const paymentMethods = [
  {
    id: "blik",
    label: paymentMethodLabels.blik,
    icon: "/icons/blik-logo.svg",
    paymentMethod: "blik",
  },
  {
    id: "paypal",
    label: paymentMethodLabels.paypal,
    icon: "/icons/paypal-brands-solid.svg",
    paymentMethod: "paypal",
  },
  {
    id: "card",
    label: paymentMethodLabels.card,
    icon: "/icons/credit-card-solid.svg",
    paymentMethod: "card",
  },
  {
    id: "cod",
    label: paymentMethodLabels.onDelivery,
    icon: "/icons/truck-fast-solid.svg",
    paymentMethod: "onDelivery",
  },
];
