import Logo from "@/components/Logo";
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed w-screen h-screen bg-primary flex justify-center items-center top-0 left-0 text-[48px] font-semobold text-white">
      <div className="flex justify-center items-center flex-col gap-4">
        <Logo />
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </div>
  );
};

export default LoadingScreen;
