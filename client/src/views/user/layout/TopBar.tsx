import Button from "@/components/Button";
import FlexStack from "@/components/FlexStack";
import { clearCredentials } from "@/service/store/slice/auth.slice";
import { useDispatch } from "react-redux";
const TopBar = () => {
  const dispatch = useDispatch();

  const toggleLogout = () => {
    dispatch(clearCredentials());
  };

  return (
    <header className="navbar bg-base-100 border px-8 py-4">
      <div className="flex justify-between items-center w-full">
        <Button className="btn  btn-circle" title="T" />

        <FlexStack dir="row">
          <Button className="btn  btn-circle" title="T" />
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
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li onClick={toggleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </FlexStack>
      </div>
    </header>
  );
};

export default TopBar;
