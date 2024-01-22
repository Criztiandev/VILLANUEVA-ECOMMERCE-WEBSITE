import { Outlet } from "react-router-dom";

const RootScreen = () => {
  return (
    <div className="overflow-x-hidden">
      <Outlet />
    </div>
  );
};

export default RootScreen;
