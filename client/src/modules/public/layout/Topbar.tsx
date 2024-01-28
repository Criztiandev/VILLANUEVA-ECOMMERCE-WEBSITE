import { toggleCart } from "@/service/store/slice/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/Logo.png";
import AddToCart from "../containers/AddToCart";
import { RootReducer } from "@/service/store";
interface Props {
  isStatic?: boolean;
}

const Topbar = ({ isStatic }: Props) => {
  const { products = [] } = useSelector((state: RootReducer) => state.cart);
  const dispatch = useDispatch();

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  return (
    <>
      <nav
        className={`navbar bg-base-100  z-50 ${
          !isStatic ? "fixed" : "flex"
        } max-h-[72px] px-[24px]`}>
        <div className="navbar-start">
          <Link to={"/"} className="text-xl flex gap-2 items-center">
            <img
              className="w-[72px] h-[72px] object-cover "
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
            <li className="text-[18px]">
              <Link to={"/"}>Home</Link>
            </li>

            <li className="text-[18px]">
              <Link to={"/products"}>Products</Link>
            </li>

            <li className="text-[18px]">
              <Link to={"/services"}>Service</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex gap-4">
          <Link to={"/login"} className="btn btn-circle text-[24px]">
            <i className="bx bx-user"></i>
          </Link>

          <button
            onClick={handleToggleCart}
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle">
            <div className="indicator">
              <i className="bx bx-shopping-bag text-[24px]"></i>
              {products.length > 0 && (
                <span className="badge badge-sm indicator-item bg-red-500 text-white">
                  {products.length}
                </span>
              )}
            </div>
          </button>
        </div>
      </nav>
      <AddToCart />
    </>
  );
};

export default Topbar;
