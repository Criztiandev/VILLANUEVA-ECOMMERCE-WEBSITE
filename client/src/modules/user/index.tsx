import { Outlet } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
import AddToCart from "../public/containers/AddToCart";
import MessageBox from "./containers/MessageBox";
import { MessageProvider } from "./context/MessageContext";

const RootScreen = () => {
  return (
    <>
      <MessageProvider>
        <main className="grid grid-cols-[350px_auto] ">
          <Sidebar />
          <section className="overflow-hidden ">
            <Topbar />
            <Outlet />
          </section>
        </main>

        <AddToCart />
        <MessageBox />
      </MessageProvider>
    </>
  );
};

export default RootScreen;
