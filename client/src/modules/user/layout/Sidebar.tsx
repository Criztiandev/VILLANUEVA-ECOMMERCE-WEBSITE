import { Link } from "react-router-dom";
import DashboardIcon from "@/assets/icons/dashboard_light_icon.svg";
import OrderIcon from "@/assets/icons/order_light_icon.svg";
import NaviIcon from "@/assets/icons/service_light_icon.svg";
import SettingsIcon from "@/assets/icons/settings_light_icon.svg";
import Logo from "@/components/Logo";
const Sidebar = () => {
  return (
    <aside className="border h-screen w-[350px] p-4 sticky top-0 bg-white overflow-y-scroll">
      <Logo />

      <ul className="menu mt-8">
        <NavLink title="Dashboard" path="/" icon={DashboardIcon} />
        <NavLink title="My Order" path="/order" icon={OrderIcon} />
        <NavLink title="My Service" path="/service" icon={NaviIcon} />

        <div className="divider"></div>
        <h3 className="menu-title">Shop</h3>
        <NavLink title="Products" path="/product/shop" icon={OrderIcon} />
        <NavLink title="Service" path="/service/shop" icon={NaviIcon} />
        <div className="divider"></div>
        <NavLink title="Settings" icon={SettingsIcon} path="/settings" />
      </ul>
    </aside>
  );
};

export default Sidebar;

interface NavLinkProps {
  title: string;
  path: string;
  icon?: string;
}

const NavLink = ({ title, path, icon }: NavLinkProps) => {
  return (
    <li>
      <Link
        to={path}
        className="flex gap-2 hover:bg-[#244d4d] hover:text-white">
        {icon && (
          <img src={icon} className="w-[24px] h-[24px]" loading="lazy" />
        )}
        <span className="text-[16px]">{title}</span>
      </Link>
    </li>
  );
};
