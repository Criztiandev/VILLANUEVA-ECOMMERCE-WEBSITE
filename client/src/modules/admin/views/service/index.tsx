import { Outlet } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import Topbar from "../../layout/Topbar";
import Notification from "../../layout/Notification";

const MainEntryPoint = () => {
  return (
    <>
      <main className="flex">
        <div>
          <Sidebar />
        </div>
        <section className=" flex flex-col w-screen overflow-x-hidden">
          <Topbar />
          <div className="px-[24px]">
            <Outlet />
          </div>
        </section>
      </main>
      <Notification />
    </>
  );
};

export default MainEntryPoint;
