import { useEffect, useState } from "react";

import { motion } from "framer-motion";

const Chatbot = () => {
  const [isActive, setIsActive] = useState(false);
  const handleToggleDrawer = () => setIsActive((prev) => !prev);

  useEffect(() => {
    if (isActive) {
      // turn off the scroll bar
      document.body.style.overflow = "hidden";
    }

    return () => {
      // turn on the scroll bar
      document.body.style.overflow = "unset";
    };
  }, [isActive]);

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.8 }}
        className="cursor-pointer fixed right-[18px] m-4 bottom-[18px] w-[64px] h-[64px]  rounded-full flex justify-center items-center bg-white"
        onClick={handleToggleDrawer}>
        <i className="bx bx-comment-dots text-[32px]"></i>
      </motion.button>

      {isActive && (
        <div className="fixed top-0 left-0 grid grid-cols-[auto_500px] w-full z-50">
          <div
            className="bg-black opacity-30"
            onClick={handleToggleDrawer}></div>
          <div className="relative h-screen border bg-white p-4 flex flex-col justify-end ">
            <div className="p-4  absolute top-0 w-full flex items-center gap-4">
              <span className="text-[18px]">Name of Ecommerce</span>
              <span className="badge badge-md bg-green-400"></span>
            </div>
            {/* Content */}
            <div className="my-4 flex flex-col gap-4">
              <div className="chat chat-start">
                <div className="chat-bubble">You underestimate my power!</div>
              </div>

              <div className="chat chat-end">
                <div className="chat-bubble">You underestimate my power!</div>
              </div>
            </div>

            <div className="join ">
              <input
                className="w-full input input-bordered join-item"
                placeholder="Chat"
              />
              <button className="join-item btn">Submit</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
