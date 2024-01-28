import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/dashboard";
import productRoutes from "./routes/product.routes";
import categoriesRoutes from "./routes/categories.routes";
import customerRoutes from "./routes/customer.routes";
import orderRoutes from "./routes/order.routes";
import serviceRoutes from "./routes/service.routes";
import messageRoutes from "./routes/message.routes";
import userRoutes from "./routes/user.routes";

const adminRoutes = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  ...productRoutes,
  ...categoriesRoutes,
  ...customerRoutes,
  ...orderRoutes,
  ...serviceRoutes,
  ...messageRoutes,
  ...userRoutes,
]);

export default adminRoutes;
