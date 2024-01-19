import { Outlet } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";
import Topbar from "../../layout/Topbar";
import Notification from "../../layout/Notification";

const MainEntryPoint = () => {
  return (
    <>
      <main className="flex ">
        <Sidebar />
        <section className=" flex flex-col w-screen overflow-x-hidden">
          <Topbar />
          <div className="px-[32px]">
            <Outlet />
          </div>
        </section>
      </main>
      <Notification />
    </>
  );
};

export default MainEntryPoint;
