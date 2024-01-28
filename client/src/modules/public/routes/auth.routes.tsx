import ForgotPasswordScreen from "../views/auth/ForgotPasswordScreen";
import LoginScreen from "../views/auth/LoginScreen";
import RegisterScreen from "../views/auth/RegisterScreen";

const authRoutes = [
  { path: "/login", element: <LoginScreen /> },
  { path: "/register", element: <RegisterScreen /> },
  { path: "/forgot-password", element: <ForgotPasswordScreen /> },
];

export default authRoutes;
