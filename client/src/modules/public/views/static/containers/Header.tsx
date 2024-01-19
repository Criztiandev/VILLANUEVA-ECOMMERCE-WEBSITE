import { toggleCart } from "@/service/store/slice/cart.slice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

interface Props {
  isStatic?: boolean;
}

const Header = ({ isStatic }: Props) => {
  const dispatch = useDispatch();

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  return (
    <header
      className={`navbar bg-base-100  z-50 ${!isStatic ? "fixed" : "flex"}`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">
          Logo
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

          <li>
            <Link to={"/about"}>About</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex gap-4">
        <Link to={"/login"} className="btn btn-circle text-[24px]">
          <i className="bx bx-user"></i>
        </Link>
        <label
          htmlFor="add-to-cart"
          className="btn btn-circle text-[24px]"
          onClick={handleToggleCart}>
          <i className="bx bx-shopping-bag"></i>
        </label>
      </div>
    </header>
  );
};

export default Header;
