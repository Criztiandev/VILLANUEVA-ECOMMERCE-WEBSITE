import { Link } from "react-router-dom";
import DashboardIcon from "@/assets/icons/Dashboard.svg";

const Sidebar = () => {
  return (
    <aside className="border h-screen w-[400px] p-4 sticky top-0 bg-white">
      <div className="">
        <button className="btn text-[24px] btn-ghost">Logo</button>
      </div>
      <ul className="menu">
        <li>
          <Link to={"/"} className="flex gap-2">
            <img src={DashboardIcon} className="w-[24px] h-[24px]" />
            <span className="text-[16px]">Dashboard</span>
          </Link>
        </li>

        <li>
          <details>
            <summary>Produts</summary>
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
          <Link to={"/category"}>Category</Link>
        </li>

        <li>
          <details>
            <summary>Orders</summary>
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
            <summary>Customer</summary>
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
