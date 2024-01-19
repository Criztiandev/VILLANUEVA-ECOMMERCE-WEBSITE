import { useEffect, useState } from "react";

const Notification = () => {
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      // turn off scroll bar
      document.body.style.overflow = "hidden";
    }

    return () => {
      // turn on scroll bar
      document.body.style.overflow = "unset";
    };
  }, [isActive]);

  const toggleDrawer = () => setActive((prev) => !prev);

  return (
    <>
      <input
        id="notification-drawer"
        type="checkbox"
        className="hidden"
        onClick={toggleDrawer}
      />
      {isActive && (
        <>
          <div className="h-full w-full fixed top-0 grid grid-cols-[auto_500px]">
            <div className="bg-black h-full opacity-50" onClick={toggleDrawer}>
              hidden
            </div>
            <div className="w-full bg-white"></div>
          </div>
        </>
      )}
    </>
  );
};

export default Notification;
