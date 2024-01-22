import BellIcon from "@/assets/icons/bell_light_icon.svg";

const Topbar = () => {
  return (
    <div className="bg-white navbar  py-2flex justify-end items-center border-b border-gray-200">
      <div className="flex gap-4">
        <label
          htmlFor="notification-drawer"
          className="btn btn-ghost btn-md btn-circle">
          <img src={BellIcon} alt="bell" loading="lazy" />
        </label>
      </div>
    </div>
  );
};

export default Topbar;
