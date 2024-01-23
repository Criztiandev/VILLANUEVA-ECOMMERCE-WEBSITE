import { clearCredentials } from "@/service/store/slice/auth.slice";
import { toggleCart } from "@/service/store/slice/cart.slice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartIcon from "@/assets/icons/cart_light_icon.svg";
import Logo from "@/assets/images/Logo.png";

interface Props {
  isStatic?: boolean;
}

const Header = ({ isStatic }: Props) => {
  const dispatch = useDispatch();

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  const handleLogout = () => {
    dispatch(clearCredentials());
  };

  return (
    <header
      className={`navbar bg-base-100  z-50 ${!isStatic ? "fixed" : "flex"}`}>
      <div className="navbar-start">
        <Link to={"/"} className="text-xl flex gap-2 items-center">
          <img
            className="w-[100px] h-[100px] object-cover "
            src={Logo}
            alt="logo"
          />
          <span className="capitalize text-[22] font-medium">
            villanueva gardens
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/"}>Home</Link>
          </li>

          <li>
            <Link to={"/shop"}>Shop</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex gap-4">
        <label
          htmlFor="add-to-cart"
          className="btn btn-circle text-[24px]"
          onClick={handleToggleCart}>
          <img src={CartIcon} loading="lazy" alt="alter" />
        </label>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full"></div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
