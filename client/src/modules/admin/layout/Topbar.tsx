import { clearCredentials } from "@/service/store/slice/auth.slice";
import { useDispatch } from "react-redux";

const Topbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCredentials());
  };

  return (
    <div className="bg-white navbar  py-2flex justify-end items-center border-b border-gray-200">
      <div className="flex gap-4">
        <label
          htmlFor="notification-drawer"
          className="btn btn-ghost btn-md btn-circle">
          <i className="bx bx-bell text-[24px]"></i>
        </label>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">Profile</a>
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
    </div>
  );
};

export default Topbar;
