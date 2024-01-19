import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/dashboard";
import productRoutes from "./views/products/product.routes";
import settingsRoutes from "./views/settings/settings.routes";
import categoriesRoutes from "./views/categories/categories.routes";
import customerRoutes from "./views/customer/customer.routes";
import orderRoutes from "./views/orders/order.routes";
import serviceRoutes from "./views/service/service.routes";
import messageRoutes from "./views/message/message.routes";
const adminRoutes = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  ...productRoutes,
  ...settingsRoutes,
  ...categoriesRoutes,
  ...customerRoutes,
  ...orderRoutes,
  ...serviceRoutes,
  ...messageRoutes,
]);

export default adminRoutes;
