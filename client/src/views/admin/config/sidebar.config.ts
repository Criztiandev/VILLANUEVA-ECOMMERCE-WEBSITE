import { LinkProps } from "../interface/sidebar";

const size = { minimum: "7rem", maximum: "350px" };

const MainLinks: LinkProps[] = [
  //dashboard
  { path: "/", title: "Dashboard", icon: "T" },
  { path: "/products", title: "Products", icon: "T" },
  { path: "/Categories", title: "Categories", icon: "T" },
  { path: "/orders", title: "Orders", icon: "T" },
  { path: "/messages", title: "Messages", icon: "T" },
  { path: "/users", title: "Users", icon: "T" },
  { path: "/users", title: "Users", icon: "T" },
];

const FooterLinks: LinkProps[] = [
  { path: "/about", title: "About", icon: "T" },
  { path: "/settings", title: "Settings", icon: "T" },
];

export default { size, MainLinks, FooterLinks };
