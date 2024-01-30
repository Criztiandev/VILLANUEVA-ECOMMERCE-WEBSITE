import BellIcon from "@/assets/icons/bell_light_icon.svg";
import Logout from "@/assets/icons/logout_light_icon.svg";
import Button from "@/components/Button";
import { clearCredentials } from "@/service/store/slice/auth.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(clearCredentials());
    navigate("/");
  };

  return (
    <div className="bg-white navbar  py-2flex justify-end items-center border-b border-gray-200">
      <div className="flex gap-4">
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
