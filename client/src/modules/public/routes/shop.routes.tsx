import CheckoutScreen from "../views/shop/CheckoutScreen";
import ProductDetails from "../views/shop/ProductDetails";
import ProductShopScreen from "../views/shop/ProductShopScreen";
import ServiceDetails from "../views/shop/ServiceDetails";
import ServiceShopScreen from "../views/shop/ServiceShopScreen";

const shopRoutes = [
  { path: "/products", element: <ProductShopScreen /> },
  { path: "/products/:id", element: <ProductDetails /> },

  { path: "/services", element: <ServiceShopScreen /> },
  { path: "/services/:id", element: <ServiceDetails /> },
  { path: "/checkout", element: <CheckoutScreen /> },
];

export default shopRoutes;
