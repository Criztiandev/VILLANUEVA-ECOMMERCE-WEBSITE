import { BaseProps } from "@/interface/component";
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";

const AdminEntryPoint = ({ children }: BaseProps) => {
  return (
    <div className="h-screen flex overflow-y-auto">
      <Sidebar />
      <main className="flex flex-col w-screen">
        <Topbar />
        {children}
      </main>
    </div>
  );
};

export default AdminEntryPoint;
