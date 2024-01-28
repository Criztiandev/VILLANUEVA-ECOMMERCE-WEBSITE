import BellIcon from "@/assets/icons/bell_light_icon.svg";
import Logout from "@/assets/icons/logout_light_icon.svg";
import Button from "@/components/Button";
import messageIcon from "@/assets/icons/chat_light_icon.svg";
import { clearCredentials } from "@/service/store/slice/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleCart } from "@/service/store/slice/cart.slice";
import { RootReducer } from "@/service/store";

interface Props {
  isSticky?: boolean;
}

const Topbar = () => {
  const { products } = useSelector((state: RootReducer) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(clearCredentials());
    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };
  return (
    <div className=" sticky top-0 bg-white p-4    py-2 flex justify-end items-center border-b border-gray-200">
      <div className="flex gap-2">
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

        <div className="tooltip tooltip-bottom" data-tip="Message">
          <label
            htmlFor="notification-drawer"
            className="btn btn-ghost btn-md btn-circle">
            <img src={messageIcon} alt="bell" loading="lazy" />
          </label>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Notification">
          <label
            htmlFor="notification-drawer"
            className="btn btn-ghost btn-md btn-circle">
            <img src={BellIcon} alt="bell" loading="lazy" />
          </label>
        </div>

        <div className="tooltip tooltip-bottom" data-tip="Log out">
          <Button
            as="ghost"
            icon={Logout}
            dir="left"
            className="btn-circle"
            onClick={handleLogOut}
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
