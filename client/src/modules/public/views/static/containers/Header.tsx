import { toggleCart } from "@/service/store/slice/cart.slice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/Logo.png";
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
