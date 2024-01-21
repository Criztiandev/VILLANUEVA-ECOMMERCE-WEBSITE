import { Link } from "react-router-dom";
import DashboardIcon from "@/assets/icons/dashboard_light_icon.svg";
import ProductIcon from "@/assets/icons/product_light_icon.svg";
import CategoryIcon from "@/assets/icons/category_light_icon.svg";
import CustomerIcon from "@/assets/icons/customer_light_icon.svg";
import OrderIcon from "@/assets/icons/order_light_icon.svg";

const NavLink = ({
  title,
  path,
  icon,
}: {
  title: string;
  path: string;
  icon: string;
}) => {
  return (
    <Link to={path} className="flex gap-2">
      <img src={icon} className="w-[24px] h-[24px]" loading="lazy" />
      <span className="text-[16px]">{title}</span>
    </Link>
  );
};
const NavTitle = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <summary>
      <img src={icon} className="w-[24px] h-[24px]" />
      <span className="text-base">{title}</span>
    </summary>
  );
};

const Sidebar = () => {
  return (
    <aside className="border h-screen w-[400px] p-4 sticky top-0 bg-white">
      <div className="">
        <button className="btn text-[24px] btn-ghost">Logo</button>
      </div>
      <ul className="menu">
        <li>
          <NavLink title="Dashboard" path="/" icon={DashboardIcon} />
        </li>

        <li>
          <details>
            <NavTitle icon={ProductIcon} title="Products" />
            <ul>
              <li>
                <Link to={"/products"}>Product List</Link>
              </li>
              <li>
                <Link to={"/products/create"}>Create Product</Link>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <NavLink title="Category" path="/category" icon={CategoryIcon} />
        </li>

        <li>
          <details>
            <NavTitle title="Order" icon={OrderIcon} />
            <ul>
              <li>
                <Link to={"/order"}>Orders List</Link>
              </li>
              <li>
                <Link to={"/order/details"}>Order Details</Link>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <details>
            <NavTitle title="Customer" icon={CustomerIcon} />
            <ul>
              <li>
                <Link to={"/customer"}>Customer List</Link>
              </li>
              <li>
                <Link to={"/customer/create"}>Create Customer</Link>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <details>
            <summary>Service</summary>
            <ul>
              <li>
                <Link to={"/service"}>Service List</Link>
              </li>
              <li>
                <Link to={"/service/create"}>Create Service</Link>
              </li>
            </ul>
          </details>
        </li>

        <div className="divider"></div>
        <li>
          <Link to={"/message"} className="flex gap-2 items-center">
            <i className="bx bx-message-dots text-[18px]"></i>
            <span className="text-[16px]">Chats</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
