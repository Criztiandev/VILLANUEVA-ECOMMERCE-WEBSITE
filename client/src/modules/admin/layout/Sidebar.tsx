import { Link } from "react-router-dom";
import DashboardIcon from "@/assets/icons/dashboard_light_icon.svg";
import ProductIcon from "@/assets/icons/product_light_icon.svg";
import CategoryIcon from "@/assets/icons/category_light_icon.svg";
import CustomerIcon from "@/assets/icons/customer_light_icon.svg";
import OrderIcon from "@/assets/icons/order_light_icon.svg";
import NaviIcon from "@/assets/icons/service_light_icon.svg";
import MessageIcon from "@/assets/icons/chat_light_icon.svg";
import UserIcon from "@/assets/icons/user_light_icon.svg";
import Logo from "@/components/Logo";
const Sidebar = () => {
  return (
    <aside className="border h-screen w-[350px] p-4 sticky top-0 bg-white overflow-y-scroll">
      <Logo />
      <ul className="menu mt-8">
        <NavLink title="Dashboard" path="/" icon={DashboardIcon} />

        <li>
          <details>
            <NavTitle icon={ProductIcon} title="Products" />
            <ul>
              <NavLink title="Products" path="/products" />
              <NavLink title="Create Producs" path="/products/create" />
            </ul>
          </details>
        </li>
        <li>
          <details>
            <NavTitle icon={CategoryIcon} title="Category" />
            <ul>
              <NavLink title="Product Category" path="/category/products" />
              <NavLink title="Service Category" path="/category/service" />
            </ul>
          </details>
        </li>

        <li>
          <details>
            <NavTitle title="Customer" icon={CustomerIcon} />
            <ul>
              <NavLink title="Customer List" path="/customer" />
              <NavLink title="Customer Create" path="/customer/create" />
            </ul>
          </details>
        </li>

        <li>
          <details>
            <NavTitle title="Service" icon={NaviIcon} />
            <ul>
              <NavLink title="Service List" path="/service" />
              <NavLink title="Service Schedules" path="/service/schedule" />
              <NavLink title="Create Service" path="/service/create" />
            </ul>
          </details>
        </li>

        <NavLink title="Order List" path="/order" icon={OrderIcon} />
        <NavLink title="Return List" path="/order/returned" icon={OrderIcon} />

        <div className="divider"></div>
        <li>
          <details>
            <NavTitle icon={ProductIcon} title="Archive" />
            <ul>
              <NavLink title="Products" path="/archive/products" />
              <NavLink title="Service" path="/archive/service" />
            </ul>
          </details>
        </li>
        <NavLink title="Message" icon={MessageIcon} path="/message" />
        <NavLink title="User" icon={UserIcon} path="/users" />
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

const NavTitle = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <summary className="hover:bg-[#244d4d] hover:text-white">
      <img src={icon} className="w-[24px] h-[24px]" />
      <span className="text-base">{title}</span>
    </summary>
  );
};
