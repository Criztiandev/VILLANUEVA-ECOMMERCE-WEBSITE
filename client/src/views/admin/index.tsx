import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
import { Outlet } from "react-router-dom";

const AdminEntryPoint = () => {
  return (
    <div className="h-screen flex overflow-y-auto">
      <Sidebar />
      <main className="flex flex-col w-screen">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminEntryPoint;
